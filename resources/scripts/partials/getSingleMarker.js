/**
 *
 * @param markerId
 * @returns {null}
 */
function getSingleMarker(markerId) {
    let marker = null;

    markers[initialGroupId].map(function (element) {
        if (element.location_id == markerId) {
            marker = element;
            return false;
        }
    });

    return marker;
}

export {getSingleMarker};
