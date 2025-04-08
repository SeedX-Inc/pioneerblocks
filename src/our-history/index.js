import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	attributes: {
        title: {
            type: 'string',
            default: ''
        },
        imageSubtitle: {
            type: 'string',
            default: ''
        },
        contentBelowImage: {
			type: 'string',
			default: ''
        },
        contentRightToImage: {
			type: 'string',
			default: ''
        },
        imageUrl: {
            type: 'string',
            default: ''
        }
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
