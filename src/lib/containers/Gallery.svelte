<script lang="ts">
	export let galleryImages: string[];
</script>

<div class="min-h-screen w-screen">
	<div class="grid grid-cols-1 lg:grid-cols-2">
		<div>
			<div>
				<img src={galleryImages[0]} alt="gallery1" class="w-full" />
			</div>
			<div class="grid grid-cols-2">
				<img src={galleryImages[1]} alt="gallery1" class="w-full" />
				<img src={galleryImages[2]} alt="gallery1" class="w-full" />
			</div>
		</div>
		<div>
			<div>
				<img src={galleryImages[3]} alt="gallery1" class="w-full" />
			</div>
			<div class="grid grid-cols-2">
				<img src={galleryImages[4]} alt="gallery1" class="w-full" />
				<img src={galleryImages[5]} alt="gallery1" class="w-full" />
			</div>
		</div>
	</div>
</div>
