import { pb } from "$lib/pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import type { LayoutLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { schemaRsvpAndWishes } from "$lib/schema";
import { PUBLIC_IS_GUEST_FROM_URL } from "$env/static/public";

export const load: LayoutLoad = async ({ url }) => {
	const form = await superValidate(zod(schemaRsvpAndWishes));
	const response = await pb.collection("wedding_v4").getFirstListItem('project="erilaras"');
	const page = url.searchParams.get("n") || 1;
	const wishes = await pb.collection("rsvp_wedding_v4").getList(1, 5 * +page, {
		filter: 'project = "erilaras"',
		fields: "wishes,from,created",
		sort: "-created",
	});

	// Access query params from URL
	const isGuestFromUrl: boolean = Boolean(PUBLIC_IS_GUEST_FROM_URL);
	const guestID = url.searchParams.get("guest") || "";
	let guestRule = null;
	if (!isGuestFromUrl || !guestID) {
		try {
			guestRule =
				(await pb.collection("guest_rule_wedding_v4").getFirstListItem(`id="${guestID}"`)) || null;
		} catch {
			guestRule = null;
		}
	} else {
		guestRule = {
			invitation_receipient_name: url.searchParams.get("guest") || "",
			pax_prepared: 2,
		};
	}

	let song: string = "";
	if (response.song_url) {
		song = pb.files.getUrl(response, response.song_url);
	}

	return {
		form,
		guestRule,
		response,
		song,
		wishes,
	};
};
