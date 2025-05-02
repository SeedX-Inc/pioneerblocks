import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, description = '', selectedEpisodes = [], selectedPodcast = 'all' } = attributes;

	// Function to encode WordPress numeric ID to GraphQL format
	const encodeId = (id) => btoa(`post:${id}`);

	// Fetch episodes filtered by selected podcast
	const episodeOptions = useSelect(select => {
		const episodes = select('core').getEntityRecords('postType', 'episode', {
			per_page: -1,
			podcast: selectedPodcast !== 'all' ? selectedPodcast : undefined
		}) || [];
		return episodes
			.filter(episode => episode.podcast && episode.podcast.length > 0)
			.map(episode => ({ label: episode.title.rendered, value: encodeId(episode.id) }));
	}, [selectedPodcast]);

	// Fetch and organize podcast taxonomy terms
	const podcastOptions = useSelect(select => {
		const terms = select('core').getEntityRecords('taxonomy', 'podcast', { per_page: -1, hierarchical: true }) || [];
		const options = [{ label: __('All', 'episodes-list'), value: 'all' }];

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

	const addEpisode = (episodeId) => {
		if (!selectedEpisodes.includes(episodeId)) {
			setAttributes({ selectedEpisodes: [...selectedEpisodes, episodeId] });
		}
	};

	const removeEpisode = (episodeId) => {
		setAttributes({ selectedEpisodes: selectedEpisodes.filter(id => id !== episodeId) });
	};

	return (
		<div {...useBlockProps({ className: 'episodes-list' })}>
			<InspectorControls>
				<PanelBody title={__('Select Episodes', 'episodes-list')} initialOpen={true}>
					<TextControl
						label={__('Title', 'episodes-list')}
						value={title || ''}
						onChange={newTitle => setAttributes({ title: newTitle })}
					/>
					<TextControl
						label={__('Description', 'episodes-list')}
						value={description || ''}
						onChange={newDescription => setAttributes({ description: newDescription })}
					/>
					<SelectControl
						label={__('Select Podcast', 'episodes-list')}
						options={podcastOptions}
						value={selectedPodcast}
						onChange={(value) => setAttributes({ selectedPodcast: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<h2>{title || __('Episodes Block', 'episodes-list')}</h2>
			<ul>
				<li>
					<strong>{__('Description:', 'episodes-list')}</strong>{' '}
					{description || __('None', 'episodes-list')}
				</li>
				<li>
					<strong>{__('Selected Podcast:', 'episodes-list')}</strong>{' '}
					{podcastOptions.find(p => p.value === selectedPodcast)?.label || __('All', 'episodes-list')}
				</li>
			</ul>
		</div>
	);
}
