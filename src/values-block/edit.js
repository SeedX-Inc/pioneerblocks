import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	MediaUpload,
} from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
  const { blockTitle, svgValues } = attributes;

  const updateSVGValue = (index, newTitle, newDescription, newImageUrl) => {
    const updatedValues = [...svgValues];
    updatedValues[index] = { 
      title: newTitle, 
      description: newDescription,
      imageUrl: newImageUrl 
    };
    setAttributes({ svgValues: updatedValues });
  };

  const updateBlockTitle = (newTitle) => {
    setAttributes({ blockTitle: newTitle });
  };

  return (
    <div {...useBlockProps()}>
      <TextControl
        label={__('Block Title', 'my-custom-block')}
        value={blockTitle}
        onChange={updateBlockTitle}
      />
      <h3>{__('SVG Section', 'my-custom-block')}</h3>
      <hr />
      {svgValues.map((value, index) => (
        <div key={index} className="svg-row">
          <div className="svg-image">
            <MediaUpload
              onSelect={(media) => updateSVGValue(index, value.title, value.description, media.url)}
              allowedTypes={['image', 'image/svg+xml']}
              value={value.imageUrl}
              render={({ open }) => (
                <Button onClick={open}>
                  {value.imageUrl ? __('Change Image', 'my-custom-block') : __('Select Image', 'my-custom-block')}
                </Button>
              )}
            />
          </div>
          <div className="svg-titles">
            <TextControl
              label={__('SVG Title', 'my-custom-block')}
              value={value.title}
              onChange={(newTitle) => updateSVGValue(index, newTitle, value.description, value.imageUrl)}
            />
          </div>
          <div className="svg-descriptions">
            <TextControl
              label={__('SVG Description', 'my-custom-block')}
              value={value.description}
              onChange={(newDescription) => updateSVGValue(index, value.title, newDescription, value.imageUrl)}
            />
          </div>
        </div>
      ))}
      <Button
        isPrimary
        onClick={() =>
          setAttributes({
            svgValues: [
              ...svgValues,
              { title: 'New SVG', description: 'New Description', imageUrl: '' },
            ],
          })
        }
      >
        {__('Add SVG', 'my-custom-block')}
      </Button>
    </div>
  );
};

export default Edit;
