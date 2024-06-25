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
			project: "default",
			template_id: "wedding_v4",
			attendee_name: form.data.name,
			attendee_phone: form.data.phoneNumber,
			is_attend: !!Number(form.data.isAttend),
			partner_name: form.data.plusOne,
		};
		await pb.collection("rsvp").create(dataRsvp);

		const dataWish = {
			project: "default",
			template_id: "wedding_v4",
			name: form.data.name,
			wishes: form.data.wishes,
		};
		await pb.collection("wishes").create(dataWish);

		return { form };
	},
} satisfies Actions;
