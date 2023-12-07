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
			 	// $media_id = get_term_meta( 27, 'podcasting_image', true );
				$media_url = get_term_meta( $podcast->id, 'podcasting_image_url', true );
				// $media_item = get_media_item(81,true);
				// return json_encode($media_item);
			  	return ! empty( $media_url ) ? $media_url : false;
			 }
        ] );
    }
}
