<?php

namespace AMS\FM\User;

class RegisterRootFields {

    public function __construct() {
        
        // add_action( 'admin_init', [ $this, 'calbackFunction' ] );
        add_action( 'graphql_register_types', [ $this, 'calbackFunction' ] );
    }

    function calbackFunction() {
        // Register Schedule Option to Graph
        register_graphql_field('RootQuery', 'getSchedule', [
            'type' => 'String',
            'description' => __('Description', 'ams'),
            'resolve' => function() {
                $option = get_option('ams_options');
                if (is_wp_error($option) || !$option) {
                    return null;  // Handle errors or empty values
                }
                return json_encode($option);  // Ensure it returns a string
            }
        ]);
        // Register Podcast Field to Graph
        register_graphql_field( 'Podcast', 'coverImage', [
            'description' => __( 'Cover Image', 'ams' ),
            'type' => 'String',
            'resolve' => function( $term ) {
                $media_url = get_term_meta( $term->term_id, 'podcasting_image_url', true );
                return ! empty( $media_url ) ? $media_url : false;
            }
        ]);        
    }
}
