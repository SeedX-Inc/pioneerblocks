import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	attributes: {
		title: {
			type: 'string',
			default: '',
		},
		fact: {
			type: 'string',
			default: '',
		},
		rightTitle: {
			type: 'string',
			default: '',
		},
		rightDescription: {
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
