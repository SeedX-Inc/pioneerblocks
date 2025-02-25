import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { blockTitle, svgValues } = attributes;

	return (
		<div {...useBlockProps.save()} className="container">
			<RichText.Content tagName="h2" className="text-start my-4" value={blockTitle} />

			<div className="row g-2">
				{svgValues.map((svg, index) => (
					<div key={index} className="col-md-4 mb-4">
						<div className=" h-100 text-center ">
							<div className="d-flex flex-column align-items-start">
								<div className="d-flex align-items-center text-start">
									{svg.imageUrl && <img src={svg.imageUrl} alt={svg.title} width="20" height="20"
														  className="img-fluid mb-2"/>}
									<RichText.Content tagName="h4" className="fw-bold " value={svg.title}/>
								</div>
								<RichText.Content tagName="p" className="text-muted text-start" value={svg.description}/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Save;
