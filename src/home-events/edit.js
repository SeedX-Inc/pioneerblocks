import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, featuredEvent, rightSideEvents = [], bottomEvents = [] } = attributes;
	const [searchTerm, setSearchTerm] = useState('');

	// Encode WordPress numeric ID to GraphQL format
	const encodeId = (id) => btoa(`post:${id}`);
	// Decode GraphQL encoded ID back to numeric ID
	const decodeId = (encodedId) => {
		try {
			const decoded = atob(encodedId);
			const match = decoded.match(/^post:(\d+)$/);
			return match ? match[1] : null;
		} catch (e) {
			return null;
		}
	};

	// Fetch published event posts with search filter
	const eventOptions = useSelect(select => {
		const query = { per_page: 20, search: searchTerm };
		const events = select('core').getEntityRecords('postType', 'event', query) || [];
		return events.map(event => ({ label: event.title.rendered, value: encodeId(event.id) }));
	}, [searchTerm]);

	// Add event item to selected list
	const addEvent = (list, value) => {
		if (value && !attributes[list].includes(value)) {
			setAttributes({ [list]: [...attributes[list], value] });
		}
	};

	// Remove event item from selected list
	const removeEvent = (list, value) => {
		setAttributes({ [list]: attributes[list].filter(id => id !== value) });
	};

	return (
		<div {...useBlockProps({ className: 'event-list' })}>
			<InspectorControls>
				<PanelBody title={__('Event Block Settings', 'event-list')} initialOpen={true}>
					<TextControl
						label={__('Title', 'event-list')}
						value={title || ''}
						onChange={newTitle => setAttributes({ title: newTitle })}
					/>
					<TextControl
						label={__('Search Events', 'event-list')}
						value={searchTerm}
						onChange={setSearchTerm}
						placeholder={__('Type to search...', 'event-list')}
					/>

					<SelectControl
						label={__('Featured Event', 'event-list')}
						options={[{ label: __('Select an Event', 'event-list'), value: '' }, ...eventOptions]}
						value={featuredEvent}
						onChange={(value) => setAttributes({ featuredEvent: value })}
					/>

					<SelectControl
						label={__('Add to Right-Side Events', 'event-list')}
						options={[{ label: __('Select an Event', 'event-list'), value: '' }, ...eventOptions]}
						onChange={(value) => addEvent('rightSideEvents', value)}
					/>
					<ul>
						{rightSideEvents.map(id => (
							<li key={id}>
								{eventOptions.find(n => n.value === id)?.label || __('Unknown', 'event-list')}
								<Button isDestructive onClick={() => removeEvent('rightSideEvents', id)}>Remove</Button>
							</li>
						))}
					</ul>

					<SelectControl
						label={__('Add to Bottom Events', 'event-list')}
						options={[{ label: __('Select an Event', 'event-list'), value: '' }, ...eventOptions]}
						onChange={(value) => addEvent('bottomEvents', value)}
					/>
					<ul>
						{bottomEvents.map(id => (
							<li key={id}>
								{eventOptions.find(n => n.value === id)?.label || __('Unknown', 'event-list')}
								<Button isDestructive onClick={() => removeEvent('bottomEvents', id)}>Remove</Button>
							</li>
						))}
					</ul>
				</PanelBody>
			</InspectorControls>

			<h2>{title || __('Event Block', 'event-list')}</h2>
			<ul>
				<li><strong>{__('Featured Event:', 'event-list')}</strong> {eventOptions.find(n => n.value === featuredEvent)?.label || __('None', 'event-list')}</li>
				<li><strong>{__('Right-Side Events:', 'event-list')}</strong> {rightSideEvents.map(id => eventOptions.find(n => n.value === id)?.label || __('Unknown', 'event-list')).join(', ')}</li>
				<li><strong>{__('Bottom Events:', 'event-list')}</strong> {bottomEvents.map(id => eventOptions.find(n => n.value === id)?.label || __('Unknown', 'event-list')).join(', ')}</li>
			</ul>
		</div>
	);
}
