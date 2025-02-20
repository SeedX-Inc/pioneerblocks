import { __ } from '@wordpress/i18n';
const Save = ({ attributes }) => {
  const { blockTitle, svgValues } = attributes;

  return (
    <div className="my-custom-block">
      <h3>{blockTitle}</h3> {/* Display the editable block title */}
      <hr />
      <div>
        {svgValues.map((value, index) => (
          <div key={index} className="svg-row">
            <div className="svg-image">
              {value.imageUrl && <img src={value.imageUrl} alt={value.title} />}
            </div>
            <div className="svg-titles">
              <h4>{value.title}</h4>
            </div>
            <div className="svg-descriptions">
              <p>{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;
