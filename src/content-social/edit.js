import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ColorPicker } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		title = '',
		description = '',
		facebookUrl = '',
		twitterUrl = '',
		linkedinUrl = '',
		mailUrl = '',
		shareUrl = '',
		printUrl = '',
		additionalContent = [],
		showMoreButton = { text: '', url: '', bgColor: '#0073aa', textColor: '#ffffff' },
	} = attributes;

	// Add a new additional content item
	const addAdditionalContent = () => {
		setAttributes({
			additionalContent: [...additionalContent, { title: '', description: '' }],
		});
	};

	// Remove an additional content item
	const removeAdditionalContent = (index) => {
		setAttributes({
			additionalContent: additionalContent.filter((_, i) => i !== index),
		});
	};

	// Update an additional content item
	const updateAdditionalContent = (index, field, value) => {
		const updatedContent = [...additionalContent];
		updatedContent[index] = { ...updatedContent[index], [field]: value };
		setAttributes({ additionalContent: updatedContent });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Block Settings', '')}>
					<TextControl
						label={__('Title', '')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Show More Button', '')}>
					<TextControl
						label={__('Button Text', '')}
						value={showMoreButton.text}
						onChange={(value) =>
							setAttributes({ showMoreButton: { ...showMoreButton, text: value } })
						}
					/>
					<TextControl
						label={__('Button URL', '')}
						value={showMoreButton.url}
						onChange={(value) =>
							setAttributes({ showMoreButton: { ...showMoreButton, url: value } })
						}
					/>
					<ColorPicker
						label={__('Background Color', '')}
						color={showMoreButton.bgColor}
						onChangeComplete={(value) =>
							setAttributes({ showMoreButton: { ...showMoreButton, bgColor: value.hex } })
						}
						defaultValue="#0073aa"
					/>
					<ColorPicker
						label={__('Text Color', '')}
						color={showMoreButton.textColor}
						onChangeComplete={(value) =>
							setAttributes({ showMoreButton: { ...showMoreButton, textColor: value.hex } })
						}
						defaultValue="#ffffff"
					/>
				</PanelBody>
				<PanelBody title={__('Additional Content', '')}>
					{additionalContent.map((item, index) => (
						<div key={index} style={{ marginBottom: '20px' }}>
							<TextControl
								label={__('Additional Title', '')}
								value={item.title}
								onChange={(value) => updateAdditionalContent(index, 'title', value)}
							/>
							<RichText
								tagName="div"
								label={__('Additional Description', '')}
								value={item.description}
								onChange={(value) => updateAdditionalContent(index, 'description', value)}
								placeholder={__('Enter additional description...', '')}
							/>
							<Button
								isDestructive
								onClick={() => removeAdditionalContent(index)}
								style={{ marginTop: '10px' }}
							>
								{__('Remove Content', '')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addAdditionalContent} style={{ marginTop: '10px' }}>
						{__('Add Content', '')}
					</Button>
				</PanelBody>
				<PanelBody title={__('Social Media Links', '')}>
					<TextControl
						label={__('Facebook URL', '')}
						value={facebookUrl}
						onChange={(value) => setAttributes({ facebookUrl: value })}
					/>
					<TextControl
						label={__('Twitter URL', '')}
						value={twitterUrl}
						onChange={(value) => setAttributes({ twitterUrl: value })}
					/>
					<TextControl
						label={__('LinkedIn URL', '')}
						value={linkedinUrl}
						onChange={(value) => setAttributes({ linkedinUrl: value })}
					/>
					<TextControl
						label={__('Mail URL', '')}
						value={mailUrl}
						onChange={(value) => setAttributes({ mailUrl: value })}
					/>
					<TextControl
						label={__('Share URL', '')}
						value={shareUrl}
						onChange={(value) => setAttributes({ shareUrl: value })}
					/>
					<TextControl
						label={__('Print URL', '')}
						value={printUrl}
						onChange={(value) => setAttributes({ printUrl: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="d-flex justify-content-between">
				<h2>{title || __('Enter title...', '')}</h2>
				<div>
					{facebookUrl && (
						<a href={facebookUrl} className="social-link">
							<span className="dashicons dashicons-facebook-alt"></span>
						</a>
					)}
					{twitterUrl && (
						<a href={twitterUrl} className="social-link">
							<span className="dashicons dashicons-twitter"></span>
						</a>
					)}
					{linkedinUrl && (
						<a href={linkedinUrl} className="social-link">
							<span className="dashicons dashicons-linkedin"></span>
						</a>
					)}
					{mailUrl && (
						<a href={mailUrl} className="social-link">
							<span className="dashicons dashicons-email-alt"></span>
						</a>
					)}
					{shareUrl && (
						<a href={shareUrl} className="social-link">
							<span className="dashicons dashicons-share"></span>
						</a>
					)}
					{printUrl && (
						<a href={printUrl} className="social-link">
							<span className="dashicons dashicons-printer"></span>
						</a>
					)}
				</div>
			</div>
			<RichText
				tagName="div"
				value={description}
				onChange={(value) => setAttributes({ description: value })}
				placeholder={__('Enter description...', '')}
			/>
			{showMoreButton.text && (
				<a
					href={showMoreButton.url}
					style={{
						backgroundColor: showMoreButton.bgColor,
						color: showMoreButton.textColor,
						padding: '10px 20px',
						display: 'inline-block',
						textDecoration: 'none',
						borderRadius: '5px',
						marginTop: '10px',
					}}
				>
					{showMoreButton.text}
				</a>
			)}
			{additionalContent.map((item, index) => (
				<div key={index} style={{ marginTop: '20px' }}>
					<h3>{item.title || __('Enter additional title...', '')}</h3>
					<RichText
						tagName="div"
						value={item.description}
						onChange={(value) => updateAdditionalContent(index, 'description', value)}
						placeholder={__('Enter additional description...', '')}
					/>
				</div>
			))}
		</div>
	);
}
