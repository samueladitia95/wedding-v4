<script lang="ts">
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";

	export let logos: string[];

	let isShow: boolean = false;
	const details = [
		{
			logo: logos[0],
			event: "Holy Matrimony",
			time: "10:00 AM",
			notes: "",
			location: "Java Ballroom, The Westin Hotel",
			tnc: "As much as we adore your little ones, we kindly ask that our celebration remain an <strong>adults-only</strong>. We appreciate your understanding and look forward to celebrating with you!",
		},
		// {
		// 	logo: logos[1],
		// 	event: "LUNCH RECEPTION",
		// 	time: "12:00 PM",
		// 	location: "Java Ballroom, The Westin Hotel",
		// },
		// {
		// 	logo: logos[2],
		// 	event: "Tea pai",
		// 	notes: "(For family only)",
		// 	time: "12:00 PM",
		// 	location: "Java Ballroom, The Westin Hotel",
		// },
		// {
		// 	logo: logos[3],
		// 	event: "AFTER PARTY",
		// 	time: "22:00 PM",
		// 	location: "Retreat Lounge, The Westin Hotel",
		// },
	];

	const goggleMapLink = "https://maps.app.goo.gl/EuJEAtTHZeSSd3bF7";

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};
</script>

<div
	class="w-screen min-h-screen bg-white text-text-primary"
	use:inview={{
		rootMargin: "-100px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	<div class="container py-16 pb-32 md:max-w-md lg:max-w-6xl">
		<div class="flex flex-col gap-6 md:gap-14 items-center">
			{#if isShow}
				<div
					class="font-safira font-light text-center text-5xl/tight flex justify-center items-center"
				>
					<div class="max-w-64 md:max-w-none" in:fade={{ duration: 1000, delay: 500 }}>
						THE DETAILS
					</div>
				</div>
			{/if}

			<div class="p-6 text-center flex flex-col gap-6 items-center justify-center">
				{#if isShow}
					<div class="font-jakarta text-base md:text-xl" in:fade={{ duration: 1000, delay: 500 }}>
						AT THE WESTIN HOTEL, JAKARTA
					</div>
					<div
						class="font-arizona text-sm md:text-base italic md:leading-loose md:tracking-wide"
						in:fade={{ duration: 1000, delay: 500 }}
					>
						Jl. H.R. Rasuna Said No. Kav. C-22A, Karet Kuningan, Kec. Setiabudi, <br /> <br /> Kota Jakarta
						Selatan, Jakarta, 12940
					</div>
				{/if}
				{#if isShow}
					<a href={goggleMapLink} target="_blank">
						<button
							class="px-6 py-2.5 bg-bg-primary rounded-full font-jakarta text-white md:text-xl hover:opacity-80"
							transition:fly={{ x: -200, duration: 1000, delay: 1000 }}
						>
							Get Direction
						</button></a
					>
				{/if}
			</div>

			<div class="grid grid-cols-1 gap-20 md:gap-16 items-center lg:items-bottom">
				{#each details as detail, index}
					{#if isShow}
						<div
							class="flex flex-col items-center gap-4 text-center"
							class:col-span-3={details.length === 1}
							transition:fly={{ x: -200, duration: 1000, delay: 1000 + 200 * (index + 1) }}
						>
							<img src={detail.logo} alt="event" class="w-14 max-h-16 md:w-16 md:!max-h-24 mb-4" />
							<div class="gap-4">
								<div class="font-jakarta uppercase text-base md:!text-xl">{detail.event}</div>
								{#if detail.notes}
									<div class="font-arizona text-xs italic md:!text-xl">{detail.notes}</div>
								{/if}
							</div>
							<div class="font-jakarta uppercase md:!text-xl">{detail.time}</div>
							<div class="font-arizona text-sm md:!text-base">{detail.location}</div>
							{#if detail.tnc}
								<div class="font-rome text-sm/tight md:text-base lg:text-lg max-w-80 md:max-w-96">
									<p>{@html detail.tnc}</p>
								</div>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
