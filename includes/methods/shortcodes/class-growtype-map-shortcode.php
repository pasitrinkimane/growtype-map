<?php

/**
 * Class Growtype_Map_In_Gallery
 */
class Growtype_Map_Shortcode
{
    public function __construct()
    {
        if (!is_admin() && !wp_is_json_request()) {
            add_shortcode('growtype_map', array ($this, 'growtype_map_shortcode'));
        }
    }

    /**
     *
     */
    function growtype_map_shortcode($attributes)
    {
        $main_values = $attributes;

        $main_values['static'] = [
            'markersGroups' => [
                'initial' => [
                    'travelMode' => 'walking',
                    'markers' => [
                        [
                            'latLng' => $attributes['initial_lat'] . ',' . $attributes['initial_lng'],
                            'categories' => [],
                            'locations' => [],
                            'infowindow' => [
                                'content' => 'test'
                            ],
                        ]
                    ],
                    'categories' => [],
                    'locations' => []
                ]
            ],
            'initiallyShowAllRoutes' => false,
            'initialLat' => $attributes['initial_lat'] ?? '',
            'initialLng' => $attributes['initial_lng'] ?? '',
            'initialZoom' => $attributes['initial_zoom'] ?? 4,
            'initialGroupId' => $attributes['initial_group_id'] ?? 'initial',
            'mapType' => $attributes['map_type'] ?? 'location', //route
        ];

        $main_values['map_id'] = bin2hex(random_bytes(20));

        /**
         * Pass values to frontend
         */
        add_action('wp_footer', function () use ($main_values) { // 🎉
            ?>
            <script type="text/javascript">
                window.growtypeMap['<?php echo $main_values['map_id'] ?>'] = {
                    static: <?php echo json_encode($main_values['static']) ?>
                }
            </script>
            <?php
        });

        return growtype_map_include_view('map.container', $main_values);
    }
}
