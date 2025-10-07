<?php

/**
 * Plugin Name:       Pioneer blocks
 * Description:       Pioneer custom blocks.
 * Version:           0.1.21
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

if (! defined('ABSPATH')) {
	exit;
}
function pioneerblocks_register_block_category($categories, $post) {
	return array_merge(
		[
			[
				'slug'  => 'seedx_blocks_other',
				'title' => __('Pioneer Blocks: Other pages and common blocks', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
			[
				'slug'  => 'seedx_blocks_home',
				'title' => __('Pioneer Blocks: Home page', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
			[
				'slug'  => 'seedx_blocks_pillar',
				'title' => __('Pioneer Blocks: Pillar pages', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
			[
				'slug'  => 'seedx_blocks_podcasts',
				'title' => __('Pioneer Blocks: Podcasts pages', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
			[
				'slug'  => 'seedx_blocks_donate',
				'title' => __('Pioneer Blocks: Donate page', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
			[
				'slug'  => 'seedx_blocks_about',
				'title' => __('Pioneer Blocks: About, Career and Mission pages', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
			[
				'slug'  => 'seedx_blocks_staff',
				'title' => __('Pioneer Blocks: Staff pages', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
			[
				'slug'  => 'seedx_blocks_finances',
				'title' => __('Pioneer Blocks: Finances page', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
			[
				'slug'  => 'seedx_blocks_events',
				'title' => __('Pioneer Blocks: Events page', 'pioneerblocks'),
				'icon'  => 'blocks',
			],
			[
				'slug'  => 'seedx_blocks_pages',
				'title' => __('Pioneer Blocks: Bookshelf page, ', 'pioneerblocks'),
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
		__DIR__ . '/build/email-banner',
		__DIR__ . '/build/single-staff',
		__DIR__ . '/build/content-social',
		__DIR__ . '/build/podcast-banner',
		__DIR__ . '/build/favourite-episodes',
		__DIR__ . '/build/podcast-hero-slider',
		__DIR__ . '/build/content-social-podcast',
		__DIR__ . '/build/latest-episodes',
		__DIR__ . '/build/featured-episode',
		__DIR__ . '/build/featured-event',
		__DIR__ . '/build/books-list',
		__DIR__ . '/build/our-history',
		__DIR__ . '/build/careers-page',
		__DIR__ . '/build/career-content-section', // Sub-block for repeatable content
		__DIR__ . '/build/internship-subsection',
		__DIR__ . '/build/upcoming-previous-events',
		__DIR__ . '/build/signature-events',
		__DIR__ . '/build/annual-reports',
		__DIR__ . '/build/reports-list',
		__DIR__ . '/build/pioneer-stewards-accordeon',
		__DIR__ . '/build/donation-accordeon',
		__DIR__ . '/build/donation-page-banner',
		__DIR__ . '/build/stewards-content-block',
		__DIR__ . '/build/search-page',
		__DIR__ . '/build/pillar-podcasts',
		__DIR__ . '/build/get-involved-page',
		__DIR__ . '/build/release-page',
		__DIR__ . '/build/facts-page',
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
add_action('init', 'create_block_pioneerblocks_block_init');
function enqueue_custom_block_assets()
{
	wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', array(), '5.3.2');
	wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array('jquery'), '5.3.2', true);
}
add_action('enqueue_block_assets', 'enqueue_custom_block_assets');
function pioneerblocks_enqueue_all_view_scripts() {
	// Make sure this runs AFTER all blocks are registered
	foreach ( WP_Block_Type_Registry::get_instance()->get_all_registered() as $block_type ) {
		if ( ! empty( $block_type->view_script_handles ) ) {
			foreach ( $block_type->view_script_handles as $handle ) {
				if ( ! wp_script_is( $handle, 'enqueued' ) ) {
					wp_enqueue_script( $handle );

					// Localize the REST URL for this script
					wp_localize_script(
						$handle,
						'pioneerblocksData',
						[
							'restUrl' => esc_url( rest_url() ),
						]
					);
				}
			}
		}
	}
}
add_action( 'wp_enqueue_scripts', 'pioneerblocks_enqueue_all_view_scripts', 20 );
