import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, videoUrl } = attributes;

	return (
		<div {...useBlockProps({ className: 'full-width-video-block' })}>
			<RichText
				tagName="h2"
				value={title}
				onChange={(value) => setAttributes({ title: value })}
				placeholder={__('Enter title...', 'full-width-video')}
			/>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) => setAttributes({ videoUrl: media.url })}
					allowedTypes={['video']}
					render={({ open }) => (
						<Button onClick={open} variant="primary">
							{videoUrl ? __('Change Video', 'full-width-video') : __('Upload Video', 'full-width-video')}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			{videoUrl && (
				<video src={videoUrl} controls style={{ width: '100%' }} />
			)}
		</div>
	);
}
