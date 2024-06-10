<script lang="ts">
	import type { LayoutData } from "./$types";
	import Starter from "$lib/containers/Starter.svelte";
	import { pb } from "$lib/pocketbase";

	export let data: LayoutData;
</script>

<div>
	<Starter
		bgMain={pb.files.getUrl(data.response, data.response.starter_main)}
		bgSecondary={pb.files.getUrl(data.response, data.response.starter_secondary)}
	/>
</div>
