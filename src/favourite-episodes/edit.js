import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { title, description, selectedEpisodes, links, learnMore } = attributes;

	const encodeId = (id) => btoa(`post:${id}`);
    const episodeOptions = useSelect(select => {
        const episodes = select('core').getEntityRecords('postType', 'episode', { per_page: -1 }) || [];
        return episodes
            .filter(episode => episode.podcast && episode.podcast.length > 0) // Ensure episode has at least one podcast taxonomy term
            .map(episode => ({ label: episode.title.rendered, value: encodeId(episode.id) }));
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
                    <SelectControl
                        label={__('Add Episode', 'episodes-list')}
                        options={[{ label: __('Select an Episode', 'episodes-list'), value: '' }, ...episodeOptions]}
                        onChange={(value) => value && addEpisode(value)}
                    />
                </PanelBody>
                <PanelBody title={__('Learn More Settings', 'episodes-list')} initialOpen={true}>
                    <TextControl
                        label={__('Learn More Text', 'episodes-list')}
                        value={learnMore?.text || ''}
                        onChange={(value) => setAttributes({ learnMore: { ...learnMore, text: value } })}
                    />
                    <TextControl
                        label={__('Learn More Link', 'episodes-list')}
                        value={learnMore?.href || ''}
                        onChange={(value) => setAttributes({ learnMore: { ...learnMore, href: value } })}
                    />
                </PanelBody>
            </InspectorControls>

            <h2>{__('Selected Episodes', 'episodes-list')}</h2>
            <ul>
                {selectedEpisodes.map((episodeId) => {
                    const episode = episodeOptions.find(episode => episode.value === episodeId);
                    return (
                        <li key={episodeId}>
                            {episode?.label || __('Unknown Episode', 'episodes-list')}
                            <Button isDestructive onClick={() => removeEpisode(episodeId)}>Remove</Button>
                        </li>
                    );
                })}
            </ul>
			<div>
				<h4>{__('Links', 'text-domain')}</h4>
				{links.map((link, index) => (
					<div key={index}>
						<TextControl
							value={link.text}
							onChange={(value) => updateLink(index, 'text', value)}
							placeholder={__('Link Text', 'text-domain')}
						/>
						<TextControl
							value={link.href}
							onChange={(value) => updateLink(index, 'href', value)}
							placeholder={__('Link URL', 'text-domain')}
						/>
						<Button onClick={() => removeLink(index)} isDestructive>
							{__('Remove', 'text-domain')}
						</Button>
					</div>
				))}
				<Button onClick={addLink} isPrimary>
					{__('Add Link', 'text-domain')}
				</Button>
			</div>
        </div>
    );
}
