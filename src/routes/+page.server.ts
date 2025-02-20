import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { pb } from "$lib/pocketbase";
import { schemaRsvpAndWishes } from "$lib/schema";
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";

export const actions = {
	default: async ({ request }) => {
		const formData: FormData = await request.formData();
		const guestNames: string[] = formData.getAll("guest_names").map((value) => value.toString());

		const form = await superValidate(formData, zod(schemaRsvpAndWishes));
		form.data.guest_names = guestNames;

		// Convenient validation check:
		if (!form.valid) {
			return fail(400, { form });
		}

		if (form.data.total_guests > 0) {
			form.data.plus_one = form.data.guest_names.join(", ");
		}

		const dataRsvp = {
			project: "aldobelin",
			name: form.data.name,
			phone: form.data.phone,
			email: form.data.email,
			is_attending: form.data.is_attending,
			total_guests: form.data.total_guests,
			plus_one: form.data.plus_one,
			food_allergies: form.data.food_allergies,
			wishes: form.data.wishes,
			from: form.data.from,
		};
		await pb.collection("rsvp_wedding_v4").create(dataRsvp);

		return { form };
	},
} satisfies Actions;
