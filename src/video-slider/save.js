import { RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { title, slides } = attributes;

	return (
		<div className="block-container container pb-4">
			<RichText.Content
				tagName="p"
				value={title || ''}
				className="border-bottom-light font-bodoni text-blue-main fs-2 fw-bold"
			/>
			<div className="video-wrapper">
				{slides && slides.length > 0 && slides.map((slide, index) => (
					<div
						key={index}
						className={`row g-0 ${slide.position === 'right' ? 'flex-row-reverse' : ''} justify-content-between position-relative`}
					>
						<div className="col-md-5 p-0">
							<div className="media-wrapper position-relative">
								{slide.videoUrl ? (
									<iframe
										src={slide.videoUrl}
										width="100%"
										height="100%"
										title="Video"
										className="video-embed"
										frameBorder="0"
										allow="autoplay; encrypted-media"
										allowFullScreen
									></iframe>
								) : slide.heroImage ? (
									<img
										src={slide.heroImage}
										alt="Slide Media"
										className="image-media img-fluid"
									/>
								) : (
									<img
										src="default-thumbnail.jpg"
										alt="Default Thumbnail"
										className="image-media img-fluid"
									/>
								)}
							</div>
						</div>
						<RichText.Content
							tagName="p"
							value={slide.title || ''}
							className="my-0 mb-1 text-white fs-4 fw-bold d-block d-md-none position-absolute"
							style={{ left: '5px' }}
						/>
						<div className="col-md-6 d-flex flex-column text-start pt-md-0 p-4 ps-0">
							<RichText.Content
								tagName="p"
								value={slide.title || ''}
								className="my-0 mb-1 text-blue-main fs-4 fw-bold d-none d-md-block"
							/>
							<RichText.Content
								tagName="p"
								value={slide.subtitle || ''}
								className="mb-0"
							/>
							<div className="buttons-wrapper d-flex justify-content-start">
								{slide.buttons && slide.buttons.map((button, btnIndex) => (
									<a
										key={btnIndex}
										href={button.link || '#'}
										target="_blank"
										rel="noopener noreferrer"
										className="me-2"
									>
										<button
											className={`button-slider fw-bold ${
												button.text.toLowerCase() === 'engage'
													? 'button-engage'
													: 'button-subscribe'
											}`}
											style={{ backgroundColor: button.color || '' }}
										>
											{button.text || ''}
										</button>
									</a>
								))}
							</div>
						</div>
					</div>
				))}
				<div className="custom-pagination"></div>
			</div>
		</div>
	);
};

export default Save;
