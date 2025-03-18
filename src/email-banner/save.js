import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		firstNamePlaceholder,
		lastNamePlaceholder,
		emailPlaceholder,
		buttonText,
		description,
		facebookUrl,
		youtubeUrl,
		twitterUrl,
		instagramUrl,
		linkedinUrl,
	} = attributes;

	return (
		<div className='container'>
			<div {...useBlockProps.save({
				className: 'subscription-form-block',
				style: {
					background: 'linear-gradient(to right, #859DC1, #293C5C)',
					color: '#fff',
					padding: '20px',
					textAlign: 'center',
				},
			})}>

				<div className='w-50 mx-auto'>
					<p>{description}</p>
					<h2 style={{ fontSize: '2em', color: '#fff' }}>Get Updates</h2>
					<div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
						<input
							type="text"
							className='w-50'
							placeholder={firstNamePlaceholder}
							style={{ padding: '10px', border: 'none', borderRadius: '5px' }}

						/>
						<input
							type="text"
							className='w-50'
							placeholder={lastNamePlaceholder}
							style={{ padding: '10px', border: 'none', borderRadius: '5px' }}

						/>
					</div>
					<input
						type="email"
						placeholder={emailPlaceholder}
						style={{ padding: '10px', border: 'none', borderRadius: '5px', width: '100%', marginBottom: '20px' }}

					/>
					<button
					className='w-100'
						style={{
							backgroundColor: '#f1c40f',
							color: '#333',
							padding: '10px 20px',
							border: 'none',
							borderRadius: '5px',
						}}
					>
						{buttonText}
					</button>
					<div style={{ marginTop: '20px' }}>
						<a href={facebookUrl} style={{ margin: '0 5px', color: '#fff' }}><span className="dashicons dashicons-facebook-alt"></span></a>
						<a href={youtubeUrl} style={{ margin: '0 5px', color: '#fff' }}><span className="dashicons dashicons-youtube"></span></a>
						<a href={twitterUrl} style={{ margin: '0 5px', color: '#fff' }}><span className="dashicons dashicons-twitter"></span></a>
						<a href={instagramUrl} style={{ margin: '0 5px', color: '#fff' }}><span className="dashicons dashicons-instagram"></span></a>
						<a href={linkedinUrl} style={{ margin: '0 5px', color: '#fff' }}><span className="dashicons dashicons-linkedin"></span></a>
					</div>
				</div>
			</div>
		</div>
	);
}