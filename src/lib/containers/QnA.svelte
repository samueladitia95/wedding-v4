<script lang="ts">
	import { inview, type ObserverEventDetails } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	import type { PageData } from "../../../.svelte-kit/types/src/routes/$types";
	import QnACard from "$lib/components/QnACard.svelte";
	import { pb } from "$lib/pocketbase";

	const questions = [
		{
			question: "WHAT COLORS ARE GUESTS ALLOWED TO WEAR?",
			answer:
				"Guests are kindly requested to avoid wearing colors that are too close to white, as this color is reserved for the bride and groom. We encourage soft, colorful palettes that reflect the cheerful atmosphere of the occasion. However, dark-colored attire is also completely acceptable.",
			conditional: "",
			conditional2: "",
		},
		{
			question: "WHAT’S THE DRESS CODE?",
			answer: "Semi-Formal Attire.",
			conditional: "Please note that it will be during summer so dress accordingly.",
		},
		{
			question: "ARE KIDS ALLOWED?",
			answer:
				"While we adore your little ones, this wedding is adults-only celebration. Thank you for understanding!",
		},
		{
			question: "ARE PLUS-ONES ALLOWED?",
			answer:
				"Due to limited space, we kindly ask that only the guests and plus ones specifically listed on the invitation to attend. Thank you for understanding.",
		},
		{
			question: "WILL THE CEREMONY/RECEPTION BE INDOORS OR OUTDOORS?",
			answer: "Ceremony and reception will take place indoors.",
		},
		{
			question: "WHEN SHOULD I RSVP?",
			answer: "Kindly RSVP no later than 30th June 2025",
		},
		{
			question: "CAN WE TAKE PICTURES DURING THE HOLY MATRIMONY?",
			answer:
				"Please be mindful during the ceremony. We would love it to be an unplugged ceremony so guests can truly immerse themselves & be present. After the ceremony please feel free to take pictures.",
		},
	];

	export let data: PageData;

	let isShow: boolean = false;
	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="wrapper bg-mj-black relative flex !flex-col bg-black text-white justify-start"
	use:inview={{
		rootMargin: "-100px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	<div class="relative min-h-48 min-w-full flex justify-center 2xl:min-w-2 2xl:self-center">
		<!-- <img
			class="object-cover md:hidden lg:hidden"
			src={pb.files.getUrl(data.main, data.main.qna_mobile)}
			alt="1"
		/>
		<img
			class="object-cover hidden sm:hidden md:block lg:hidden"
			src={pb.files.getUrl(data.main, data.main.qna_tablet)}
			alt="2"
		/>
		<img
			class="object-cover hidden lg:block lg:w-full lg:max-h-[570px]"
			src={pb.files.getUrl(data.main, data.main.qna_desktop)}
			alt="3"
		/> -->
		{#if isShow}
			<p
				class="absolute
				bottom-0
				left-0
				max-w-48
				text-3xl
				md:text-4xl
				lg:text-5xl
				md:text-nowrap
				px-6
				pb-4
				md:pl-8
				md:pb-8
				lg:pl-12
				lg:pb-12
				2xl:left-48
				font-safira
				tracking-widest"
				in:fade={{ duration: 2000 }}
			>
				QUESTIONS AND ANSWERS
			</p>
		{/if}
	</div>
	<div
		class="flex flex-col gap-14 max-w-[1600px] 2xl:self-center 2xl:w-full px-6 md:px-8 lg:px-16 py-14 font-jakarta"
	>
		{#each questions as item, index}
			{#if isShow}
				<div transition:fly={{ x: 200, duration: 1000, delay: 1000 + 200 * (index + 1) }}>
					<QnACard
						question={item.question}
						answer={item.answer}
						conditional={item.conditional}
						conditional2={item.conditional2}
						{index}
						isLast={index === questions.length - 1}
					/>
				</div>
			{/if}
		{/each}
	</div>
</div>
