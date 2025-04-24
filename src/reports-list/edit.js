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
				{ reportTitle: '', fileUrl: '' },
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
		<div {...useBlockProps({ className: 'reports-no-image-block' })}>
			<PanelBody title={__('Reports (No Image)', 'reports-no-image')}>
				<RichText
					tagName="h2"
					value={title}
					onChange={(val) => setAttributes({ title: val })}
					placeholder={__('Block Title', 'reports-no-image')}
				/>

				<Button isPrimary onClick={addReport} style={{ marginBottom: '1rem' }}>
					{__('Add Report', 'reports-no-image')}
				</Button>

				{reports.map((report, index) => (
					<div key={index} className="report-item">
						<RichText
							tagName="h3"
							value={report.reportTitle}
							onChange={(val) => updateReport(index, 'reportTitle', val)}
							placeholder={__('Report Title', 'reports-no-image')}
						/>

						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => updateReport(index, 'fileUrl', media.url)}
								allowedTypes={['application/pdf']}
								render={({ open }) => (
									<Button onClick={open} isSecondary>
										{report.fileUrl ? __('Change File', 'reports-no-image') : __('Upload PDF', 'reports-no-image')}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						<Button isDestructive onClick={() => removeReport(index)} style={{ marginTop: '0.5rem' }}>
							{__('Remove Report', 'reports-no-image')}
						</Button>
					</div>
				))}
			</PanelBody>
		</div>
	);
}
