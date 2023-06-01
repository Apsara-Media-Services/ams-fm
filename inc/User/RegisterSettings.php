<?php

namespace AMS\FM\User;

class RegisterSettings {

    public function __construct() {
        
        // add_action( 'admin_init', [ $this, 'calbackFunction' ] );
        add_action( 'rest_api_init', [ $this, 'calbackFunction' ] );
    }

    function calbackFunction() {
        register_setting(
            'ams_options_group',
            'ams_options',
            [
                'type' => 'object',
                'default' => ['monday','tuesday'],
                'show_in_rest' => [
                    'name' => 'ams_schedule',
                    'schema' => [
                        'type' => 'object',
                        'properties' => [
                            'monday' => ['type' => 'array'],
                            'tuesday' => ['type' => 'array'],
                            'wednesday' => ['type' => 'array'],
                            'thursday' => ['type' => 'array'],
                            'friday' => ['type' => 'array'],
                            'saturday' => ['type' => 'array'],
                            'sunday' => ['type' => 'array'],
                        ]
                    ]
                ],
                // 'sanitize_callback' => 'sanitize_text_field'
            ]
        );
    }
}
