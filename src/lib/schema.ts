import { z } from "zod";

export const schemaRsvpAndWishes = z
	.object({
		name: z.string({
			required_error: "First Name Can't be empty",
		}),
		phoneNumber: z
			.string({
				required_error: "Phone Number Can't be empty",
			})
			.regex(/(^08)(\d{3,4}-?){2}\d{2,3}$/, "Phone Number is Invalid"),
		email: z
			.string({
				required_error: "Email Can't be empty",
			})
			.email({
				message: "Email is Invalid",
			}),
		isAttend: z
			.boolean({
				required_error: "Message is Required",
			})
			.default(true),
		plusOne: z.string({ required_error: "Wishes is Required" }),
		wishes: z
			.string({ required_error: "Wishes is Required" })
			.trim()
			.min(12, { message: "Your wishes should have minimum 12 characters" })
			.max(255, { message: "Your wishes should have maximum 255 characters" }),
	})
	.required();
