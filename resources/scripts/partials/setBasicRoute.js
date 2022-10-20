function setBasicRoute(groupId, markers, polylines) {
    let path = [];
    path[groupId] = [];
    markers.map(function (element) {
        path[groupId].push(element.getPosition());
    });

    polylines[groupId].setPath(path[groupId]);
    polylines[groupId].setMap(mapInstance);
}

export {setBasicRoute};
