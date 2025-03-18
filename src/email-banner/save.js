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
        <div className="container">
            <div {...useBlockProps.save({
                className: 'subscriptionFormBlock', // Keep the block class for custom styling
                style: {
                    background: 'linear-gradient(to right, #859DC1, #293C5C)',
                    color: '#fff',
                    padding: '20px',
                    textAlign: 'center',
                },
            })}>
                <div className="formContainer mx-auto py-4">
                    <p>{description}</p>
                    <h2 className="heading">Get Updates</h2>
                    <div className="inputGroup">
                        <input
                            type="text"
                            className="inputField w-50"
                            placeholder={firstNamePlaceholder}
                        />
                        <input
                            type="text"
                            className="inputField w-50"
                            placeholder={lastNamePlaceholder}
                        />
                    </div>
                    <input
                        type="email"
                        className="emailInput"
                        placeholder={emailPlaceholder}
                    />
                    <button className="submitButton w-100 text-blue-main fw-bold">
                        {buttonText}
                    </button>
                    <div className="mt-2 socialIcons">
                        <a href={facebookUrl} className="text-decoration-none my-0 mx-1 text-light">
                            <span className="dashicons dashicons-facebook-alt"></span>
                        </a>
                        <a href={youtubeUrl} className="text-decoration-none my-0 mx-1 text-light">
                            <span className="dashicons dashicons-youtube"></span>
                        </a>
                        <a href={twitterUrl} className="text-decoration-none my-0 mx-1 text-light">
                            <span className="dashicons dashicons-twitter"></span>
                        </a>
                        <a href={instagramUrl} className="text-decoration-none my-0 mx-1 text-light">
                            <span className="dashicons dashicons-instagram"></span>
                        </a>
                        <a href={linkedinUrl} className="text-decoration-none my-0 mx-1 text-light">
                            <span className="dashicons dashicons-linkedin"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
