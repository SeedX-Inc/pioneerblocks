import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, selectedPillar } = attributes;

	// Fetch and organize pillar taxonomy terms
	const pillarOptions = useSelect(select => {
		const terms = select('core').getEntityRecords('taxonomy', 'pillar', { per_page: -1, hierarchical: true }) || [];
		const options = [{ label: __('All', 'news-list'), value: 'all' }];

		// Create a map for quick lookup of terms
		const termMap = new Map(terms.map(term => [term.id, { ...term, children: [] }]));

		// Build hierarchical structure by assigning children to parents
		terms.forEach(term => {
			if (term.parent && termMap.has(term.parent)) {
				termMap.get(term.parent).children.push(term.id);
			}
		});

		// Function to recursively add terms to options
		const addTermToOptions = (termId, prefix = '') => {
			const term = termMap.get(termId);
			if (!term) return;

			// Add the current term
			const label = prefix ? `${prefix} / ${term.name}` : term.name;
			options.push({ label, value: term.slug });

			// Add children recursively
			term.children.forEach(childId => {
				addTermToOptions(childId, prefix ? `${prefix} / ${term.name}` : term.name);
			});
		};

		// Add top-level terms (no parent) and their children
		terms.filter(term => !term.parent).forEach(term => {
			addTermToOptions(term.id);
		});

		return options;
	}, []);

	return (
		<div {...useBlockProps({ className: 'news-list' })}>
			<InspectorControls>
				<PanelBody title={__('News Block Settings', 'news-list')} initialOpen={true}>
					<TextControl
						label={__('Title', 'news-list')}
						value={title || ''}
						onChange={newTitle => setAttributes({ title: newTitle })}
					/>
					<SelectControl
						label={__('Select Pillar', 'news-list')}
						options={pillarOptions}
						value={selectedPillar || 'all'}
						onChange={(value) => setAttributes({ selectedPillar: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<h2>{title || __('News Block', 'news-list')}</h2>
			<ul>
				<li>
					<strong>{__('Selected Pillar:', 'news-list')}</strong>{' '}
					{pillarOptions.find(p => p.value === selectedPillar)?.label || __('All', 'news-list')}
				</li>
			</ul>
		</div>
	);
}
