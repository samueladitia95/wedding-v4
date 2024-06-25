<script lang="ts">
	import { onMount } from "svelte";
	import dayjs from "dayjs";
	import { register } from "swiper/element/bundle";
	import type { LayoutData } from "./$types";
	import { pb } from "$lib/pocketbase";

	import Starter from "$lib/containers/Starter.svelte";
	import SaveTheDate from "$lib/containers/SaveTheDate.svelte";
	import TheAttire from "$lib/containers/TheAttire.svelte";
	import Gallery from "$lib/containers/Gallery.svelte";
	import RSVP from "$lib/containers/RSVP.svelte";
	import Wishes from "$lib/containers/Wishes.svelte";

	register();

	export let data: LayoutData;

	let carauselImages = data.response.carausel_images
		? data.response.carausel_images.map((el: string) => {
				return pb.files.getUrl(data.response, el);
			})
		: [];
	let galleryImages = data.response.gallery_images
		? data.response.gallery_images.map((el: string) => {
				return pb.files.getUrl(data.response, el);
			})
		: [];

	onMount(() => {
		document.body.classList.add("no-scrollbar");
	});
</script>

<div>
	<Starter
		bgMain={pb.files.getUrl(data.response, data.response.starter_main)}
		bgSecondary={pb.files.getUrl(data.response, data.response.starter_secondary)}
	/>
	<SaveTheDate weddingDay={dayjs(data.response.wedding_date)} {carauselImages} />
	<TheAttire />
	<Gallery {galleryImages} />
	<div class="lg:grid lg:grid-cols-2">
		<RSVP {data} />
		<Wishes {data} />
	</div>
</div>
