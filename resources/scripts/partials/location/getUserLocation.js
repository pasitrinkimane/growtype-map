import {updateMarkers} from "../updateMarkers";
import {loader} from "./../loading/loader";

function getUserLocation(mapId, groupId) {
    if (navigator.geolocation) {
        loader(mapId).show();

        navigator.geolocation.getCurrentPosition(
            (position) => {

                loader(mapId).hide();

                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                window.growtypeMap[mapId]['dynamic']['currentUserLocation'] = pos;

                let locationMarker = window.growtypeMap[mapId]['static']['markersGroups'][groupId]['markers'][0] ?? '';

                if (locationMarker.length === 0) {
                    return false;
                }

                let currentLocationMarker = Object.assign({}, locationMarker);
                currentLocationMarker['latLng'] = pos.lat + ',' + pos.lng;
                currentLocationMarker['icon'] = window.growtypeMap[mapId]['static']['userLocation']['icon'];

                let distanceBetweenMarkers = google.maps.geometry.spherical.computeDistanceBetween({
                    lat: parseFloat(locationMarker['latLng'].split(",")[0]),
                    lng: parseFloat(locationMarker['latLng'].split(",")[1])
                }, pos);

                /**
                 * Add current location marker to all markers
                 */
                window.growtypeMap[mapId]['static']['markersGroups'][groupId]['markers'].push(currentLocationMarker)

                /**
                 * Update all markers
                 */
                updateMarkers(mapId, groupId, true)

                /**
                 * Fire event
                 */
                const growtypeMapUserLocationEvent = new CustomEvent('growtypeMapUserLocation', {
                    detail: {
                        position: position,
                        distanceBetweenMarkers: distanceBetweenMarkers
                    }
                });

                setTimeout(function () {
                    document.dispatchEvent(growtypeMapUserLocationEvent);
                }, 500)
            },
            () => {
                handleLocationError();
            }
        );
    } else {
        handleLocationError();
    }
}

function handleLocationError() {
    alert('Geolocation is not supported by your browser. Please enable it in your browser settings and refresh the page.');
}

export {getUserLocation};
