<?php
/**
 * Admin init
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Add options to wp-admin
 */
function fr_settings_content() {
	echo 'what is up?';
}
add_action( 'woocommerce_settings_fr_prices', 'fr_settings_content' );


function cw_change_product_price_display( $price ) {
	$price .= ' At Each Item Product';
	return $price;
}
add_filter( 'woocommerce_get_price_html', 'cw_change_product_price_display' );
add_filter( 'woocommerce_cart_item_price', 'cw_change_product_price_display' );

