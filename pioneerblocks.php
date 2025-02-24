<?php
/**
 * Plugin Name:       Pioneer blocks
 * Description:       Pioneer custom blocks.
 * Version:           0.1.11
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
    private $access_token;
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
        $this->access_token = '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'; // SET YOUR GITHUB ACCESS TOKEN HERE
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

        $this->log("======= NEW UPDATER SESSION =======");
        $this->log("Updater initialized for {$this->github_username}/{$this->github_repo}");
        $this->log("Plugin version: {$this->plugin_data['Version']}");
        $this->log("Plugin slug: {$this->plugin_slug}");

        // Hook into the update system
        add_filter('pre_set_site_transient_update_plugins', array($this, 'check_update'), 10);
        add_filter('plugins_api', array($this, 'plugin_popup'), 10, 3);
        add_filter('upgrader_post_install', array($this, 'after_install'), 10, 3);

        // Add debug action to check update manually + admin notice
        add_action('admin_init', array($this, 'debug_check_update'));
        add_action('admin_notices', array($this, 'show_update_notice'));
    }

    /**
     * Show admin notice with debug information
     */
    public function show_update_notice() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $debug_url = add_query_arg('debug_pioneerblocks_update', '1', admin_url('plugins.php'));

        echo '<div class="notice notice-info is-dismissible">';
        echo '<p><strong>PioneerBlocks Debug:</strong> ';
        echo 'Current version: ' . $this->plugin_data['Version'] . ' | ';
        echo '<a href="' . esc_url($debug_url) . '">Check for updates now</a> | ';
        echo '<a href="' . esc_url(WP_CONTENT_URL . '/pioneerblocks-update-logs.txt') . '" target="_blank">View update logs</a>';
        echo '</p>';
        echo '</div>';
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
     * Manual debug check triggered by query parameter
     */
    public function debug_check_update() {
        if (isset($_GET['debug_pioneerblocks_update']) && current_user_can('manage_options')) {
            $this->log("====== MANUAL UPDATE CHECK TRIGGERED ======");

            // Force check for updates
            delete_site_transient('update_plugins');
            $this->get_repository_info(true);

            if (is_wp_error($this->github_api_result)) {
                $this->log("ERROR: " . $this->github_api_result->get_error_message());
                wp_die("Update check error: " . $this->github_api_result->get_error_message() . "<br>Check the log file at: " . $this->log_file);
            } else {
                // Compare versions
                $current_version = $this->plugin_data['Version'];
                if (isset($this->github_api_result->tag_name)) {
                    $tag_name = $this->github_api_result->tag_name;
                    // Remove 'v' prefix if it exists
                    if (substr($tag_name, 0, 1) === 'v') {
                        $tag_name = substr($tag_name, 1);
                    }

                    $this->log("Current version: {$current_version}, GitHub version: {$tag_name}");
                    $update_available = version_compare($tag_name, $current_version, '>');
                    $this->log("Update available: " . ($update_available ? "YES" : "NO"));
                } else {
                    $this->log("ERROR: No tag_name found in GitHub response");
                }

                // Manually create update object for testing
                $this->log("Creating test update object");
                $transient = get_site_transient('update_plugins');
                if (!$transient) {
                    $transient = new stdClass();
                    $transient->checked = array();
                    $transient->response = array();
                }
                $transient_check = $this->check_update($transient);

                wp_die("Update check complete. See log file at: " . $this->log_file);
            }
        }
    }

    /**
     * Check for plugin updates
     */
    public function check_update($transient) {
        $this->log("check_update called");

        if (empty($transient->checked)) {
            $this->log("Transient->checked is empty, returning original transient");
            return $transient;
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
                $obj->package = $this->github_api_result->zipball_url;

                $this->log("Update object created: " . print_r($obj, true));

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
        $this->log("====== FETCHING FROM GITHUB API ======");
        $this->log("GitHub API URL: {$url}");

        // Set headers for GitHub API
        $headers = array(
            'Accept' => 'application/json',
            'User-Agent' => 'WordPress/' . get_bloginfo('version') . '; ' . get_bloginfo('url')
        );

        // Add Authorization header for GitHub API token
        if (!empty($this->access_token)) {
            $headers['Authorization'] = 'token ' . $this->access_token;
            $this->log("Added authorization header for GitHub API");
        }

        $this->log("Request headers: " . print_r($headers, true));

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

        $response_headers = wp_remote_retrieve_headers($response);
        $this->log("GitHub API response headers: " . print_r($response_headers, true));

        if ($http_code !== 200) {
            $this->log("GitHub API returned non-200 status code: {$http_code}");
            $this->github_api_result = new WP_Error('github_api_error', "GitHub API returned status code: {$http_code}");
            return;
        }

        $this->github_api_result = json_decode($body);

        if (empty($this->github_api_result)) {
            $this->log("ERROR: Empty GitHub API response");
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->log("JSON decode error: " . json_last_error_msg());
            }
            $this->github_api_result = new WP_Error('github_api_invalid', 'Invalid response from GitHub API');
            return;
        }

        if (!isset($this->github_api_result->tag_name)) {
            $this->log("ERROR: No tag_name found in GitHub response");
            $this->github_api_result = new WP_Error('github_api_invalid', 'Missing tag_name in GitHub API response');
            return;
        }

        $this->log("Successfully retrieved GitHub data. Latest version: {$this->github_api_result->tag_name}");

        // Check for zipball_url
        if (!isset($this->github_api_result->zipball_url)) {
            $this->log("WARNING: No zipball_url found, constructing fallback URL");
            $this->github_api_result->zipball_url = "https://github.com/{$this->github_username}/{$this->github_repo}/archive/refs/tags/{$this->github_api_result->tag_name}.zip";
        }
    }

    /**
     * Show plugin information in the plugins list
     */
    public function plugin_popup($result, $action, $args) {
        $this->log("plugin_popup called with action: {$action}");

        if ($action !== 'plugin_information') {
            return $result;
        }

        if (!isset($args->slug) || $args->slug !== dirname($this->plugin_slug)) {
            return $result;
        }

        $this->log("Showing plugin information popup");
        $this->get_repository_info();

        if (is_wp_error($this->github_api_result)) {
            $this->log("ERROR in plugin_popup: " . $this->github_api_result->get_error_message());
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

        $this->log("Plugin info created: " . print_r($plugin_info, true));
        return $plugin_info;
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

        if (!$move_result) {
            $this->log("Move failed. WP_Filesystem error: " . $wp_filesystem->errors->get_error_message());
        }

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

// Text Domain Loading (fixed as per previous message)
function pioneerblocks_load_textdomain() {
    load_plugin_textdomain('pioneerblocks', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('init', 'pioneerblocks_load_textdomain');
