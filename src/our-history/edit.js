import {__} from '@wordpress/i18n';
import {useBlockProps, RichText, MediaUpload} from '@wordpress/block-editor';
import {Button, TextareaControl} from '@wordpress/components';

export default function Edit({attributes, setAttributes}) {
	const {title, contentRightToImage, contentBelowImage, imageUrl, imageSubtitle} = attributes;

	return (
		<div {...useBlockProps()}>
			{/* Title Input */}
			<RichText
				tagName="h2"
				value={title}
				onChange={(newTitle) => setAttributes({title: newTitle})}
				placeholder={__('Enter title...', 'text-domain')}
			/>
			<RichText
				tagName="h2"
				value={imageSubtitle}
				onChange={(newTitle) => setAttributes({imageSubtitle: newTitle})}
				placeholder={__('Enter image subtitle*(who is on the image)...', 'text-domain')}
			/>
			<div className='row'>
				<div className='col-5'>

					{/* Image Upload */}
					<MediaUpload
						onSelect={(media) => setAttributes({imageUrl: media.url})}
						type="image"
						render={({open}) => (
							<div>
								{imageUrl ? (
									<img src={imageUrl} alt="Selected" style={{width: '100%', height: 'auto'}}/>
								) : (
									<Button onClick={open} isPrimary>{__('Select Image', 'text-domain')}</Button>
								)}
							</div>
						)}
					/>


				</div>
				<div className='col-6'>
					<TextareaControl
						label={__('Content Right to Image (use # for headings, - for lists)', 'text-domain')}
						value={contentRightToImage}
						onChange={(value) => setAttributes({ contentRightToImage: value })}
						placeholder={__('# Heading\nText here\n- List item\n- Another item', 'text-domain')}
					/>
				</div>
			</div>
			<TextareaControl
				label={__('Content Below Image (use # for headings, - for lists)', 'text-domain')}
				value={contentBelowImage}
				onChange={(value) => setAttributes({ contentBelowImage: value })}
				placeholder={__('# Heading\nText here\n- List item\n- Another item', 'text-domain')}
			/>
		</div>
	);
}
