<?php

/**
 * Plugin Name:       Pioneer blocks
 * Description:       Pioneer custom blocks.
 * Version:           0.1.15
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
		__DIR__ . '/build/email-banner',
		__DIR__ . '/build/single-staff',
		__DIR__ . '/build/content-social',
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


class PioneerBlocks_Updater
{
	private $plugin_slug;
	private $plugin_file;
	private $github_username;
	private $github_repo;
	private $plugin_data;
	private $github_api_result;
	private $plugin_activated;
	private $log_file;

	/**
	 * Initialize the updater
	 */
	public function __construct()
	{
		$this->plugin_slug = plugin_basename(__FILE__);
		$this->plugin_file = __FILE__;
		$this->github_username = 'SeedX-Inc';
		$this->github_repo = 'pioneerblocks';
		$this->log_file = WP_CONTENT_DIR . '/pioneerblocks-update-logs.txt';

		// Get plugin data
		if (!function_exists('get_plugin_data')) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		// Check if is_plugin_active function exists
		if (!function_exists('is_plugin_active')) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$this->plugin_data = get_plugin_data($this->plugin_file);
		$this->plugin_activated = is_plugin_active($this->plugin_slug);

		// Hook into the update system
		add_filter('pre_set_site_transient_update_plugins', array($this, 'check_update'), 10);
		add_filter('plugins_api', array($this, 'plugin_popup'), 10, 3);
		add_filter('upgrader_post_install', array($this, 'after_install'), 10, 3);
	}

	public function plugin_popup($result, $action, $args)
	{
		// Only process the plugin you're working with
		if ($action !== 'plugin_information' || !isset($args->slug) || $args->slug !== dirname($this->plugin_slug)) {
			return $result;
		}

		// Fetch the repository info
		$this->get_repository_info();

		if (is_wp_error($this->github_api_result)) {
			return $result;
		}

		$plugin_info = new stdClass();
		$plugin_info->name = $this->plugin_data['Name'];
		$plugin_info->slug = dirname($this->plugin_slug);
		$plugin_info->version = $this->github_api_result->tag_name;
		$plugin_info->author = $this->plugin_data['Author'];
		$plugin_info->homepage = $this->plugin_data['PluginURI'];
		$plugin_info->requires = '5.0';
		$plugin_info->tested = '6.7';
		$plugin_info->downloaded = 0;
		$plugin_info->last_updated = $this->github_api_result->published_at;
		$plugin_info->sections = array(
			'description' => $this->plugin_data['Description'],
			'changelog' => isset($this->github_api_result->body) ? $this->github_api_result->body : 'No changelog provided.'
		);
		$plugin_info->download_link = $this->github_api_result->zipball_url;

		return $plugin_info;
	}


	/**
	 * Log messages to file
	 */
	private function log($message)
	{
		$timestamp = date('[Y-m-d H:i:s]');
		$log_message = $timestamp . ' ' . $message . PHP_EOL;

		// Create log file if it doesn't exist
		if (!file_exists($this->log_file)) {
			$header = $timestamp . ' Update log initialized' . PHP_EOL;
			file_put_contents($this->log_file, $header);
		}

		// Append to log file
		file_put_contents($this->log_file, $log_message, FILE_APPEND);
	}

	/**
	 * Check for plugin updates
	 */
	public function check_update($transient)
	{
		$this->log("check_update called");

		// If transient->checked is empty, we need to ensure it is populated
		if (empty($transient->checked)) {
			$this->log("Transient->checked is empty, setting checked property");
			$transient->checked = array();
			$transient->checked[$this->plugin_slug] = $this->plugin_data['Version'];  // Set the current plugin version
		}

		// Get plugin version information from GitHub
		$this->get_repository_info();

		if (is_wp_error($this->github_api_result)) {
			$this->log("ERROR: " . $this->github_api_result->get_error_message());
			return $transient;
		}

		// Check if a new version is available
		$current_version = $this->plugin_data['Version'];

		if (isset($this->github_api_result->tag_name)) {
			$tag_name = $this->github_api_result->tag_name;
			// Remove 'v' prefix if it exists
			if (substr($tag_name, 0, 1) === 'v') {
				$tag_name = substr($tag_name, 1);
			}

			$this->log("Comparing versions - Current: {$current_version}, GitHub: {$tag_name}");

			if (version_compare($tag_name, $current_version, '>')) {
				$this->log("New version available: {$tag_name}");

				$obj = new stdClass();
				$obj->slug = dirname($this->plugin_slug);
				$obj->plugin = $this->plugin_slug;
				$obj->new_version = $tag_name;
				$obj->url = "https://github.com/{$this->github_username}/{$this->github_repo}";

				// Construct the package URL (public repository no longer requires authentication)
				$package_url = "https://github.com/{$this->github_username}/{$this->github_repo}/archive/refs/tags/{$tag_name}.zip";
				$obj->package = $package_url;

				// Log successful fetch and return the update object
				$this->log("Update package: {$obj->package}");

				if (!isset($transient->response)) {
					$transient->response = array();
				}

				$transient->response[$this->plugin_slug] = $obj;
			} else {
				$this->log("No update available");
			}
		} else {
			$this->log("No tag_name found in GitHub response");
		}

		return $transient;
	}

	/**
	 * Get repository info from the GitHub API
	 */
	private function get_repository_info($force = false)
	{
		if (!empty($this->github_api_result) && !$force) {
			$this->log("Using cached GitHub API result");
			return;
		}

		// Query the GitHub API
		$url = "https://api.github.com/repos/{$this->github_username}/{$this->github_repo}/releases/latest";
		$this->log("Fetching GitHub data from: {$url}");

		// Set headers for GitHub API
		$headers = array(
			'Accept' => 'application/json',
			'User-Agent' => 'WordPress/' . get_bloginfo('version') . '; ' . get_bloginfo('url')
		);

		// Get the results
		$response = wp_remote_get($url, array(
			'headers' => $headers,
			'timeout' => 15,
			'sslverify' => true
		));

		if (is_wp_error($response)) {
			$error_message = $response->get_error_message();
			$this->log("ERROR: GitHub API request failed: {$error_message}");
			$this->github_api_result = new WP_Error('github_api_error', 'Error connecting to GitHub API: ' . $error_message);
			return;
		}

		$http_code = wp_remote_retrieve_response_code($response);
		$this->log("GitHub API HTTP response code: {$http_code}");

		$body = wp_remote_retrieve_body($response);
		$this->log("GitHub API response body: {$body}");

		if ($http_code !== 200) {
			$this->log("GitHub API returned non-200 status code: {$http_code}");
			$this->github_api_result = new WP_Error('github_api_error', "GitHub API returned status code: {$http_code}");
			return;
		}

		$this->github_api_result = json_decode($body);

		if (empty($this->github_api_result)) {
			$this->log("ERROR: Empty GitHub API response");
			$this->github_api_result = new WP_Error('github_api_invalid', 'Invalid response from GitHub API');
			return;
		}

		if (!isset($this->github_api_result->tag_name)) {
			$this->log("ERROR: No tag_name found in GitHub response");
			$this->github_api_result = new WP_Error('github_api_invalid', 'Missing tag_name in GitHub API response');
			return;
		}

		$this->log("Successfully retrieved GitHub data. Latest version: {$this->github_api_result->tag_name}");
	}

	/**
	 * After installation tasks
	 */
	public function after_install($response, $hook_extra, $result)
	{
		// Ensure this only runs for your plugin
		if ($this->plugin_slug !== basename($result['destination'])) {
			// If the plugin being installed is not your plugin, do not process
			return $result;
		}
		$this->log("after_install called");

		global $wp_filesystem;

		$plugin_folder = WP_PLUGIN_DIR . '/' . dirname($this->plugin_slug);
		$this->log("Moving from {$result['destination']} to {$plugin_folder}");

		// Check if destination directory exists and remove it if necessary
		if ($wp_filesystem->exists($plugin_folder)) {
			$this->log("Destination directory exists, removing it");
			$wp_filesystem->delete($plugin_folder, true);
		}

		$move_result = $wp_filesystem->move($result['destination'], $plugin_folder);
		$this->log("Move result: " . ($move_result ? "SUCCESS" : "FAILED"));

		$result['destination'] = $plugin_folder;

		if ($this->plugin_activated) {
			$this->log("Plugin was active, reactivating");
			$activate_result = activate_plugin($this->plugin_slug);
			$this->log("Activation result: " . (is_wp_error($activate_result) ? $activate_result->get_error_message() : "SUCCESS"));
		} else {
			$this->log("Plugin was not active, not reactivating");
		}

		$this->log("after_install completed");
		return $result;
	}
}

// Initialize the updater
add_action('plugins_loaded', function () {
	new PioneerBlocks_Updater();
});

function pioneerblocks_load_textdomain()
{
	load_plugin_textdomain('pioneerblocks', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('init', 'pioneerblocks_load_textdomain');
