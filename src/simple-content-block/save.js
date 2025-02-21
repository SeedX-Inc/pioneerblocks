import {useBlockProps} from '@wordpress/block-editor';

const Save = ({attributes}) => {
	const {title, description, imageUrl, imageRight} = attributes;
	const blockProps = useBlockProps.save({
		className: `content-block row justify-content-between g-0 ${imageRight ? 'flex-row-reverse' : ''}`,
	});

	return (
		<div className="container py-3">
			<div {...blockProps}>
				<div className="col-md-5">
					{imageUrl && <img src={imageUrl} alt={title || "Content Image"}
									  className=" img-fluid rounded d-none d-lg-block"/>}
				</div>
				<div className="col-md-6 align-self-center">
					<div className="text-content">
						{title && <h2 className="border-bottom pb-2">{title}</h2>}
						{imageUrl && <img src={imageUrl} alt={title || "Content Image"}
										  className="img-fluid rounded d-lg-none d-block"/>}
						{description && <p>{description}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Save;
