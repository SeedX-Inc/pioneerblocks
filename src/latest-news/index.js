import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';

registerBlockType("create-block/latest-news", {
	title: "Latest News Block",
	category: "seedx_blocks",
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
		rightSideNews: {
			type: 'array',
			default: [],
		},
		bottomNews: {
			type: 'array',
			default: [],
		},
	},
	edit: Edit,
	save: () => {
		return null; // Dynamic block, rendering happens server-side
	},
});
