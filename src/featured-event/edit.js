import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, selectedEvent } = attributes;

	const encodeId = (id) => btoa(`post:${id}`);

	// Fetch all events
	const eventOptions = useSelect(select => {
		const events = select('core').getEntityRecords('postType', 'event', { per_page: -1 }) || [];
		return events.map(event => ({
			label: event.title.rendered,
			value: encodeId(event.id),
		}));
	}, []);

	const setEvent = (eventId) => {
		setAttributes({ selectedEvent: eventId });
	};

	const removeEvent = () => {
		setAttributes({ selectedEvent: '' });
	};
	console.log(selectedEvent)
	return (
		<div {...useBlockProps({ className: 'events-list' })}>
			<InspectorControls>
				<PanelBody title={__('Select Event', 'events-list')} initialOpen={true}>
					<TextControl
						label={__('Title', 'events-list')}
						value={title || ''}
						onChange={newTitle => setAttributes({ title: newTitle })}
					/>
					<SelectControl
						label={__('Select an Event', 'events-list')}
						options={[{ label: __('Select an Event', 'events-list'), value: '' }, ...eventOptions]}
						value={selectedEvent}
						onChange={setEvent}
					/>
				</PanelBody>
			</InspectorControls>

			<h2>{__('Selected Event', 'events-list')}</h2>
			{selectedEvent && (
				<div>
					<p>{eventOptions.find(ev => ev.value === selectedEvent)?.label || __('Unknown Event', 'events-list')}</p>
					<Button isDestructive onClick={removeEvent}>
						{__('Remove', 'events-list')}
					</Button>
				</div>
			)}
		</div>
	);
}
