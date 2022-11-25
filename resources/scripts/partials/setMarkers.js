import {createMarker} from "./createMarker";
import {itemExistsWhenFiltersApplied} from "./itemExistsWhenFiltersApplied";

/**
 * @type {boolean}
 * Get markers
 */
let markersLoading = false;

function setMarkers(mapId, groupId, clearOldMarkers = true) {
    if (!markersLoading) {
        /**
         * Spinner
         */
        $('.growtype-map-container[data-map-id="' + mapId + '"] + .spinner-border').show();

        /**
         * Clear out the old markers.
         */
        if (window.growtypeMap[mapId]['dynamic']['markers'] !== undefined && clearOldMarkers) {
            window.growtypeMap[mapId]['dynamic']['markers'].forEach((markerGroup) => {
                markerGroup.forEach((marker) => {
                    marker.setMap(null);
                });
            });
        }

        /**
         * Clear out the old markerCluster.
         */
        if (window.growtypeMap[mapId]['dynamic']['markerCluster'] !== undefined && clearOldMarkers) {
            window.growtypeMap[mapId]['dynamic']['markerCluster'].clearMarkers();
        }

        /**
         * @type {google.maps.LatLngBounds}
         */
        let bounds = new google.maps.LatLngBounds();

        const filteredMarkers = [];

        let visibleMarkersCounter = 1;

        let groupCategories = window.growtypeMap[mapId]['static']['markersGroups'][groupId]['categories']
        let groupLocations = window.growtypeMap[mapId]['static']['markersGroups'][groupId]['locations']

        if (!window.growtypeMap[mapId]['static']['initiallyShowAllRoutes'] && clearOldMarkers) {
            window.growtypeMap[mapId]['dynamic']['polylines'].map(function (element) {
                element.setMap(null);
            })
        }

        /**
         * Map through markers
         */
        window.growtypeMap[mapId]['static']['markersGroups'][groupId]['markers'].map(function (marker, i) {
            if (marker.enabled === 'false') {
                return false;
            }

            if (window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId']) {
                if (window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId'] !== groupId) {
                    return false;
                }
            }

            if (!itemExistsWhenFiltersApplied(mapId, marker.categories, marker.locations, groupCategories, groupLocations)) {
                return false;
            }

            let latlng = marker.latLng.replace(/\s/g, "").split(",")
            let lat = latlng[0]
            let lng = latlng[1]

            let position = new google.maps.LatLng(lat, lng);

            bounds.extend(position);

            window.growtypeMap[mapId]['dynamic']['mapInstance'].fitBounds(bounds);

            let scaletSize = new google.maps.Size(parseInt(marker.icon.width), parseInt(marker.icon.height));

            const custom_icon = {
                url: marker.icon.url,
                scaledSize: scaletSize, // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(15, 40) // anchor
            };

            if (window.growtypeMap[mapId]['static']['map_type'] === 'route') {
                custom_icon['anchor'] = new google.maps.Point(10, 40)
            }

            let marketData = {
                position: position,
                optimized: true,
                map: window.growtypeMap[mapId]['dynamic']['mapInstance'],
            };

            if (typeof marker.icon !== 'undefined' && marker.icon.url) {
                if (window.growtypeMap[mapId]['static']['map_type'] === 'route') {
                    marketData['icon'] = {
                        url: createMarker(30, 30, 19, visibleMarkersCounter),
                        // scaledSize: scaletSize, // scaled size
                        origin: new google.maps.Point(0, 0), // origin
                        anchor: new google.maps.Point(15, 20) // anchor
                    }
                    visibleMarkersCounter++;
                } else {
                    marketData['icon'] = custom_icon;
                }
            } else if (location.type === 'hidden') {
                marketData['icon'] = '#';
            }

            let newMarker = new google.maps.Marker(marketData);

            /**
             * Infowindow
             */
            let infowindow = null;
            if (marker.infowindow.enabled === 'true') {
                const contentString = marker.infowindow ? marker.infowindow.content : '';

                infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });
            }

            google.maps.event.addListener(window.growtypeMap[mapId]['dynamic']['mapInstance'], 'click', function () {
                if (marker.infowindow.enabled === 'true') {
                    if (infowindow) {
                        infowindow.close();
                    }

                    if (window.growtypeMap[mapId]['dynamic']['prevInfoWindow']) {
                        window.growtypeMap[mapId]['dynamic']['prevInfoWindow'].close();
                    }
                }
            });

            google.maps.event.addListener(window.growtypeMap[mapId]['dynamic']['mapInstance'], 'zoom_changed', function () {
                if (marker.infowindow.enabled === 'true') {
                    if (window.growtypeMap[mapId]['dynamic']['prevInfoWindow']) {
                        window.growtypeMap[mapId]['dynamic']['prevInfoWindow'].close();
                    }
                }

                /**
                 * Initial zoom fix
                 */
                let zoomChangeBoundsListener = google.maps.event.addListener(window.growtypeMap[mapId]['dynamic']['mapInstance'], 'bounds_changed', function (event) {
                    if (this.getZoom() > 15 && this.initialZoom == true) {
                        this.setZoom(15);
                        this.initialZoom = false;
                    }

                    google.maps.event.removeListener(zoomChangeBoundsListener);
                });
            });

            google.maps.event.addListener(newMarker, 'click', function (evt) {
                if (marker.infowindow.enabled === 'true') {
                    if (window.growtypeMap[mapId]['dynamic']['prevInfoWindow']) {
                        window.growtypeMap[mapId]['dynamic']['prevInfoWindow'].close();
                    }

                    infowindow.open({
                        anchor: newMarker,
                        map: window.growtypeMap[mapId]['dynamic']['mapInstance'],
                        shouldFocus: false,
                    });

                    window.growtypeMap[mapId]['dynamic']['prevInfoWindow'] = infowindow
                }
            })

            filteredMarkers.push(marker)
        });

        /**
         * Polyline
         */
        if (window.growtypeMap[mapId]['static']['map_type'] === 'route') {
            if (window.growtypeMap[mapId]['dynamic']['polylines'][groupId] !== undefined && typeof window.growtypeMap[mapId]['dynamic']['polylines'][groupId].setMap === "function" && clearOldMarkers) {
                window.growtypeMap[mapId]['dynamic']['polylines'][groupId].setMap(null);
            }

            window.growtypeMap[mapId]['dynamic']['polylines'][groupId] = new google.maps.Polyline({
                strokeColor: "#0F524A",
                strokeOpacity: 0.8,
                strokeWeight: 5,
            });

            setPreciseRoute(groupId, filteredMarkers, window.growtypeMap[mapId]['dynamic']['polylines'])
        }

        /**
         * bounds
         */
        window.growtypeMap[mapId]['dynamic']['mapInstance'].initialZoom = true;
        if (filteredMarkers.length !== 0 && window.growtypeMap[mapId]['static']['initialZoom'] === null) {
            window.growtypeMap[mapId]['dynamic']['mapInstance'].fitBounds(bounds);
        }

        /**
         * Spinner
         */
        $('.growtype-map-container[data-map-id="' + mapId + '"] + .spinner-border').hide();

        /**
         * Disable loading
         */
        markersLoading = false;
    }
}

export {setMarkers};
