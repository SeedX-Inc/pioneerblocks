import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	MediaUpload,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Button } from '@wordpress/components';

const Edit = ( { attributes, setAttributes } ) => {
	const { title, description, imageUrl, imageRight, imageMobile } = attributes;
	const blockProps = useBlockProps({
		className: `image-${imageRight ? 'right' : 'left'}`,
	});

	return (
		<div {...blockProps}>
			{/* Inspector Controls for settings */}
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'my-plugin')} initialOpen={true}>
					<ToggleControl
						label={__('Image on Right', 'my-plugin')}
						checked={imageRight}
						onChange={(newValue) => setAttributes({ imageRight: newValue })}
					/>
					<ToggleControl
						label={__('Show Image on Mobile', 'my-plugin')}
						checked={imageMobile}
						onChange={(newValue) => setAttributes({ imageMobile: newValue })}
					/>
				</PanelBody>

				<PanelBody title={__('Image Settings', 'my-plugin')} initialOpen={true}>
					<MediaUpload
						onSelect={(media) => setAttributes({ imageUrl: media.url })}
						allowedTypes={['image']}
						render={({ open }) => (
							<>
								<Button isPrimary onClick={open}>
									{imageUrl ? __('Change Image', 'my-plugin') : __('Select Image', 'my-plugin')}
								</Button>
								{imageUrl && (
									<img
										src={imageUrl}
										alt={__('Selected image', 'my-plugin')}
										style={{ width: '100%', maxHeight: '200px', marginTop: '10px' }}
									/>
								)}
							</>
						)}
					/>
				</PanelBody>
			</InspectorControls>

			{/* Block Content */}
			<div className="custom-block-content">
				<img
					src={imageUrl}
					className="image-editor"
					style={{maxHeight: '200px'}}
					alt=""
				/>
				<div className="text-content">
					<RichText
						tagName="h2"
						value={title}
						onChange={(newTitle) => setAttributes({title: newTitle})}
						placeholder={__('Enter title...', 'my-plugin')}
					/>
					<RichText
						tagName="p"
						value={description}
						onChange={(newDescription) => setAttributes({description: newDescription})}
						placeholder={__('Enter description...', 'my-plugin')}
					/>
				</div>
			</div>
		</div>
	);
};

export default Edit;
