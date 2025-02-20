<?php
/**
 * Plugin Name:       Pioneer blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pioneerblocks
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
}
add_action( 'init', 'create_block_pioneerblocks_block_init' );
