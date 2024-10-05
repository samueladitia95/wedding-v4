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
		class="w-screen lg:!w-full min-h-screen bg-green-sage content-center lg:content-normal"
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
					<div class="font-safira font-light text-5xl/normal">WRITE YOUR WISHES</div>
				</div>

				<form class="flex flex-col gap-6" use:enhance method="POST" action="/">
					<Input
						name="wishes"
						label="Wishes"
						secondaryLabel="Write your wishes"
						bind:value={$form.wishes}
						error={$errors.wishes}
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
						Submit
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
			<h1 class="font-safira text-4.5xl px-5 uppercase">Thank You For Your Wishes!</h1>
		</div>
	</div>
{/if}
