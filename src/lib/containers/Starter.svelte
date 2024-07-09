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

	let isShow: boolean = false;
	let isShowScrollDown: boolean = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};

	onMount(() => {
		document.body.scrollIntoView(true);
		document.body.classList.add("overflow-hidden");

		setTimeout(() => {
			// IE9, Chrome, Safari, Opera
			document.body.addEventListener("mousewheel", MouseWheelHandler, false);
			// Firefox
			document.body.addEventListener("DOMMouseScroll", MouseWheelHandler, false);

			document.body.addEventListener("touchmove", MouseWheelHandler, false);
		}, 3000);

		function MouseWheelHandler() {
			setTimeout(() => {
				document.body.classList.remove("overflow-hidden");
			}, 2000);
			document.body.removeEventListener("mousewheel", MouseWheelHandler, false);
			document.body.removeEventListener("DOMMouseScroll", MouseWheelHandler, false);
			document.body.removeEventListener("touchmove", MouseWheelHandler, false);
			isShowScrollDown = true;
			isShow = false;
		}
	});
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
					class="absolute w-full h-screen object-so hidden lg:!block"
				/>
			</div>
			<div
				class="absolute w-full z-10 top-1/4 lg:top-1/2 lg:transform lg:-translate-y-1/2 flex justify-center"
				in:fade={{ duration: 1500, delay: 1500 }}
				out:fade={{ duration: 500, delay: 0 }}
			>
				<img src={mainLogo} alt="main logo" class="text-white w-40" />
			</div>
		</div>
	{/if}

	{#if isShow && !isShowScrollDown}
		<div
			class="absolute w-full z-10 bottom-40 flex justify-center"
			transition:fly={{ y: 100, duration: 300, delay: 3000 }}
		>
			<div
				class="text-white font-safira text-xs font-light py-2 border-b border-solid border-white"
			>
				SCROLL DOWN
			</div>
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
					class="absolute w-full h-screen object-cover md:hidden"
				/>
				<img
					src={bgMainTablet}
					alt="main"
					class="absolute w-full h-screen object-cover hidden md:!block lg:hidden"
				/>
				<img
					src={bgMainDesktop}
					alt="main"
					class="absolute w-full h-screen object-cover hidden lg:!block"
				/>
				<div class="container text-white h-screen relative z-10">
					<div class="text-center pt-28 md:pt-40 pb-10 lg:pb-0 flex flex-col gap-10 h-full">
						<div class="flex flex-col gap-7">
							<div class="font-jakarta text-xs font-light uppercase">TOGETHER WITH OUR PARENTS</div>
							<div class="font-arizona text-sm flex flex-col gap-6">
								<div>Mr. Tanuwangsa & Mrs. Jenny Ho</div>
								<div>Mr. Lie Tjoei Beng & Mrs. Meliana Budiarta</div>
							</div>
						</div>

						<div
							class="font-safira text-4.5xl/relaxed md:text-5xl/relaxed font-light flex flex-col gap-4 px-10 md:px-40 lg:grid lg:grid-cols-3 lg:items-center"
						>
							<div>REYNALDO SAPUTRA</div>
							<div class="text-5xl md:text-6xl">&</div>
							<div>CYNTHIA LIE</div>
						</div>

						<div class="font-arizona font-light px-10 md:px-56 md:leading-relaxed">
							Cordially invite you to the wedding of their children
						</div>

						<div class="flex items-center justify-center flex-grow">
							<div class="border-l border-solid w-0 h-full" />
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Secondary Screen -->
	<!-- Secondary bg image -->
	{#if isShowScrollDown && !isShow}
		<div class="h-screen" in:fade={{ duration: 1500, delay: 500 }}>
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
				class="absolute w-full h-screen object-cover hidden lg:!block"
			/>
			<div
				class="container text-white text-center pt-24 md:pt-36 flex flex-col gap-6 relative z-10"
			>
				<div class="font-safira leading-relaxed md:text-2xl/relaxed font-light px-16 md:px-48">
					I HAVE FOUND THE ONE WHOM MY SOUL LOVES
				</div>
				<div class="font-rome italic text-xs md:text-base">Song of Solomon 3:4</div>
			</div>
		</div>
	{/if}
</div>
