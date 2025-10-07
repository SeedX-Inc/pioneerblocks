import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  return (
    <div
      {...useBlockProps.save({ className: 'wp-block-create-block-latest-news' })}
      data-attributes={JSON.stringify(attributes)}
    />
  );
}