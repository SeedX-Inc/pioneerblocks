<?php
/**
 * Plugin Name:       Pioneer blocks
 * Description:       Pioneer custom blocks.
 * Version:           0.1.13
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
function pioneerblocks_register_block_category($categories, $post) {
	return array_merge(
		[
			[
				'slug'  => 'seedx_blocks',
				'title' => __('Pioneer Blocks', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
		],

		$categories
	);
}
add_filter('block_categories_all', 'pioneerblocks_register_block_category', 10, 2);

function create_block_pioneerblocks_block_init() {
	$block_paths = [
		__DIR__ . '/build/home-hero-slider',
		__DIR__ . '/build/simple-content-block',
		__DIR__ . '/build/values-block',
		__DIR__ . '/build/video-slider',
		__DIR__ . '/build/directors-list',
		__DIR__ . '/build/menu-slider',
		__DIR__ . '/build/latest-news',
		__DIR__ . '/build/home-events',
		__DIR__ . '/build/related-podcasts',
		__DIR__ . '/build/be-pioneer-banner',
		__DIR__ . '/build/policy-priorities',
		__DIR__ . '/build/explore-our-work',
		__DIR__ . '/build/experts-slider',
		__DIR__ . '/build/data-labs',
		__DIR__ . '/build/two-col-text-section',
		__DIR__ . '/build/full-video-section',
		__DIR__ . '/build/newsroom-section',
		__DIR__ . '/build/copy-section',
	];

	foreach ($block_paths as $path) {
		if (file_exists($path . '/block.json')) {
			register_block_type($path);
			error_log("Registered block: $path");
		} else {
			error_log("Block file not found: $path/block.json");
		}
	}
}
add_action( 'init', 'create_block_pioneerblocks_block_init' );
function enqueue_custom_block_assets() {
	wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', array(), '5.3.2');
	wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array('jquery'), '5.3.2', true);
}
add_action('enqueue_block_assets', 'enqueue_custom_block_assets');
// include_once __DIR__ . '/plugin_connect.php';
