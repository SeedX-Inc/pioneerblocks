import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
	const { title, description, linksTitle, links, image } = attributes;

	const onSelectImage = (media) => {
		setAttributes({ image: media.url });
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
		<div {...useBlockProps()}>
			<input
				type="text"
				value={title}
				onChange={(e) => setAttributes({ title: e.target.value })}
				placeholder={__('Enter title...', 'text-domain')}
			/>
			<div className='row'>

				<div className='col-6'>

					<MediaUpload
						onSelect={onSelectImage}
						type="image"
						value={image}
						render={({ open }) => (
							<Button onClick={open} isPrimary>
								{image ? __('Change Image', 'text-domain') : __('Upload Image', 'text-domain')}
							</Button>
						)}
					/>
					{image && <img src={image} alt={__('Selected Image', 'text-domain')} style={{ maxWidth: '100%' }} />}
				</div>

				<div className='col-6'>
					<textarea
						value={description}
						onChange={(e) => setAttributes({ description: e.target.value })}
						placeholder={__('Enter description...', 'text-domain')}
					/>
					<input
						type="text"
						value={linksTitle}
						onChange={(e) => setAttributes({ linksTitle: e.target.value })}
						placeholder={__('Enter links title...', 'text-domain')}
					/>
				</div>
			</div>
			<div className='row'>

			</div>
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
};

export default Edit;