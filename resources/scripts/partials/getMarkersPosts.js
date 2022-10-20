/**
 *
 * @param slickGoToIndex
 * @param clearInitialPosts
 */
function getMarkersPosts(slickGoToIndex, clearInitialPosts = false) {
    postsRequested = true;

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
            lastPostWasRetrieved = true;
            if (clearInitialPosts) {
                $('.interactive-map-posts').append('<p class="e-notice">Įrašų nerasta</p>')
            }
        } else {
            lastPostWasRetrieved = false;
            $('.interactive-map-posts').slick('slickAdd', response.content);
            $('.interactive-map-posts').slick('slickGoTo', slickGoToIndex);
        }

        $('.interactive-map-posts').removeClass('is-loading').find('.spinner-border').remove();

        postsRequested = false;
    });
}

export {getMarkersPosts};
