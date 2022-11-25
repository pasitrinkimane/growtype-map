/**
 *
 * @param element
 * @param lat
 * @param lng
 * @param initialZoom
 * @returns {*}
 */
function setMapInstance(mapId, mapContainer, lat, lng, initialZoom) {
    return new google.maps.Map(mapContainer, {
        center: new google.maps.LatLng(lat, lng),
        zoom: parseInt(initialZoom),
        options: {
            gestureHandling: 'greedy'
        },
        scrollwheel: false,
        disableDefaultUI: true,
        mapTypeControl: false,
        scaleControl: false,
        zoomControl: true,
        styles: window.growtypeMap[mapId]['static']['mapStyle']
    });
}

export {setMapInstance};
