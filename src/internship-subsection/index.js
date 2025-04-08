// src/internship-subsection/index.js
import { registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks, useBlockProps, MediaUpload } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['core/heading', 'core/list', 'core/paragraph'];

registerBlockType('create-block/internship-subsection', {
	apiVersion: 2,
	title: 'Internship Subsection',
	icon: 'format-image',
	category: 'layout',
	parent: ['create-block/careers-page'],
	attributes: {
		heading: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		imageId: {
			type: 'number',
		},
		imageUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
	},
	edit: ({ attributes, setAttributes }) => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<RichText
					tagName="h2"
					value={attributes.heading}
					onChange={(value) => setAttributes({ heading: value })}
					placeholder="Enter internship heading..."
				/>
				<MediaUpload
					onSelect={(media) => setAttributes({
						imageId: media.id,
						imageUrl: media.url
					})}
					allowedTypes={['image']}
					value={attributes.imageId}
					render={({ open }) => (
						<button onClick={open}>
							{attributes.imageUrl ? (
								<img src={attributes.imageUrl} alt="Internship" />
							) : (
								'Upload Image'
							)}
						</button>
					)}
				/>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={[
						['core/heading', { level: 3 }],
						['core/list', {}],
					]}
					templateLock={false}
				/>
			</div>
		);
	},
	save: ({ attributes }) => {
		return (
			<div {...useBlockProps.save()}>
				<RichText.Content tagName="h2" value={attributes.heading} />
				{attributes.imageUrl && (
					<img src={attributes.imageUrl} alt="Internship" />
				)}
				<InnerBlocks.Content />
			</div>
		);
	},
});
