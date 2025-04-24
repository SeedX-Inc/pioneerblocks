import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, reports = [] } = attributes;

	const addReport = () => {
		setAttributes({
			reports: [
				...reports,
				{ reportTitle: '', imageUrl: '', fileUrl: '' },
			],
		});
	};

	const updateReport = (index, field, value) => {
		const updated = [...reports];
		updated[index][field] = value;
		setAttributes({ reports: updated });
	};

	const removeReport = (index) => {
		const updated = [...reports];
		updated.splice(index, 1);
		setAttributes({ reports: updated });
	};

	return (
		<div {...useBlockProps({ className: 'reports-block' })}>
			<PanelBody title={__('Reports Block Settings', 'reports-block')}>
				<RichText
					tagName="h2"
					value={title}
					onChange={(val) => setAttributes({ title: val })}
					placeholder={__('Block Title', 'reports-block')}
				/>

				<Button isPrimary onClick={addReport} style={{ marginBottom: '1rem' }}>
					{__('Add Report', 'reports-block')}
				</Button>

				{reports.map((report, index) => (
					<div key={index} className="report-item">
						<RichText
							tagName="h3"
							value={report.reportTitle}
							onChange={(val) => updateReport(index, 'reportTitle', val)}
							placeholder={__('Report Title', 'reports-block')}
						/>

						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => updateReport(index, 'imageUrl', media.url)}
								allowedTypes={['image']}
								render={({ open }) => (
									<Button onClick={open} isSecondary>
										{report.imageUrl ? __('Change Image', 'reports-block') : __('Upload Image', 'reports-block')}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						{report.imageUrl && (
							<img src={report.imageUrl} alt="" style={{ maxWidth: '100%', marginTop: '0.5rem' }} />
						)}

						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => updateReport(index, 'fileUrl', media.url)}
								allowedTypes={['application/pdf']}
								render={({ open }) => (
									<Button onClick={open} isSecondary>
										{report.fileUrl ? __('Change File', 'reports-block') : __('Upload PDF', 'reports-block')}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						<Button isDestructive onClick={() => removeReport(index)} style={{ marginTop: '0.5rem' }}>
							{__('Remove Report', 'reports-block')}
						</Button>
					</div>
				))}
			</PanelBody>
		</div>
	);
}
