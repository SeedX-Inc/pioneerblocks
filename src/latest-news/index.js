import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';

registerBlockType("create-block/latest-news", {
	title: "Latest News Block",
	category: "seedx_blocks_home",
	icon: "list-view",
	attributes: {
		title: {
			type: 'string',
			default: '',
		},
		featuredPost: {
			type: 'string',
			default: '',
		},
		showBottomBlock: {
			type: 'boolean',
			default: false,
		},
		selectedPillar: {
			type: "string",
			default: "all"
		},
	},
	edit: Edit,
	save: () => {
		return null; // Dynamic block, rendering happens server-side
	},
});
