/**
 *
 * @param width
 * @param height
 * @param radius
 * @returns {string}
 */
function focusMarker() {
    /**
     * Target locations
     */
    $('.template-locations .btn-target-map').click(function () {
        let dataId = $(this).attr('data-id');

        if (!$(this).hasClass('is-active')) {
            $('.template-locations .btn-target-map').removeClass('is-active');
            $(this).addClass('is-active');

            let marker = getSingleMarker(dataId);

            if (marker) {
                mapInstance.setCenter(marker.getPosition());
                mapInstance.setZoom(17);

                google.maps.event.trigger(marker, 'click');

                if ($(window).width() < 640) {
                    window.scrollTo(0, 0);
                }
            }
        }
    });
}

export {focusMarker};
