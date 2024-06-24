<script lang="ts">
	import { onMount } from "svelte";
	import type { LayoutData } from "./$types";
	import Starter from "$lib/containers/Starter.svelte";
	import { pb } from "$lib/pocketbase";

	export let data: LayoutData;

	onMount(() => {
		document.body.classList.add("no-scrollbar");
	});
</script>

<div>
	<Starter
		bgMain={pb.files.getUrl(data.response, data.response.starter_main)}
		bgSecondary={pb.files.getUrl(data.response, data.response.starter_secondary)}
	/>
</div>
