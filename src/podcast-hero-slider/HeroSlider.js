import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import './save.css';
import { Navigation } from 'swiper/modules';

const HeroSlider = ( { slides } ) => {
	useEffect( () => {
		const swiper = new Swiper( '.slider-wrapper', {
			slidesPerView: 1,
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			modules: [ Navigation ],
		} );

		return () => {
			// Clean up Swiper instance on unmount
			console.log( swiper );
			if ( swiper ) swiper.destroy();
		};
	}, [] );

	if ( ! slides || slides.length === 0 ) return null;

	return (
		<div className="slider-wrapper">
			<div className="swiper-wrapper">
				{ slides.map( ( slide, index ) => (
					<div className="swiper-slide" key={ index }>
						<div
							className="slide"
							style={ {
								background: `linear-gradient(to right, white, ${ slide.gradient })`,
							} }
						>
							<div className="row">
								<div className="col-md-6 d-flex flex-column justify-content-center text-start align-items-start p-0 slide-column">
									<h2>{ slide.title }</h2>
									<p>{ slide.subtitle }</p>
									<div className="buttons-wrapper">
										{ slide.buttons?.map(
											( button, btnIndex ) => (
												<a
													key={ btnIndex }
													href={ button.link }
													target="_blank"
													rel="noopener noreferrer"
												>
													<button className="button-slider">
														{ button.text }
													</button>
												</a>
											)
										) }
									</div>
								</div>
								<div className="col-md-6 align-items-center p-0">
									{ slide.heroImage && (
										<img
											src={ slide.heroImage }
											alt="Hero"
											className="hero-image"
										/>
									) }
								</div>
							</div>
						</div>
					</div>
				) ) }
			</div>
			{ /* Navigation buttons should be inside the same container */ }
			<div className="swiper-button-prev"></div>
			<div className="swiper-button-next"></div>
		</div>
	);
};

export default HeroSlider;
