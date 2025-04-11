import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, URLInput } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
	  title,
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

  const blockProps = useBlockProps({
    className: 'subscription-form-block',
    style: {
      background: 'linear-gradient(to right, #34495e, #2c3e50)',
      color: '#fff',
      padding: '20px',
      textAlign: 'center',
    },
  });

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Form Settings', '')}>
			<TextControl
				label={__('Title', '')}
				value={title}
				onChange={(value) => setAttributes({ title: value })}
			/>
          <TextControl
            label={__('Description', '')}
            value={description}
            onChange={(value) => setAttributes({ description: value })}
          />
          <TextControl
            label={__('Button Text', '')}
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
          />
        </PanelBody>
        <PanelBody title={__('Social Media Links', '')}>
          <TextControl
            label={__('Facebook URL', '')}
            value={facebookUrl}
            onChange={(value) => setAttributes({ facebookUrl: value })}
          />
          <TextControl
            label={__('YouTube URL', '')}
            value={youtubeUrl}
            onChange={(value) => setAttributes({ youtubeUrl: value })}
          />
          <TextControl
            label={__('Twitter URL', '')}
            value={twitterUrl}
            onChange={(value) => setAttributes({ twitterUrl: value })}
          />
          <TextControl
            label={__('Instagram URL', '')}
            value={instagramUrl}
            onChange={(value) => setAttributes({ instagramUrl: value })}
          />
          <TextControl
            label={__('LinkedIn URL', '')}
            value={linkedinUrl}
            onChange={(value) => setAttributes({ linkedinUrl: value })}
          />
        </PanelBody>
      </InspectorControls>
      <p>{description}</p>
      <h2 className='text-light fs-5'>{title}</h2>
      <div className="d-flex justify-content-center gap-2 mb-2">
        <input
          type="text"
          placeholder="first name"
		      className='p-2'
          disabled
        />
        <input
          type="text"
          placeholder="last name"
		      className='p-2'
          disabled
        />
      </div>
      <input
        type="email"
        placeholder="email"
		    className='p-2 mb-2 w-75'
        disabled
      />
      <button
		    className='p-2 mb-2 w-75'
        style={{
          backgroundColor: '#f1c40f',
          cursor: 'pointer',
        }}
        disabled
      >
        {buttonText}
      </button>
      <div >
        <a href={facebookUrl} className='text-decoration-none my-0 mx-1 text-light'><span className="dashicons dashicons-facebook-alt"></span></a>
        <a href={youtubeUrl} className='text-decoration-none my-0 mx-1 text-light'><span className="dashicons dashicons-youtube"></span></a>
        <a href={twitterUrl} className='text-decoration-none my-0 mx-1 text-light'><span className="dashicons dashicons-twitter"></span></a>
        <a href={instagramUrl} className='text-decoration-none my-0 mx-1 text-light'><span className="dashicons dashicons-instagram"></span></a>
        <a href={linkedinUrl} className='text-decoration-none my-0 mx-1 text-light'><span className="dashicons dashicons-linkedin"></span></a>
      </div>
    </div>
  );
}
