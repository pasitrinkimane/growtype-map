function setPreciseRoute(groupId, markers, polylines) {
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

    if (markers.length === 0) {
        return setBasicRoute(groupId, markers, polylines);
    }

    let waypoints = [];

    for (let i = 1; i < markers.length; i++) {
        waypoints.push({
            location: markers[i].getPosition(),
            stopover: true
        })
    }

    let travelMode = 'WALKING';

    if (growtypeMap.markersGroups[groupId]['travel_mode'] === 'driving') {
        travelMode = 'DRIVING';
    } else if (growtypeMap.markersGroups[groupId]['travel_mode'] === 'bicycling') {
        travelMode = 'BICYCLING';
    }

    var request = {
        origin: markers[0].getPosition(),
        destination: markers[markers.length - 1].getPosition(),
        travelMode: google.maps.TravelMode[travelMode],
        waypoints: waypoints
    };

    let bounds = new google.maps.LatLngBounds();

    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            let legs = result.routes[0].legs;

            $(legs).each(function (index, item) {
                let steps = item.steps;
                $(steps).each(function (index, item) {
                    let itemPath = item.path;
                    $(itemPath).each(function (index, item) {
                        polylines[groupId].getPath().push(item);
                        bounds.extend(item);
                    });
                });
            });
        } else {
            return setBasicRoute(groupId, markers, polylines);
        }
    });

    polylines[groupId].setMap(mapInstance);
}

export {setPreciseRoute};
