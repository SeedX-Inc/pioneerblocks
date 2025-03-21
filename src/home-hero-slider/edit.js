import {
	useBlockProps,
	RichText,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

const Edit = ( { attributes, setAttributes } ) => {
	const { slides = [] } = attributes;
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	const updateSlide = ( index, key, value ) => {
		const updatedSlides = slides.map( ( slide, i ) =>
			i === index ? { ...slide, [ key ]: value } : slide
		);
		setAttributes( { slides: updatedSlides } );
	};

	const updateButton = ( slideIndex, buttonIndex, key, value ) => {
		const updatedSlides = slides.map( ( slide, i ) => {
			if ( i === slideIndex ) {
				const updatedButtons = slide.buttons.map( ( btn, j ) =>
					j === buttonIndex ? { ...btn, [ key ]: value } : btn
				);
				return { ...slide, buttons: updatedButtons };
			}
			return slide;
		} );
		setAttributes( { slides: updatedSlides } );
	};

	const addButton = ( slideIndex ) => {
		const updatedSlides = slides.map( ( slide, i ) =>
			i === slideIndex
				? {
						...slide,
						buttons: [ ...slide.buttons, { text: 'Button', link: '#' } ],
				  }
				: slide
		);
		setAttributes( { slides: updatedSlides } );
	};

	const removeButton = ( slideIndex, buttonIndex ) => {
		const updatedSlides = slides.map( ( slide, i ) =>
			i === slideIndex
				? { ...slide, buttons: slide.buttons.filter( ( _, j ) => j !== buttonIndex ) }
				: slide
		);
		setAttributes( { slides: updatedSlides } );
	};

	const addSlide = () => {
		setAttributes( {
			slides: [
				...slides,
				{
					useImage: false, // Default: use title
					title: '',
					image: '',
					subtitle: '',
					gradient: '',
					buttons: [],
				},
			],
		} );
	};

	const removeSlide = ( index ) => {
		const updatedSlides = slides.filter( ( _, i ) => i !== index );
		setAttributes( { slides: updatedSlides } );
	};

	const nextSlide = () =>
		setActiveIndex( ( prev ) => ( prev + 1 ) % slides.length );
	const prevSlide = () =>
		setActiveIndex(
			( prev ) => ( prev - 1 + slides.length ) % slides.length
		);

	return (
		<div { ...useBlockProps() }>
			{/* Panel Settings */}
			<InspectorControls>
				<PanelBody title="Slides Settings" initialOpen={ true }>
					{ slides.map( ( slide, index ) => (
						<Fragment key={ index }>
							<PanelBody title={ `Slide ${ index + 1 }` } initialOpen={ false }>
								<ToggleControl
									label="Use Image Instead of Title"
									checked={ slide.useImage }
									onChange={ ( value ) => updateSlide( index, 'useImage', value ) }
								/>

								{ slide.useImage ? (
									<MediaUpload
										onSelect={ ( media ) => updateSlide( index, 'image', media.url ) }
										allowedTypes={ [ 'image' ] }
										render={ ( { open } ) => (
											<Button onClick={ open } variant="secondary">
												{ slide.image ? "Change Image" : "Choose Image" }
											</Button>
										) }
									/>
								) : (
									<TextControl
										label="Title"
										value={ slide.title }
										onChange={ ( value ) => updateSlide( index, 'title', value ) }
									/>
								)}

								<TextControl
									label="Subtitle"
									value={ slide.subtitle }
									onChange={ ( value ) => updateSlide( index, 'subtitle', value ) }
								/>

								<PanelColorSettings
									title="Background Gradient"
									colorSettings={ [
										{
											value: slide.gradient,
											onChange: ( value ) => updateSlide( index, 'gradient', value ),
											label: 'Gradient Color',
										},
									] }
								/>
								<MediaUpload
									onSelect={ ( media ) => updateSlide( index, 'heroImage', media.url ) }
									allowedTypes={ [ 'image' ] }
									render={ ( { open } ) => (
										<Button onClick={ open } variant="secondary">
											{ slide.heroImage ? "Change Right-Side Image" : "Choose Right-Side Image" }
										</Button>
									) }
								/>
								{ slide.heroImage && <img src={ slide.heroImage } alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} /> }

								{/* Buttons Section */}
								<PanelBody title="Buttons" initialOpen={ false }>
									{ slide.buttons.map( ( button, btnIndex ) => (
										<div key={ btnIndex } style={ { marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px' } }>
											<TextControl
												label="Button Text"
												value={ button.text }
												onChange={ ( value ) => updateButton( index, btnIndex, 'text', value ) }
											/>
											<TextControl
												label="Button Link"
												value={ button.link }
												onChange={ ( value ) => updateButton( index, btnIndex, 'link', value ) }
											/>
											<Button variant="destructive" onClick={ () => removeButton( index, btnIndex ) }>
												Remove Button
											</Button>
										</div>
									) ) }
									<Button variant="secondary" onClick={ () => addButton( index ) }>
										Add Button
									</Button>
								</PanelBody>

								<Button variant="destructive" onClick={ () => removeSlide( index ) } style={ { marginTop: '10px' } }>
									Remove Slide
								</Button>
							</PanelBody>
						</Fragment>
					) ) }

					<Button variant="primary" onClick={ addSlide } style={ { marginTop: '10px' } }>
						Add Slide
					</Button>
				</PanelBody>
			</InspectorControls>

			{/* Slider UI */}
			<div className="slider-wrapper">
				<button className="nav-button prev" onClick={ prevSlide }>
					<div className="arrows prevArrow"></div>
				</button>

				<div className="slides-container">
					{ slides.map( ( slide, index ) => (
						<div
							key={ index }
							className={ `slide ${ index === activeIndex ? 'active' : '' }` }
							style={ { background: `linear-gradient(to right, white, ${ slide.gradient })` } }
						>
							<div className="row">
								<div className="col-md-6 d-flex flex-column justify-content-center text-start align-items-start">
									{ slide.useImage ? (
										slide.image && <img src={ slide.image } alt="Slide" className="slide-image" />
									) : (
										<RichText
											tagName="h2"
											value={ slide.title }
											onChange={ ( value ) => updateSlide( index, 'title', value ) }
											placeholder="Enter title..."
										/>
									)}
									<RichText
										tagName="p"
										value={ slide.subtitle }
										onChange={ ( value ) => updateSlide( index, 'subtitle', value ) }
										placeholder="Enter subtitle..."
									/>

									{/* Render Buttons */}
									<div className="slide-buttons">
										{ slide.buttons.map( ( button, btnIndex ) => (
											<a key={ btnIndex } href={ button.link } className="slide-button">
												{ button.text }
											</a>
										) ) }
									</div>
								</div>
							</div>
						</div>
					) ) }
				</div>

				<button className="nav-button next" onClick={ nextSlide }>
					<div className="arrows nextArrow"></div>
				</button>
			</div>
		</div>
	);
};

export default Edit;
