import {updateMarkers} from "../updateMarkers";
import {updateMarkersClusters} from "../updateMarkersClusters";

function categoriesFilter() {

    /**
     * Custom filters
     */
    $('.b-filters-categories .b-categories-single .btn').click(function () {
        let $this = $(this)

        $this.toggleClass('is-active');

        /**
         * Reset data
         */
        if (initiallyShowAllRoutes) {
            currentMarkersGroupId = null;
        }

        selectedCategories = [];
        selectedAreas = [];

        $this.closest('.b-filters-categories').find('.b-categories-single .btn.is-active').map(function (index, element) {
            if ($(element).attr('data-cat')) {
                selectedCategories.push($(element).attr('data-cat'))
            }
            if ($(element).attr('data-area')) {
                selectedAreas.push($(element).attr('data-area'))
            }
        });

        if ($('body').hasClass('template-routes')) {
            $('.growtype-post-container').slick('unslick');

            let hasVisiblePosts = false;
            $('.growtype-post-container .b-post-location')
                .hide()
                .each(function (index, element) {
                    if (itemExistsWhenFiltersApplied([$(element).attr('data-cat')], [$(element).attr('data-area')])) {
                        $(this).show();
                        hasVisiblePosts = true;
                    }
                });

            if (hasVisiblePosts) {
                setTimeout(function () {
                    $('.growtype-post-container').slick(window.routesSlider);
                }, 100)
            }
        } else {
            $('.growtype-post-container .b-post-location')
                .hide()
                .each(function (index, element) {
                    if (itemExistsWhenFiltersApplied([$(element).attr('data-cat')], [$(element).attr('data-area')])) {
                        $(this).show();
                    }
                });
        }

        setTimeout(function () {
            updateMarkers(true)
            updateMarkersClusters(markers[initiallyShowAllRoutes ? initialGroupId : currentMarkersGroupId])
        }, 500)
    });
}

export {categoriesFilter};
