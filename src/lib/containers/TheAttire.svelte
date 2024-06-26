<script lang="ts">
	import { inview } from "svelte-inview";
	import { fly } from "svelte/transition";

	let isShow: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="bg-bg-attire h-screen w-screen"
	use:inview={{
		rootMargin: "-100px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	<div class="container h-full w-full flex flex-col justify-center items-center">
		<div class="text-white text-center flex flex-col gap-6 md:gap-16 justify-center items-center">
			{#if isShow}
				<div
					class="font-safira font-light text-5xl lg:text-7xl"
					transition:fly={{ x: -200, duration: 1000, delay: 500 }}
				>
					THE ATTIRE
				</div>
			{/if}
			{#if isShow}
				<div
					class="font-arizona font-light text-base/relaxed md:text-xl/relaxed md:max-w-96"
					transition:fly={{ x: -200, duration: 1000, delay: 1000 }}
				>
					We kindly encourage our guests to wear these colors for our special day
				</div>
			{/if}
			{#if isShow}
				<div
					class="py-6 md:py-0 flex flex-col gap-4"
					transition:fly={{ x: -200, duration: 1000, delay: 1500 }}
				>
					<div class="font-jakarta uppercase md:text-2xl">Holy Matrimony</div>
					<div class="font-arizona font-light md:text-2xl">White Semi Formal Attire</div>
				</div>
			{/if}

			{#if isShow}
				<div
					class="py-6 md:py-0 flex flex-col gap-4"
					transition:fly={{ x: -200, duration: 1000, delay: 2000 }}
				>
					<div class="font-jakarta uppercase md:text-2xl">Reception</div>
					<div class="font-arizona font-light md:text-2xl">Formal Attire and Dark Colors</div>
				</div>
			{/if}
		</div>
	</div>
</div>
