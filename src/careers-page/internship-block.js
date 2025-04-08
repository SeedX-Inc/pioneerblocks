import { RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ColorPalette, ToggleControl, TextControl } from '@wordpress/components';

const Internship = ({ attributes, setAttributes }) => {
	const { internshipBlocks = [], faqTitle = '', faqItems = [] } = attributes;

	const addInternshipBlock = () => {
		const newBlock = {
			internshipTitle: '',
			internshipDescription: '',
			imageUrl: '',
			contentInsteadOfImage: '',
			backgroundColor: '#FFFFFF',
			isImageOnRight: false,
			useContentInsteadOfImage: false,
			extraContentBelowImage: '',
		};
		setAttributes({ internshipBlocks: [...internshipBlocks, newBlock] });
	};

	const removeInternshipBlock = (index) => {
		const updatedBlocks = internshipBlocks.filter((_, idx) => idx !== index);
		setAttributes({ internshipBlocks: updatedBlocks });
	};

	const toggleImagePosition = (index) => {
		const updatedBlocks = [...internshipBlocks];
		updatedBlocks[index].isImageOnRight = !updatedBlocks[index].isImageOnRight;
		setAttributes({ internshipBlocks: updatedBlocks });
	};

	const handleContentChange = (index, field, value) => {
		const updatedBlocks = [...internshipBlocks];
		updatedBlocks[index][field] = value;
		setAttributes({ internshipBlocks: updatedBlocks });
	};

	const addFaqItem = () => {
		setAttributes({ faqItems: [...faqItems, { question: '', answer: '' }] });
	};

	const removeFaqItem = (index) => {
		const updatedFaqs = faqItems.filter((_, idx) => idx !== index);
		setAttributes({ faqItems: updatedFaqs });
	};

	const updateFaqItem = (index, field, value) => {
		const updatedFaqs = [...faqItems];
		updatedFaqs[index][field] = value;
		setAttributes({ faqItems: updatedFaqs });
	};

	return (
		<div className="internship-content">
			<Button isPrimary onClick={addInternshipBlock}>
				Add Internship Block
			</Button>

			{internshipBlocks.map((block, index) => (
				<div className="internship-block" key={index}>
					<RichText
						tagName="h2"
						value={block.internshipTitle}
						onChange={(value) => handleContentChange(index, 'internshipTitle', value)}
						placeholder="Enter Internship title..."
					/>

					<Button isSecondary onClick={() => toggleImagePosition(index)}>
						{block.isImageOnRight ? 'Move Content/Image to Left' : 'Move Content/Image to Right'}
					</Button>

					<InspectorControls>
						<PanelBody title="Sub block control" initialOpen={true}>
							<ToggleControl
								label="Use Text Content Instead of Image"
								checked={block.useContentInsteadOfImage}
								onChange={(value) => handleContentChange(index, 'useContentInsteadOfImage', value)}
							/>

							{!block.useContentInsteadOfImage && (
								<MediaUpload
									onSelect={(media) => handleContentChange(index, 'imageUrl', media.url)}
									allowedTypes={['image']}
									value={block.imageUrl}
									render={({ open }) => (
										<Button onClick={open} className="btn">
											Change/select image
										</Button>
									)}
								/>
							)}

							{block.useContentInsteadOfImage && (
								<RichText
									value={block.contentInsteadOfImage}
									onChange={(value) => handleContentChange(index, 'contentInsteadOfImage', value)}
									placeholder="Text Content Instead of Image..."
								/>
							)}

							<ColorPalette
								value={block.backgroundColor}
								onChange={(color) => handleContentChange(index, 'backgroundColor', color)}
							/>
						</PanelBody>
					</InspectorControls>

					<div
						className={`internship-section d-flex ${block.isImageOnRight ? 'flex-row-reverse' : 'row'}`}
						style={{ backgroundColor: block.backgroundColor }}
					>
						<div className="internship-image col-6">
							{block.useContentInsteadOfImage
								? <div>{block.contentInsteadOfImage}</div>
								: (
									<div>
										{block.imageUrl && <img src={block.imageUrl} alt="Internship" />}
										<TextControl
											label="Text Content Below Image"
											value={block.extraContentBelowImage}
											onChange={(value) => handleContentChange(index, 'extraContentBelowImage', value)}
											placeholder="Enter content below the image..."
										/>
									</div>
								)}
						</div>
						<div className="internship-text col-6">
							<RichText
								value={block.internshipDescription}
								onChange={(value) => handleContentChange(index, 'internshipDescription', value)}
								placeholder="Enter description with paragraphs and lists..."
								allowedFormats={['core/bold', 'core/italic', 'core/list', 'core/link']}
							/>
						</div>
					</div>

					<Button isDestructive onClick={() => removeInternshipBlock(index)}>
						Remove This Block
					</Button>
				</div>
			))}

			<hr />

			<h3>FAQ Section</h3>
			<TextControl
				label={`FAQ title`}
				value={faqTitle}
				onChange={(value) => setAttributes({ faqTitle: value })}
			/>
			{faqItems.map((faq, index) => (
				<div className="faq-item" key={index}>
					<TextControl
						label={`Question ${index + 1}`}
						value={faq.question}
						onChange={(value) => updateFaqItem(index, 'question', value)}
					/>
					<RichText
						key={index}
						value={faq.answer}
						onChange={(value) => updateFaqItem(index, 'answer', value)}
						placeholder="Enter Answer to faq..."
						label={`Answer ${index + 1}`}
					/>
					<Button isDestructive onClick={() => removeFaqItem(index)}>
						Remove FAQ
					</Button>
				</div>
			))}
			<Button isSecondary onClick={addFaqItem}>
				Add FAQ
			</Button>
		</div>
	);
};

export default Internship;
