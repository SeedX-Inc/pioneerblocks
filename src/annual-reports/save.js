import { RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, reports = [] } = attributes;

	return (
		<div className="reports-block">
			{title && <RichText.Content tagName="h2" value={title} />}

			<div className="reports-list">
				{reports.map((report, index) => (
					<div key={index} className="report-item">
						{report.fileUrl ? (
							<a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
								{report.imageUrl && <img src={report.imageUrl} alt={report.reportTitle} />}
								{report.reportTitle && (
									<RichText.Content tagName="h3" value={report.reportTitle} />
								)}
							</a>
						) : (
							<>
								{report.imageUrl && <img src={report.imageUrl} alt={report.reportTitle} />}
								{report.reportTitle && (
									<RichText.Content tagName="h3" value={report.reportTitle} />
								)}
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
