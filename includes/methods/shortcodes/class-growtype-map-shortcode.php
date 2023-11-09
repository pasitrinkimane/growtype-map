<?php

/**
 * Class Growtype_Map_Shortcode
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
        $main_values = [];

        $initial_latlng = $attributes['initial_latlng'] ?? '';
        $initial_lat = '';
        $initial_lng = '';

        if (!empty($initial_latlng)) {
            $initial_lat = explode(',', preg_replace("/\s+/", "", $initial_latlng))[0] ?? '';
            $initial_lng = explode(',', preg_replace("/\s+/", "", $initial_latlng))[1] ?? '';
        }

        $attributes['marker_link'] = isset($attributes['marker_link']) && !empty($attributes['marker_link']) ? $attributes['marker_link'] : 'post';

        $main_values['static'] = [
            'markersGroups' => [
                'initial' => [
                    'map_height' => isset($attributes['map_height']) && !empty($attributes['map_height']) ? $attributes['map_height'] : '400px',
                    'travelMode' => 'walking',
                    'markers' => [
                        [
                            'enabled' => isset($attributes['initial_marker']) && !empty($attributes['initial_marker']) ? 'true' : 'false',
                            'latLng' => $initial_lat . ',' . $initial_lng,
                            'categories' => [],
                            'locations' => [],
                            'infowindow' => [
                                'enabled' => isset($attributes['infowindow_enabled']) && $attributes['infowindow_enabled'] === 'true' ? 'true' : 'false',
                                'content' => isset($attributes['infowindow_content']) ? $attributes['infowindow_content'] : ''
                            ],
                            'icon' => [
                                'url' => isset($attributes['marker_icon_image']) && !empty($attributes['marker_icon_image']) ? wp_get_attachment_url($attributes['marker_icon_image']) : '',
                                'width' => isset($attributes['marker_icon_width']) ? $attributes['marker_icon_width'] : '40',
                                'height' => isset($attributes['marker_icon_height']) ? $attributes['marker_icon_height'] : '40',
                            ],
                            'url' => ''
                        ]
                    ],
                    'categories' => [],
                    'locations' => []
                ]
            ],
            'mapInitType' => $attributes['map_init_type'] ?? 'load',
            'mapCoverImage' => isset($attributes['map_cover_image']) && !empty($attributes['map_cover_image']) ? wp_get_attachment_url($attributes['map_cover_image']) : '',
            'initiallyShowAllRoutes' => 'false',
            'initialLat' => $initial_lat ?? '',
            'initialLng' => $initial_lng ?? '',
            'initialZoom' => $attributes['initial_zoom'] ?? 4,
            'initiallyFitBounds' => isset($attributes['initially_fit_bounds']) && !empty($attributes['initially_fit_bounds']) ? 'true' : 'false',
            'initialGroupId' => $attributes['initial_group_id'] ?? 'initial',
            'mapType' => $attributes['map_type'] ?? 'location', //route
            'mapStyle' => isset($attributes['map_style']) ? json_decode(urldecode($attributes['map_style'])) : json_decode(file_get_contents(GROWTYPE_MAP_PATH . 'resources/data/map/style.json'), true),
            'showUserLocation' => $attributes['show_user_location'] ?? 'false',
            'userLocation' => [
                'icon' => [
                    'url' => isset($attributes['user_location_marker_icon_image']) && !empty($attributes['user_location_marker_icon_image']) ? wp_get_attachment_url($attributes['user_location_marker_icon_image']) : GROWTYPE_MAP_URL_PUBLIC . 'images/marker-person.svg',
                    'width' => isset($attributes['marker_icon_width']) ? $attributes['marker_icon_width'] : '30',
                    'height' => isset($attributes['marker_icon_height']) ? $attributes['marker_icon_height'] : '30',
                ]
            ],
            'disableMapDragging' => $attributes['disable_map_dragging'] ?? 'false',
        ];

        $additional_markers = [];
        if (isset($attributes['markers_list_type'])) {
            if ($attributes['markers_list_type'] === 'post_type') {
                $additional_markers_post_type = $attributes['post_type_markers'];

                if (!empty($additional_markers_post_type)) {
                    $args = array (
                        'posts_per_page' => -1,
                        'offset' => 0,
                        'orderby' => 'menu_order',
                        'order' => 'asc',
                        'post_type' => $additional_markers_post_type,
                        'post_status' => 'publish'
                    );

                    $locations_data = get_posts($args);

                    $additional_markers = $this->growtype_map_get_additional_markers_data_from_posts($locations_data, $attributes);
                }
            } elseif ($attributes['markers_list_type'] === 'plain') {
                $plain_markers = isset($attributes['plain_markers']) && !empty($attributes['plain_markers']) ? preg_split("/\r\n|\n|\r/", $attributes['plain_markers']) : [];

                foreach ($plain_markers as $plain_marker) {
                    array_push($additional_markers, ['latLng' => $plain_marker]);
                }
            }
        }

        if (!empty($additional_markers)) {
            $plain_markers_formatted = [];
            foreach ($additional_markers as $additional_marker) {
                $infowindow_content = isset($additional_marker['infowindow']['content']) && !empty(trim($additional_marker['infowindow']['content'])) ? $additional_marker['infowindow']['content'] : '';
                $infowindow_enabled = isset($attributes['infowindow_enabled']) && !empty($attributes['infowindow_enabled']) && !empty($infowindow_content) ? 'true' : 'false';

                $plain_markers_formatted[] = [
                    'id' => isset($additional_marker['id']) ? $additional_marker['id'] : null,
                    'enabled' => 'true',
                    'latLng' => $additional_marker['latLng'],
                    'categories' => $additional_marker['categories'] ?? [],
                    'locations' => [],
                    'infowindow' => [
                        'enabled' => $infowindow_enabled,
                        'content' => $infowindow_content
                    ],
                    'icon' => [
                        'url' => $additional_marker['icon']['url'] ?? (isset($attributes['marker_icon_image']) ? wp_get_attachment_url($attributes['marker_icon_image']) : ''),
                        'width' => isset($attributes['marker_icon_width']) ? $attributes['marker_icon_width'] : '40',
                        'height' => isset($attributes['marker_icon_height']) ? $attributes['marker_icon_height'] : '40',
                    ],
                    'url' => $infowindow_enabled === 'false' && isset($additional_marker['url']) && isset($attributes['marker_link']) && $attributes['marker_link'] === 'post' ? $additional_marker['url'] : ''
                ];
            }

            $markers = array_merge($main_values['static']['markersGroups']['initial']['markers'], $plain_markers_formatted);

            $main_values['static']['markersGroups']['initial']['markers'] = $markers;
        }

        $main_values['map_id'] = isset($attributes['map_id']) && !empty($attributes['map_id']) ? $attributes['map_id'] : bin2hex(random_bytes(20));

        /**
         * Pass values to frontend
         */
        add_action('wp_footer', function () use ($main_values) {
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

    function growtype_map_get_additional_markers_data_from_posts($locations_data, $attributes = [])
    {
        $markers = [];
        foreach ($locations_data as $location_data) {
            $location = !empty($location_data->ID) && !empty(get_field('location', $location_data)) ? get_field('location', $location_data)['location'] : $location_data->location ?? null;

            if (empty($location)) {
                $location = [
                    'lat' => get_field('location_lat', $location_data),
                    'lng' => get_field('location_lng', $location_data),
                ];

                if (empty($location['lat']) || empty($location['lng'])) {
                    continue;
                }
            }

            /**
             * Locations
             */
            $categories_terms = !empty($location_data->ID) && !is_wp_error(wp_get_post_terms($location_data->ID, 'location_tax')) && wp_get_post_terms($location_data->ID, 'location_tax') ? wp_get_post_terms($location_data->ID, 'location_tax') : null;
            $location_categories = !empty($categories_terms) ? implode(',', array_pluck($categories_terms, 'slug')) : null;

            /**
             * Marker
             */
            $marker_icon_custom_id = isset($categories_terms[0]) ? get_term_meta($categories_terms[0]->term_id, 'pin_icon', true) : null;

            $marker_icon = isset($attributes['marker_icon_image']) ? wp_get_attachment_url($attributes['marker_icon_image']) : '';
            if (!empty($marker_icon_custom_id)) {
                $marker_icon = wp_get_attachment_url($marker_icon_custom_id);
            }

            $feat_img_url = !empty($location_data->ID) ? get_the_post_thumbnail_url($location_data, 'thumbnail') : null;

            /**
             * Infowindow content
             */
            $infowindow_text = $location_data->post_excerpt;
            $infowindow_text = empty($infowindow_text) && !empty($location_data->post_content) ? mb_substr($location_data->post_content, 0, 60) . '...' : $infowindow_text;

            ob_start();
            ?>
            <?php if (!empty($feat_img_url) || !empty($infowindow_text)) { ?>
                <div class="infowindow-content" style="max-width: 200px;min-width: 200px;">
                    <?php if (!empty($feat_img_url)) { ?>
                        <div style="padding-bottom: 10px;">
                            <div style="background: url('<?php echo $feat_img_url ?>');background-size: cover;background-position: center;min-height: 110px;"></div>
                        </div>
                    <?php } ?>
                    <?php if (!empty($infowindow_text)) { ?>
                        <div>
                            <?php echo $infowindow_text ?>
                        </div>
                    <?php } ?>
                    <div style="padding-top: 10px;">
                        <a href="<?php echo get_permalink($location_data->ID) ?>" style="font-size: 12px;"><?php echo __('Plačiau', 'growtype-map') ?></a>
                    </div>
                </div>
            <?php } ?>
            <?php
            $infowindow_content = ob_get_clean();

            array_push($markers, [
                'latLng' => $location['lat'] . ',' . $location['lng'],
                'type' => $location_type ?? null,
                'categories' => $location_categories ?? null,
                'icon' => [
                    'url' => $marker_icon
                ],
                'pin_icon_exists' => !empty($pin_icon_custom),
                'title' => $location_data->post_title ?? null,
                'address' => $location['address'] ?? null,
                'url' => !empty($location_data->ID) ? get_permalink($location_data->ID) : null,
                'id' => !empty($location_data->ID) ? $location_data->ID : null,
                'infowindow' => [
                    'content' => $infowindow_content ?? null
                ],
            ]);
        }

        return $markers;
    }
}
