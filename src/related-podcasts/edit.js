import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { title, description, selectedEpisodes } = attributes;

	const encodeId = (id) => btoa(`post:${id}`);
    // Fetch episodes that belong to any podcast taxonomy
    const episodeOptions = useSelect(select => {
        const episodes = select('core').getEntityRecords('postType', 'episode', { per_page: -1 }) || [];
        return episodes
            .filter(episode => episode.podcast && episode.podcast.length > 0) // Ensure episode has at least one podcast taxonomy term
            .map(episode => ({ label: episode.title.rendered, value: encodeId(episode.id) }));
    }, []);

    const addEpisode = (episodeId) => {
		console.log(episodeId)
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
                        label={__('description', 'episodes-list')}
                        value={description || ''}
                        onChange={newDescription => setAttributes({ description: newDescription })}
                    />
                    <SelectControl
                        label={__('Add Episode', 'episodes-list')}
                        options={[{ label: __('Select an Episode', 'episodes-list'), value: '' }, ...episodeOptions]}
                        onChange={(value) => value && addEpisode(value)}
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
        </div>
    );
}
