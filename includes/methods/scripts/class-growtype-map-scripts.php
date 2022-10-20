<?php

/**
 * Class Growtype_Map_In_Gallery
 */
class Growtype_Map_Scripts
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', array ($this, 'growtype_map_scripts'));
        add_filter('clean_url', array ($this, 'growtype_map_clean_url'), 99, 3);
        add_action('wp_footer', array ($this, 'growtype_map_add_scripts_to_footer'));
    }

    function growtype_map_clean_url($url, $original_url, $_context)
    {
        if (strstr($url, "googleapis.com") !== false) {
            $url = str_replace("&#038;", "&", $url); // or $url = $original_url
        }

        return $url;
    }

    /***
     *
     */
    function growtype_map_add_scripts_to_footer()
    {
        ?>
        <script type="text/javascript">
            let growtypeMapLocations = '';
        </script>
        <?php
    }

    /**
     * Add scripts
     */
    function growtype_map_scripts()
    {
        /**
         * Google
         */
        wp_enqueue_script('growtype-map-google-maps-marker-clusterer', GROWTYPE_MAP_URL_PUBLIC . 'plugins/google/markerclusterer.js', [], '', true);

        wp_register_script('growtype-map-google-maps', 'https://maps.googleapis.com/maps/api/js?key=' . get_option('google_maps_api_key') . '&callback=growtypeMapInit&libraries=places&v=weekly', ['growtype-map-google-maps-marker-clusterer'], '1', true);
        wp_enqueue_script('growtype-map-google-maps');
    }
}
