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

<div class="flex flex-col w-full font-jakarta">
	<!-- Label -->
	<label class="text-sm text-placeholder-text" for={name}>
		{label}
		{#if isRequired}
			<span class="text-error">*</span>
		{/if}
	</label>

	<!-- Textarea Box -->
	<div class="relative mt-3">
		<textarea
			placeholder={secondaryLabel ? secondaryLabel : label}
			class="h-28 w-full border border-input-border bg-white rounded-md px-4 py-2 text-black outline-none transition-all focus:border-placeholder-text disabled:bg-gray-200 resize-none"
			bind:value
			required
			autocomplete="off"
			{name}
			{disabled}
			id={name}
		></textarea>

		{#if error && error.length}
			<div transition:fly={{ y: -20, duration: 300 }} class="text-xs text-error pt-2">
				{error[0]}
			</div>
		{/if}
	</div>
</div>
