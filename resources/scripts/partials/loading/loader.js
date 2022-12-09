function loader(mapId) {
    return {
        show: function () {
            if (window.growtypeMap[mapId]['dynamic']['loader'] !== undefined) {
                window.growtypeMap[mapId]['dynamic']['loader'].push(1);
            } else {
                window.growtypeMap[mapId]['dynamic']['loader'] = [1]
            }

            $('.growtype-map-container-wrapper[data-map-id="' + mapId + '"]').addClass('is-loading');
        },
        hide: function () {
            window.growtypeMap[mapId]['dynamic']['loader'].pop();

            if (window.growtypeMap[mapId]['dynamic']['loader'].length === 0) {
                $('.growtype-map-container-wrapper[data-map-id="' + mapId + '"]').removeClass('is-loading');
            }
        },
    }
}

export {loader};
