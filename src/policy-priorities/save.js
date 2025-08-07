import { RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, slides } = attributes;

	return (
		<div style={{ backgroundColor: '#FBFAF8' }} className="d-none d-md-block">
			<div className="container">
				<div className="policy-priorities-block">
					<RichText.Content
						tagName="p"
						value={title || 'Policy Priorities'}
						className="font-bodoni text-blue-main fs-2 fw-bold border-bottom-light"
					/>
					<div className="row">
						<div className="col-md-4">
							<ul className="policy-list">
								{slides && slides.length > 0
									? slides.map((slide, index) => (
										<li
											key={index}
											className={index === 0 ? 'active' : ''}
										>
											{slide.title || `Slide ${index + 1}`}
										</li>
									))
									: null}
							</ul>
						</div>
						<div className="col-md-8">
							{slides && slides.length > 0 && (
								<div className="policy-content">
									<RichText.Content
										tagName="p"
										value={slides[0].description || 'No description available'}
										className="text-black"
									/>
									<div className="tags">
										{slides[0].tags && slides[0].tags.length > 0
											? slides[0].tags.map((tag, index) => (
												<span
													key={index}
													className="tag"
													style={{ backgroundColor: tag.backgroundColor || '#849DC1' }}
												>
														{tag.text || 'Tag'}
													</span>
											))
											: null}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
