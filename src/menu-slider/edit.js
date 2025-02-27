import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Button, TextControl, PanelBody } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
	const { links = [], backgroundColor = '#ffffff' } = attributes;

	const updateLink = (index, key, value) => {
		const newLinks = [...links];
		newLinks[index] = { ...newLinks[index], [key]: value };
		setAttributes({ links: newLinks });
	};

	const addLink = () => {
		setAttributes({
			links: [...links, { text: 'New Link', url: '', color: '#000000' }],
		});
	};

	const removeLink = (index) => {
		const newLinks = links.filter((_, i) => i !== index);
		setAttributes({ links: newLinks });
	};

	return (
		<div {...useBlockProps({ style: { backgroundColor, padding: '10px' } })}>
			<InspectorControls>
					<PanelColorSettings
						title={__('Background Color', 'text-domain')}
						colorSettings={[
							{
								value: backgroundColor,
								onChange: (color) => setAttributes({ backgroundColor: color || '#ffffff' }),
								label: __('Background Color', 'text-domain'),
							},
						]}
					/>

				{links.length > 0 && (
					<PanelBody title={__('Link Colors', 'text-domain')}>
						{links.map((link, index) => (
							<div key={index}>
								<PanelColorSettings
									title={`${__('Link', 'text-domain')} ${index + 1}`}
									colorSettings={[
										{
											value: link.color || '#000000',
											onChange: (color) => updateLink(index, 'color', color || '#000000'),
											label: __('Link Color', 'text-domain'),
										},
									]}
								/>

								<TextControl
									label={__('URL', 'text-domain')}
									value={link.url}
									onChange={(value) => updateLink(index, 'url', value)}
								/>
								<Button isDestructive onClick={() => removeLink(index)}>
									{__('Remove', 'text-domain')}
								</Button>
							</div>
						))}
					</PanelBody>
				)}

				<Button isPrimary onClick={addLink}>
					{__('Add Link', 'text-domain')}
				</Button>
			</InspectorControls>

			<div className="link-list d-flex gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
				{links.map((link, index) => (
					<div
						key={index}
						className="link-item"
						style={{ display: 'flex', gap: '10px', alignItems: 'center', color: link.color || '#000000' }}
					>
						<TextControl
							label={__('Link Text', 'text-domain')}
							value={link.text}
							onChange={(value) => updateLink(index, 'text', value)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Edit;
