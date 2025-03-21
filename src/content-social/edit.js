import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    description,
    facebookUrl,
    twitterUrl,
    linkedinUrl,
    mailUrl,
    shareUrl,
    printUrl,
  } = attributes;

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={__('Block Settings', '')}>
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
        </PanelBody>
        <PanelBody title={__('Social Media Links', '')}>
          <TextControl
            label={__('Facebook URL', '')}
            value={facebookUrl}
            onChange={(value) => setAttributes({ facebookUrl: value })}
          />
          <TextControl
            label={__('Twitter URL', '')}
            value={twitterUrl}
            onChange={(value) => setAttributes({ twitterUrl: value })}
          />
          <TextControl
            label={__('LinkedIn URL', '')}
            value={linkedinUrl}
            onChange={(value) => setAttributes({ linkedinUrl: value })}
          />
          <TextControl
            label={__('Mail URL', '')}
            value={mailUrl}
            onChange={(value) => setAttributes({ mailUrl: value })}
          />
          <TextControl
            label={__('Share URL', '')}
            value={shareUrl}
            onChange={(value) => setAttributes({ shareUrl: value })}
          />
          <TextControl
            label={__('Print URL', '')}
            value={printUrl}
            onChange={(value) => setAttributes({ printUrl: value })}
          />
        </PanelBody>
      </InspectorControls>
	  <div className='d-flex justify-content-between'>
      <h2>{title}</h2>
		
      <div>
        {facebookUrl && <a href={facebookUrl} className='social-link'><span className="dashicons dashicons-facebook-alt"></span></a>}
        {twitterUrl && <a href={twitterUrl} className='social-link'><span className="dashicons dashicons-twitter"></span></a>}
        {linkedinUrl && <a href={linkedinUrl} className='social-link'><span className="dashicons dashicons-linkedin"></span></a>}
        {mailUrl && <a href={mailUrl} className='social-link'><span className="dashicons dashicons-email-alt"></span></a>}
        {shareUrl && <a href={shareUrl} className='social-link'><span className="dashicons dashicons-share"></span></a>}
        {printUrl && <a href={printUrl} className='social-link'><span className="dashicons dashicons-printer"></span></a>}
      </div>
	  </div>
      <p>{description}</p>
    </div>
  );
}
