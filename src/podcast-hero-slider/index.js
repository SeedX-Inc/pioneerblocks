import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import save from './save';

registerBlockType( metadata.name, {
	attributes: {
		title: {
			type: 'string',
			default: 'Innovate, Educate, Elevate',
		},
		button: {
			type: 'object',
			default: { text: 'Learn More', link: '#' },
		},
		heroImage: {
			type: 'string',
			default: '',
		},
		gradient: {
			type: 'string',
			default: '#f3f4f6',
		},
	},
	
	edit: Edit,
	save,
} );
