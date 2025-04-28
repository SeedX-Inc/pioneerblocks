import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, TextControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, selectedStaff, isImages, isIcons } = attributes;

	const encodeId = (id) => btoa(`post:${id}`);
	const decodeId = (graphqlId) => {
		try {
			const decoded = atob(graphqlId);
			return parseInt(decoded.replace('post:', ''), 10);
		} catch (e) {
			return null;
		}
	};

	const staffOptions = useSelect((select) => {
		const posts = select('core').getEntityRecords('postType', 'staff', { per_page: -1 }) || [];
		return posts.map((post) => ({ label: post.title.rendered, value: encodeId(post.id) }));
	}, []);

	const addStaff = (staffId) => {
		if (!selectedStaff.some((staff) => staff.id === staffId)) {
			setAttributes({
				selectedStaff: [...selectedStaff, { id: staffId, subtitle: '' }],
			});
		}
	};

	const removeStaff = (staffId) => {
		setAttributes({
			selectedStaff: selectedStaff.filter((staff) => staff.id !== staffId),
		});
	};

	const updateSubtitle = (staffId, newSubtitle) => {
		setAttributes({
			selectedStaff: selectedStaff.map((staff) =>
				staff.id === staffId ? { ...staff, subtitle: newSubtitle } : staff
			),
		});
	};

	return (
		<div {...useBlockProps({ className: 'directors-list' })}>
			<InspectorControls>
				<PanelBody title={__('Settings', 'directors-list')} initialOpen={true}>
					<TextControl
						label={__('Block Title', 'data-lab')}
						value={title || ''}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
					/>
					<ToggleControl
						label={__('Show Images', 'directors-list')}
						checked={isImages}
						onChange={(value) => setAttributes({ isImages: value })}
					/>
					<ToggleControl
						label={__('Show Icons', 'directors-list')}
						checked={isIcons}
						onChange={(value) => setAttributes({ isIcons: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Select Staff Members', 'directors-list')} initialOpen={false}>
					<SelectControl
						label={__('Add Staff Member', 'directors-list')}
						options={[{ label: __('Select a staff member', 'directors-list'), value: '' }, ...staffOptions]}
						onChange={(value) => value && addStaff(value)}
					/>
				</PanelBody>
			</InspectorControls>

			<h2>{__('Selected Staff Members', 'directors-list')}</h2>
			<ul>
				{selectedStaff.map((staff) => {
					const staffOption = staffOptions.find((option) => option.value === staff.id);
					return (
						<li key={staff.id}>
							<div>
								<strong>{staffOption?.label || __('Unknown Staff', 'directors-list')}</strong>
								<TextControl
									label={__('Subtitle', 'directors-list')}
									value={staff.subtitle}
									onChange={(newSubtitle) => updateSubtitle(staff.id, newSubtitle)}
									placeholder={__('Enter subtitle', 'directors-list')}
								/>
								<Button isDestructive onClick={() => removeStaff(staff.id)}>
									{__('Remove', 'directors-list')}
								</Button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
