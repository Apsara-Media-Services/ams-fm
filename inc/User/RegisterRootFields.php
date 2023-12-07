<?php

namespace AMS\FM\User;

class RegisterRootFields {

    public function __construct() {
        
        // add_action( 'admin_init', [ $this, 'calbackFunction' ] );
        add_action( 'graphql_register_types', [ $this, 'calbackFunction' ] );
    }

    function calbackFunction() {

        register_graphql_field( 'RootQuery', 'getSchedule', [
            'description' => __( 'Description', 'ams' ),
            'type' => 'String',
            'resolve' => function() {
                return json_decode(get_option('ams_options'));

            }
        ] );

        register_graphql_field( 'Podcast', 'coverImage', [
            'description' => __( 'Cover Image', 'ams' ),
            'type' => 'String',
            'resolve' => function( $podcast ) {
                // Assuming $podcast contains the term ID or some way to get it.
                // Replace 'get_the_correct_term_id' with the actual logic/mechanism to retrieve the term ID.
                $term_id = get_podcast_term_id($podcast);
        
                $media_url = get_term_meta( $term_id, 'podcasting_image_url', true );
                return ! empty( $media_url ) ? $media_url : false;
            }
        ]);        
    }
}
