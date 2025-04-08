import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, selectedEpisode } = attributes;

	const encodeId = (id) => btoa(`post:${id}`);
	// Fetch episodes that belong to any podcast taxonomy
	const episodeOptions = useSelect(select => {
		const episodes = select('core').getEntityRecords('postType', 'episode', { per_page: -1 }) || [];
		return episodes
			.filter(episode => episode.podcast && episode.podcast.length > 0) // Ensure episode has at least one podcast taxonomy term
			.map(episode => ({ label: episode.title.rendered, value: encodeId(episode.id) }));
	}, []);

	const setEpisode = (episodeId) => {
		setAttributes({ selectedEpisode: episodeId });
	};

	const removeEpisode = () => {
		setAttributes({ selectedEpisode: '' });
	};

	return (
		<div {...useBlockProps({ className: 'episodes-list' })}>
			<InspectorControls>
				<PanelBody title={__('Select Episode', 'episodes-list')} initialOpen={true}>
					<TextControl
						label={__('Title', 'episodes-list')}
						value={title || ''}
						onChange={newTitle => setAttributes({ title: newTitle })}
					/>
					<SelectControl
						label={__('Select an Episode', 'episodes-list')}
						options={[{ label: __('Select an Episode', 'episodes-list'), value: '' }, ...episodeOptions]}
						value={selectedEpisode}
						onChange={(value) => setEpisode(value)}
					/> 
				</PanelBody>
			</InspectorControls>

			<h2>{__('Selected Episode', 'episodes-list')}</h2>
			{selectedEpisode && (
				<div>
					<p>{episodeOptions.find(ep => ep.value === selectedEpisode)?.label || __('Unknown Episode', 'episodes-list')}</p>
					<Button isDestructive onClick={removeEpisode}>Remove</Button>
				</div>
			)}
		</div>
	);
}
