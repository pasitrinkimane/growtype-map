/**
 *
 * @param slickGoToIndex
 * @param clearInitialPosts
 */
function getMarkersPosts(slickGoToIndex, clearInitialPosts = false) {
    let postsRequested = true;

    $('.interactive-map-posts .e-notice').remove();

    if (clearInitialPosts) {
        $('.interactive-map-posts .b-post-location').remove();
    }

    let postsNotInIds = {};

    $('.interactive-map-posts .b-post-location').map(function (index, element) {
        if ($(element).attr('data-post-id').length > 0) {
            postsNotInIds[$(element).attr('data-post-id')] = $(element).attr('data-post-id')
        }
    });

    $('.interactive-map-posts').addClass('is-loading').append('<span class="spinner-border"><div></div><div></div></span>');

    $.ajax({
        url: ajax_object.ajaxurl,
        type: "post",
        data: {
            action: 'get_slider_new_posts',
            posts_not_in_ids: JSON.stringify(postsNotInIds),
            posts_in_ids: JSON.stringify(visibleMarkersPostsIds)
        }
    }).done(function (response) {

        if (response.content.length === 0) {
            if (clearInitialPosts) {
                $('.interactive-map-posts').append('<p class="e-notice">Įrašų nerasta</p>')
            }
        } else {
            $('.interactive-map-posts').slick('slickAdd', response.content);
            $('.interactive-map-posts').slick('slickGoTo', slickGoToIndex);
        }

        postsRequested = false;
    });
}

export {getMarkersPosts};
