import {getSingleMarker} from "../getSingleMarker";

/**
 *
 * @param width
 * @param height
 * @param radius
 * @returns {string}
 */
function focusMarker(mapId, markerId) {
    let marker = getSingleMarker(mapId, markerId);

    if (marker) {
        window.growtypeMap[mapId]['dynamic']['mapInstance'].setCenter(marker.getPosition());
        window.growtypeMap[mapId]['dynamic']['mapInstance'].setZoom(13);

        google.maps.event.trigger(marker, 'click');
    }
}

export {focusMarker};
