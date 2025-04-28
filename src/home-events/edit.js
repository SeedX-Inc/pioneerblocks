import {useBlockProps, InspectorControls} from '@wordpress/block-editor';
import {PanelBody, SelectControl, TextControl, ToggleControl} from '@wordpress/components';
import {useSelect} from '@wordpress/data';
import {__} from '@wordpress/i18n';
import './editor.scss';

export default function Edit({attributes, setAttributes}) {
	const {title, featuredEvent, selectedPillar, showBottomBlock} = attributes;

	// Encode WordPress numeric ID to GraphQL format
	const encodeId = (id) => btoa(`event:${id}`);

	// Fetch event posts for featured event selection
	const eventOptions = useSelect(select => {
		const events = select('core').getEntityRecords('postType', 'event', {per_page: 20}) || [];
		return events.map(event => ({label: event.title.rendered, value: encodeId(event.id)}));
	}, []);

	// Fetch and organize pillar taxonomy terms
	const pillarOptions = useSelect(select => {
		const terms = select('core').getEntityRecords('taxonomy', 'pillar', {per_page: -1, hierarchical: true}) || [];
		const options = [{label: __('All', 'event-list'), value: 'all'}];

		// Create a map for quick lookup of terms
		const termMap = new Map(terms.map(term => [term.id, {...term, children: []}]));

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
			options.push({label, value: term.slug});

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
		<div {...useBlockProps({className: 'event-list'})}>
			<InspectorControls>
				<PanelBody title={__('Event Block Settings', 'event-list')} initialOpen={true}>
					<TextControl
						label={__('Title', 'event-list')}
						value={title || ''}
						onChange={newTitle => setAttributes({title: newTitle})}
					/>
					<SelectControl
						label={__('Featured Event', 'event-list')}
						options={[{label: __('Select an Event', 'event-list'), value: ''}, ...eventOptions]}
						value={featuredEvent}
						onChange={(value) => setAttributes({featuredEvent: value})}
					/>
					<SelectControl
						label={__('Select Pillar', 'event-list')}
						options={pillarOptions}
						value={selectedPillar || 'all'}
						onChange={(value) => setAttributes({selectedPillar: value})}
					/>
					<ToggleControl
						label={__('Show Events Bottom Block', 'event-list')}
						checked={showBottomBlock || false}
						onChange={(value) => setAttributes({showBottomBlock: value})}
					/>
				</PanelBody>
			</InspectorControls>

			<h2>{title || __('Event Block', 'event-list')}</h2>
			<ul>
				<li>
					<strong>{__('Featured Event:', 'event-list')}</strong>{' '}
					{eventOptions.find(n => n.value === featuredEvent)?.label || __('None', 'event-list')}
				</li>
				<li>
					<strong>{__('Selected Pillar:', 'event-list')}</strong>{' '}
					{pillarOptions.find(p => p.value === selectedPillar)?.label || __('All', 'event-list')}
				</li>
				<li>
					<strong>{__('Show Events Bottom Block:', 'event-list')}</strong>{' '}
					{showBottomBlock ? __('Yes', 'event-list') : __('No', 'event-list')}
				</li>
			</ul>
		</div>
	)
}
