import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const { description } = attributes;

		return (
			<RichText
				tagName="p"
				className="block-description"
				value={ description }
				onChange={ (value) => setAttributes({ description: value }) }
				placeholder="Enter description..."
			/>
		);
	},
	save: ({ attributes }) => {
		const { description } = attributes;

		return (
			<RichText.Content
				tagName="p"
				className="block-description"
				value={ description }
			/>
		);
	},
} );
