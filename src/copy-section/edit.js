import { useBlockProps, RichText, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, columnText, backgroundColor, buttons } = attributes;

	// Update button details
	const updateButton = (index, key, value) => {
		const newButtons = [...buttons];
		newButtons[index] = { ...newButtons[index], [key]: value };
		setAttributes({ buttons: newButtons });
	};

	// Add a new button
	const addButton = () => {
		setAttributes({
			buttons: [...buttons, { text: 'New Button', link: '#', color: '#7b7b7b' }],
		});
	};

	// Remove a button
	const removeButton = (index) => {
		const newButtons = buttons.filter((_, i) => i !== index);
		setAttributes({ buttons: newButtons });
	};

	return (
		<div {...useBlockProps({ style: { backgroundColor } })}>
			<InspectorControls>
				<PanelBody title={__('Settings', 'custom-block')}>
					<TextControl
						label={__('Title', 'custom-block')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<PanelColorSettings
						title={__('Background Color', 'custom-block')}
						colorSettings={[
							{
								value: backgroundColor,
								onChange: (color) => setAttributes({ backgroundColor: color }),
								label: __('Background Color', 'custom-block'),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>

			<RichText
				tagName="h2"
				placeholder={__('Enter title...', 'custom-block')}
				value={title}
				onChange={(value) => setAttributes({ title: value })}
			/>

			<RichText
				tagName="p"
				placeholder={__('Enter text...', 'custom-block')}
				value={columnText}
				onChange={(value) => setAttributes({ columnText: value })}
			/>
			<div className="buttons-container">
				{buttons.map((button, index) => (
					<div key={index} className="button-settings">
						<TextControl
							label={__('Button Text', 'custom-block')}
							value={button.text}
							onChange={(value) => updateButton(index, 'text', value)}
						/>
						<TextControl
							label={__('Button Link', 'custom-block')}
							value={button.link}
							onChange={(value) => updateButton(index, 'link', value)}
						/>
						<ColorPalette
							value={button.color}
							onChange={(color) => updateButton(index, 'color', color)}
						/>
						<Button isDestructive onClick={() => removeButton(index)}>
							{__('Remove Button', 'custom-block')}
						</Button>
					</div>
				))}
				<Button variant="secondary" onClick={addButton}>
					{__('Add Button', 'custom-block')}
				</Button>
			</div>
		</div>
	);
}
