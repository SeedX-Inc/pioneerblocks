// block.js
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';  // Import the Edit component
import Save from './save';  // Import the Save component

registerBlockType('create-block/careers-page', {
	apiVersion: 2,
	title: 'Careers Page',
	icon: 'businessperson',
	category: 'layout',
	attributes: {
		activeMainTab: {
			type: 'string',
			default: 'career-content', // Default to the Career Content tab
		},
		faqTitle: {
			type: 'string',
			default: 'career-content', // Default to the Career Content tab
		},
		icons: {
			type: 'array',
			default: [],
		},
		faqItems: {
			type: 'array',
			default: [],
		},
		careerContentTabs: {
			type: 'object',
			default: {
				tab1: { title: 'Communications Coordinator', content: '' },
				tab2: { title: 'Senior Director of Development', content: '' },
				tab3: { title: 'Senior Fellow', content: '' },
			}
		},
		internshipBlocks: {
			type: 'array',
			default: [],
		}
	},
	edit: Edit,  // Set the Edit component
	save: Save,  // Set the Save component
});
