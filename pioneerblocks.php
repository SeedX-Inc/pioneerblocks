<?php
/**
 * Plugin Name:       Pioneer blocks
 * Description:       Pioneer custom blocks.
 * Version:           0.1.10
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

class My_Custom_Plugin_Updater {
    private $plugin_slug;
    private $plugin_file;
    private $github_username;
    private $github_repo;
    private $plugin_data;
    private $github_api_result;
    private $access_token;
    private $plugin_activated;

    /**
     * Initialize the updater
     */
    public function __construct() {
        $this->plugin_slug = plugin_basename(__FILE__);
        $this->plugin_file = __FILE__;
        $this->github_username = 'SeedX-Inc';
        $this->github_repo = 'pioneerblocks';
        $this->access_token = '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'; // Optional: for private repos

        // Get plugin data
        if (!function_exists('get_plugin_data')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        $this->plugin_data = get_plugin_data($this->plugin_file);
        $this->plugin_activated = is_plugin_active($this->plugin_slug);

        // Hook into the update system
        add_filter('pre_set_site_transient_update_plugins', array($this, 'check_update'));
        add_filter('plugins_api', array($this, 'plugin_popup'), 10, 3);
        add_filter('upgrader_post_install', array($this, 'after_install'), 10, 3);
    }

    /**
     * Check for plugin updates
     */
    public function check_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }

        // Get plugin version information from GitHub
        $this->get_repository_info();

        if (is_wp_error($this->github_api_result)) {
            return $transient;
        }

        // Check if a new version is available
        $current_version = $this->plugin_data['Version'];
        if (isset($this->github_api_result->tag_name) && version_compare($this->github_api_result->tag_name, $current_version, '>')) {
            $obj = new stdClass();
            $obj->slug = $this->plugin_slug;
            $obj->new_version = $this->github_api_result->tag_name;
            $obj->url = $this->plugin_data['PluginURI'];
            $obj->package = $this->github_api_result->zipball_url;

            // Add access token for private repos
            if (!empty($this->access_token)) {
                $obj->package = add_query_arg(array('access_token' => $this->access_token), $obj->package);
            }

            $transient->response[$this->plugin_slug] = $obj;
        }

        return $transient;
    }

    /**
     * Get repository info from the GitHub API
     */
    private function get_repository_info() {
        if (!empty($this->github_api_result)) {
            return;
        }

        // Query the GitHub API
        $url = "https://api.github.com/repos/{$this->github_username}/{$this->github_repo}/releases/latest";

        // Include access token for private repos
        if (!empty($this->access_token)) {
            $url = add_query_arg(array('access_token' => $this->access_token), $url);
        }

        // Get the results
        $response = wp_remote_get($url, array(
            'headers' => array(
                'Accept' => 'application/json',
                'User-Agent' => 'WordPress/' . get_bloginfo('version') . '; ' . get_bloginfo('url')
            )
        ));

        if (is_wp_error($response)) {
            $this->github_api_result = new WP_Error('github_api_error', 'Error connecting to GitHub API: ' . $response->get_error_message());
            return;
        }

        $body = wp_remote_retrieve_body($response);
        $this->github_api_result = json_decode($body);
    }

    /**
     * Show plugin information in the plugins list
     */
    public function plugin_popup($result, $action, $args) {
        if ($action !== 'plugin_information') {
            return $result;
        }

        if (!isset($args->slug) || $args->slug !== dirname($this->plugin_slug)) {
            return $result;
        }

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
        $plugin_info->requires = '5.0'; // Adjust as needed
        $plugin_info->tested = '6.3'; // Adjust as needed
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
     * After installation tasks
     */
    public function after_install($response, $hook_extra, $result) {
        global $wp_filesystem;

        $plugin_folder = WP_PLUGIN_DIR . '/' . dirname($this->plugin_slug);
        $wp_filesystem->move($result['destination'], $plugin_folder);
        $result['destination'] = $plugin_folder;

        if ($this->plugin_activated) {
            activate_plugin($this->plugin_slug);
        }

        return $result;
    }
}

// Initialize the updater
new My_Custom_Plugin_Updater();
