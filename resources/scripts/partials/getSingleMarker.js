/**
 *
 * @param markerId
 * @returns {null}
 */
function getSingleMarker(mapId, markerId) {
    let marker = null;

    window.growtypeMap[mapId]['dynamic']['markersGroups'][window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId']]['markers'].map(function (element) {
        if (element.id == markerId) {
            marker = element;
            return false;
        }
    });

    return marker;
}

export {getSingleMarker};
