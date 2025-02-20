import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	MediaUpload,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Button } from '@wordpress/components';

const Edit = ( { attributes, setAttributes } ) => {
	const { title, description, imageUrl, imageRight, imageMobile } =
		attributes;
	const blockProps = useBlockProps( {
		className: `image-${ imageRight ? 'right' : 'left' }`,
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'my-plugin' ) }>
					<ToggleControl
						label={ __( 'Image on Right', 'my-plugin' ) }
						checked={ imageRight }
						onChange={ ( newValue ) =>
							setAttributes( { imageRight: newValue } )
						}
					/>
					<ToggleControl
						label={ __( 'Image on Mobile', 'my-plugin' ) }
						checked={ imageMobile }
						onChange={ ( newValue ) =>
							setAttributes( { imageMobile: newValue } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="custom-block-content">
				<MediaUpload
					onSelect={ ( media ) =>
						setAttributes( { imageUrl: media.url } )
					}
					allowedTypes={ [ 'image' ] }
					render={ ( { open } ) => (
						<Button onClick={ open } className="image-button">
							{ imageUrl ? (
								<img
									src={ imageUrl }
									className="image-editor"
									style={ { maxHeight: '200px' } }
									alt=""
								/>
							) : (
								__( 'Select Image', 'my-plugin' )
							) }
						</Button>
					) }
				/>
				<div className="text-content">
					<RichText
						tagName="h2"
						value={ title }
						onChange={ ( newTitle ) =>
							setAttributes( { title: newTitle } )
						}
						placeholder={ __( 'Enter title...', 'my-plugin' ) }
					/>
					<RichText
						tagName="p"
						value={ description }
						onChange={ ( newDescription ) =>
							setAttributes( { description: newDescription } )
						}
						placeholder={ __(
							'Enter description...',
							'my-plugin'
						) }
					/>
				</div>
			</div>
		</div>
	);
};

export default Edit;
