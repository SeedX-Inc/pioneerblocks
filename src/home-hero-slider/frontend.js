import React from 'react';
import ReactDOM from 'react-dom';
import HeroSlider from './HeroSlider';

document.addEventListener( 'DOMContentLoaded', () => {
	const sliderRoot = document.getElementById( 'hero-slider-root' );

	if ( sliderRoot ) {
		const slides = JSON.parse( sliderRoot.getAttribute( 'data-slides' ) );
		ReactDOM.render( <HeroSlider slides={ slides } />, sliderRoot );
	}
} );
