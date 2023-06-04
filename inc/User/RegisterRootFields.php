<?php

namespace AMS\FM\User;

class RegisterRootFields {

    public function __construct() {
        
        // add_action( 'admin_init', [ $this, 'calbackFunction' ] );
        add_action( 'graphql_register_types', [ $this, 'calbackFunction' ] );
    }

    function calbackFunction() {
        // register_graphql_object_type( 'ScheduleObject', [
        //     'fields' => [
        //         'monday' => [
        //             'fields' => [
        //                 'title', 'category'=>[],
        //             ]
        //         ],
        //         'tuesday' => [
        //             'type' => 'String'
        //         ],
        //         'wednesday' => [
        //             'type' => 'String'
        //         ],
        //         'thursday' => [
        //             'type' => 'String'
        //         ],
        //         'friday' => [
        //             'type' => 'String'
        //         ],
        //         'saturday' => [
        //             'type' => 'String'
        //         ],
        //         'sunday' => [
        //             'type' => 'String'
        //         ]
        //     ],
        // ]);

        register_graphql_field( 'RootQuery', 'getSchedule', [
            'description' => __( 'Description', 'ams' ),
            'type' => 'String',
            'resolve' => function() {
                return serialize(get_option('ams_options'));

            }
        ] );
    }
}
