/**
 * Update all markers
 */
function updateMarkersClusters(mapId, markers) {

    console.log(markers, 'markers')

    const markerClustererMarkers = markers.filter(function (marker) {
        return !marker.is_featured;
    });

    let getGoogleClusterInlineSvg = function (color) {
        var encoded = window.btoa('<svg fill="' + color + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><circle cx="120" cy="120" opacity=".6" r="70" /><circle cx="120" cy="120" opacity=".3" r="90" /><circle cx="120" cy="120" opacity=".2" r="110" /></svg>');
        return ('data:image/svg+xml;base64,' + encoded);
    };

    let clusterStyles = [
        {
            url: getGoogleClusterInlineSvg('#3548ff'),
            width: 40,
            height: 40,
            // anchor: [16, 0],
            textColor: 'white',
            textSize: 12
        }
    ];

    window.growtypeMap[mapId]['dynamic']['markerCluster'] = new MarkerClusterer(window.growtypeMap[mapId]['dynamic']['mapInstance'], markerClustererMarkers, {
        maxZoom: window.growtypeMap[mapId]['static']['mapType'] === 'route' ? 10 : 16,
        gridSize: 80,
        styles: clusterStyles,
        // imagePath: '../images/m'
    });
}

export {updateMarkersClusters};
