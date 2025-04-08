import { RichText } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

const Career = ({ attributes, setAttributes, onCareerTabChange }) => {
	// Handle tab change (this will set the active tab)
	const onTabSelect = (tabKey) => {
		setAttributes({ activeMainTab: tabKey });
	};
	return (
		<div className="career-content-tabs">
			{/* Tab Panel to handle tab switching */}
			<TabPanel
				className="career-tabs"
				activeClass="active-tab"
				onSelect={onTabSelect}
				initialTabName={attributes.activeMainTab}
				tabs={Object.keys(attributes.careerContentTabs).map((tabKey) => ({
					name: tabKey,
					title: attributes.careerContentTabs[tabKey].title,
					className: `career-tab ${attributes.activeMainTab === tabKey ? 'active' : ''}`,
				}))}
			>
				{(tab) => (
					<div
						key={tab.name}
						className={`career-content-tab ${tab.name === attributes.activeMainTab ? 'active' : ''}`}
					>
						<h3>{attributes.careerContentTabs[tab.name].title}</h3>
						<RichText
							tagName="div"
							multiline="p"
							value={attributes.careerContentTabs[tab.name].content}
							onChange={(content) => onCareerTabChange(tab.name, content)}
							placeholder="Enter description with paragraphs, lists, titles..."
							allowedFormats={['core/bold', 'core/italic', 'core/list']}
						/>
					</div>
				)}
			</TabPanel>
		</div>
	);
};

export default Career;
