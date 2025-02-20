import { useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes } ) => {
	const { title, description, imageUrl, imageRight } = attributes;
	const blockProps = useBlockProps.save( {
		className: `image-${ imageRight ? 'right' : 'left' }`,
	} );

	return (
		<div { ...blockProps }>
			{ imageUrl && <img src={ imageUrl } alt="" /> }
			<div className="text-content">
				{ title && <h2>{ title }</h2> }
				{ description && <p>{ description }</p> }
			</div>
		</div>
	);
};

export default Save;
