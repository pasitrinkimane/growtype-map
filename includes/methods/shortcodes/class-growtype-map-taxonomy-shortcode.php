<?php

/**
 * Class Growtype_Map_Taxonomy_Shortcode
 */
class Growtype_Map_Taxonomy_Shortcode
{
    public function __construct()
    {
        if (!is_admin() && !wp_is_json_request()) {
            add_shortcode('growtype_map_taxonomy', array ($this, 'growtype_map_taxonomy_shortcode'));
        }
    }

    /**
     *
     */
    function growtype_map_taxonomy_shortcode($attributes)
    {
        $terms = get_terms(array (
            'taxonomy' => $attributes['tax'],
            'hide_empty' => $attributes['hide_empty'] === 'true' ? true : false,
        ));

        if (isset($attributes['tax2']) && !empty($attributes['tax2'])) {
            $terms2 = get_terms(array (
                'taxonomy' => $attributes['tax2'],
                'hide_empty' => $attributes['hide_empty'] ?? true,
            ));
        }

        $taxonomies = [];
        foreach ($terms as $index => $term) {
            $taxonomies[] = [
                'term_id' => $term->term_id,
                'name' => $term->name,
                'tax' => $term->slug,
                'tax2' => isset($terms2) ? $terms2[$index]->slug : '',
            ];
        }

        ob_start();
        echo growtype_map_include_view('taxonomy.index', ['taxonomies' => $taxonomies]);
        $content = ob_get_clean();

        return $content;
    }
}
