import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, ColorPicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, slides } = attributes;
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);

	// Update block title
	const updateTitle = (value) => setAttributes({ title: value });

	// Add a new slide
	const addSlide = () => {
		setAttributes({
			slides: [...slides, { title: '', description: '', tags: [] }],
		});
		setActiveSlideIndex(slides.length);
	};

	// Remove a slide
	const removeSlide = (index) => {
		const updatedSlides = slides.filter((_, i) => i !== index);
		setAttributes({ slides: updatedSlides });
		if (activeSlideIndex >= updatedSlides.length) {
			setActiveSlideIndex(updatedSlides.length - 1);
		}
	};

	// Update slide details
	const updateSlide = (index, key, value) => {
		const updatedSlides = slides.map((slide, i) =>
			i === index ? { ...slide, [key]: value } : slide
		);
		setAttributes({ slides: updatedSlides });
	};

	// Add a new tag to a slide
	const addTag = (slideIndex) => {
		const updatedSlides = [...slides];
		updatedSlides[slideIndex].tags.push({ text: '', backgroundColor: '#e0e0e0' });
		setAttributes({ slides: updatedSlides });
	};

	// Remove a tag from a slide
	const removeTag = (slideIndex, tagIndex) => {
		const updatedSlides = [...slides];
		updatedSlides[slideIndex].tags = updatedSlides[slideIndex].tags.filter((_, i) => i !== tagIndex);
		setAttributes({ slides: updatedSlides });
	};

	// Update tag details
	const updateTag = (slideIndex, tagIndex, key, value) => {
		const updatedSlides = [...slides];
		updatedSlides[slideIndex].tags[tagIndex] = {
			...updatedSlides[slideIndex].tags[tagIndex],
			[key]: value,
		};
		setAttributes({ slides: updatedSlides });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'policy-priorities')} initialOpen>
					<TextControl
						label={__('Title', 'policy-priorities')}
						value={title}
						onChange={updateTitle}
					/>
				</PanelBody>
				{slides.map((slide, index) => (
					<PanelBody title={`Slide ${index + 1}`} initialOpen={false} key={index}>
						<TextControl
							label={__('Slide Title', 'policy-priorities')}
							value={slide.title}
							onChange={(value) => updateSlide(index, 'title', value)}
						/>
						<RichText
							label={__('Description', 'policy-priorities')}
							value={slide.description}
							onChange={(value) => updateSlide(index, 'description', value)}
							tagName="p"
							placeholder={__('Enter description...', 'policy-priorities')}
						/>
						<h4>{__('Tags', 'policy-priorities')}</h4>
						{slide.tags.map((tag, tagIndex) => (
							<div key={tagIndex}>
								<TextControl
									label={__('Tag Text', 'policy-priorities')}
									value={tag.text}
									onChange={(value) => updateTag(index, tagIndex, 'text', value)}
								/>
								<ColorPicker
									label={__('Background Color', 'policy-priorities')}
									color={tag.backgroundColor}
									onChangeComplete={(value) => updateTag(index, tagIndex, 'backgroundColor', value.hex)}
								/>
								<Button
									onClick={() => removeTag(index, tagIndex)}
									variant="secondary"
									isDestructive
								>
									{__('Remove Tag', 'policy-priorities')}
								</Button>
							</div>
						))}
						<Button onClick={() => addTag(index)} variant="primary">
							{__('Add Tag', 'policy-priorities')}
						</Button>
						<Button
							onClick={() => removeSlide(index)}
							variant="secondary"
							isDestructive
						>
							{__('Remove Slide', 'policy-priorities')}
						</Button>
					</PanelBody>
				))}
				<Button onClick={addSlide} variant="primary">
					{__('Add Slide', 'policy-priorities')}
				</Button>
			</InspectorControls>
			<div className="policy-priorities-block">
				<h2>{title}</h2>
				<div className="row">
					<div className="col-4">
						<ul className="policy-list">
							{slides.map((slide, index) => (
								<li
									key={index}
									className={index === activeSlideIndex ? 'active' : ''}
									onClick={() => setActiveSlideIndex(index)}
								>
									{slide.title || `Slide ${index + 1}`}
								</li>
							))}
						</ul>
					</div>
					<div className="col-8">
						{slides.length > 0 && (
							<div className="policy-content">
								<RichText
									tagName="p"
									value={slides[activeSlideIndex].description}
									onChange={(value) => updateSlide(activeSlideIndex, 'description', value)}
									placeholder={__('Enter description...', 'policy-priorities')}
								/>
								<div className="tags">
									{slides[activeSlideIndex].tags.map((tag, index) => (
										<span
											key={index}
											className="tag"
											style={{ backgroundColor: tag.backgroundColor }}
										>
											{tag.text || 'Tag'}
										</span>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
