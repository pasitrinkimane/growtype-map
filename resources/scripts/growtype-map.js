import {updateMarkers} from "./partials/updateMarkers";
import {updateMarkersClusters} from "./partials/updateMarkersClusters";
import {setMapInstance} from "./partials/setMapInstance";
import {initSearch} from "./partials/search/initSearch";
import {tilesloadedListener} from "./partials/listeners/tilesloadedListener";
import {idleListener} from "./partials/listeners/idleListener";
import {taxonomyFilter} from "./partials/filters/taxonomyFilter";
import {getUserLocation} from "./partials/location/getUserLocation";

$ = jQuery;

function growtypeMapInit() {
    $('.growtype-map-container-wrapper').each(function (index, mapContainer) {
        /**
         * Initial values
         */
        let mapId = $(mapContainer).attr('data-map-id');

        window.growtypeMap[mapId]['dynamic'] = {
            mapInstance: null,
            markersGroups: [],
            markerCluster: null,
            selectedTax: [],
            selectedTax2: [],
            prevInfoWindow: null,
            visibleMarkersPostsIds: {},
            mapsInitialLoading: true,
            previousVisibleMarkersPostsIds: {},
            lastPostWasRetrieved: false,
            mainMarker: null,
            postsRequested: false,
            polylines: [],
            currentMarkersGroupId: null,
            initialZoom: $(mapContainer).attr('data-initial-zoom') && $(mapContainer).attr('data-initial-zoom').length > 0 ? parseInt($(mapContainer).attr('data-initial-zoom')) : null,
            searchBox: null,
        }

        /**
         * Set current markers group
         */
        if (window.growtypeMap[mapId]['static']['initiallyShowAllRoutes'] === 'false') {
            window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId'] = window.growtypeMap[mapId]['static']['initialGroupId']
        }

        window.growtypeMap[mapId]['dynamic']['mapInstance'] = setMapInstance(
            mapId,
            $(mapContainer).find('.growtype-map-container').get(0),
            window.growtypeMap[mapId]['static']['initialLat'],
            window.growtypeMap[mapId]['static']['initialLng'],
            window.growtypeMap[mapId]['static']['initialZoom']
        )

        /**
         * Disable map dragging
         */
        if (window.growtypeMap[mapId]['static']['disableMapDragging']) {
            window.growtypeMap[mapId]['dynamic']['mapInstance'].setOptions({draggable: false});
        }

        /**
         * Get user location
         */
        if (window.growtypeMap[mapId]['static']['showUserLocation'] === 'true') {
            getUserLocation(mapId, window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId'])
        }

        /**
         * Set markers
         */
        updateMarkers(mapId, window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId'], false)

        /**
         * Get initial markers clusters
         */
        updateMarkersClusters(mapId, [])

        /**
         * Search location
         */
        initSearch(mapId)

        /**
         * tilesloaded
         */
        tilesloadedListener(mapId)

        /**
         * idle
         */
        idleListener(mapId)

        /**
         *
         */
        taxonomyFilter(mapId)
    })
}

/**
 *
 * @type {growtypeMapInit}
 */
window.growtypeMapInit = growtypeMapInit;


