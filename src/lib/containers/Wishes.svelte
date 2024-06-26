<script lang="ts">
	import dayjs from "dayjs";
	import { goto } from "$app/navigation";
	import { inview } from "svelte-inview";
	import { fade, fly } from "svelte/transition";
	import type { LayoutData } from "../../routes/$types";
	import { page } from "$app/stores";

	export let data: LayoutData;

	let isShow: boolean = false;
	let n: string = $page.url.searchParams.get("n") || ""; // query search

	// it means when the data change, it will reactive to the ui
	$: wishes = data.wishes?.items;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>): void => {
		if (!isShow && detail.inView) isShow = true;
	};

	// ? Methods
	const handleLoadMore = async () => {
		let newPage = 2;
		if (n && +n) {
			newPage++;
		}
		n = String(newPage);
		const query = {
			n: String(newPage),
		};

		await goto(`?${new URLSearchParams(query).toString()}`, {
			keepFocus: true,
			noScroll: true,
		});
	};
</script>

<div
	class="min-h-screen w-screen lg:!w-full"
	use:inview={{
		rootMargin: "-100px",
		unobserveOnEnter: true,
	}}
	on:inview_change={handleChange}
>
	<div class="bg-white text-text-primary">
		<!-- Main Section -->
		<div class="container py-20 max-w-3xl">
			<!-- Wishes -->
			<div>
				<div class="flex flex-col gap-14 justify-start items-start">
					{#each wishes as wish, index}
						{#if isShow}
							<div
								class="flex flex-col justify-start items-start gap-8"
								transition:fly={{ x: 200, duration: 1000, delay: 200 * (index + 1) }}
							>
								<div class="font-jakarta uppercase">{wish.name}</div>
								<div class="flex flex-col gap-6">
									<div class="font-jakarta font-light font-base/relaxed">{wish.wishes}</div>
									<div class="font-arizona font-light text-sm">
										{dayjs(wish.created).format("dddd, D MMMM YYYY H:mm")}
									</div>
								</div>
							</div>
						{/if}
					{/each}
				</div>
				{#if isShow}
					<button
						class="font-jakarta mt-16 rounded-full border-2 border-solid border-text-primary hover:bg-black hover:bg-opacity-10 disabled:bg-opacity-50 py-2 px-8"
						on:click={() => handleLoadMore()}
						in:fade={{ duration: 1000, delay: 1500 }}
					>
						More
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
