<script lang="ts">
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	export let galleryImages: string[];
	let isShow: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="min-h-screen w-screen"
	use:inview={{
		rootMargin: "-100px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	<div class="grid grid-cols-1 lg:grid-cols-2">
		<div>
			{#if isShow}
				<div in:fade={{ duration: 1000, delay: 500 }}>
					<img src={galleryImages[0]} alt="gallery1" class="w-full" />
				</div>
			{/if}
			<div class="grid grid-cols-2">
				{#if isShow}
					<img
						src={galleryImages[1]}
						alt="gallery1"
						class="w-full"
						transition:fly={{ x: -200, duration: 1000, delay: 1000 }}
					/>
				{/if}

				{#if isShow}
					<img
						src={galleryImages[2]}
						alt="gallery1"
						class="w-full"
						transition:fly={{ x: 200, duration: 1000, delay: 1500 }}
					/>
				{/if}
			</div>
		</div>
		<div>
			{#if isShow}
				<div in:fade={{ duration: 1000, delay: 2500 }}>
					<img src={galleryImages[3]} alt="gallery1" class="w-full" />
				</div>
			{/if}
			<div class="grid grid-cols-2">
				{#if isShow}
					<img
						src={galleryImages[4]}
						alt="gallery1"
						class="w-full"
						transition:fly={{ x: -200, duration: 1000, delay: 3000 }}
					/>
				{/if}

				{#if isShow}
					<img
						src={galleryImages[5]}
						alt="gallery1"
						class="w-full"
						transition:fly={{ x: 200, duration: 1000, delay: 3500 }}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>
