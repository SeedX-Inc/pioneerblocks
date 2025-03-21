import { useBlockProps } from '@wordpress/block-editor';

const save = ({ attributes }) => {
  const { director = {} } = attributes;

  return (
    <div {...useBlockProps.save()}>
      <h3>{director.name}</h3>
      <p>Email: <a href={`mailto:${director.mail}`}>{director.mail}</a></p>
      <p>Phone: <a href={`tel:${director.phone}`}>{director.phone}</a></p>
      <p>Twitter: <a href={`https://twitter.com/${director.twitter}`} target="_blank" rel="noopener noreferrer">@{director.twitter}</a></p>
      <p>{director.descriptionFull}</p>
      
      {director.image && (
        <div className="image-preview">
          <img src={director.image} alt={director.name} width="150" />
        </div>
      )}
    </div>
  );
};

export default save;
