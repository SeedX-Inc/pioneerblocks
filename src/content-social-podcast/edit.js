import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';

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
    links,
    linksTitle
  } = attributes;

  const addLink = () => {
    setAttributes({ links: [...links, { text: '', href: '' }] });
  };

  const updateLink = (index, key, value) => {
    const newLinks = links.map((link, i) => (i === index ? { ...link, [key]: value } : link));
    setAttributes({ links: newLinks });
  };

  const removeLink = (index) => {
    setAttributes({ links: links.filter((_, i) => i !== index) });
  };
  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={__('Block Settings', '')}>
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
      <div className=''>
        <h2>{title}</h2>
        <h2>Social links(find our podcasts)</h2>
        <input
          type="text"
          value={linksTitle}
          onChange={(e) => setAttributes({ linksTitle: e.target.value })}
          placeholder={__('Enter links title...', 'text-domain')}
        />

        <div>
          <h4>{__('Links', 'text-domain')}</h4>
          {links.map((link, index) => (
            <div key={index}>
              <TextControl
                value={link.text}
                onChange={(value) => updateLink(index, 'text', value)}
                placeholder={__('Link Text', 'text-domain')}
              />
              <TextControl
                value={link.href}
                onChange={(value) => updateLink(index, 'href', value)}
                placeholder={__('Link URL', 'text-domain')}
              />
              <Button onClick={() => removeLink(index)} isDestructive>
                {__('Remove', 'text-domain')}
              </Button>
            </div>
          ))}
          <Button onClick={addLink} isPrimary>
            {__('Add Link', 'text-domain')}
          </Button>
        </div>
        <div>
          <h2>Social links in blue boxes</h2>
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
