<?php
/**
 * Plugin Name:       Pioneer blocks
 * Description:       Pioneer custom blocks.
 * Version:           0.1.6
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
}
add_action( 'init', 'create_block_pioneerblocks_block_init' );
function enqueue_custom_block_assets() {
	wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', array(), '5.3.2');
	wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array('jquery'), '5.3.2', true);
}
add_action('enqueue_block_assets', 'enqueue_custom_block_assets');

// Add the GitHub update check function
add_filter('site_transient_update_plugins', 'check_for_plugin_update');

function check_for_plugin_update($transient) {
    // Set GitHub API URL for the plugin repository
    $repo_url = 'https://api.github.com/repos/SeedX-Inc/pioneerblocks/releases/latest';

    // GitHub Personal Access Token
    $token = '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'; // Replace this with your actual token

    // Set headers for authentication
    $headers = array(
        'Authorization' => 'Bearer ' . $token
    );

    // Get the latest release data from GitHub
    $response = wp_remote_get($repo_url, array('headers' => $headers));

    if (is_wp_error($response)) {
        return $transient;
    }

    $data = json_decode(wp_remote_retrieve_body($response));

    // Get the plugin's current version
    $current_version = get_plugin_data(WP_PLUGIN_DIR . '/pioneerblocks/pioneerblocks.php')['Version'];

    // If the new version is newer, mark the plugin for update
    if (version_compare($data->tag_name, $current_version, '>')) {
        $transient->response['pioneerblocks/pioneerblocks.php'] = array(
            'slug' => 'pioneerblocks',
            'new_version' => $data->tag_name,
            'url' => $data->html_url,
            'package' => $data->zipball_url
        );
    }

    return $transient;
}
