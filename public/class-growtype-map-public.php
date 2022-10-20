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
        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Growtype_Map_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Growtype_Map_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */
        wp_enqueue_style($this->growtype_map, GROWTYPE_MAP_URL_PUBLIC . 'styles/growtype-map.css', array (), $this->version, 'all');
    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {
        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Growtype_Map_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Growtype_Map_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */
        wp_enqueue_script($this->growtype_map, GROWTYPE_MAP_URL_PUBLIC . 'scripts/growtype-map.js', array ('jquery'), $this->version, true);

        /**
         * Google
         */
        wp_enqueue_script('growtype-map-google-maps-marker-clusterer', GROWTYPE_MAP_URL_PUBLIC . 'plugins/google/markerclusterer.js', [], '', true);

        wp_register_script('growtype-map-google-maps', 'https://maps.googleapis.com/maps/api/js?key=' . get_option('google_maps_api_key') . '&callback=growtypeMapInit&libraries=places&v=weekly', [$this->growtype_map, 'growtype-map-google-maps-marker-clusterer'], '1', true);
        wp_enqueue_script('growtype-map-google-maps');
    }

}
