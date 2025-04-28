import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	attributes: {
		title: {
			type: 'string',
			default: '',
		},

		selectedPillar: {
			type: "string",
			default: "all"
		},
	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
