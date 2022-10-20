/**
 *
 * @param element
 * @param lat
 * @param lng
 * @param initialZoom
 * @returns {*}
 */
function setMapInstance(mapContainer, lat, lng, initialZoom) {
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
        styles: [
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "stylers": [
                    {
                        "color": "#f7f9fa"
                    },
                    {
                        "saturation": 100
                    },
                    {
                        "lightness": 35
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "stylers": [
                    {
                        "color": "#eaf0f0"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#cfd8de"
                    }
                ]
            }
        ]
    });
}

export {setMapInstance};
