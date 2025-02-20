import {
	useBlockProps,
	RichText,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

const Edit = ( { attributes, setAttributes } ) => {
	const { slides = [] } = attributes; // Ensure slides is always an array
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	const updateSlide = ( index, key, value ) => {
		const updatedSlides = slides.map( ( slide, i ) =>
			i === index ? { ...slide, [ key ]: value } : slide
		);
		setAttributes( { slides: updatedSlides } );
	};

	const updateButton = ( slideIndex, btnIndex, key, value ) => {
		const updatedSlides = slides.map( ( slide, i ) => {
			if ( i === slideIndex ) {
				const updatedButtons = [ ...( slide.buttons || [] ) ];
				updatedButtons[ btnIndex ] = {
					...updatedButtons[ btnIndex ],
					[ key ]: value,
				};
				return { ...slide, buttons: updatedButtons };
			}
			return slide;
		} );
		setAttributes( { slides: updatedSlides } );
	};

	const addSlide = () => {
		setAttributes( {
			slides: [
				...slides,
				{
					title: '',
					subtitle: '',
					gradient: '',
					heroImage: '',
					buttons: [],
				},
			],
		} );
	};

	const removeSlide = ( index ) => {
		const updatedSlides = slides.filter( ( _, i ) => i !== index );
		setAttributes( { slides: updatedSlides } );
	};

	const addButton = ( index ) => {
		const updatedSlides = slides.map( ( slide, i ) => {
			if ( i === index ) {
				return {
					...slide,
					buttons: [
						...( slide.buttons || [] ),
						{ text: '', link: '' },
					],
				};
			}
			return slide;
		} );
		setAttributes( { slides: updatedSlides } );
	};

	const removeButton = ( slideIndex, btnIndex ) => {
		const updatedSlides = slides.map( ( slide, i ) => {
			if ( i === slideIndex ) {
				const updatedButtons = slide.buttons.filter(
					( _, j ) => j !== btnIndex
				);
				return { ...slide, buttons: updatedButtons };
			}
			return slide;
		} );
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
			{ /* Panel Settings */ }
			<InspectorControls>
				<PanelBody title="Slides Settings" initialOpen={ true }>
					{ slides.map( ( slide, index ) => (
						<Fragment key={ index }>
							<PanelBody
								title={ `Slide ${ index + 1 }` }
								initialOpen={ false }
							>
								<TextControl
									label="Title"
									value={ slide.title }
									onChange={ ( value ) =>
										updateSlide( index, 'title', value )
									}
								/>
								<TextControl
									label="Subtitle"
									value={ slide.subtitle }
									onChange={ ( value ) =>
										updateSlide( index, 'subtitle', value )
									}
								/>
								<PanelColorSettings
									title="Background Gradient"
									colorSettings={ [
										{
											value: slide.gradient,
											onChange: ( value ) =>
												updateSlide(
													index,
													'gradient',
													value
												),
											label: 'Gradient Color',
										},
									] }
								/>
								<MediaUpload
									onSelect={ ( media ) =>
										updateSlide(
											index,
											'heroImage',
											media.url
										)
									}
									allowedTypes={ [ 'image' ] }
									render={ ( { open } ) => (
										<Button
											onClick={ open }
											variant="secondary"
										>
											Choose Image
										</Button>
									) }
								/>
								<div style={ { marginTop: '10px' } }>
									<strong>Buttons:</strong>
									{ slide.buttons &&
										slide.buttons.map(
											( button, btnIndex ) => (
												<Fragment key={ btnIndex }>
													<TextControl
														label={ `Button ${
															btnIndex + 1
														} Text` }
														value={ button.text }
														onChange={ ( value ) =>
															updateButton(
																index,
																btnIndex,
																'text',
																value
															)
														}
													/>
													<TextControl
														label={ `Button ${
															btnIndex + 1
														} Link` }
														value={ button.link }
														onChange={ ( value ) =>
															updateButton(
																index,
																btnIndex,
																'link',
																value
															)
														}
													/>
													<Button
														variant="destructive"
														onClick={ () =>
															removeButton(
																index,
																btnIndex
															)
														}
													>
														Remove Button
													</Button>
												</Fragment>
											)
										) }
									<Button
										variant="secondary"
										onClick={ () => addButton( index ) }
										style={ { marginTop: '10px' } }
									>
										Add Button
									</Button>
								</div>
								<Button
									variant="destructive"
									onClick={ () => removeSlide( index ) }
									style={ { marginTop: '10px' } }
								>
									Remove Slide
								</Button>
							</PanelBody>
						</Fragment>
					) ) }
					<Button
						variant="primary"
						onClick={ addSlide }
						style={ { marginTop: '10px' } }
					>
						Add Slide
					</Button>
				</PanelBody>
			</InspectorControls>

			{ /* Slider UI */ }
			<div className="slider-wrapper">
				<button className="nav-button prev" onClick={ prevSlide }>
					<div className="arrows prevArrow"></div>
				</button>

				<div className="slides-container">
					{ slides.map( ( slide, index ) => (
						<div
							key={ index }
							className={ `slide ${
								index === activeIndex ? 'active' : ''
							}` }
							style={ {
								background: `linear-gradient(to right, white, ${ slide.gradient })`,
							} }
						>
							<div className="row">
								<div className="col-md-6 d-flex flex-column justify-content-center text-start align-items-start">
									<RichText
										tagName="h2"
										value={ slide.title }
										onChange={ ( value ) =>
											updateSlide( index, 'title', value )
										}
										placeholder="Enter title..."
									/>
									<RichText
										tagName="p"
										value={ slide.subtitle }
										onChange={ ( value ) =>
											updateSlide(
												index,
												'subtitle',
												value
											)
										}
										placeholder="Enter subtitle..."
									/>
									<div className="buttons-wrapper">
										{ slide.buttons.map(
											( button, btnIndex ) => (
												<a
													key={ btnIndex }
													href={ button.link }
													target="_blank"
													rel="noopener noreferrer"
												>
													<Button className="button-slider">
														{ button.text }
													</Button>
												</a>
											)
										) }
									</div>
								</div>
								<div className="col-md-6 align-items-center">
									{ slide.heroImage && (
										<img
											src={ slide.heroImage }
											alt="Hero"
											className="hero-image"
										/>
									) }
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
