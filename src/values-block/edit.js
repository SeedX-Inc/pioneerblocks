import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	MediaUpload,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
	const { blockTitle, svgValues } = attributes;

	const updateSVGValue = (index, newTitle, newDescription, newImageUrl) => {
		const updatedValues = [...svgValues];
		updatedValues[index] = {
			title: newTitle,
			description: newDescription,
			imageUrl: newImageUrl,
		};
		setAttributes({ svgValues: updatedValues });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Settings', 'my-custom-block')}>
					<RichText
						tagName="h2"
						value={blockTitle}
						onChange={(newTitle) => setAttributes({ blockTitle: newTitle })}
						placeholder={__('Enter block title...', 'my-custom-block')}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="container">
				<RichText
					tagName="h2"
					className="text-center mb-4"
					value={blockTitle}
					onChange={(newTitle) => setAttributes({ blockTitle: newTitle })}
					placeholder={__('Enter block title...', 'my-custom-block')}
				/>

				<div className="row g-2">
					{svgValues.map((value, index) => (
						<div key={index} className="col-md-4 mb-4">
							<div className=" h-100 text-center ">
								<div className="mb-3">
									<MediaUpload
										onSelect={(media) =>
											updateSVGValue(index, value.title, value.description, media.url)
										}
										allowedTypes={['image', 'image/svg+xml']}
										render={({ open }) => (
											<Button onClick={open} className="btn btn-outline-primary">
												{value.imageUrl ? __('Change Icon', 'my-custom-block') : __('Select Icon', 'my-custom-block')}
											</Button>
										)}
									/>
									{value.imageUrl && <img src={value.imageUrl} alt={value.title} className="img-fluid mt-2" />}
								</div>

								<div className="d-flex flex-column align-items-center text-start">
									<RichText
										tagName="h3"
										className="fw-bold"
										value={value.title}
										onChange={(newTitle) => updateSVGValue(index, newTitle, value.description, value.imageUrl)}
										placeholder={__('Enter Title...', 'my-custom-block')}
									/>
									<RichText
										tagName="p"
										className="text-muted"
										value={value.description}
										onChange={(newDescription) => updateSVGValue(index, value.title, newDescription, value.imageUrl)}
										placeholder={__('Enter Description...', 'my-custom-block')}
									/>
								</div>
							</div>
						</div>
					))}
				</div>

				<Button
					isPrimary
					className="mt-3"
					onClick={() =>
						setAttributes({
							svgValues: [
								...svgValues,
								{ title: 'New Title', description: 'New Description', imageUrl: '' },
							],
						})
					}
				>
					{__('Add Item', 'my-custom-block')}
				</Button>
			</div>
		</div>
	);
};

export default Edit;
