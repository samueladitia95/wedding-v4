<script lang="ts">
	export let logos: string[];

	const details = [
		{
			logo: logos[0],
			event: "Holy Matrimony",
			time: "10:00 AM",
			location: "Java Ballroom, The Westin Hotel",
		},
		{
			logo: logos[1],
			event: "LUNCH RECEPTION",
			time: "12:00 PM",
			location: "Java Ballroom, The Westin Hotel",
		},
		{
			logo: logos[2],
			event: "Tea pai",
			notes: "(For family only)",
			time: "12:00 PM",
			location: "Java Ballroom, The Westin Hotel",
		},
		{
			logo: logos[3],
			event: "AFTER PARTY",
			time: "22:00 PM",
			location: "Retreat Lounge, The Westin Hotel",
		},
	];
</script>

<div class="w-screen min-h-screen bg-white text-text-primary">
	<div class="container py-16 pb-32 md:max-w-md lg:max-w-6xl">
		<div class="flex flex-col gap-6 md:gap-14 items-center">
			<div
				class="font-safira font-light text-center text-5xl/tight flex justify-center items-center"
			>
				<div class="max-w-64 md:max-w-none">THE DETAILS</div>
			</div>
			<div class="p-6 text-center flex flex-col gap-6 items-center justify-center">
				<div class="font-arizona text-xl md:text-2xl">At The Westin Hotel, Jakarta</div>
				<div class="font-arizona text-sm md:text-base italic">
					Jl. H.R. Rasuna Said No. Kav. C-22A, Karet Kuningan, Kec. Setiabudi, <br /> Kota Jakarta Selatan,
					Jakarta, 12940
				</div>
				<button
					class="px-6 md:px-10 py-2.5 md:py-4 bg-bg-primary rounded-full font-jakarta text-white md:text-2xl"
					>Get Direction</button
				>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-14 items-center lg:items-bottom">
				{#each details as detail}
					<div class="flex flex-col items-center gap-4 text-center">
						<img src={detail.logo} alt="event" class="w-14 md:w-16" />
						<div>
							<div class="font-jakarta uppercase md:text-2xl">{detail.event}</div>
							{#if detail.notes}
								<div class="font-arizona text-xs italic md:text-2xl">{detail.notes}</div>
							{/if}
						</div>
						<div class="font-jakarta uppercase md:text-2xl">{detail.time}</div>
						<div class="font-arizona text-sm md:text-2xl">{detail.location}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
