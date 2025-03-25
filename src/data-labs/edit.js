import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, fact, rightTitle, rightDescription } = attributes;

	// Function to encode WordPress numeric ID to GraphQL format
	const encodeId = (id) => btoa(`post:${id}`);

	// Fetch published facts
	const factOptions = useSelect(select => {
		const posts = select('core').getEntityRecords('postType', 'fact', { per_page: -1 }) || [];
		return posts.map(post => ({ label: post.title.rendered, value: encodeId(post.id) })); // Encode IDs
	}, []);

	return (
		<div {...useBlockProps({ className: 'data-lab-block' })}>
			<InspectorControls>
				<PanelBody title={__('Data Lab Settings', 'data-lab')} initialOpen={true}>
					<TextControl
						label={__('Block Title', 'data-lab')}
						value={title || ''}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
					/>
					<SelectControl
						label={__('Select a Fact', 'data-lab')}
						options={[{ label: __('Select a Fact', 'data-lab'), value: '' }, ...factOptions]}
						value={fact}
						onChange={(value) => setAttributes({ fact: value })}
					/>
					<TextControl
						label={__('Right Title', 'data-lab')}
						value={rightTitle || ''}
						onChange={(newRightTitle) => setAttributes({ rightTitle: newRightTitle })}
					/>
					<TextControl
						label={__('Right Description', 'data-lab')}
						value={rightDescription || ''}
						onChange={(newRightDescription) => setAttributes({ rightDescription: newRightDescription })}
					/>
				</PanelBody>
			</InspectorControls>
			<h2>{__('Selected Fact', 'data-lab')}</h2>
			<p>{factOptions.find(factOption => factOption.value === fact)?.label || __('No Fact Selected', 'data-lab')}</p>
			<h2>{rightTitle || __('Fact Title', 'data-lab')}</h2>
			<p>{rightDescription || __('Fact description will be displayed here.', 'data-lab')}</p>
		</div>
	);
}
