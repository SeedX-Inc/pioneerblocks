import {useBlockProps, RichText} from '@wordpress/block-editor';

export default function Save({attributes}) {
	const {title, directors} = attributes;

	// Properly encode JSON with straight quotes
	const directorsData = JSON.stringify(directors)
		.replace(/</g, '\\u003c') // Escape < to prevent HTML parsing issues
		.replace(/>/g, '\\u003e');

	return (
		<div {...useBlockProps.save({className: 'directors-list'})} className="container">
			{title && <RichText.Content tagName="h2" value={title} className="directors-header"/>}
			<div className="directors-container">
				{directors.map((director, index) => (
					<div key={index} className="director-item d-flex flex-column" data-index={index}>
						{director.image && director.showImage &&
							<img src={director.image} className="mb-1" alt={director.name} style={{
								maxHeight: '200px',
								maxWidth: '200px',
								objectFit: 'contain',
								borderRadius: '12px'
							}}/>}
						<strong className="director-name">{director.name}</strong>
						{director.description && (
							<RichText.Content tagName="p" value={director.description}
											  className="director-description mb-1"/>
						)}

						{director.phone && director.mail && director.twitter && (
							<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path
									d="M25.5 4H4.5C3.57205 4.00099 2.68238 4.3686 2.02622 5.02217C1.37006 5.67574 1.00099 6.56188 1 7.48617V22.4269C1.00099 23.3512 1.37006 24.2373 2.02622 24.8909C2.68238 25.5444 3.57205 25.9121 4.5 25.913H25.5C26.428 25.9121 27.3176 25.5444 27.9738 24.8909C28.6299 24.2373 28.999 23.3512 29 22.4269V7.48617C28.999 6.56188 28.6299 5.67574 27.9738 5.02217C27.3176 4.3686 26.428 4.00099 25.5 4ZM24.6138 9.76649L15.6138 16.7388C15.4382 16.8747 15.2223 16.9485 15 16.9485C14.7777 16.9485 14.5618 16.8747 14.3862 16.7388L5.38625 9.76649C5.28051 9.68695 5.19169 9.58728 5.12496 9.47325C5.05823 9.35923 5.01491 9.23313 4.99753 9.10229C4.98015 8.97145 4.98905 8.83847 5.02371 8.71108C5.05837 8.5837 5.1181 8.46444 5.19944 8.36025C5.28077 8.25605 5.38208 8.169 5.49749 8.10414C5.61289 8.03929 5.74008 7.99792 5.87168 7.98245C6.00327 7.96698 6.13664 7.97772 6.26403 8.01403C6.39142 8.05034 6.5103 8.11151 6.61375 8.19398L15 14.6907L23.3862 8.19398C23.596 8.03625 23.8596 7.96707 24.1201 8.0014C24.3806 8.03573 24.617 8.17082 24.7783 8.37746C24.9396 8.58409 25.0128 8.84565 24.982 9.10559C24.9512 9.36553 24.8189 9.60294 24.6138 9.76649Z"
									fill="#293C5C"/>
							</svg>
						)}
					</div>
				))}
			</div>

			{/* Store directors data in a hidden div */}
			<div id="directors-data" style={{display: 'none'}} data-json={directorsData}></div>

			<div className="director-details hidden">
				<button className="back-button">Back</button>
				<div className="director-content"></div>
			</div>
		</div>
	);
}
