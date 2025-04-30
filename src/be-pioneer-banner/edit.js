import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, ColorPicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { backgroundImage, mobileBackgroundImage, title, description, buttons = [] } = attributes;
	const [activeButtonIndex, setActiveButtonIndex] = useState(0);

	// Update block attributes
	const updateAttribute = (key, value) => setAttributes({ [key]: value });

	// Add a new button
	const addButton = () => {
		setAttributes({
			buttons: [...buttons, { text: '', textColor: '#000000', backgroundColor: '#ffffff', link: '' }],
		});
		setActiveButtonIndex(buttons.length);
	};

	// Remove a button
	const removeButton = (index) => {
		const updatedButtons = buttons.filter((_, i) => i !== index);
		setAttributes({ buttons: updatedButtons });
		if (activeButtonIndex >= updatedButtons.length) {
			setActiveButtonIndex(updatedButtons.length - 1);
		}
	};

	// Update button properties
	const updateButton = (index, key, value) => {
		const updatedButtons = [...buttons];
		updatedButtons[index] = { ...updatedButtons[index], [key]: value };
		setAttributes({ buttons: updatedButtons });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'latest-news')} initialOpen>
					<MediaUpload
						onSelect={(media) => updateAttribute('backgroundImage', media.url)}
						type="image"
						value={backgroundImage ? { url: backgroundImage } : null}
						render={({ open }) => (
							<Button onClick={open} variant="secondary">
								{__('Select Background Image', 'latest-news')}
							</Button>
						)}
					/>
					<MediaUpload
						onSelect={(media) => updateAttribute('mobileBackgroundImage', media.url)}
						type="image"
						value={mobileBackgroundImage ? { url: mobileBackgroundImage } : null}
						render={({ open }) => (
							<Button onClick={open} variant="secondary">
								{__('Select Background Image for mobile', 'latest-news')}
							</Button>
						)}
					/>
					<TextControl
						label={__('Title', 'latest-news')}
						value={title}
						onChange={(value) => updateAttribute('title', value)}
					/>
					<RichText
						label={__('Description', 'latest-news')}
						value={description}
						onChange={(value) => updateAttribute('description', value)}
						tagName="p"
						placeholder={__('Enter description...', 'latest-news')}
					/>
					<h4>{__('Buttons', 'latest-news')}</h4>
					{buttons.map((button, index) => (
						<div key={index} style={{ marginBottom: '20px' }}>
							<TextControl
								label={__('Button Text', 'latest-news')}
								value={button.text}
								onChange={(value) => updateButton(index, 'text', value)}
							/>
							<TextControl
								label={__('Button Link', 'latest-news')}
								value={button.link}
								onChange={(value) => updateButton(index, 'link', value)}
								placeholder={__('Enter URL...', 'latest-news')}
							/>
							<ColorPicker
								label={__('Text Color', 'latest-news')}
								color={button.textColor}
								onChangeComplete={(value) => updateButton(index, 'textColor', value.hex)}
							/>
							<ColorPicker
								label={__('Background Color', 'latest-news')}
								color={button.backgroundColor}
								onChangeComplete={(value) => updateButton(index, 'backgroundColor', value.hex)}
							/>
							<Button
								onClick={() => removeButton(index)}
								variant="secondary"
								isDestructive
								style={{ marginTop: '10px' }}
							>
								{__('Remove Button', 'latest-news')}
							</Button>
						</div>
					))}
					<Button onClick={addButton} variant="primary">
						{__('Add Button', 'latest-news')}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div
				className="latest-news-block"
				style={{
					backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className="content-wrapper container text-white">
					<RichText
						tagName="h2"
						value={title}
						onChange={(value) => updateAttribute('title', value)}
						placeholder={__('Enter title...', 'latest-news')}
					/>
					<RichText
						tagName="p"
						value={description}
						onChange={(value) => updateAttribute('description', value)}
						placeholder={__('Enter description...', 'latest-news')}
					/>
					<div className="buttons">
						{buttons.map((button, index) => (
							<a
								key={index}
								href={button.link || '#'}
								className="btn"
								style={{
									color: button.textColor,
									backgroundColor: button.backgroundColor,
									marginRight: '10px',
								}}
							>
								{button.text || __('Button', 'latest-news')}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
