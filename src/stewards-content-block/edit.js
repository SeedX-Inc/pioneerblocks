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
		facebookUrl,
		twitterUrl,
		linkedinUrl,
		printUrl,
		emailUrl,
		shareUrl
	} = attributes;

	const onChange = (field) => (value) => setAttributes({ [field]: value });

	return (
		<div {...useBlockProps({ className: 'content-image-social-block' })}>
			<InspectorControls>
				<PanelBody title={__('Social Media Links', 'block-domain')}>
					<TextControl
						label={__('Facebook URL', 'block-domain')}
						value={facebookUrl}
						onChange={onChange('facebookUrl')}
					/>
					<TextControl
						label={__('Print URL', 'block-domain')}
						value={printUrl}
						onChange={onChange('printUrl')}
					/>
					<TextControl
						label={__('Twitter URL', 'block-domain')}
						value={twitterUrl}
						onChange={onChange('twitterUrl')}
					/>
					<TextControl
						label={__('Email URL', 'block-domain')}
						value={emailUrl}
						onChange={onChange('emailUrl')}
					/>
					<TextControl
						label={__('LinkedIn URL', 'block-domain')}
						value={linkedinUrl}
						onChange={onChange('linkedinUrl')}
					/>
					<TextControl
						label={__('Share URL', 'block-domain')}
						value={shareUrl}
						onChange={onChange('shareUrl')}
					/>
				</PanelBody>
			</InspectorControls>

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
