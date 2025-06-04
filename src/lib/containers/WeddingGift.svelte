<script lang="ts">
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	let isShow: boolean = false;
	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="min-h-screen bg-white text-black flex flex-col justify-center"
	use:inview={{
		rootMargin: "-100px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	<div class="container py-28 md:!text-center">
		{#if isShow}
			<div class="flex flex-col gap-6" in:fade={{ duration: 1000, delay: 500 }}>
				<div class="font-safira font-light text-4.5xl">Wedding Gift</div>
				<div class="font-arizona font-light flex justify-center">
					<div class="max-w-lg">
						Your presence at our wedding is the greatest gift of all. However, if you wish to honor
						us with special gifts, we are more than welcome to accept.
					</div>
				</div>
			</div>
		{/if}

		<div class="mt-28 flex flex-col gap-8 xl:!grid xl:!grid-cols-2">
			{#if isShow}
				<div
					class="font-sans py-4 flex flex-col gap-4"
					transition:fly={{ x: -200, duration: 1000 }}
				>
					<div>BCA</div>
					<div class="font-sans text-xl lg:text-2xl">2731 921 760</div>
					<div class="font-sans lg:text-2xl">a.n Laksmana Wirangga</div>
				</div>
			{/if}
			{#if isShow}
				<div
					class="font-sans py-4 flex flex-col gap-4"
					transition:fly={{ x: -200, duration: 1500 }}
				>
					<div>DANAMON</div>
					<div class="font-sans text-xl lg:text-2xl">0036 1571 1201</div>
					<div class="font-sans lg:text-2xl">a.n Anastasya Renata Asmarani Putri</div>
				</div>
			{/if}
		</div>
	</div>
</div>
