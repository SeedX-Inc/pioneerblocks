import { RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, reports = [] } = attributes;

	return (
		<div className="reports-no-image-block">
			{title && <RichText.Content tagName="h2" value={title} />}

			<ul className="reports-list">
				{reports.map((report, index) => (
					<li key={index} className="report-item">
						{report.fileUrl ? (
							<a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
								<RichText.Content tagName="h3" value={report.reportTitle} />
							</a>
						) : (
							<RichText.Content tagName="h3" value={report.reportTitle} />
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
