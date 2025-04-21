import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, featuredPost, rightSideNews = [] } = attributes;
	const [searchTerm, setSearchTerm] = useState('');

	// Encode WordPress numeric ID to GraphQL format
	const encodeId = (id) => btoa(`post:${id}`);
	const newsOptions = useSelect(select => {
		const query = { per_page: 20, search: searchTerm };
		const posts = select('core').getEntityRecords('postType', 'post', query) || [];
		return posts.map(post => ({ label: post.title.rendered, value: encodeId(post.id) }));
	}, [searchTerm]);

	const addNews = (list, value) => {
		if (value && !list.includes(value)) {
			setAttributes({ [list]: [...attributes[list], value] });
		}
	};

	// Remove news item from selected list
	const removeNews = (list, value) => {
		setAttributes({ [list]: attributes[list].filter(id => id !== value) });
	};

	return (
		<div {...useBlockProps({ className: 'news-list' })}>
			<InspectorControls>
				<PanelBody title={__('News Block Settings', 'news-list')} initialOpen={true}>
					<TextControl
						label={__('Title', 'directors-list')}
						value={title || ''}
						onChange={newTitle => setAttributes({ title: newTitle })}
					/>
					<TextControl
						label={__('Search News', 'news-list')}
						value={searchTerm}
						onChange={setSearchTerm}
						placeholder={__('Type to search...', 'news-list')}
					/>

					<SelectControl
						label={__('Featured Post', 'news-list')}
						options={[{ label: __('Select a Post', 'news-list'), value: '' }, ...newsOptions]}
						value={featuredPost}
						onChange={(value) => setAttributes({ featuredPost: value })}
					/>

					<SelectControl
						label={__('Add to Right-Side News', 'news-list')}
						options={[{ label: __('Select a Post', 'news-list'), value: '' }, ...newsOptions]}
						onChange={(value) => addNews('rightSideNews', value)}
					/>
					<ul>
						{rightSideNews.map(id => (
							<li key={id}>
								{newsOptions.find(n => n.value === id)?.label || __('Unknown', 'news-list')}
								<Button isDestructive onClick={() => removeNews('rightSideNews', id)}>Remove</Button>
							</li>
						))}
					</ul>


				</PanelBody>
			</InspectorControls>

			<h2>{title || __('News Block', 'news-list')}</h2>
			<ul>
				<li><strong>{__('Featured Post:', 'news-list')}</strong> {newsOptions.find(n => n.value === featuredPost)?.label || __('None', 'news-list')}</li>
				<li><strong>{__('Right-Side News:', 'news-list')}</strong> {rightSideNews.map(id => newsOptions.find(n => n.value === id)?.label || __('Unknown', 'news-list')).join(', ')}</li>
			</ul>
		</div>
	);
}
