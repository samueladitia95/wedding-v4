<script lang="ts">
	import { schemaRsvpAndWishes } from "$lib/schema";
	import { zod } from "sveltekit-superforms/adapters";
	import { inview } from "svelte-inview";
	import { superForm } from "sveltekit-superforms/client";
	import type { LayoutData } from "../../routes/$types";
	import Input from "$lib/components/Input.svelte";
	import { fade } from "svelte/transition";
	import { invalidateAll } from "$app/navigation";
	import { toast } from "@zerodevx/svelte-toast";

	export let data: LayoutData;

	let isShow: boolean = false;
	let isSuccess: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
	const { form, errors, enhance, constraints } = superForm(data.form, {
		validationMethod: "onblur",
		validators: zod(schemaRsvpAndWishes),
		onUpdated({ form }) {
			if (form.valid) {
				isSuccess = true;
				invalidateAll();
				toast.push("Success!", {
					theme: {
						"--toastColor": "mintcream",
						"--toastBackground": "rgba(72,187,120,0.9)",
						"--toastBarBackground": "#2F855A",
					},
					duration: 10000,
				});
			} else {
				toast.push("Please Try Again", {
					duration: 10000,
				});
			}
		},
	});
</script>

{#if !isSuccess}
	<div
		class="w-screen lg:!w-full min-h-screen bg-green-sage"
		use:inview={{
			rootMargin: "-100px",
			unobserveOnEnter: true,
		}}
		on:inview_change={handleChange}
	>
		{#if isShow}
			<div
				class="container text-white py-16 md:py-44 lg:pt-20 flex flex-col gap-14"
				in:fade={{ duration: 1000, delay: 500 }}
			>
				<div class="flex flex-col gap-4">
					<div class="font-safira font-light text-5xl/normal">
						RSVP <span class="font-ivora">&</span> WISHES
					</div>
					<div class="font-jakarta font-light text-sm/normal md:text-base/relaxed md:max-w-xl">
						Kindly confirm your attendance by completing the form provided below: Before 26<sup
							>th</sup
						>
						October 2024.<br /> <br />
						Alongside RSVP, Please take a moment to express your warm regards and best wishes.
					</div>
				</div>

				<form class="flex flex-col gap-6" use:enhance method="POST" action="/">
					<Input
						name="name"
						label="Fill Your Name"
						bind:value={$form.name}
						{...$constraints.name}
						error={$errors.name}
						isRequired
					/>
					<Input
						name="phone"
						label="Phone Number"
						bind:value={$form.phone}
						{...$constraints.phone}
						error={$errors.phone}
						isRequired
					/>
					<Input
						name="email"
						label="Email"
						bind:value={$form.email}
						{...$constraints.email}
						error={$errors.email}
					/>

					<div>
						<div class="font-jakarta font-light text-white">
							Will you be attending the wedding?<span class="text-error">*</span>
						</div>
						<div class="flex gap-12 md:gap-28 w-full ml-3 mt-3">
							<div class="flex gap-2 items-center">
								<input
									name="is_attending"
									type="radio"
									class="w-5 h-5 appearance-none border-2 border-ring rounded-full box-content checked:bg-white checked:ring-4 checked:ring-green-sage checked:ring-inset"
									bind:group={$form.is_attending}
									value="Yes"
								/>
								<div class="font-jakarta">Yes</div>
							</div>
							<div class="flex gap-2 items-center">
								<input
									name="is_attending"
									type="radio"
									class="w-5 h-5 appearance-none border-2 border-ring rounded-full box-content checked:bg-white checked:ring-4 checked:ring-green-sage checked:ring-inset"
									bind:group={$form.is_attending}
									value="No"
								/>
								<div class="font-jakarta">No</div>
							</div>
						</div>
					</div>

					{#if $form.is_attending === "Yes"}
						<Input
							name="plus_one"
							label="Are you bringing a +1?"
							secondaryLabel="If so, please let us know who"
							bind:value={$form.plus_one}
							{...$constraints.plus_one}
							error={$errors.plus_one}
						/>
					{/if}

					<Input
						name="wishes"
						label="Wishes"
						secondaryLabel="Write your wishes"
						bind:value={$form.wishes}
						error={$errors.wishes}
						isRequired
					/>

					<Input
						name="from"
						label="From"
						secondaryLabel="Enter your name here to send your wishes."
						bind:value={$form.from}
						{...$constraints.from}
						error={$errors.from}
					/>

					<button
						type="submit"
						disabled={isSuccess}
						class="font-jakarta text-sm !bg-bg-primary text-white rounded-full p-4 mt-8 disabled:bg-disabled-button disabled:text-disabled-text"
					>
						Submit RSVP
					</button>
				</form>
			</div>
		{/if}
	</div>
{:else}
	<div
		class="bg-green-sage min-h-screen py-28 items-center flex flex-col justify-center"
		in:fade={{ duration: 1000, delay: 0 }}
	>
		<div class="container flex flex-col text-center text-white gap-3 max-w-[800px]">
			<h1 class="font-safira text-4.5xl px-5 uppercase">Thank You For Your RSVP and Wishes!</h1>
			<p class="font-arizona text-base px-8">
				We Will Contact You For More Information and Details
			</p>
		</div>
	</div>
{/if}
