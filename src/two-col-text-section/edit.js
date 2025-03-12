import {__} from '@wordpress/i18n';
import {useBlockProps, RichText, InspectorControls, PanelColorSettings} from '@wordpress/block-editor';
import {PanelBody} from '@wordpress/components';
import './editor.scss';

export default function Edit({attributes, setAttributes}) {
	const {title, columnOne, columnTwo, backgroundColor} = attributes;

	return (
		<div {...useBlockProps({style: {background: `linear-gradient(to right, white, ${backgroundColor})`}})}>
			<InspectorControls>
				<PanelBody title={__('Background Color', 'two-column-text')}>
					<PanelColorSettings
						title={__('Background Color', 'two-column-text')}
						colorSettings={[{
							value: backgroundColor,
							onChange: (color) => setAttributes({backgroundColor: color}),
							label: __('Background Color', 'two-column-text')
						}]}
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				tagName="h2"
				value={title}
				onChange={(value) => setAttributes({title: value})}
				placeholder={__('Enter title...', 'two-column-text')}
			/>
			<div className="columns-container row">
				<div className="col-6">
					<RichText
						tagName="p"
						value={columnOne}
						onChange={(value) => setAttributes({columnOne: value})}
						placeholder={__('Enter left column text...', 'two-column-text')}
					/>
				</div>
				<div className="col-6">
					<RichText
						tagName="p"
						value={columnTwo}
						onChange={(value) => setAttributes({columnTwo: value})}
						placeholder={__('Enter right column text...', 'two-column-text')}
					/>
				</div>
			</div>
		</div>
	);
}
