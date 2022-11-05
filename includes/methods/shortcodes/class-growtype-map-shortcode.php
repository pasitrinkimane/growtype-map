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

        $initial_latlng = $attributes['initial_latlng'] ?? '';
        $initial_lat = '';
        $initial_lng = '';

        if (!empty($initial_latlng)) {
            $initial_lat = explode(',', preg_replace("/\s+/", "", $initial_latlng))[0] ?? '';
            $initial_lng = explode(',', preg_replace("/\s+/", "", $initial_latlng))[1] ?? '';
        }

        $main_values['static'] = [
            'markersGroups' => [
                'initial' => [
                    'map_height' => isset($attributes['map_height']) ? $attributes['map_height'] : '400px',
                    'travelMode' => 'walking',
                    'markers' => [
                        [
                            'enabled' => $attributes['initial_marker'],
                            'latLng' => $initial_lat . ',' . $initial_lng,
                            'categories' => [],
                            'locations' => [],
                            'infowindow' => [
                                'enabled' => isset($attributes['infowindow_enabled']) ? $attributes['infowindow_enabled'] : false,
                                'content' => isset($attributes['infowindow_content']) ? $attributes['infowindow_content'] : ''
                            ],
                            'icon' => [
                                'url' => isset($attributes['marker_icon_image']) ? wp_get_attachment_url($attributes['marker_icon_image']) : '',
                                'width' => isset($attributes['marker_icon_width']) ? $attributes['marker_icon_width'] : '40',
                                'height' => isset($attributes['marker_icon_height']) ? $attributes['marker_icon_height'] : '40',
                            ]
                        ]
                    ],
                    'categories' => [],
                    'locations' => []
                ]
            ],
            'initiallyShowAllRoutes' => false,
            'initialLat' => $initial_lat ?? '',
            'initialLng' => $initial_lng ?? '',
            'initialZoom' => $attributes['initial_zoom'] ?? 4,
            'initialGroupId' => $attributes['initial_group_id'] ?? 'initial',
            'mapType' => $attributes['map_type'] ?? 'location', //route
        ];

        $plain_markers = isset($attributes['plain_markers']) && !empty($attributes['plain_markers']) ? preg_split("/\r\n|\n|\r/", $attributes['plain_markers']) : [];

        if (!empty($plain_markers)) {

            $plain_markers_formatted = [];

            foreach ($plain_markers as $plain_marker) {
                $plain_markers_formatted[] = [
                    'enabled' => 'true',
                    'latLng' => $plain_marker,
                    'categories' => [],
                    'locations' => [],
                    'infowindow' => [
                        'enabled' => isset($attributes['infowindow_enabled']) ? $attributes['infowindow_enabled'] : false,
                        'content' => isset($attributes['infowindow_content']) ? $attributes['infowindow_content'] : ''
                    ],
                    'icon' => [
                        'url' => isset($attributes['marker_icon_image']) ? wp_get_attachment_url($attributes['marker_icon_image']) : '',
                        'width' => isset($attributes['marker_icon_width']) ? $attributes['marker_icon_width'] : '40',
                        'height' => isset($attributes['marker_icon_height']) ? $attributes['marker_icon_height'] : '40',
                    ]
                ];
            }

            $markers = array_merge($main_values['static']['markersGroups']['initial']['markers'], $plain_markers_formatted);

            $main_values['static']['markersGroups']['initial']['markers'] = $markers;
        }

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
