<script lang="ts">
	import { fly } from "svelte/transition";

	export let name: string;
	export let label: string;
	export let secondaryLabel: string | undefined = undefined;
	export let error: string[] | undefined = undefined;
	export let value: string;
	export let disabled: boolean = false;
	export let isRequired: boolean = false;
</script>

<div class="relative h-11 w-full font-jakarta">
	<input
		placeholder={secondaryLabel ? secondaryLabel : label}
		class="peer h-full w-full border-b border-input-border bg-transparent pt-4 pb-1.5 text-placeholder-text outline outline-0 transition-all placeholder-shown:border-input-border focus:text-placeholder-text focus:outline-0 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-placeholder-text"
		bind:value
		required
		autocomplete="off"
		{name}
		{disabled}
	/>
	<div
		class="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-sm leading-tight text-placeholder-text transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-placeholder-text after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-placeholder-text peer-focus:text-sm peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-input-border"
	>
		{label}
		{#if isRequired}
			<span class="text-error">*</span>
		{/if}
	</div>

	{#if error && error.length}
		<div transition:fly={{ y: -20, duration: 300 }} class="text-xs text-error pt-2">
			{error[0]}
		</div>
	{/if}
</div>
