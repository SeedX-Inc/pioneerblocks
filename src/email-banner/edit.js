import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, URLInput } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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
            label={__('Description', '')}
            value={description}
            onChange={(value) => setAttributes({ description: value })}
          />
          <TextControl
            label={__('First Name Placeholder', '')}
            value={firstNamePlaceholder}
            onChange={(value) => setAttributes({ firstNamePlaceholder: value })}
          />
          <TextControl
            label={__('Last Name Placeholder', '')}
            value={lastNamePlaceholder}
            onChange={(value) => setAttributes({ lastNamePlaceholder: value })}
          />
          <TextControl
            label={__('Email Placeholder', '')}
            value={emailPlaceholder}
            onChange={(value) => setAttributes({ emailPlaceholder: value })}
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
      <h2 style={{ fontSize: '2em', color: '#fff' }}>Get Updates</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder={firstNamePlaceholder}
          style={{ padding: '10px', border: 'none', borderRadius: '5px' }}
          disabled
        />
        <input
          type="text"
          placeholder={lastNamePlaceholder}
          style={{ padding: '10px', border: 'none', borderRadius: '5px' }}
          disabled
        />
      </div>
      <input
        type="email"
        placeholder={emailPlaceholder}
        style={{ padding: '10px', border: 'none', borderRadius: '5px', width: '200px', marginBottom: '20px' }}
        disabled
      />
      <button
        style={{
          backgroundColor: '#f1c40f',
          color: '#333',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled
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
  );
}