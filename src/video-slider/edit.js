import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, ColorPicker, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
	const { title, slides } = attributes;
	const [activeIndex, setActiveIndex] = useState(0);

	// Add a new slide with default position (e.g., 'left')
	const addSlide = () => setAttributes({ slides: [...slides, { title: '', subtitle: '', videoUrl: '', heroImage: '', buttons: [], position: 'left' }] });

	// Remove a slide
	const removeSlide = (index) => setAttributes({ slides: slides.filter((_, i) => i !== index) });

	// Update slide details, including position
	const updateSlide = (index, key, value) => setAttributes({ slides: slides.map((slide, i) => i === index ? { ...slide, [key]: value } : slide) });

	// Add/remove/update buttons (simplified)
	const updateButton = (slideIndex, buttonIndex, key, value) => {
		const updatedSlides = [...slides];
		updatedSlides[slideIndex].buttons[buttonIndex] = { ...updatedSlides[slideIndex].buttons[buttonIndex], [key]: value };
		setAttributes({ slides: updatedSlides });
	};
	const addButton = (index) => updateSlide(index, 'buttons', [...slides[index].buttons, { text: '', link: '', color: '#000000', textColor: '#FFFFFF' }]);
	const removeButton = (slideIndex, buttonIndex) => updateSlide(slideIndex, 'buttons', slides[slideIndex].buttons.filter((_, i) => i !== buttonIndex));

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Block Settings" initialOpen>
					<TextControl label="Title" value={title} onChange={(value) => setAttributes({ title: value })} />
				</PanelBody>
				{slides.map((slide, index) => (
					<PanelBody title={`Slide ${index + 1}`} initialOpen={false} key={index}>
						<TextControl label="Title" value={slide.title} onChange={(value) => updateSlide(index, 'title', value)} />
						<TextControl label="Subtitle" value={slide.subtitle} onChange={(value) => updateSlide(index, 'subtitle', value)} />
						<MediaUpload onSelect={(media) => updateSlide(index, 'heroImage', media.url)} type="image" render={({ open }) => <Button onClick={open} variant="secondary">Select Image</Button>} />
						<MediaUpload onSelect={(media) => updateSlide(index, 'videoUrl', media.url)} type="video" render={({ open }) => <Button onClick={open} variant="secondary">Select Video</Button>} />
						<SelectControl label="Media Position" value={slide.position} options={[{ label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }]} onChange={(value) => updateSlide(index, 'position', value)} />
						<h4>Buttons</h4>
						{slide.buttons.map((button, buttonIndex) => (
							<div key={buttonIndex}>
								<TextControl label="Text" value={button.text} onChange={(value) => updateButton(index, buttonIndex, 'text', value)} />
								<TextControl label="Link" value={button.link} onChange={(value) => updateButton(index, buttonIndex, 'link', value)} />
								<ColorPicker label="Background Color" color={button.color} onChangeComplete={(value) => updateButton(index, buttonIndex, 'color', value.hex)} />
								<ColorPicker label="Text Color" color={button.textColor} onChangeComplete={(value) => updateButton(index, buttonIndex, 'textColor', value.hex)} />
								<Button onClick={() => removeButton(index, buttonIndex)} variant="secondary" isDestructive>Remove</Button>
							</div>
						))}
						<Button onClick={() => addButton(index)} variant="primary">Add Button</Button>
						<Button onClick={() => removeSlide(index)} variant="secondary" isDestructive>Remove Slide</Button>
					</PanelBody>
				))}
				<Button onClick={addSlide} variant="primary">Add Slide</Button>
			</InspectorControls>
			<h2>{title}</h2>
			<div className="container">
				<div className={`row ${slides[activeIndex].position === 'right' ? 'flex-row-reverse' : ''}`}>
					<div className="col-6">
						{slides[activeIndex].videoUrl ? <video src={slides[activeIndex].videoUrl} controls /> : <img src={slides[activeIndex].heroImage} alt="Slide" />}
					</div>
					<div className="col-6">
						<RichText tagName="h3" value={slides[activeIndex].title} onChange={(value) => updateSlide(activeIndex, 'title', value)} placeholder="Slide Title" />
						<RichText tagName="p" value={slides[activeIndex].subtitle} onChange={(value) => updateSlide(activeIndex, 'subtitle', value)} placeholder="Slide Subtitle" />
						<div className="buttons">
							{slides[activeIndex].buttons.map((button, i) => (
								<a key={i} href={button.link} className="btn me-2" style={{ backgroundColor: button.color, color: button.textColor }}>{button.text}</a>
							))}
						</div>
						{slides.length > 1 && <Button onClick={() => setActiveIndex((activeIndex + 1) % slides.length)} variant="secondary">Next Slide</Button>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Edit;
