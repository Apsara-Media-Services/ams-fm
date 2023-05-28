<?php

namespace AMS\FM\Admin;

/**
 * Admin Menu class.
 *
 * Responsible for managing admin menus.
 */
class Menu {

    /**
     * Constructor.
     *
     * @since 0.2.0
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'init_menu' ] );
    }

    /**
     * Init Menu.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function init_menu() {
        // global $submenu;

        $slug          = AMS_FM_SLUG;
        $menu_position = 110;
        $capability    = 'manage_options';
        $logo_icon     = AMS_FM_ASSETS . '/images/fm97-16x16.jpg';

        add_menu_page( esc_attr__( 'AMS FM', 'ams' ), esc_attr__( 'AMS FM', 'ams' ), $capability, $slug, [ $this, 'plugin_page' ], $logo_icon, $menu_position );

        // if ( current_user_can( $capability ) ) {
        //     $submenu[ $slug ][] = [ esc_attr__( 'Dashboard', 'ams' ), $capability, 'admin.php?page=' . $slug . '#/' ];
        // }
    }

    /**
     * Render the plugin page.
     *
     * @since 0.2.0
     *
     * @return void
     */
    public function plugin_page() {
        require_once AMS_FM_TEMPLATE_PATH . '/app.php';
    }
}
