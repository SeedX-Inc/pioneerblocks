import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
	attributes: {
		title: {
			type: 'string',
			default: '',
		},
		selectedPillar: {
			type: "string",
			default: "all"
		},
		selectedPodcast: {
			type: "string",
			default: "all"
		},
		selectedEpisodes: {
			type: 'array',
			default: [],
		},
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
