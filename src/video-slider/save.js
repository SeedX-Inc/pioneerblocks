import { RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { title, slides } = attributes;

	// Only show the first slide for the saved content
	const slide = slides[0];

	return (
		<div className="block-container">
			<h2>{title}</h2>
			<div className="container">
				<div className="row">
					{slide && (
						<>
							<div className="col-6">
								{slide.videoUrl ? (
									<video style={{
										maxWidth: '200px',
										maxHeight: '200px'
									}} src={slide.videoUrl} controls />
								) : (
									<img src={slide.heroImage} alt="Slide" />
								)}
							</div>
							<div className="col-6">
								<RichText.Content tagName="h3" value={slide.title} />
								<RichText.Content tagName="p" value={slide.subtitle} />
								<div className="buttons">
									{slide.buttons.map((button, i) => (
										<a
											key={i}
											href={button.link}
											className="btn"
											style={{ backgroundColor: button.color }}
										>
											{button.text}
										</a>
									))}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Save;
