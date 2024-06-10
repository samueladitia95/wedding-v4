import { pb } from "$lib/pocketbase";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({}) => {
	const response = await pb.collection("wedding_v4").getFirstListItem('project="default"');

	return {
		response,
	};
};
