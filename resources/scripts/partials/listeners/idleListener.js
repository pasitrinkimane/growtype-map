function idleListener(mapId) {
    window.growtypeMap[mapId]['dynamic']['mapInstance'].addListener("idle", () => {
        window.growtypeMap[mapId]['dynamic']['visibleMarkersPostsIds'] = {};

        if (Array.isArray(window.growtypeMap[mapId]['dynamic']['markersGroups'][window.growtypeMap[mapId]['static']['initialGroupId']])) {
            window.growtypeMap[mapId]['dynamic']['markersGroups'][window.growtypeMap[mapId]['static']['initialGroupId']]['markers'].map(function (marker, index) {
                if (window.growtypeMap[mapId]['dynamic']['mapInstance'].getBounds().contains(marker.getPosition())) {
                    if (marker.location_id == $('.growtype-map-container[data-map-id="' + mapId + '"]').attr('main-marker')) {
                        window.growtypeMap[mapId]['dynamic']['mainMarker'] = {
                            location_id: marker.location_id,
                            index: index
                        }
                    }
                    visibleMarkersPostsIds[marker.location_id] = marker.location_id;
                }
            });
        }

        if (!window.growtypeMap[mapId]['dynamic']['mapsInitialLoading'] && JSON.stringify(window.growtypeMap[mapId]['dynamic']['previousVisibleMarkersPostsIds']) !== JSON.stringify(window.growtypeMap[mapId]['dynamic']['visibleMarkersPostsIds'])) {
            // getMarkersPosts(0, true)
        }

        if (window.growtypeMap[mapId]['dynamic']['searchBox']) {
            window.growtypeMap[mapId]['dynamic']['searchBox'].setBounds(window.growtypeMap[mapId]['dynamic']['mapInstance'].getBounds());
        }

        /**
         * Open specific marker
         */
        if (window.growtypeMap[mapId]['dynamic']['mapsInitialLoading'] && $('.growtype-map-container[data-map-id="' + mapId + '"]').attr('infowindow-open') && mainMarker !== null) {
            google.maps.event.trigger(window.growtypeMap[mapId]['dynamic']['markersGroups'][window.growtypeMap[mapId]['static']['initialGroupId']][window.growtypeMap[mapId]['dynamic']['mainMarker'].index], 'click');
        }

        /**
         * Maps fully loaded
         * @type {boolean}
         */
        window.growtypeMap[mapId]['dynamic']['mapsInitialLoading'] = false;

        /**
         * Set used markers posts ids
         * @type {{}}
         */
        window.growtypeMap[mapId]['dynamic']['previousVisibleMarkersPostsIds'] = window.growtypeMap[mapId]['dynamic']['visibleMarkersPostsIds'];
    });
}

export {idleListener};
