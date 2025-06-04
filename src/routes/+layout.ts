import { pb } from "$lib/pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import type { LayoutLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { schemaRsvpAndWishes } from "$lib/schema";

export const load: LayoutLoad = async ({ url }) => {
	const form = await superValidate(zod(schemaRsvpAndWishes));
	const response = await pb.collection("wedding_v4").getFirstListItem('project="laksmanarenata"');
	const page = url.searchParams.get("n") || 1;
	const wishes = await pb.collection("rsvp_wedding_v4").getList(1, 5 * +page, {
		filter: 'project = "laksmanarenata"',
		fields: "wishes,from,created",
		sort: "-created",
	});

	// Access query params from URL
	const guestID = url.searchParams.get("guest") || "";
	let guestRule = null;
	try {
		guestRule =
			(await pb.collection("guest_rule_wedding_v4").getFirstListItem(`id="${guestID}"`)) || null;
	} catch {
		guestRule = null;
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
