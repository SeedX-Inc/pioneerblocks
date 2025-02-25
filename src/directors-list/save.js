import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, directors } = attributes;

	// Properly encode JSON with straight quotes
	const directorsData = JSON.stringify(directors)
		.replace(/</g, '\\u003c') // Escape < to prevent HTML parsing issues
		.replace(/>/g, '\\u003e');

	return (
		<div {...useBlockProps.save({ className: 'directors-list' })} className="container">
			{title && <RichText.Content tagName="h2" value={title} className="directors-header" />}
			<div className="directors-container">
				{directors.map((director, index) => (
					<div key={index} className="director-item" data-index={index}>
						<strong className="director-name">{director.name}</strong>
						{director.description && (
							<RichText.Content tagName="p" value={director.description} className="director-description" />
						)}
					</div>
				))}
			</div>

			{/* Store directors data in a hidden div */}
			<div id="directors-data" style={{ display: 'none' }} data-json={directorsData}></div>

			<div className="director-details hidden">
				<button className="back-button">Back</button>
				<div className="director-content"></div>
			</div>
		</div>
	);
}
