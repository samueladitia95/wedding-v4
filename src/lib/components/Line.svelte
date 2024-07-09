<script>
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	// Define a tweened value for the line length
	const lineLength = tweened(0, {
		duration: 500, // Animation duration in milliseconds
		easing: cubicOut, // Easing function for smooth animation
	});
</script>

<div class="line" style="transform: scaleX({$lineLength / 100})"></div>

<style>
	.line {
		height: 100%;
		width: 2px; /* Adjust as needed */
		background-color: black; /* Change color as needed */
		transform-origin: left center;
		transform: scaleX(0); /* Initially scale to 0 */
		transition: transform 0.5s ease; /* CSS transition for transform */
	}
</style>
