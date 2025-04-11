import { useState } from '@wordpress/element';
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, blocks } = attributes;

	// Handle adding a new block
	const addBlock = () => {
		setAttributes({
			blocks: [
				...blocks,
				{
					blockTitle: '',
					blockDescription: '',
					blockImage: '',
				},
			],
		});
	};

	// Handle removing a block
	const removeBlock = (index) => {
		const updatedBlocks = blocks.filter((_, i) => i !== index);
		setAttributes({ blocks: updatedBlocks });
	};

	// Handle updating block content
	const updateBlock = (index, field, value) => {
		const updatedBlocks = [...blocks];
		updatedBlocks[index][field] = value;
		setAttributes({ blocks: updatedBlocks });
	};

	return (
		<div {...useBlockProps({ className: 'signature-events' })}>
			<PanelBody title={__('Signature Events Settings', 'signature-events')}>
				<RichText
					tagName="h2"
					label={__('Block Title', 'signature-events')}
					value={title}
					onChange={(newTitle) => setAttributes({ title: newTitle })}
					placeholder={__('Enter block title...')}
				/>

				{/* Button to add a new signature block */}
				<Button isPrimary onClick={addBlock}>
					{__('Add Signature Event', 'signature-events')}
				</Button>

				{/* Display each event block with its fields */}
				{blocks.map((block, index) => (
					<div key={index} className="signature-event-block">
						{/* Rich Text Title */}
						<RichText
							tagName="h3"
							label={__('Event Title', 'signature-events')}
							value={block.blockTitle}
							onChange={(value) => updateBlock(index, 'blockTitle', value)}
							placeholder={__('Event title...')}
						/>

						{/* Rich Text Description */}
						<RichText
							tagName="p"
							label={__('Event Description', 'signature-events')}
							value={block.blockDescription}
							onChange={(value) => updateBlock(index, 'blockDescription', value)}
							placeholder={__('Event description...')}
						/>

						{/* Image Upload */}
						<MediaUpload
							onSelect={(media) => updateBlock(index, 'blockImage', media.url)}
							type="image"
							value={block.blockImage}
							render={({ open }) => (
								<Button onClick={open} isSecondary>
									{!block.blockImage ? __('Upload Image', 'signature-events') : __('Change Image', 'signature-events')}
								</Button>
							)}
						/>

						{/* Remove button */}
						<Button isDestructive onClick={() => removeBlock(index)}>
							{__('Remove Event', 'signature-events')}
						</Button>
					</div>
				))}
			</PanelBody>
		</div>
	);
}
