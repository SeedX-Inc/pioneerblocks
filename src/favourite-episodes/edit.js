import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, description = '', selectedEpisodes = [], selectedPillar = 'all', selectedPodcast = 'all', links = [], learnMore = { text: '', href: '' } } = attributes;

	// Function to encode WordPress numeric ID to GraphQL format
	const encodeId = (id) => btoa(`post:${id}`);

	// Fetch episodes filtered by selected pillar and podcast
	const episodeOptions = useSelect(select => {
		const episodes = select('core').getEntityRecords('postType', 'episode', {
			per_page: -1,
			pillar: selectedPillar !== 'all' ? selectedPillar : undefined,
			podcast: selectedPodcast !== 'all' ? selectedPodcast : undefined
		}) || [];
		return episodes
			.filter(episode => episode.podcast && episode.podcast.length > 0)
			.map(episode => ({ label: episode.title.rendered, value: encodeId(episode.id) }));
	}, [selectedPillar, selectedPodcast]);

	// Fetch and organize pillar taxonomy terms
	const pillarOptions = useSelect(select => {
		const terms = select('core').getEntityRecords('taxonomy', 'pillar', { per_page: -1, hierarchical: true }) || [];
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

	const addLink = () => {
		setAttributes({ links: [...links, { text: '', href: '' }] });
	};

	const updateLink = (index, key, value) => {
		const newLinks = links.map((link, i) => (i === index ? { ...link, [key]: value } : link));
		setAttributes({ links: newLinks });
	};

	const removeLink = (index) => {
		setAttributes({ links: links.filter((_, i) => i !== index) });
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
						label={__('Add Episode', 'episodes-list')}
						options={[{ label: __('Select an Episode', 'episodes-list'), value: '' }, ...episodeOptions]}
						onChange={(value) => value && addEpisode(value)}
					/>
					<SelectControl
						label={__('Select Pillar', 'episodes-list')}
						options={pillarOptions}
						value={selectedPillar}
						onChange={(value) => setAttributes({ selectedPillar: value })}
					/>
					<SelectControl
						label={__('Select Podcast', 'episodes-list')}
						options={podcastOptions}
						value={selectedPodcast}
						onChange={(value) => setAttributes({ selectedPodcast: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Learn More Settings', 'episodes-list')} initialOpen={true}>
					<TextControl
						label={__('Learn More Text', 'episodes-list')}
						value={learnMore.text || ''}
						onChange={(value) => setAttributes({ learnMore: { ...learnMore, text: value } })}
					/>
					<TextControl
						label={__('Learn More Link', 'episodes-list')}
						value={learnMore.href || ''}
						onChange={(value) => setAttributes({ learnMore: { ...learnMore, href: value } })}
					/>
				</PanelBody>
				<PanelBody title={__('Links', 'episodes-list')} initialOpen={true}>
					{links.map((link, index) => (
						<div key={index} className="episodes-list-link-controls">
							<TextControl
								label={__('Link Text', 'episodes-list')}
								value={link.text}
								onChange={(value) => updateLink(index, 'text', value)}
								placeholder={__('Link Text', 'episodes-list')}
							/>
							<TextControl
								label={__('Link URL', 'episodes-list')}
								value={link.href}
								onChange={(value) => updateLink(index, 'href', value)}
								placeholder={__('Link URL', 'episodes-list')}
							/>
							<Button onClick={() => removeLink(index)} isDestructive>
								{__('Remove Link', 'episodes-list')}
							</Button>
						</div>
					))}
					<Button onClick={addLink} isPrimary>
						{__('Add Link', 'episodes-list')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<h2>{title || __('Episodes Block', 'episodes-list')}</h2>
			<ul>
				<li>
					<strong>{__('Description:', 'episodes-list')}</strong>{' '}
					{description || __('None', 'episodes-list')}
				</li>
				<li>
					<strong>{__('Selected Pillar:', 'episodes-list')}</strong>{' '}
					{pillarOptions.find(p => p.value === selectedPillar)?.label || __('All', 'episodes-list')}
				</li>
				<li>
					<strong>{__('Selected Podcast:', 'episodes-list')}</strong>{' '}
					{podcastOptions.find(p => p.value === selectedPodcast)?.label || __('All', 'episodes-list')}
				</li>
				<li>
					<strong>{__('Selected Episodes:', 'episodes-list')}</strong>{' '}
					{selectedEpisodes.map(id => episodeOptions.find(e => e.value === id)?.label || __('Unknown', 'episodes-list')).join(', ')}
				</li>
				<li>
					<strong>{__('Links:', 'episodes-list')}</strong>{' '}
					{links.length > 0 ? links.map(link => link.text || __('Untitled', 'episodes-list')).join(', ') : __('None', 'episodes-list')}
				</li>
				<li>
					<strong>{__('Learn More:', 'episodes-list')}</strong>{' '}
					{learnMore.text ? `${learnMore.text} (${learnMore.href})` : __('None', 'episodes-list')}
				</li>
			</ul>
		</div>
	);
}
