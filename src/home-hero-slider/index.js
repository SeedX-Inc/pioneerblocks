import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import save from './save';

registerBlockType( metadata.name, {
	attributes: {
		hasBreadcrumbs: {
			type: 'boolean',
			default: false,
		}, 
		hasTitleOnMobile: {
			type: 'boolean',
			default: false,
		}, 
		breadcrumbs: {
			type: 'array',
			default: [],
		},
		slides: {
			type: 'array',
			default: [
				{
					title: 'Innovate, Educate, Elevate',
					subtitle:
						'Pioneer empowers Americans to live freely and thrive.',
					buttons: [
						{ text: 'Education', link: '#' },
						{ text: 'Healthcare', link: '#' },
						{ text: 'Opportunity', link: '#' },
						{ text: 'Citizenship', link: '#' },
					],
					heroImage: '',
					gradient: '#f3f4f6',
				},
			],
		},
	},
	edit: Edit,
	save,
} );
