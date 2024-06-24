<script lang="ts">
	export let bgMain: string;
	export let bgSecondary: string;
</script>

<div class="w-screen min-h-screen">
	<!-- Main Screen -->
	<!-- Main bg image -->
	<div class="bg-cover" style="background-image: url({bgMain});">
		<div class="bg-black bg-opacity-20 w-full">
			<div class="container text-white h-screen">
				<div class="text-center pt-28 pb-10 flex flex-col gap-10 h-full">
					<div class="flex flex-col gap-7">
						<div class="font-jakarta text-xs font-light uppercase">TOGETHER WITH OUR PARENTS</div>
						<div class="font-arizona text-sm flex flex-col gap-6">
							<div>Mr. Tanuwangsa & Mrs. Jenny Ho</div>
							<div>Mr. Lie Tjoei Beng & Mrs. Meliana Budiarta</div>
						</div>
					</div>

					<div class="font-safira text-4.5xl font-light flex flex-col gap-4 px-10">
						<div>REYNALDO SAPUTRA</div>
						<div class="text-5xl">&</div>
						<div>CYNTHIA LIE</div>
					</div>

					<div class="font-arizona font-light px-10">
						Cordially invite you to the wedding of their children
					</div>

					<div class="flex items-center justify-center flex-grow">
						<div class="border-l border-solid w-0 h-full" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Secondary Screen -->
	<!-- Secondary bg image -->
	<div class="h-screen bg-cover bg-center" style="background-image: url({bgSecondary});">
		<div class="container text-white text-center pt-24 flex flex-col gap-6">
			<div class="font-safira leading-relaxed font-light px-16">
				I HAVE FOUND THE ONE WHOM MY SOUL LOVES
			</div>
			<div class="font-rome italic text-xs">Song of Solomon 3:4</div>
		</div>
	</div>
</div>
