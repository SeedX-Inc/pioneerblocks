import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import './style.scss';

registerBlockType(metadata.name, {
    attributes: {
        title: {
            type: 'string',
            default: 'Impact',
        },
        slides: {
            type: 'array',
            default: [
                {
                    videoUrl: '',
                    heroImage: '',
                    title: 'Sample Slide Title',
                    subtitle: 'Sample slide subtitle text.',
                    buttons: [
                        {
                            text: 'Learn More',
                            link: '#',
                        },
                    ],
                },
            ],
        },
    },
    edit: Edit,
    save: Save,
});
