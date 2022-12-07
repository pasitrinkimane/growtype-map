/**
 * Update all markers
 */
import {setMarkers} from "./setMarkers";

function updateMarkers(mapId, groupId = null, clearOldMarkers = true) {
    if (groupId === null) {
        Object.entries(window.growtypeMap[mapId]['static']['markersGroups']).map(function (element, index) {
            if (element[1]['markers'].length > 0) {
                window.growtypeMap[mapId]['dynamic']['markersGroups'][element[0]] = {
                    markers: setMarkers(mapId, element[0], clearOldMarkers)
                }
            }
        })
    } else {
        window.growtypeMap[mapId]['dynamic']['markersGroups'][groupId] = {
            markers: setMarkers(mapId, groupId, clearOldMarkers),
        }
    }
}

export {updateMarkers};
