<?php

/*

Plugin Name: 	Flashrad Customize Prices

Description: 	Customize Prices in Woo.

Version: 		1.2.0

Author: 		flashrad

Author URI:

Text Domain: 	fr_CP

License: 		GPLv2 or later

License URI:	http://www.gnu.org/licenses/gpl-2.0.html

*/



if ( ! defined( 'ABSPATH' ) ) {

	exit; // Exit if accessed directly

}



/**

 * Global variables

 */

$fr_plugin_version = '1.0.0';									// for use on admin pages

$plugin_file = plugin_basename(__FILE__);							// plugin file for reference

define( 'FRCP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );	// define the absolute plugin path for includes

define( 'FRCP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );		// define the plugin url for use in enqueue

$fr_options = get_option('fr_settings');			// retrieve our plugin settings from the options table



/**

 * include

 */

require_once( FRCP_PLUGIN_PATH . 'admin/option_functions.php' );





/**

 * options

 */
function fr_setting_tab( $tabs ) {

    // position (after Products)
    $pos = 5;
    // new tab slug and title
    $new_tab = array( 'fr_prices' => 'Customize Prices' );

    // add into an appropriate position of an existing array
    $tabs = array_slice( $tabs, 0, $pos, true ) + $new_tab + array_slice( $tabs, $pos, NULL, true );

    return $tabs;

}
 add_filter( 'woocommerce_settings_tabs_array', 'fr_setting_tab', 21 );



 



/**

 * scripts and styles

 */

function fr_cp_front_scripts(){
    wp_register_script( 'fr_front_js', FRCP_PLUGIN_URL . '/assets/js/fr_front.js', array('jquery-core'), false, true );

    wp_enqueue_script( 'fr_front_js' );

    wp_register_style( 'fr_front_css', FRCP_PLUGIN_URL . '/assets/css/fr_front.css', false, '1.0.0' );

    wp_enqueue_style( 'fr_front_css' );

    wp_localize_script ('fr_front_js', 'plugin_ajax_object',array ('ajax_url' => admin_url ('admin-ajax.php')));
}

add_action( 'wp_enqueue_scripts', 'fr_cp_front_scripts' );

function fr_cp_admin_scripts(){

    wp_register_script( 'fr_admin_js', FRCP_PLUGIN_URL . '/assets/js/fr_admin.js', array('jquery-core'), false, true );

    wp_enqueue_script( 'fr_admin_js' );

    wp_register_style( 'fr_admin_css', FRCP_PLUGIN_URL . '/assets/css/fr_admin.css', false, '1.0.0' );

    wp_enqueue_style( 'fr_admin_css' );

    wp_localize_script ('fr_admin_js', 'plugin_ajax_object',array ('ajax_url' => admin_url ('admin-ajax.php')));

}

add_action( 'admin_enqueue_scripts', 'fr_cp_admin_scripts' );


