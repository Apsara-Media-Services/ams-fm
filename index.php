<?php

/**
 * Plugin Name:       AMS FM
 * Description:       AMS FM Wordpress Plugin
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Version:           0.0.1
 * Tested upto:       6.1.1
 * Author:            Sokmean Ngon<gnonsokmean@gmail.com>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ams
 */

defined( 'ABSPATH' ) || exit;

/**
 * AMS_FM class.
 *
 * @class AMS_FM The class that holds the entire AMS_FM plugin
 */
final class AMS_FM {
    /**
     * Plugin version.
     *
     * @var string
     */
    const VERSION = '0.0.1';

    /**
     * Plugin slug.
     *
     * @var string
     *
     * @since 0.2.0
     */
    const SLUG = 'ams-fm';

    /**
     * Holds various class instances.
     *
     * @var array
     *
     * @since 0.2.0
     */
    private $container = [];

    /**
     * Constructor for the JobPlace class.
     *
     * Sets up all the appropriate hooks and actions within our plugin.
     *
     * @since 0.2.0
     */
    private function __construct() {
        require_once __DIR__ . '/vendor/autoload.php';

        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        register_deactivation_hook( __FILE__, [ $this, 'deactivate' ] );

        add_action( 'wp_loaded', [ $this, 'flush_rewrite_rules' ] );
        $this->init_plugin();
    }

    /**
     * Initializes the AMS_FM() class.
     *
     * Checks for an existing AMS_FM() instance
     * and if it doesn't find one, creates it.
     *
     * @since 0.2.0
     *
     * @return AMS_FM|bool
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new AMS_FM();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @since 0.2.0
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @since 0.2.0
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function define_constants() {
        define( 'AMS_FM_VERSION', self::VERSION );
        define( 'AMS_FM_SLUG', self::SLUG );
        define( 'AMS_FM_FILE', __FILE__ );
        define( 'AMS_FM_DIR', __DIR__ );
        define( 'AMS_FM_PATH', dirname( AMS_FM_FILE ) );
        define( 'AMS_FM_INCLUDES', AMS_FM_PATH . '/inc' );
        define( 'AMS_FM_TEMPLATE_PATH', AMS_FM_PATH . '/templates' );
        define( 'AMS_FM_URL', plugins_url( '', AMS_FM_FILE ) );
        define( 'AMS_FM_BUILD', AMS_FM_URL . '/build' );
        define( 'AMS_FM_ASSETS', AMS_FM_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugins are loaded.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();

        /**
         * Fires after the plugin is loaded.
         *
         * @since 0.2.0
         */
        do_action( 'ams_fm_loaded' );
    }

    /**
     * Activating the plugin.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function activate() {
        // Run the installer to create necessary migrations and seeders.
        $this->install();
    }

    /**
     * Placeholder for deactivation function.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function deactivate() {
        //
    }

    /**
     * Flush rewrite rules after plugin is activated.
     *
     * Nothing being added here yet.
     *
     * @since 0.2.0
     */
    public function flush_rewrite_rules() {
        // fix rewrite rules
    }

    /**
     * Run the installer to create necessary migrations and seeders.
     *
     * @since 0.3.0
     *
     * @return void
     */
    private function install() {
        $installer = new \AMS\FM\Setup\Installer();
        $installer->run();
    }

    /**
     * Include the required files.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function includes() {
        if ( $this->is_request( 'admin' ) ) {
            $this->container['admin_menu'] = new AMS\FM\Admin\Menu();
        }

        // Common classes
        $this->container['assets']   = new AMS\FM\Assets\Manager();
        // $this->container['blocks']   = new AMS\FM\Blocks\Manager();
        // $this->container['rest_api'] = new AMS\FM\REST\Api();
        // $this->container['jobs']     = new AMS\FM\Jobs\Manager();
    }

    /**
     * Initialize the hooks.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function init_hooks() {
        // Init classes
        add_action( 'init', [ $this, 'init_classes' ] );

        // Localize our plugin
        add_action( 'init', [ $this, 'localization_setup' ] );

        // Add the plugin page links
        add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), [ $this, 'plugin_action_links' ] );
    }

    /**
     * Instantiate the required classes.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function init_classes() {
        // Init necessary hooks
        new AMS\FM\User\RegisterSettings();
        new AMS\FM\User\RegisterRootFields();
        new AMS\FM\User\RegisterTaxonomies();
    }

    /**
     * Initialize plugin for localization.
     *
     * @uses load_plugin_textdomain()
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function localization_setup() {
        load_plugin_textdomain( 'ams', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

        // Load the React-pages translations.
        if ( is_admin() ) {
            // Load wp-script translation for ams-fm
            wp_set_script_translations( 'ams-fm', 'ams', plugin_dir_path( __FILE__ ) . 'languages/' );
        }
    }

    /**
     * What type of request is this.
     *
     * @since 0.2.0
     *
     * @param string $type admin, ajax, cron or frontend
     *
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin':
                return is_admin();

            case 'ajax':
                return defined( 'DOING_AJAX' );

            case 'rest':
                return defined( 'REST_REQUEST' );

            case 'cron':
                return defined( 'DOING_CRON' );

            case 'frontend':
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }
    }

    /**
     * Plugin action links
     *
     * @param array $links
     *
     * @since 0.2.0
     *
     * @return array
     */
    public function plugin_action_links( $links ) {
        $links[] = '<a href="' . admin_url( 'admin.php?page=ams-fm#/day/monday' ) . '">' . __( 'Settings', 'ams' ) . '</a>';
        // $links[] = '<a href="https://github.com/ManiruzzamanAkash/wp-react-kit#quick-start" target="_blank">' . __( 'Documentation', 'ams' ) . '</a>';

        return $links;
    }
}

/**
 * Initialize the main plugin.
 *
 * @since 0.2.0
 *
 * @return \ams_fm|bool
 */
function ams_fm() {
    return AMS_FM::init();
}

/*
 * Kick-off the plugin.
 *
 * @since 0.2.0
 */
ams_fm();