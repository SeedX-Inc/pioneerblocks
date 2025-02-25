import { RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { title, slides } = attributes;

	const slide = slides[0];

	return (
		<div className="block-container container">
			<h2>{title}</h2>
			<div className="">
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
							<div className="col-6 align-self-center">
								<RichText.Content tagName="h3" value={slide.title} />
								<RichText.Content tagName="p" value={slide.subtitle} />
								<div className="buttons">
									{slide.buttons.map((button, i) => (
										<a
											key={i}
											href={button.link}
											className="btn me-2 text-white"
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
