import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { title, contentRightToImage, contentBelowImage, imageUrl, imageSubtitle } = attributes;

	// Remove the current image
	const removeImage = () => {
		setAttributes({ imageUrl: '' });
	};

	return (
		<div {...useBlockProps()}>
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
			<div className="row">
				<div className="col-5">
					{/* Image Upload */}
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ imageUrl: media.url })}
							type="image"
							value={imageUrl ? { url: imageUrl } : null}
							render={({ open }) => (
								<div>
									{imageUrl ? (
										<div>
											<img
												src={imageUrl}
												alt="Selected"
												style={{ width: '100%', height: 'auto' }}
											/>
											<div style={{ marginTop: '10px' }}>
												<Button onClick={open} isSecondary>
													{__('Replace Image', 'text-domain')}
												</Button>
												<Button
													onClick={removeImage}
													isDestructive
													style={{ marginLeft: '10px' }}
												>
													{__('Remove Image', 'text-domain')}
												</Button>
											</div>
										</div>
									) : (
										<Button onClick={open} isPrimary>
											{__('Select Image', 'text-domain')}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</div>
				<div className="col-6">
					<p>Content Right side (use # for headings, - for lists): #title#, -listitem-</p>
					<RichText
						value={contentRightToImage}
						onChange={(value) => setAttributes({ contentRightToImage: value })}
						placeholder={__('# Heading#\nText here\n- List item-\n- Another item-', 'text-domain')}
					/>
				</div>
			</div>
			<p>Content Below Image (use # for headings, - for lists)</p>
			<RichText
				value={contentBelowImage}
				onChange={(value) => setAttributes({ contentBelowImage: value })}
				placeholder={__('# Heading#\nText here\n- List item-\n- Another item-', 'text-domain')}
			/>
		</div>
	);
}
