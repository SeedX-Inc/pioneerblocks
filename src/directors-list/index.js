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
		isImages: {
			type: 'boolean',
			default: false,
		},
		isIcons: {
			type: 'boolean',
			default: false,
		},
		selectedStaff: {
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
	// save,
});
