import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	attributes: {
		selectedBooks: {	
			type: 'array',
			default: [],
		},
	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
