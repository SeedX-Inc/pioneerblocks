import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { links, backgroundColor } = attributes;

	return (
		<div
			{...useBlockProps.save({
				style: {backgroundColor}
			})}
		>
			<div className="container">
				<div className="d-flex gap-4 py-3">
				{links.map((link, index) => (
					<a
						key={index}
						href={link.url}
						style={{color: link.color, textDecoration: 'none'}}
						target="_blank"
						rel="noopener noreferrer"
					>
						{link.text}
					</a>
				))}
				</div>
			</div>

		</div>
	);
}
