import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { title, contentRightToImage, contentBelowImage, imageUrl, imageSubtitle } = attributes;

	return (
		<div {...useBlockProps()}>
			{/* Title Input */}
			<RichText
				tagName="h2"
				value={title}
				onChange={(newTitle) => setAttributes({ title: newTitle })}
				placeholder={__('Enter title...', 'text-domain')}
			/>
			<RichText
				tagName="h2"
				value={imageSubtitle}
				onChange={(newTitle) => setAttributes({ imageSubtitle: newTitle })}
				placeholder={__('Enter image subtitle*(who is on the image)...', 'text-domain')}
			/>
			<div className='row'>
				<div className='col-5'>

					{/* Image Upload */}
					<MediaUpload
						onSelect={(media) => setAttributes({ imageUrl: media.url })}
						type="image"
						render={({ open }) => (
							<div>
								{imageUrl ? (
									<img src={imageUrl} alt="Selected" style={{ width: '100%', height: 'auto' }} />
								) : (
									<Button onClick={open} isPrimary>{__('Select Image', 'text-domain')}</Button>
								)}
							</div>
						)}
					/>


				</div>
				<div className='col-6'>

					{/* Content Input */}
					<RichText
						tagName="div"  // This allows multiple blocks inside
						value={contentRightToImage}
						onChange={(newContent) => setAttributes({ contentRightToImage: newContent })}
						placeholder={__('Enter content...', 'text-domain')}
						allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/heading']}
					/>
				</div>
			</div>
			<RichText
				tagName="div"  // This allows multiple blocks inside
				value={contentBelowImage}
				onChange={(newContent) => setAttributes({ contentBelowImage: newContent })}
				placeholder={__('Enter content...', 'text-domain')}
				allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/heading', ]}
			/>
		</div>
	);
}