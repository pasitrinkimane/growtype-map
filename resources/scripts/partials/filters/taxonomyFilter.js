import {updateMarkers} from "../updateMarkers";
import {updateMarkersClusters} from "../updateMarkersClusters";

function taxonomyFilter(mapId) {
    $('.growtype-map-taxonomy-nav .growtype-map-taxonomy-item .btn').click(function () {
        let $this = $(this)

        $this.toggleClass('is-active');

        /**
         * Reset data
         */
        if (window.growtypeMap[mapId]['static']['initiallyShowAllRoutes'] !== 'false') {
            window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId'] = null;
        }

        window.growtypeMap[mapId]['dynamic']['selectedTax'] = [];
        window.growtypeMap[mapId]['dynamic']['selectedTax2'] = [];

        $this.closest('.growtype-map-taxonomy-nav').find('.btn.is-active').map(function (index, element) {
            if ($(element).attr('data-tax')) {
                window.growtypeMap[mapId]['dynamic']['selectedTax'].push($(element).attr('data-tax'))
            }
            if ($(element).attr('data-tax2')) {
                window.growtypeMap[mapId]['dynamic']['selectedTax2'].push($(element).attr('data-tax2'))
            }
        });

        setTimeout(function () {
            updateMarkers(mapId, window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId'], true)
            updateMarkersClusters(mapId, window.growtypeMap[mapId]['dynamic']['markersGroups'][window.growtypeMap[mapId]['dynamic']['currentMarkersGroupId']]['markers'])
        }, 500)
    });
}

export {taxonomyFilter};
