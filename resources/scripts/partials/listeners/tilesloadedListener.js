import {updateMarkersClusters} from "../updateMarkersClusters";

function tilesloadedListener(mapId) {
    /**
     * Show only visible markers
     */
    google.maps.event.addListener(window.growtypeMap[mapId]['dynamic']['mapInstance'], "tilesloaded", () => {
        window.growtypeMap[mapId]['dynamic']['markerCluster'].clearMarkers();

        if (window.growtypeMap[mapId]['dynamic']['markers'][window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId']] !== undefined) {
            const visibleMarkers = window.growtypeMap[mapId]['dynamic']['markers'][window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId']].filter(function (marker) {
                return window.growtypeMap[mapId]['dynamic']['mapInstance'].getBounds().contains(marker.getPosition());
            });

            updateMarkersClusters(mapId, visibleMarkers)
        }

        google.maps.event.addListener(window.growtypeMap[mapId]['dynamic']['markerCluster'], 'click', function (cluster) {
            if (window.growtypeMap[mapId]['dynamic']['prevInfoWindow'] !== null) {
                window.growtypeMap[mapId]['dynamic']['prevInfoWindow'].close();
            }
        });
    });
}

export {tilesloadedListener};
