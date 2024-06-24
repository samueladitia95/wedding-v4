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

		const data = {};
		await pb.collection("rsvp_wedding_v3").create(data);

		return { form };
	},
} satisfies Actions;
