import { RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { backgroundImage, mobileBackgroundImage, title, description, buttons } = attributes;

	return (
		<div
			className="latest-news-block"
			style={{
				backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				margin: '24px 0'
			}}
			data-mobile-background={mobileBackgroundImage}
		>
			<div className="content-wrapper container py-4 text-white">
				<RichText.Content
					tagName="p"
					value={title || ''}
					className="text-white fs-2 fw-bold text-uppercase mb-4"
				/>
				<div className="description d-block">
					<RichText.Content
						tagName="p"
						value={description || ''}
						className="mb-4"
					/>
					<div className="buttons">
						{buttons && buttons.length > 0
							? buttons.map((button, index) => (
								<a
									key={index}
									href={button.link || '#'}
									className="btn"
									style={{
										fontWeight: '700',
										color: button.textColor || '#000000',
										backgroundColor: button.backgroundColor || '#ffffff',
										marginRight: '10px',
										borderRadius: 0,
										padding: '10px 20px',
										wordBreak: 'normal'
									}}
								>
									{button.text || 'Button'}
								</a>
							))
							: null}
					</div>
				</div>
			</div>
		</div>
	);
}
