<?php

namespace AMS\FM\User;

class RegisterTaxonomies {

    public function __construct() {
        
        // add_action( 'admin_init', [ $this, 'calbackFunction' ] );
        // add_action( 'graphql_register_types', [ $this, 'calbackFunction' ] );
        add_filter( 'register_taxonomy_args', [$this, 'calbackFunction'], 10, 2);
    }

    function calbackFunction($args, $taxonomy) {
    
        if ( 'podcasting_podcasts' === $taxonomy ) {
            // $args['show_in_rest'] = ['name'=> 'podcasts'];
            // $args['rest_base '] = 'podcasts';
            $args['show_in_graphql'] = true;
            $args['graphql_single_name'] = 'podcast';
            $args['graphql_plural_name'] = 'podcasts';
        }
        return $args;
    }
}
