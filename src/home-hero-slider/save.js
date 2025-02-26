const Save = ({attributes}) => {
	const {slides} = attributes;

	if (!slides || slides.length === 0) return null;

	const slide = slides[0];

	return (
		<div className="slider-wrapper"
			 style={{
				 maxWidth: '100%',
			 }}>
			<div
				className="slide "
				style={{
					display: 'flex',
					minHeight: '60vh',
					alignItems: 'center',
					background: `linear-gradient(to right, #fff, ${slide.gradient || "#ddd"})`,
				}}
			>
				<div className="container">
					<div className="row g-0"
						 style={{
							 textAlign: 'start'
						 }}>
						{/* Left Side: Text Content */}
						<div
							className="col-md-5 d-flex flex-column justify-content-center text-start align-items-start p-0 slide-column">
							<h1 dangerouslySetInnerHTML={{__html: slide.title}}/>
							<p dangerouslySetInnerHTML={{__html: slide.subtitle}}/>
							<div className="buttons-wrapper">
								{slide.buttons?.map((button, btnIndex) => (
									<a
										key={btnIndex}
										href={button.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										<button className="button-slider">{button.text}</button>
									</a>
								))}
							</div>
						</div>

						{/* Right Side: Image */}
						<div className="col-md-6 align-items-center p-0">
							{slide.heroImage && (
								<img
									src={slide.heroImage}
									alt="Hero"
									className="hero-image"
								/>
							)}
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default Save;
