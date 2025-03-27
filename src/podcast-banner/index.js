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
		image: {
			type: 'string',
			default: '',
		},
		description: {
			type: 'string',
			default: '',
		},
		linksTitle: {
			type: 'string',
			default: '',
		},
		links: {
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
} );
