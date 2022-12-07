<div class="growtype-map-taxonomy">
    <div class="growtype-map-taxonomy-inner">
        <div class="growtype-map-taxonomy-nav">
            <?php foreach ($taxonomies as $taxonomy) {
                $icon_id = get_term_meta($taxonomy['term_id'], 'tax_icon', true);
                $icon_url = !empty($icon_id) ? wp_get_attachment_url($icon_id) : '';
                ?>
                <div class="growtype-map-taxonomy-item">
                    <button class="btn" data-tax="<?php echo $taxonomy['tax'] ?>" data-tax2="<?php echo $taxonomy['tax2'] ?>">
                        <?php if (!empty($icon_url)) { ?>
                            <span class="btn-img"><?php echo growtype_map_render_image($icon_url) ?></span>
                        <?php } ?>
                        <span class="btn-label"><?php echo $taxonomy['name'] ?></span>
                    </button>
                </div>
            <?php } ?>
        </div>
    </div>
</div>
