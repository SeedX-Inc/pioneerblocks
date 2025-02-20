import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  return (
    <div {...useBlockProps.save()}>
      <h2>{attributes.title}</h2>
      <div className="video-slider">
        {attributes.slides.map((slide, index) => (
          <div key={index} className="video-slide">
            {slide.videoUrl ? (
              <iframe
                src={slide.videoUrl}
                title="Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            ) : (
              <img src={slide.heroImage || 'default-thumbnail.jpg'} alt="Slide Media" />
            )}
            <h3>{slide.title}</h3>
            <p>{slide.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
