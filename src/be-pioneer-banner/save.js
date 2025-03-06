import { RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { backgroundImage, title, description, buttons } = attributes;

	return (
		<div
			className="latest-news-block"
			style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
		>
			<div className="content-wrapper container py-4 text-white">
				<RichText.Content tagName="h2" value={title} />
				<RichText.Content tagName="p" value={description} />
				<div className="buttons">
					{buttons.map((button, index) => (
						<a
							key={index}
							href={button.link || '#'}
							className="btn"
							style={{
								color: button.textColor,
								backgroundColor: button.backgroundColor,
								marginRight: '10px',
							}}
						>
							{button.text}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
