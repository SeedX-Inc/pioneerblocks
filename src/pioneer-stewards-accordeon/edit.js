import { RichText, URLInputButton, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { accordionItems = [] } = attributes;

	const addAccordionItem = () => {
		setAttributes({
			accordionItems: [
				...accordionItems,
				{
					title: '',
					content: '',
					buttonLabel: '',
					buttonUrl: '',
				},
			],
		});
	};

	const updateItem = (index, field, value) => {
		const updatedItems = [...accordionItems];
		updatedItems[index][field] = value;
		setAttributes({ accordionItems: updatedItems });
	};

	const removeItem = (index) => {
		const updated = accordionItems.filter((_, i) => i !== index);
		setAttributes({ accordionItems: updated });
	};

	return (
		<div {...useBlockProps({className: 'stewards-accordion-block'})}>
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

					<RichText
						tagName="span"
						value={item.buttonLabel}
						onChange={(val) => updateItem(index, 'buttonLabel', val)}
						placeholder={__('Button Text', 'stewards-accordion')}
					/>
					<URLInputButton
						url={item.buttonUrl}
						onChange={(url) => updateItem(index, 'buttonUrl', url)}
					/>

					<Button isDestructive onClick={() => removeItem(index)}>
						{__('Remove', 'stewards-accordion')}
					</Button>
				</div>
			))}
		</div>
	);
}
