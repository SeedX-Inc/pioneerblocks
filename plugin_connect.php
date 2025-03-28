<?php
// Add the GitHub update check function
/* add_filter('site_transient_update_plugins', 'check_for_plugin_update');

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

	// Log the response data for debugging purposes
    error_log('GitHub API Response: ' . print_r($data, true));

	// Make sure zipball_url is formatted correctly
    $zip_url = str_replace('api.github.com/repos', 'github.com', $data->zipball_url);
    $zip_url = str_replace('zipball', 'archive/refs/tags', $zip_url) . '.zip';

    // Get the plugin's current version
    $current_version = get_plugin_data(WP_PLUGIN_DIR . '/pioneerblocks/pioneerblocks.php')['Version'];

    // If the new version is newer, mark the plugin for update
    if (version_compare($data->tag_name, $current_version, '>')) {
        $transient->response['pioneerblocks/pioneerblocks.php'] = array(
            'slug' => 'pioneerblocks',
            'new_version' => $data->tag_name,
            'url' => $data->html_url,
            'package' => $zip_url
        );
    }

    return $transient;
} */

class PioneerBlocks_Updater {
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
	public function __construct() {
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

	/**
	 * Log messages to file
	 */
	private function log($message) {
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
	public function check_update($transient) {
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
	private function get_repository_info($force = false) {
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
	public function after_install($response, $hook_extra, $result) {
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
add_action('plugins_loaded', function() {
	new PioneerBlocks_Updater();
});

function pioneerblocks_load_textdomain() {
	load_plugin_textdomain('pioneerblocks', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('init', 'pioneerblocks_load_textdomain');
