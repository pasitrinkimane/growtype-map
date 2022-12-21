<?php

/**
 *
 */
class Growtype_Map_Block
{
    const ATTRIBUTES_FORMATTED_IN_SHORTCODE = [
        'marker_icon_image' => [
            'skip' => false,
            'get_value' => 'id',
        ],
        'map_cover_image' => [
            'skip' => false,
            'get_value' => 'id',
        ],
        'map_style' => [
            'skip' => false,
            'formatting' => true,
        ]
    ];

    function __construct()
    {
        add_action('init', array ($this, 'create_block_growtype_map_block_init'));
    }

    function create_block_growtype_map_block_init()
    {
        register_block_type_from_metadata(GROWTYPE_MAP_PATH . 'build', [
            'render_callback' => array ($this, 'render_callback_growtype_map'),
        ]);
    }

    /**
     * @param $block_attributes
     * @param $content
     * @return mixed
     */
    function render_callback_growtype_map($block_attributes, $content)
    {
        $shortcode = $this->format_shortcode($block_attributes);

        $shortcode_content = preg_replace('~\[(.+?)\]~', $shortcode, $content);

        return do_shortcode($shortcode_content);
    }

    /**
     * @param $block_attributes
     * @return string
     */
    function format_shortcode($block_attributes)
    {
        $shortcode = '[growtype_map';
        foreach ($block_attributes as $key => $value) {

            if (isset(self::ATTRIBUTES_FORMATTED_IN_SHORTCODE[$key]['skip']) && self::ATTRIBUTES_FORMATTED_IN_SHORTCODE[$key]['skip'] === true) {
                continue;
            }

            if (isset(self::ATTRIBUTES_FORMATTED_IN_SHORTCODE[$key]['get_value']) && isset($value[self::ATTRIBUTES_FORMATTED_IN_SHORTCODE[$key]['get_value']])) {
                $value = $value[self::ATTRIBUTES_FORMATTED_IN_SHORTCODE[$key]['get_value']];
            }

            if (isset(self::ATTRIBUTES_FORMATTED_IN_SHORTCODE[$key]['formatting']) && !empty($value)) {
                $value = urlencode(json_encode(json_decode($value, true)));
            }

            if (!is_array($value)) {
                $shortcode .= ' ' . $key . '="' . $value . '"';
            }
        }
        $shortcode .= ']';

        return $shortcode;
    }
}
