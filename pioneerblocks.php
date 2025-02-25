<?php
/**
 * Plugin Name:       Pioneer blocks
 * Description:       Pioneer custom blocks.
 * Version:           0.1.3
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pioneerblocks
 * Plugin URI:        https://github.com/SeedX-Inc/pioneerblocks
 * GitHub Plugin URI: https://github.com/SeedX-Inc/pioneerblocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function create_block_pioneerblocks_block_init() {
	register_block_type( __DIR__ . '/build/home-hero-slider' );
	register_block_type( __DIR__ . '/build/simple-content-block' );
	register_block_type( __DIR__ . '/build/values-block' );
	register_block_type( __DIR__ . '/build/video-slider' );
	register_block_type( __DIR__ . '/build/directors-list' );
}
add_action( 'init', 'create_block_pioneerblocks_block_init' );
function enqueue_custom_block_assets() {
	wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', array(), '5.3.2');
	wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array('jquery'), '5.3.2', true);
}
add_action('enqueue_block_assets', 'enqueue_custom_block_assets');
