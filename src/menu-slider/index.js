import {registerBlockType} from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
	attributes: {
		backgroundColor: {
			type: 'string',
			default: '#ffffff', // Set a default color
		},
		links: {
			type: 'array',
			default: [],
		},
	},
	edit: Edit,

	save,
});
