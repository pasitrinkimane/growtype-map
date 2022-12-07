<?php

/**
 * Include custom view
 */
if (!function_exists('growtype_map_include_view')) {
    function growtype_map_include_view($file_path, $variables = array ())
    {
        $fallback_view = GROWTYPE_MAP_PATH . 'resources/views/' . str_replace('.', '/', $file_path) . '.php';
        $child_blade_view = get_stylesheet_directory() . '/views/' . GROWTYPE_MAP_TEXT_DOMAIN . '/' . str_replace('.', '/', $file_path) . '.blade.php';
        $child_view = get_stylesheet_directory() . '/views/' . GROWTYPE_MAP_TEXT_DOMAIN . '/' . str_replace('.', '/', $file_path) . '.php';

        $template_path = $fallback_view;

        if (file_exists($child_blade_view) && function_exists('App\template')) {
            return App\template($child_blade_view, $variables);
        } elseif (file_exists($child_view)) {
            $template_path = $child_view;
        }

        if (file_exists($template_path)) {
            extract($variables);
            ob_start();
            include $template_path;
            $output = ob_get_clean();
        }

        return isset($output) ? $output : '';
    }
}

/**
 *
 */
if (!function_exists('growtype_map_render_svg')) {
    function growtype_map_render_image($url)
    {
        $ext = pathinfo($url, PATHINFO_EXTENSION);

        if ($ext === 'svg') {
            $arrContextOptions = [
                "ssl" => array (
                    "verify_peer" => false,
                    "verify_peer_name" => false,
                ),
            ];

            $response = file_get_contents(
                $url,
                false,
                stream_context_create($arrContextOptions)
            );
        } else {
            $response = '<img src="' . $url . '" class="img-fluid" />';
        }

        return $response;
    }
}
