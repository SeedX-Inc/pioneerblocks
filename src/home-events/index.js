
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
		featuredEvent: {
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
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
