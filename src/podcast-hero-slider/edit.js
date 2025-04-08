import {
	useBlockProps,
	RichText,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';

const Edit = ( { attributes, setAttributes } ) => {
	const { title, buttonText, buttonLink, heroImage, gradient } = attributes;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title="Block Settings" initialOpen={ true }>
					<TextControl
						label="Button Text"
						value={ buttonText }
						onChange={ ( value ) => setAttributes( { buttonText: value } ) }
					/>
					<TextControl
						label="Button Link"
						value={ buttonLink }
						onChange={ ( value ) => setAttributes( { buttonLink: value } ) }
					/>
					<PanelColorSettings
						title="Background Gradient"
						colorSettings={ [
							{
								value: gradient,
								onChange: ( value ) => setAttributes( { gradient: value } ),
								label: 'Gradient Color',
							},
						] }
					/>
					<MediaUpload
						onSelect={ ( media ) => setAttributes( { heroImage: media.url } ) }
						allowedTypes={ [ 'image' ] }
						render={ ( { open } ) => (
							<Button onClick={ open } variant="secondary">
								{ heroImage ? "Change Image" : "Choose Image" }
							</Button>
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div className="custom-block row" style={{ background: `linear-gradient(to right, white, ${gradient})` }}>
				<div className='col-5'>
					<RichText
						tagName="h2"
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						placeholder="Enter title..."
					/>
					<a href={ buttonLink } className="block-button">
						{ buttonText }
					</a>
				</div>
				{ heroImage && <img src={ heroImage } width="400" alt="Block Image" className="block-image col-6" /> }
			</div>
		</div>
	);
};

export default Edit;
