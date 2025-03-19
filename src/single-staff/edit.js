import { useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
  const { director = {} } = attributes;

  const handleDirectorChange = (field, value) => {
    setAttributes({
      director: {
        ...director,
        [field]: value,
      },
    });
  };

  // Handle image upload
  const handleImageChange = (image) => {
    setAttributes({
      director: {
        ...director,
        image: image.url, // Store the image URL
      },
    });
  };

  return (
    <div {...useBlockProps()}>
      <h3>Edit Staff Member</h3>
      
      <div className="staff-member-edit">
        <TextControl
          label="Name"
          value={director.name}
          onChange={(value) => handleDirectorChange('name', value)}
        />
        <TextControl
          label="Email"
          value={director.mail}
          onChange={(value) => handleDirectorChange('mail', value)}
        />
        <TextControl
          label="Phone"
          value={director.phone}
          onChange={(value) => handleDirectorChange('phone', value)}
        />
        <TextControl
          label="Twitter"
          value={director.twitter}
          onChange={(value) => handleDirectorChange('twitter', value)}
        />
        <TextControl
          label="Description"
          value={director.descriptionFull}
          onChange={(value) => handleDirectorChange('descriptionFull', value)}
        />

        {/* Media Upload for Image */}
        <div className="media-upload">
          <MediaUpload
            onSelect={handleImageChange}
            allowedTypes={['image']}
            value={director.image}
            render={({ open }) => (
              <button type="button" onClick={open}>
                {director.image ? 'Change Image' : 'Upload Image'}
              </button>
            )}
          />
          {director.image && (
            <div className="image-preview">
              <img src={director.image} alt={director.name} width="100" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
