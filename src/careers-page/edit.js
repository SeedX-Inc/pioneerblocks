import { TabPanel, PanelBody, TextControl } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import Career from './career-block'; // Import the Career Content Tab component
import Internship from './internship-block'; // Import the Internship Tab component

const Edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();

	// Handle main tab change
	const onMainTabChange = (tabName) => {
		setAttributes({ activeMainTab: tabName });
	};

	// Handle content change for career sub-tabs
	const onCareerTabChange = (tabName, newContent) => {
		setAttributes({
			careerContentTabs: {
				...attributes.careerContentTabs,
				[tabName]: {
					...attributes.careerContentTabs[tabName],
					content: newContent
				}
			}
		});
	};
	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title='Social Media Links'>
					<TextControl
						label='Print URL'
						value={attributes.icons[0]?.printUrl || ''}
						onChange={(value) =>
							setAttributes({
								icons: [
									{
										...attributes.icons[0],
										printUrl: value,
									},
								],
							})
						}
					/>
					<TextControl
						label='Facebook URL'
						value={attributes.icons[0]?.facebookUrl || ''}
						onChange={(value) =>
							setAttributes({
								icons: [
									{
										...attributes.icons[0],
										facebookUrl: value,
									},
								],
							})
						}
					/>
					<TextControl
						label='Twitter URL'
						value={attributes.icons[0]?.twitterUrl || ''}
						onChange={(value) =>
							setAttributes({
								icons: [
									{
										...attributes.icons[0],
										twitterUrl: value,
									},
								],
							})
						}
					/>
					<TextControl
						label='LinkedIn URL'
						value={attributes.icons[0]?.linkedinUrl || ''}
						onChange={(value) =>
							setAttributes({
								icons: [
									{
										...attributes.icons[0],
										linkedinUrl: value,
									},
								],
							})
						}
					/>
					<TextControl
						label='Mail URL'
						value={attributes.icons[0]?.mailUrl || ''}
						onChange={(value) =>
							setAttributes({
								icons: [
									{
										...attributes.icons[0],
										mailUrl: value,
									},
								],
							})
						}
					/>
					<TextControl
						label='Share URL'
						value={attributes.icons[0]?.shareUrl || ''}
						onChange={(value) =>
							setAttributes({
								icons: [
									{
										...attributes.icons[0],
										shareUrl: value,
									},
								],
							})
						}
					/>
				</PanelBody>
			</InspectorControls>
			<p style={{fontStyle: 'italic', color: '#666', marginBottom: '1em'}}>
				Hint: You can structure content using simple markers:<br/>
				<code>##</code> for titles<br/>
				<code>--</code> for list titles<br/>
				<code>-</code> for list items<br/>
				Just type normal text for plain paragraphs<br/>
				Example:<br/><br/>
				<code>
					## Internship Overview<br/>
					This is a plain paragraph.<br/>
					-- What You'll Learn<br/>
					- JavaScript Fundamentals<br/>
					- React Basics<br/>
				</code>
			</p>
			{/* Tab Panel - Choose which page to display */}
			<TabPanel
				className="careers-tab-panel"
				activeClass="active-tab"
				onSelect={onMainTabChange}
				initialTabName={attributes.activeMainTab}
				tabs={[
					{name: 'career-content', title: 'Career Content', className: 'tab-career-content'},
					{name: 'internship', title: 'Internship', className: 'tab-internship'},
				]}
			>
				{(tab) => (
					<div className={`careers-tab-content ${tab.name}`}>
						{/* Render Career Content Page */}
						{tab.name === 'career-content' && (
							<Career
								attributes={attributes}
								setAttributes={setAttributes}
								onCareerTabChange={onCareerTabChange}
							/>
						)}
						{/* Render Internship Page */}
						{tab.name === 'internship' && (
							<Internship
								attributes={attributes}
								setAttributes={setAttributes}
							/>
						)}
					</div>
				)}
			</TabPanel>
		</div>
	);
};

export default Edit;
