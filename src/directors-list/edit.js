import {__} from '@wordpress/i18n';
import {useBlockProps, RichText, InspectorControls, MediaUpload} from '@wordpress/block-editor';
import {Button, TextControl, PanelBody } from '@wordpress/components';
import './editor.scss';

export default function Edit({attributes, setAttributes}) {
	const {title, directors} = attributes;

	const updateDirector = (index, key, value) => {
		const newDirectors = [...directors];
		newDirectors[index][key] = value;
		setAttributes({directors: newDirectors});
	};

	const addDirector = () => {
		setAttributes({
			directors: [...directors, {name: '', slug: '', image: null, description: '', descriptionFull: ''}],
		});
	};

	const removeDirector = (index) => {
		const newDirectors = directors.filter((_, i) => i !== index);
		setAttributes({directors: newDirectors});
	};

	return (
		<div {...useBlockProps({className: 'directors-list'})}>
			<RichText
				tagName="h2"
				value={title}
				onChange={(value) => setAttributes({title: value})}
				placeholder={__('Enter list title...', 'directors-list')}
				className="directors-header"
			/>

			<InspectorControls>
				{directors.map((director, index) => (
					<div key={index} className="director-inspector">
					<PanelBody title={director.name || __('Director Settings', 'directors-list')} initialOpen={false}>
						{director.image && (
							<h2>{director.name}</h2>
						)}
						<TextControl
							label={__('Director Slug', 'directors-list')}
							value={director.slug}
							onChange={(value) => updateDirector(index, 'slug', value)}
							placeholder={__('Enter slug for the director', 'directors-list')}
						/>
						<TextControl
							label={__('Description', 'directors-list')}
							value={director.descriptionFull}
							onChange={(value) => updateDirector(index, 'descriptionFull', value)}
							placeholder={__('Enter description for the director', 'directors-list')}
						/>
						<MediaUpload
							onSelect={(media) => updateDirector(index, 'image', media.url)}
							allowedTypes={['image']}
							render={({open}) => (
								<Button onClick={open} variant="secondary">Choose Image</Button>
							)}
						/>
						{director.image && (
							<img src={director.image} alt={director.name} className="director-image-preview"/>
						)}
						</PanelBody>
					</div>
				))}
			</InspectorControls>

			<div className="directors-container">
				{directors.map((director, index) => (
					<div key={index} className="director-item">

						<TextControl
							value={director.name}
							onChange={(value) => updateDirector(index, 'name', value)}
							placeholder={__('Director Name', 'directors-list')}
							className="director-name"
						/>
						<RichText
							tagName="p"
							value={director.description}
							onChange={(value) => updateDirector(index, 'description', value)}
							placeholder={__('Short description (optional)', 'directors-list')}
							className="director-description"
						/>
						<Button
							isDestructive
							onClick={() => removeDirector(index)}
							className="remove-director-btn"
						>
							{__('Remove', 'directors-list')}
						</Button>
					</div>
				))}
			</div>
			<Button isPrimary onClick={addDirector} className="add-director-btn">
				{__('Add Director', 'directors-list')}
			</Button>
		</div>
	);
}
