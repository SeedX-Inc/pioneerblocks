import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
    const { title, slides } = attributes;
    const [activeIndex, setActiveIndex] = useState(0);

    // Add a new slide
    const addSlide = () => {
        setAttributes({
            slides: [
                ...slides,
                { title: '', subtitle: '', videoUrl: '', heroImage: '', video: '', buttons: [] }
            ],
        });
    };

    // Remove a slide
    const removeSlide = (index) => {
        const updatedSlides = slides.filter((_, i) => i !== index);
        setAttributes({ slides: updatedSlides });
    };

    // Update slide details
    const updateSlide = (index, key, value) => {
        const updatedSlides = slides.map((slide, i) =>
            i === index ? { ...slide, [key]: value } : slide
        );
        setAttributes({ slides: updatedSlides });
    };

    // Add a new button for a slide
    const addButton = (index) => {
        const updatedSlides = [...slides];
        updatedSlides[index].buttons.push({ text: '', link: '' });
        setAttributes({ slides: updatedSlides });
    };

    // Remove a button from a slide
    const removeButton = (slideIndex, buttonIndex) => {
        const updatedSlides = [...slides];
        updatedSlides[slideIndex].buttons = updatedSlides[slideIndex].buttons.filter((_, i) => i !== buttonIndex);
        setAttributes({ slides: updatedSlides });
    };

    // Update button text and link
    const updateButton = (slideIndex, buttonIndex, key, value) => {
        const updatedSlides = [...slides];
        updatedSlides[slideIndex].buttons[buttonIndex] = {
            ...updatedSlides[slideIndex].buttons[buttonIndex],
            [key]: value,
        };
        setAttributes({ slides: updatedSlides });
    };

    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                <PanelBody title="Block Settings" initialOpen={true}>
                    <TextControl
                        label="Title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <h2>
                <RichText value={title} onChange={(value) => setAttributes({ title: value })} placeholder="Enter title..." />
            </h2>

            {slides.map((slide, index) => (
                <div key={index} className="slide-editor">
                    <TextControl
                        label="Slide Title"
                        value={slide.title}
                        onChange={(value) => updateSlide(index, 'title', value)}
                    />
                    <TextControl
                        label="Subtitle"
                        value={slide.subtitle}
                        onChange={(value) => updateSlide(index, 'subtitle', value)}
                    />
                    <MediaUpload
                        onSelect={(media) => updateSlide(index, 'heroImage', media.url)}
                        type="image"
                        render={({ open }) => (
                            <Button onClick={open} variant="secondary">
                                Select Image
                            </Button>
                        )}
                    />
                    <MediaUpload
                        onSelect={(media) => updateSlide(index, 'videoUrl', media.url)}
                        type="video"
                        render={({ open }) => (
                            <Button onClick={open} variant="secondary">
                                Select Video
                            </Button>
                        )}
                    />
                    
                    {/* Manage Buttons */}
                    <div className="slide-buttons">
                        <h3>Buttons</h3>
                        {slide.buttons.map((button, buttonIndex) => (
                            <div key={buttonIndex} className="button-editor">
                                <TextControl
                                    label="Button Text"
                                    value={button.text}
                                    onChange={(value) => updateButton(index, buttonIndex, 'text', value)}
                                />
                                <TextControl
                                    label="Button Link"
                                    value={button.link}
                                    onChange={(value) => updateButton(index, buttonIndex, 'link', value)}
                                />
                                <Button
                                    onClick={() => removeButton(index, buttonIndex)}
                                    variant="secondary"
                                    isDestructive
                                >
                                    Remove Button
                                </Button>
                            </div>
                        ))}
                        <Button onClick={() => addButton(index)} variant="primary">
                            Add Button
                        </Button>
                    </div>

                    <Button
                        onClick={() => removeSlide(index)}
                        variant="secondary"
                        isDestructive
                    >
                        Remove Slide
                    </Button>
                </div>
            ))}

            <Button onClick={addSlide} variant="primary">
                Add Slide
            </Button>
        </div>
    );
};

export default Edit;
