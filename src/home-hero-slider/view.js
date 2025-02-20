import React from 'react';
import ReactDOM from 'react-dom';
import HeroSlider from './heroslider';

document.addEventListener( 'DOMContentLoaded', () => {
	const rootElement = document.getElementById( 'hero-slider-root' );
	if ( rootElement ) {
		const slides = JSON.parse( rootElement.getAttribute( 'data-slides' ) );

		ReactDOM.render( <HeroSlider slides={ slides } />, rootElement );
	}
} );
