<script lang="ts">
	import type { Dayjs } from "dayjs";
	import dayjs from "dayjs";
	import duration from "dayjs/plugin/duration";
	import { onMount } from "svelte";
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	import { Marquee } from "@selemondev/svelte-marquee";
	import "@selemondev/svelte-marquee/dist/style.css";

	dayjs.extend(duration);

	export let weddingDay: Dayjs;
	export let carauselImages: string[];

	let isShow: boolean = false;
	let countdowns = [
		{ type: "Month", value: 0 },
		{ type: "Day", value: 0 },
		{ type: "Minute", value: 0 },
		{ type: "Second", value: 0 },
	];
	const eventCalenderLink =
		"https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MjgzZGNobjc3ZG81bHZkMGZjaHZjYmJ1ZzIgc2FtdWVsYWRpdGlhOTVAbQ&tmsrc=samueladitia95%40gmail.com";

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

<meta name="theme-color" content={isShow ? "#fff" : "#000"} />

<div
	class="w-screen min-h-screen"
	use:inview={{
		rootMargin: "-100px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	<div class="container pt-28 text-text-primary text-center flex flex-col gap-12 md:gap-16">
		{#if isShow}
			<div
				class="font-safira uppercase text-4.5xl/tight md:text-5xl font-light mx-10"
				in:fade={{ duration: 1000, delay: 500 }}
			>
				Save The Date
			</div>
		{/if}
		{#if isShow}
			<div
				class="font-jakarta font-light uppercase text-center flex flex-col gap-4 md:hidden"
				in:fade={{ duration: 1000, delay: 500 }}
			>
				<div>{weddingDay.format("dddd")}</div>
				<div>{weddingDay.format("MMMM D YYYY")}</div>
			</div>

			<div
				class="font-jakarta text-2xl font-light uppercase text-center hidden md:block md:-mt-12"
				in:fade={{ duration: 1000, delay: 500 }}
			>
				<div>{weddingDay.format("dddd, MMMM D YYYY")}</div>
			</div>
		{/if}

		<div class="grid grid-cols-2 lg:grid-cols-4 gap-12">
			{#each countdowns as countdown, index}
				{#if isShow}
					<div
						class="flex flex-col justify-center items-center gap-4"
						transition:fly={{ x: -200, duration: 1000, delay: 1000 + 200 * (index + 1) }}
					>
						<div class=" text-3xl md:text-6xl font-arizona font-light">{countdown.value}</div>
						<div class="text-sm md:text-2xl font-jakarta font-light">{countdown.type}(S)</div>
					</div>
				{/if}
			{/each}
		</div>
		{#if isShow}
			<div>
				<a href={eventCalenderLink} target="_blank">
					<button
						class="px-6 md:px-9 py-2.5 md:py-4 bg-bg-primary text-white rounded-full font-jakarta md:text-2xl hover:opacity-80"
						transition:fly={{ x: -200, duration: 2000, delay: 1500 }}
					>
						Add to Calender
					</button>
				</a>
			</div>
		{/if}
	</div>
	{#if isShow}
		<div in:fade={{ duration: 1000, delay: 1500 }} class="py-28">
			<Marquee fade={true}
				>{#each carauselImages as image}
					<img
						src={image}
						alt="invite"
						class="rounded max-h-[360px] md:max-h-[370px] lg:max-h-[600px] object-contain"
					/>
				{/each}
			</Marquee>
		</div>
	{/if}
</div>
