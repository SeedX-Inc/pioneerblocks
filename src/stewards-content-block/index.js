
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
		content: {
			type: 'string',
			default: '',
		},
		imageUrl: {
			type: 'string',
			default: '',
		},
		facebookUrl: {
			type: 'string',
			default: '',
		},
		twitterUrl: {
			type: 'string',
			default: '',
		},
		linkedinUrl: {
			type: 'string',
			default: '',
		},
		printUrl: {
			type: 'string',
			default: '',
		},
		emailUrl: {
			type: 'string',
			default: '',
		},
		shareUrl: {
			type: 'string',
			default: '',
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
