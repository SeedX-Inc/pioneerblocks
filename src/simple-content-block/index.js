import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './editor.scss';
import './style.scss';
import './style.css';

registerBlockType( 'create-block/simple-content-block', {
	title: __( 'Custom Content Block', 'my-plugin' ),
	category: 'seedx_blocks_about',
	icon: 'text',
	attributes: {
		title: { type: 'string', default: '' },
		description: { type: 'string', default: '' },
		imageUrl: { type: 'string', default: '' },
		imageRight: { type: 'boolean', default: false },
		imageMobile: { type: 'boolean', default: true },
	},
	edit: Edit,
	save: Save,
} );
