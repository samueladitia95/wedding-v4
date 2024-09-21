import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { pb } from "$lib/pocketbase";
import { schemaRsvpAndWishes } from "$lib/schema";
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schemaRsvpAndWishes));

		// Convenient validation check:
		if (!form.valid) {
			return fail(400, { form });
		}

		const dataRsvp = {
			project: "reynaldo_cynthia",
			name: form.data.name,
			phone: form.data.phone,
			email: form.data.email,
			is_attending: form.data.is_attending,
			plus_one: form.data.plus_one,
			wishes: form.data.wishes,
			from: form.data.from,
		};
		await pb.collection("rsvp_wedding_v4").create(dataRsvp);

		return { form };
	},
} satisfies Actions;
