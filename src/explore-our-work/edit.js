import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, selectedNews } = attributes;

	// Function to encode WordPress numeric ID to GraphQL format
	const encodeId = (id) => btoa(`post:${id}`);

	// Function to decode GraphQL ID back to WordPress numeric ID
	const decodeId = (graphqlId) => {
		try {
			const decoded = atob(graphqlId); // Convert from base64
			return parseInt(decoded.replace('post:', ''), 10); // Extract numeric ID
		} catch (e) {
			return null;
		}
	};

	// Fetch published news posts
	const newsOptions = useSelect(select => {
		const posts = select('core').getEntityRecords('postType', 'post', { per_page: -1 }) || [];
		return posts.map(post => ({ label: post.title.rendered, value: encodeId(post.id) })); // Encode IDs
	}, []);

	const addNews = (newsId) => {
		if (!selectedNews.includes(newsId)) {
			setAttributes({ selectedNews: [...selectedNews, newsId] });
		}
	};

	const removeNews = (newsId) => {
		setAttributes({ selectedNews: selectedNews.filter(id => id !== newsId) });
	};

	return (
		<div {...useBlockProps({ className: 'news-list' })}>
			<InspectorControls>
				<PanelBody title={__('Select News', 'news-list')} initialOpen={true}>
					<TextControl
						label={__('Title', 'directors-list')}
						value={title || ''}
						onChange={newTitle => setAttributes({ title: newTitle })}
					/>
					<SelectControl
						label={__('Add News', 'news-list')}
						options={[{ label: __('Select a News', 'news-list'), value: '' }, ...newsOptions]}
						onChange={(value) => value && addNews(value)}
					/>
				</PanelBody>
			</InspectorControls>

			<h2>{__('Selected News', 'news-list')}</h2>
			<ul>
				{selectedNews.map((newsId) => {
					const news = newsOptions.find(news => news.value === newsId);
					return (
						<li key={newsId}>
							{news?.label || __('Unknown News', 'news-list')}
							<Button isDestructive onClick={() => removeNews(newsId)}>Remove</Button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
