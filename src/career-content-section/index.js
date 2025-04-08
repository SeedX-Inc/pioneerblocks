import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';

registerBlockType('create-block/career-content-section', {
	apiVersion: 2,
	title: 'Internship Subsection',
	icon: 'businessperson',
	category: 'layout',
	attributes: {
		titleCareer: {
			type: 'string',
			default: 'career Title',
		},
	},

	edit: ({ attributes, setAttributes }) => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<RichText
					tagName="h2"
					value={attributes.title}
					onChange={(value) => setAttributes({ title: value })}
					placeholder="Enter Internship Title"
				/>
			</div>
		);
	},

	save: ({ attributes }) => {
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<h2>{attributes.title}</h2>
			</div>
		);
	},
});
