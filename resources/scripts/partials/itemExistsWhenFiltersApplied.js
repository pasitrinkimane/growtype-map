function itemExistsWhenFiltersApplied(mapId, categories, locations, groupCategories = null, groupLocations = null) {
    let itemExists = false;

    let categoryExists = false;
    window.growtypeMap[mapId]['dynamic']['selectedCategories'].map(item => {
        if ((categories !== null && categories.indexOf(item) != -1) || (groupCategories && groupCategories.indexOf(item) != -1)) {
            categoryExists = true;
        }
    });

    if (categoryExists && selectedAreas.length === 0) {
        return true;
    }

    let areaExists = false;
    window.growtypeMap[mapId]['dynamic']['selectedLocations'].map(item => {
        if ((locations !== null && locations.indexOf(item) != -1) || (groupLocations && groupLocations.indexOf(item) != -1)) {
            areaExists = true;
        }
    });

    if (areaExists && selectedCategories.length === 0) {
        return true;
    }

    if (categoryExists && areaExists) {
        return true;
    }

    if (window.growtypeMap[mapId]['dynamic']['selectedCategories'].length === 0 && window.growtypeMap[mapId]['dynamic']['selectedLocations'].length === 0) {
        return true;
    }

    return itemExists;
}

export {itemExistsWhenFiltersApplied};
