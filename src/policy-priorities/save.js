import { RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, slides } = attributes;

	return (
		<div className="policy-priorities-block">
			<h2>{title}</h2>
			<div className="row">
				<div className="col-4">
					<ul className="policy-list">
						{slides.map((slide, index) => (
							<li key={index} className={index === 0 ? 'active' : ''}>
								{slide.title}
							</li>
						))}
					</ul>
				</div>
				<div className="col-8">
					{slides.length > 0 && (
						<div className="policy-content">
							<RichText.Content tagName="p" value={slides[0].description} />
							<div className="tags">
								{slides[0].tags.map((tag, index) => (
									<span
										key={index}
										className="tag"
										style={{ backgroundColor: tag.backgroundColor }}
									>
										{tag.text}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
