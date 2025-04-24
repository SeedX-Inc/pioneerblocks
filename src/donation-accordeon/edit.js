import {__} from '@wordpress/i18n';
import './editor.scss';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button
} from '@wordpress/components';


export default function Edit({attributes, setAttributes}) {
	const {
		title, accordionItems = [],
		facebookUrl,
		twitterUrl,
		linkedinUrl,
		printUrl,
		emailUrl,
		shareUrl
	} = attributes;

	const addAccordionItem = () => {
		setAttributes({
			accordionItems: [
				...accordionItems,
				{
					title: '',
					content: '',
				},
			],
		});
	};

	const updateItem = (index, field, value) => {
		const updatedItems = [...accordionItems];
		updatedItems[index][field] = value;
		setAttributes({accordionItems: updatedItems});
	};
	const onChange = (field) => (value) => setAttributes({ [field]: value });

	const removeItem = (index) => {
		const updated = accordionItems.filter((_, i) => i !== index);
		setAttributes({accordionItems: updated});
	};

	return (
		<div {...useBlockProps({className: 'stewards-accordion-block'})}>

			<InspectorControls>
				<PanelBody title={__('Social Media Links', 'block-domain')}>
					<TextControl
						label={__('Facebook URL', 'block-domain')}
						value={facebookUrl}
						onChange={onChange('facebookUrl')}
					/>
					<TextControl
						label={__('Print URL', 'block-domain')}
						value={printUrl}
						onChange={onChange('printUrl')}
					/>
					<TextControl
						label={__('Twitter URL', 'block-domain')}
						value={twitterUrl}
						onChange={onChange('twitterUrl')}
					/>
					<TextControl
						label={__('Email URL', 'block-domain')}
						value={emailUrl}
						onChange={onChange('emailUrl')}
					/>
					<TextControl
						label={__('LinkedIn URL', 'block-domain')}
						value={linkedinUrl}
						onChange={onChange('linkedinUrl')}
					/>
					<TextControl
						label={__('Share URL', 'block-domain')}
						value={shareUrl}
						onChange={onChange('shareUrl')}
					/>
				</PanelBody>
			</InspectorControls>
			<p style={{fontStyle: 'italic', color: '#666', marginBottom: '1em'}}>
				Hint: You can structure content using simple markers:<br/>
				<code>##</code> for titles<br/>
				<code>--</code> for list titles<br/>
				<code>-</code> for list items<br/>
				Just type normal text for plain paragraphs<br/>
				Example:<br/><br/>
				<code>
					## Internship Overview<br/>
					This is a plain paragraph.<br/>
					-- What You'll Learn<br/>
					- JavaScript Fundamentals<br/>
					- React Basics<br/>
				</code>
			</p>

			<RichText
				tagName="h4"
				value={title}
				onChange={onChange('title')}
				placeholder={__('Enter block Title', 'stewards-accordion')}
			/>
			<Button isPrimary onClick={addAccordionItem}>
				{__('Add Accordion Item', 'stewards-accordion')}
			</Button>

			{accordionItems.map((item, index) => (
				<div className="accordion-item" key={index}>
					<RichText
						tagName="h4"
						value={item.title}
						onChange={(val) => updateItem(index, 'title', val)}
						placeholder={__('Enter Question Title', 'stewards-accordion')}
					/>

					<RichText
						value={item.content}
						onChange={(val) => updateItem(index, 'content', val)}
						placeholder={__('Enter Content/Answer', 'stewards-accordion')}
					/>


					<Button isDestructive onClick={() => removeItem(index)}>
						{__('Remove', 'stewards-accordion')}
					</Button>
				</div>
			))}
		</div>
	);
}
