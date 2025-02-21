import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { blockTitle, svgValues } = attributes;

	return (
		<div {...useBlockProps.save()} className="container">
			<RichText.Content tagName="h2" className="text-center mb-4" value={blockTitle} />

			<div className="row">
				{svgValues.map((svg, index) => (
					<div key={index} className="col-md-4 mb-4">
						<div className="card h-100 text-center p-3">
							<div className="d-flex flex-column align-items-center">
								<div className="d-flex align-items-center">
									{svg.imageUrl && <img src={svg.imageUrl} alt={svg.title} width="20" height="20"
														  className="img-fluid mb-2"/>}
									<RichText.Content tagName="h3" className="fw-bold text-primary" value={svg.title}/>
								</div>
								<RichText.Content tagName="p" className="text-muted" value={svg.description}/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Save;
