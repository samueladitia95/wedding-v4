<script lang="ts">
	import type { Dayjs } from "dayjs";
	import dayjs from "dayjs";
	import duration from "dayjs/plugin/duration";
	import { onMount } from "svelte";
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	dayjs.extend(duration);

	export let weddingDay: Dayjs;
	export let galleryImages: string[];

	let isShow: boolean = false;
	let countdowns = [
		{ type: "Month", value: 0 },
		{ type: "Day", value: 0 },
		{ type: "Minute", value: 0 },
		{ type: "Second", value: 0 },
	];

	onMount(() => {
		setInterval(function () {
			const currentTime = dayjs();
			const duration = dayjs.duration(weddingDay.diff(currentTime));

			countdowns = [
				{ type: "Month", value: duration.months() },
				{ type: "Day", value: Math.floor(duration.days()) },
				{ type: "Minute", value: duration.minutes() },
				{ type: "Second", value: duration.seconds() },
			];
		}, 1000);
	});

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div class="w-screen min-h-screen">
	<div class="container py-28 text-text-primary text-center flex flex-col gap-12 md:gap-16">
		<div class="font-safira uppercase text-4.5xl/tight md:text-5xl font-light mx-10">
			Save The Date
		</div>
		<div class="font-jakarta font-light uppercase text-center flex flex-col gap-4 md:hidden">
			<div>{weddingDay.format("dddd")}</div>
			<div>{weddingDay.format("MMMM D YYYY")}</div>
		</div>

		<div class="font-jakarta text-2xl font-light uppercase text-center hidden md:block md:-mt-12">
			<div>{weddingDay.format("dddd, MMMM D YYYY")}</div>
		</div>

		<div class="grid grid-cols-2 lg:grid-cols-4 gap-12">
			{#each countdowns as countdown}
				<div class="flex flex-col justify-center items-center gap-4">
					<div class=" text-3xl md:text-6xl font-arizona font-light">{countdown.value}</div>
					<div class="text-sm md:text-2xl font-jakarta font-light">{countdown.type}(S)</div>
				</div>
			{/each}
		</div>
		<div>
			<button
				class="px-6 md:px-9 py-2.5 md:py-4 bg-bg-primary text-white rounded-full font-jakarta md:text-2xl"
				>Add to Calender</button
			>
		</div>

		<div class="">
			<swiper-container
				space-between="8"
				loop="true"
				free-mode="true"
				speed="5000"
				effect="slide"
				autoplay="true"
			>
				{#each galleryImages as image}
					<swiper-slide>
						<img src={image} alt="invite" class="rounded" />
					</swiper-slide>
				{/each}
			</swiper-container>
		</div>
	</div>
</div>

<style>
	swiper-container swiper-slide {
		height: 300px;
		max-width: 240px;
		line-height: 300px;
		object-fit: cover;
	}
</style>
