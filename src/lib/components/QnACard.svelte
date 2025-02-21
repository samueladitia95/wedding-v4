<script lang="ts">
	import arrowDown from "$lib/icons/arrow-down.svg?raw";

	let selected: boolean = false;
	export let question: string;
	export let answer: string;
	export let conditional: string | undefined;
	export let conditional2: string | undefined;
	export let isLast: boolean;
	export let index: number;
</script>

<div
	class={`flex flex-col gap-4 ${isLast ? "" : "border-b"} border-b-white/20 ${selected ? "pb-14" : "pb-2"}`}
>
	<div class="text-xs leading-6 w-full">
		<div class="flex justify-between items-start">
			<div class="flex items-start gap-4 w-full">
				<p class="tracking-widest text-base lg:text-lg">0{index + 1}.</p>
				<button
					class="pb-4 text-base hover:cursor-pointer tracking-[0.2em] lg:text-lg text-left w-full"
					on:click={() => {
						selected = !selected;
					}}
				>
					{question}
				</button>
			</div>
			<button
				class="hover:cursor-pointer"
				on:click={() => {
					selected = !selected;
				}}
			>
				<div class={`${selected ? "rotate-0" : "rotate-180"}`}>{@html arrowDown}</div>
			</button>
		</div>

		{#if selected}
			<div class="tracking-wider text-sm md:text-sm lg:text-base pl-14">
				<p>
					{answer}
				</p>
				{#if conditional}
					<p class="py-6 italic text-sm md:text-sm lg:text-base">
						{conditional}
					</p>
				{/if}
				{#if conditional2}
					<p>{conditional2}</p>
				{/if}
			</div>
		{/if}
	</div>
</div>
