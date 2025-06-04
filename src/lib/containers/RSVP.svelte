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
	import { fly } from "svelte/transition";
	import TextArea from "$lib/components/TextArea.svelte";

	export let data: LayoutData;
	export let guestPaxLimit: number;

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
						Kindly confirm your attendance by completing the form provided below: Before 21<sup
							>th</sup
						>
						June 2025.<br /> <br />
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
						secondaryLabel="Fill Your Phone Number"
						bind:value={$form.phone}
						{...$constraints.phone}
						error={$errors.phone}
						isRequired
					/>
					<Input
						name="email"
						label="Email"
						secondaryLabel="Fill Your Email"
						bind:value={$form.email}
						{...$constraints.email}
						error={$errors.email}
						isRequired
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

					{#if $form.is_attending === "Yes" && guestPaxLimit > 1}
						<div class="flex flex-col w-full h-full">
							<div class="font-jakarta font-light text-white">
								How many guests will be joining you?
							</div>
							<div class="w-full mt-3">
								<select
									name="total_guests"
									class="w-full text-black border-2 border-ring rounded-lg p-2"
									bind:value={$form.total_guests}
								>
									<option value={0} disabled selected>--</option>
									{#each Array(guestPaxLimit - 1) as _, i}
										<option value={i + 1}>{i + 1}</option>
									{/each}
								</select>
							</div>
						</div>

						{#if $form.total_guests > 1}
							<div class="flex flex-col w-full h-full">
								<div class="font-jakarta font-light text-white">
									Please provide the name of your guests
								</div>
								<div class="w-full mt-3">
									{#each Array.from({ length: $form.total_guests }) as _, index}
										<label class="text-sm text-placeholder-text" for={`guest_names[${index}]`}>
											{`Guest ${index + 1}`}
											<span class="text-error">*</span>
										</label>
										<div class="relative mt-3">
											<input
												type="text"
												placeholder="Fill Your Guest Name"
												class="h-11 w-full border border-input-border bg-white rounded-md px-4 text-black outline-none transition-all focus:border-placeholder-text disabled:bg-gray-200"
												required
												autocomplete="off"
												name="guest_names"
												bind:value={$form.guest_names[index]}
											/>

											{#if $errors.guest_names && $errors.guest_names?.[index]}
												<div
													transition:fly={{ y: -20, duration: 300 }}
													class="text-xs text-error pt-2"
												>
													{$errors.guest_names[index]}
												</div>
											{/if}
										</div>
										<br />
									{/each}
								</div>
							</div>
						{/if}

						<TextArea
							name="food_allergies"
							label="Do you have any allergies & food restrictions?"
							secondaryLabel="Let us know if you have one!"
							bind:value={$form.food_allergies}
							{...$constraints.food_allergies}
							error={$errors.food_allergies}
						/>
					{/if}

					<TextArea
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
						secondaryLabel="Wishes from?"
						bind:value={$form.from}
						{...$constraints.from}
						error={$errors.from}
						isRequired
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
