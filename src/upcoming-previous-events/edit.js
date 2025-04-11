import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		title = '',
		upcomingCount = 0,
		previousCount = 0,
	} = attributes;

	return (
		<div {...useBlockProps({ className: 'event-list' })}>
			<InspectorControls>
				<PanelBody title={__('Event Block Settings', 'event-list')} initialOpen={true}>
					<TextControl
						label={__('Title', 'event-list')}
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
					/>

					<TextControl
						label={__('Number of Upcoming Events', 'event-list')}
						type="number"
						min="0"
						value={upcomingCount}
						onChange={(value) => setAttributes({ upcomingCount: parseInt(value || 0, 10) })}
					/>

					<TextControl
						label={__('Number of Previous Events', 'event-list')}
						type="number"
						min="0"
						value={previousCount}
						onChange={(value) => setAttributes({ previousCount: parseInt(value || 0, 10) })}
					/>
				</PanelBody>
			</InspectorControls>

			<h2>{title || __('Event Block', 'event-list')}</h2>
			<ul>
				<li><strong>{__('Upcoming Events:', 'event-list')}</strong> {upcomingCount}</li>
				<li><strong>{__('Previous Events:', 'event-list')}</strong> {previousCount}</li>
			</ul>
		</div>
	);
}
