import { RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, featuredEvent, selectedPillar = 'all', showBottomBlock = false } = attributes;

	return (
		<div className="menu-slider py-4 mt-2" data-featured-event={featuredEvent} data-selected-pillar={selectedPillar} data-show-bottom-block={showBottomBlock}>
			<div className="container">
				<div className="row g-0 d-flex flex-row justify-content-between border-bottom-light align-items-center mb-4">
					<div className="col p-0">
						<RichText.Content
							tagName="p"
							value={title || 'Events'}
							className="my-0 text-blue-main fs-2 fw-bold font-bodoni"
						/>
					</div>
					<div className="col p-0 text-end">
						<a href="/events" className="seeAllbtn text-decoration-underline">
							See All
						</a>
					</div>
				</div>
				<div className="row g-0">
					<div className="col-lg-8 mb-4 ps-0">
						<div className="card h-100">
							<div className="card-body">
								<p className="card-body-featured">Featured</p>
								<p className="card-body-title">{__('Featured Event Placeholder', 'event-list')}</p>
								<div className="subtitle d-none d-lg-block">
									{__('Event description placeholder...', 'event-list')}
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4 p-0">
						<div className="row g-3">
							{[1, 2, 3].map((_, index) => (
								<div key={index} className="col-md-12 mb-lg-1">
									<div className="event-card h-100 d-flex flex-row p-2">
										<div className="flex-grow-1">
											<p className="event-type">{__('Webinar', 'event-list')}</p>
											<p className="event-title">{__('Event Placeholder', 'event-list')}</p>
										</div>
										<div className="d-flex flex-row gap-2 h-100">
											<div className="date-badge">
												<span className="date-number font-bodoni">DD</span>
												<span className="date-text">MMM, YYYY</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				{showBottomBlock && (
					<div className="row g-0 mt-4">
						{[1, 2, 3, 4].map((_, index) => (
							<div key={index} className="col-md-3 mb-4">
								<div className="event-card h-100 d-flex flex-row gap-2 p-2">
									<div className="flex-grow-1">
										<p className="event-type">{__('Webinar', 'event-list')}</p>
										<p className="event-title">{__('Event Placeholder', 'event-list')}</p>
									</div>
									<div className="d-flex flex-row gap-2 h-100">
										<div className="date-badge">
											<span className="date-number font-bodoni">DD</span>
											<span className="date-text">MMM, YYYY</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
