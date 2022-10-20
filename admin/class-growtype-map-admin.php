<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Growtype_Map
 * @subpackage growtype_map/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Growtype_Map
 * @subpackage growtype_map/admin
 * @author     Your Name <email@example.com>
 */
class Growtype_Map_Admin
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
     * Traits
     */

    /**
     * Initialize the class and set its properties.
     *
     * @param string $growtype_map The name of this plugin.
     * @param string $version The version of this plugin.
     * @since    1.0.0
     */
    public function __construct($growtype_map, $version)
    {
        $this->growtype_map = $growtype_map;
        $this->version = $version;

        if (is_admin()) {
            add_action('admin_menu', array ($this, 'add_options_page'));

            /**
             * Load methods
             */
            add_action('admin_init', array ($this, 'add_options_settings'));
        }
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in growtype_map as all of the hooks are defined
         * in that particular class.
         *
         * The growtype_map will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_style($this->growtype_map, plugin_dir_url(__FILE__) . 'css/growtype-map-admin.css', array (), $this->version, 'all');

    }

    /**
     * Register the JavaScript for the admin area.
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

        wp_enqueue_script($this->growtype_map, plugin_dir_url(__FILE__) . 'js/growtype-map-admin.js', array ('jquery'), $this->version, false);

    }

    /**
     * Register the options page with the Wordpress menu.
     */
    function add_options_page()
    {
        add_options_page(
            'Growtype - Map',
            'Growtype - Map',
            'manage_options',
            'growtype-map-settings',
            array ($this, 'growtype_map_settings'),
            1
        );
    }

    /**
     * @param $current
     * @return void
     */
    function growtype_map_settings_tabs($current = 'login')
    {
        $tabs['general'] = 'General';

        echo '<div id="icon-themes" class="icon32"><br></div>';
        echo '<h2 class="nav-tab-wrapper">';
        foreach ($tabs as $tab => $name) {
            $class = ($tab == $current) ? ' nav-tab-active' : '';
            echo "<a class='nav-tab$class' href='?page=growtype-map-settings&tab=$tab'>$name</a>";

        }
        echo '</h2>';
    }

    /**
     * @return void
     */
    function growtype_map_settings()
    {
        if (isset($_GET['page']) && $_GET['page'] == 'growtype-map-settings') { ?>

            <div class="wrap">

                <h1>Growtype - Map settings</h1>

                <?php
                if (isset($_GET['updated']) && 'true' == esc_attr($_GET['updated'])) {
                    echo '<div class="updated" ><p>Theme Settings Updated.</p></div>';
                }

                if (isset ($_GET['tab'])) {
                    $this->growtype_map_settings_tabs($_GET['tab']);
                } else {
                    $this->growtype_map_settings_tabs();
                }
                ?>

                <form id="growtype_map_main_settings" method="post" action="options.php">
                    <?php

                    if (isset ($_GET['tab'])) {
                        $tab = $_GET['tab'];
                    } else {
                        $tab = 'general';
                    }

                    switch ($tab) {
                        case 'general':
                            settings_fields('google_maps_settings');

                            echo '<table class="form-table">';
                            do_settings_fields('growtype-map-settings', 'google_maps_settings');
                            echo '</table>';

                            break;
                    }

                    if ($tab !== 'examples') {
                        submit_button();
                    }

                    ?>
                </form>
            </div>

            <?php
        }
    }

    /**
     * Load the required methods for this plugin.
     *
     */
    public function add_options_settings()
    {

        /**
         * Acf settings
         */
        add_settings_section(
            'google_maps_settings', // section ID
            'Google Maps', // title (if needed)
            '', // callback function (if needed)
            'growtype-map-settings' // page slug
        );

        /**
         * ACF Api key
         */
        register_setting(
            'google_maps_settings', // settings group name
            'google_maps_api_key', // option name
            'sanitize_text_field' // sanitization function
        );

        add_settings_field(
            'google_maps_api_key',
            'Google Maps Api Key',
            array ($this, 'google_maps_api_key_callback'),
            'growtype-map-settings',
            'google_maps_settings'
        );

    }

    /**
     * Maps api key input
     */
    function google_maps_api_key_callback()
    {
        $html = '<input type="text" name="google_maps_api_key" style="min-width:400px;" value="' . get_option('google_maps_api_key') . '" />';
        echo $html;
    }
}
