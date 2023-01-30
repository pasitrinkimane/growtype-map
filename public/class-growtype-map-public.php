<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Growtype_Map
 * @subpackage growtype_map/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Growtype_Map
 * @subpackage growtype_map/public
 * @author     Your Name <email@example.com>
 */
class Growtype_Map_Public
{

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $growtype_map The ID of this plugin.
     */
    private $growtype_map;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @param string $growtype_map The name of the plugin.
     * @param string $version The version of this plugin.
     * @since    1.0.0
     */
    public function __construct($growtype_map, $version)
    {
        $this->growtype_map = $growtype_map;
        $this->version = $version;

        add_filter('clean_url', array ($this, 'clean_google_url'), 99, 3);
        add_action('wp_footer', array ($this, 'add_scripts_to_footer'));
    }

    function clean_google_url($url, $original_url, $_context)
    {
        if (strstr($url, "googleapis.com") !== false) {
            $url = str_replace("&#038;", "&", $url); // or $url = $original_url
        }

        return $url;
    }

    /***
     *
     */
    function add_scripts_to_footer()
    {
        ?>
        <script type="text/javascript">
            window.growtypeMap = {};
        </script>
        <?php
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {
        wp_enqueue_style($this->growtype_map, GROWTYPE_MAP_URL_PUBLIC . 'styles/growtype-map.css', array (), $this->version, 'all');
    }

    /**
     * @return void
     */
    public function enqueue_scripts()
    {
        if (!empty(growtype_map_google_maps_api_key())) {
            /**
             * Google maps
             */
            wp_enqueue_script('growtype-map-google-maps-marker-clusterer', GROWTYPE_MAP_URL_PUBLIC . 'plugins/google/markerclusterer.js', [], '', true);
            wp_register_script('growtype-map-google-maps', 'https://maps.googleapis.com/maps/api/js?key=' . growtype_map_google_maps_api_key() . '&callback=growtypeMapInit&libraries=places,geometry&v=weekly', [$this->growtype_map, 'growtype-map-google-maps-marker-clusterer'], '1', true);
            wp_enqueue_script('growtype-map-google-maps');

            /**
             * Map scripts
             */
            wp_enqueue_script($this->growtype_map, GROWTYPE_MAP_URL_PUBLIC . 'scripts/growtype-map.js', array ('jquery'), $this->version, true);
        }
    }
}
