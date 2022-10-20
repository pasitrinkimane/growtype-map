function initSearch(mapId) {

    /**
     * Set initial location from url
     */
    if (window.location.search.length > 0 && window.location.search.indexOf('location') > 0) {
        let geocoder = new google.maps.Geocoder();
        let initialLocationAddress = window.location.search.replace('?location=', '');

        geocoder.geocode({'address': initialLocationAddress}, function (results, status) {
            if (status === 'OK') {
                mapInstance.setCenter(results[0].geometry.location);
                mapInstance.setZoom(14);
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    /**
     * Search
     */
        // Create the search box and link it to the UI element.
    const searchInput = document.getElementById("growtype-map-search");
    window.growtypeMap[mapId]['dynamic']['searchBox'] = searchInput !== null ? new google.maps.places.SearchBox(searchInput) : null;

    const options = {
        componentRestrictions: {country: "LT"},
        // fields: ["address_components", "geometry", "icon", "name"],
        // strictBounds: false,
        // types: ["establishment"],
    };

    /**
     * TODO fix autocomplete
     */
    // const autocomplete = new google.maps.places.Autocomplete(input, options);
    //
    // autocomplete.bindTo("bounds", mapInstance);

    /**
     * Search locations
     */

    if (searchInput) {
        mapInstance.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);
    }

    if (window.growtypeMap[mapId]['dynamic']['searchBox']) {
        window.growtypeMap[mapId]['dynamic']['searchBox'].addListener("places_changed", () => {
            if (prevInfowindow !== null) {
                prevInfowindow.close();
            }

            const places = window.growtypeMap[mapId]['dynamic']['searchBox'].getPlaces();

            if (places.length == 0) {
                return;
            }

            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();

            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });

            window.growtypeMap[mapId]['dynamic']['mapInstance'].fitBounds(bounds);
        });
    }
}

export {initSearch};
