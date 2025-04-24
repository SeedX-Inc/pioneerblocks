import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	MediaUpload,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button
} from '@wordpress/components';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		content,
		imageUrl,
		embededContent
	} = attributes;

	const onChange = (field) => (value) => setAttributes({ [field]: value });

	return (
		<div {...useBlockProps({ className: 'content-image-social-block' })}>

			<div className="block-layout">
				<div className="block-content col-6">
					<RichText
						tagName="h2"
						placeholder={__('Enter title', 'block-domain')}
						value={title}
						onChange={onChange('title')}
					/>
					<RichText
						tagName="div"
						multiline="p"
						placeholder={__('Enter content...', 'block-domain')}
						value={content}
						onChange={onChange('content')}
					/>
					<TextControl
						label={__('Enter embeded content', 'event-list')}
						value={embededContent || ''}
						onChange={onChange('embededContent')}
					/>
				</div>
				<div className="block-image col-6">
					{imageUrl && <img src={imageUrl} alt="" />}
					<MediaUpload
						onSelect={(media) => setAttributes({ imageUrl: media.url })}
						allowedTypes={['image']}
						render={({ open }) => (
							<Button onClick={open} isSecondary>
								{imageUrl ? __('Change Image', 'block-domain') : __('Upload Image', 'block-domain')}
							</Button>
						)}
					/>
				</div>
			</div>
		</div>
	);
}
