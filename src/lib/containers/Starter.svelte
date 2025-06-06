<script lang="ts">
	import { onMount } from "svelte";
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";
	export let mainLogo: string;
	export let introMobile: string;
	export let introTablet: string;
	export let introDesktop: string;
	export let bgMainMobile: string;
	export let bgMainTablet: string;
	export let bgMainDesktop: string;
	export let bgSecondaryMobile: string;
	export let bgSecondaryTablet: string;
	export let bgSecondaryDesktop: string;
	export let togglePlay: () => void;
	export let isPlaying: boolean;
	export let guestName: string;

	import playButton from "$lib/icons/buttons/Play-enabled.svg";
	import playButtonHovered from "$lib/icons/buttons/Play-hovered.svg";
	import pauseButton from "$lib/icons/buttons/Pause-enable.svg";
	import pauseButtonHovered from "$lib/icons/buttons/Pause-hovered.svg";

	let isShow: boolean = false;
	let isShowScrollDown: boolean = false;
	let isHovered: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};

	onMount(() => {
		document.body.scrollIntoView(true);
		document.body.classList.add("overflow-hidden");
	});

	const handleOpenInvitation = () => {
		togglePlay();
		document.body.classList.remove("overflow-hidden");
		isShowScrollDown = true;
		isShow = false;
	};
</script>

<div
	class="w-screen min-h-screen relative"
	use:inview={{
		rootMargin: "0px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	<!-- Intro Screen -->
	{#if isShow && !isShowScrollDown}
		<div class="w-screen min-h-screen relative">
			<div in:fade={{ duration: 1000, delay: 500 }} out:fade={{ duration: 500, delay: 0 }}>
				<img
					src={introMobile}
					alt="intro mobile"
					class="absolute w-full h-screen object-cover md:hidden"
				/>
				<img
					src={introTablet}
					alt="intro tablet"
					class="absolute w-full h-screen object-cover hidden md:!block lg:hidden"
				/>
				<img
					src={introDesktop}
					alt="intro desktop"
					class="absolute w-full h-screen object-cover object-[center_35%] hidden lg:!block"
				/>
			</div>
			<div
				class="absolute w-full z-10 top-1/2 lg:transform lg:-translate-y-1/2 flex justify-center"
				in:fade={{ duration: 1500, delay: 1500 }}
				out:fade={{ duration: 500, delay: 0 }}
			>
				<img src={mainLogo} alt="main logo" class="text-white w-16" />
			</div>

			<div
				class="
					font-arizona
					text-center
					text-gray-400
					lg:text-white
					sm:text-sm
					md:text-base
					lg:text-2xl
					xl:text-lg
					absolute
					bottom-48
					md:!bottom-56
					transform
					-translate-x-1/2
					left-1/2"
				in:fade={{ duration: 3000, delay: 1500 }}
			>
				<span> Dear </span>,
				<br />{guestName}
				<br /><span class="whitespace-nowrap">We kindly invite you to our wedding</span>
			</div>
		</div>
	{/if}

	{#if isShow && !isShowScrollDown}
		<div
			class="relative w-full z-10 bottom-40 flex justify-center"
			transition:fly={{ y: 100, duration: 300, delay: 3000 }}
		>
			<button
				class="text-white font-jakarta text-sm py-3 px-6 bg-bg-button rounded-full"
				on:click={handleOpenInvitation}
			>
				OPEN INVITATION
			</button>
		</div>
	{/if}

	<!-- Main Screen -->
	<!-- Main bg image -->
	{#if isShowScrollDown && !isShow}
		<div in:fade={{ duration: 1500, delay: 500 }}>
			<div class="bg-black bg-opacity-20 w-full">
				<img
					src={bgMainMobile}
					alt="main"
					class="absolute w-full min-h-screen object-cover md:hidden"
					in:fade={{ duration: 1000, delay: 1000 }}
				/>
				<img
					src={bgMainTablet}
					alt="main"
					class="absolute w-full h-screen object-cover hidden md:!block lg:hidden"
					in:fade={{ duration: 1000, delay: 1000 }}
				/>
				<img
					src={bgMainDesktop}
					alt="main"
					class="absolute w-full h-[120vh] object-cover hidden lg:!block"
					in:fade={{ duration: 1000, delay: 1000 }}
				/>
				<div class="container text-white h-[100vh] relative z-10">
					<div
						class="text-center pt-28 md:!pt-40 lg:!pt-28 pb-10 lg:pb-0 flex flex-col gap-10 h-full"
					>
						<div class="flex flex-col gap-6">
							<div
								class="font-arizona text-sm lg:!text-xl xl:!text-base flex flex-col gap-6"
								in:fade={{ duration: 2250, delay: 3000 }}
							>
								<div>Mr. Purwanto Pudjo Mulyadi (Alm) & Mrs. Tating Herawati</div>
							</div>
							<div
								class="font-jakarta text-xs lg:!text-base font-light uppercase"
								in:fade={{ duration: 2250, delay: 4000 }}
							>
								TOGETHER WITH
							</div>
							<div
								class="font-arizona text-sm lg:!text-xl xl:!text-base flex flex-col gap-6"
								in:fade={{ duration: 2250, delay: 5000 }}
							>
								<div>Mr. Michael Boy Ramond (Alm) & Mrs. Veronica Uun Megawati</div>
							</div>
							<div
								class="font-arizona
							font-light
							text-sm md:!text-base lg:!text-xl xl:!text-base
							px-10 pt-10 lg:pt-28 xl:pt-12 md:leading-relaxed"
								in:fade={{ duration: 2250, delay: 6000 }}
							>
								Request the honour of your presence at the marriage of their children
							</div>
						</div>

						<div
							class="font-safira text-xl
							md:!text-2xl
							tracking-widest
							font-light flex flex-col gap-4 px-10 md:px-40 items-center
							pt-10 lg:pt-28 xl:pt-12
							"
							in:fade={{ duration: 4250, delay: 7000 }}
						>
							<div>LAKSMANA WIRANGGA</div>
							<div class="font-ivora text-2xl md:!text-3xl">&</div>
							<div>ANASTASYA RENATA ASMARANI PUTRI</div>
						</div>

						<div class="flex items-start justify-center flex-grow">
							<div class="border-l border-solid w-0 h-full line xl:!hidden" />
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Secondary Screen -->
	<!-- Secondary bg image -->
	{#if isShowScrollDown && !isShow}
		<div class="h-screen relative" in:fade={{ duration: 1500, delay: 500 }}>
			<img
				src={bgSecondaryMobile}
				alt="secondary"
				class="absolute w-full h-screen object-cover md:hidden"
			/>
			<img
				src={bgSecondaryTablet}
				alt="secondary"
				class="absolute w-full h-screen object-cover hidden md:!block lg:hidden"
			/>
			<img
				src={bgSecondaryDesktop}
				alt="secondary"
				class="absolute w-full h-screen object-cover object-top hidden lg:!block"
			/>
			<div
				class="container absolute inset-x-0 bottom-0 text-white text-center pb-48 xl:pb-24 flex flex-col gap-6 z-10"
			>
				<div
					class="font-safira font-light
					text-base md:!text-2xl/relaxed lg:!text-3xl/relaxed xl:!text-2xl/relaxed
					leading-relaxed
					px-16 md:px-48 tracking-widest uppercase"
				>
					AND IF YOU WERE TO ASK ME <br /> AFTER ALL THAT WE'VE BEEN THROUGH <br />
					STILL BELIEVE IN MAGIC? <br /> YES I DO
				</div>
				<div
					class="font-rome italic text-xs md:!text-base lg:!text-2xl xl:!text-base tracking-wide"
				>
					Magic - Coldplay
				</div>
			</div>
		</div>
	{/if}
</div>

{#if isShowScrollDown && !isShow}
	<div class="z-[1000]" in:fade={{ duration: 2000 }}>
		<div class="fixed left-8 bottom-4 z-[1000] hidden">
			<button
				class="cursor-pointer z-[1000]"
				on:click={togglePlay}
				on:mouseenter={() => (isHovered = true)}
				on:mouseleave={() => (isHovered = false)}
			>
				<img
					src={isPlaying
						? isHovered
							? pauseButtonHovered
							: pauseButton
						: isHovered
							? playButtonHovered
							: playButton}
					alt="Media Button"
				/>
			</button>
		</div>
	</div>
{/if}

<style>
	.line {
		height: 0;
		animation: extend-line 5s ease-in-out forwards;
		animation-delay: 7s;
	}

	@keyframes extend-line {
		from {
			height: 0;
		}
		to {
			height: 100%;
		}
	}
</style>
