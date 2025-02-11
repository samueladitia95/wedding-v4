<script lang="ts">
	import { inview, type ObserverEventDetails } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	import type { PageData } from "../../../.svelte-kit/types/src/routes/$types";
	import QnACard from "$lib/components/QnACard.svelte";
	import { pb } from "$lib/pocketbase";

	const questions = [
		{
			question: "WHAT SHOULD I WEAR?",
			answer:
				"We kindly request that you dress in formal wear for our wedding.  A floor-length gown, sophisticated cocktail dress for ladies.  Men are kindly requested to suit up and leave their t-shirts, jeans, and slippers at home.",
			conditional: "*Please refrain from wearing white, that’s reserved for the bride.",
			conditional2:
				"If you have any questions about the dress code, please don’t hesitate to contact us. ",
		},
		{
			question: "CAN I BRING A +1?",
			answer:
				"Please note that this invitation is valid for one person, unless you have been informed otherwise personally.",
		},
		{
			question: "WILL THE WEDDING BE INDOOR OR OUTDOOR?",
			answer: "Events will be held outdoors, except Tea Pai Ceremony.",
		},
		{
			question: "WILL THE DINNER RECEPTION BE SEATED?",
			answer:
				"Yes! Please RSVP to ensure that you will be attending the dinner reception, so that we can arrange the seating accordingly.",
		},
		{
			question: "SHOULD I BRING A GIFT?",
			answer:
				"We are thrilled to have you celebrate with us, and while gifts are not necessary, we would be grateful if you choose to honor us with cash or angpao.",
		},
		{
			question: "I HAVE MORE QUESTIONS! WHO SHOULD I SPEAK TO?",
			answer:
				"You may reach out to Marco or Jessica directly. We look forward to celebrating with you.",
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
				pl-4
				pb-4
				md:pl-8
				md:pb-8
				lg:pl-12
				lg:pb-12
				2xl:left-48
				font-ivora
				tracking-widest"
				in:fade={{ duration: 2000 }}
			>
				QUESTIONS & ANSWERS
			</p>
		{/if}
	</div>
	<div
		class="flex flex-col gap-14 max-w-[1600px] 2xl:self-center 2xl:w-full px-6 md:px-8 lg:px-16 py-14 font-gordita"
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
