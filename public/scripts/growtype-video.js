!function(){var e,t={658:function(){function e(e){var t,r,o,a=jQuery(e).closest(".growtype-map-main-wrapper"),n=(a.find(".growtype-map-player"),a.find(".growtype-map-cover"),jQuery(e).attr("data-type"));a.hasClass("growtype-map-is-active")||("youtube"===n?function(e){var t,r=e.attr("data-link"),o=e.attr("data-start");function a(e){jQuery(e.target.g).animate({opacity:1},500),e.target.mute(),e.target.playVideo()}function n(a){0===a.data&&(jQuery(e).animate({opacity:1},1e3),jQuery(e).closest(".growtype-map-main-wrapper").removeClass("growtype-map-is-active"),t.loadVideoById({videoId:r,startSeconds:o}))}t=new YT.Player(e[0],{height:"100%",width:"100%",videoId:r,playerVars:{autoplay:1,loop:0,start:o,controls:0,showinfo:0,modestbranding:0},events:{onReady:a,onStateChange:n}})}(e):"html"===n&&(t=e,r=document.createElement("video"),(o=document.createElement("source")).setAttribute("src",t.attr("data-link")),o.setAttribute("type","video/mp4"),r.appendChild(o),jQuery(t).animate({opacity:1},500),jQuery(t).closest(".growtype-map-main-wrapper").find(".growtype-map-cover").fadeOut(),r.muted=!0,r.autoplay=!0,r.controls=!1,r.preload="auto",r.loop=!0,r.poster=t.attr("data-cover"),t.append(r)),a.addClass("growtype-map-is-active"))}function t(){var t=jQuery(".growtype-map-player").attr("data-play-action");setTimeout((function(){"load"===t?e(jQuery(".growtype-map-player")):"mouseover"===t?jQuery(".growtype-map-main-wrapper").on("mouseover",(function(){e(jQuery(this).find(".growtype-map-player"))})):"click"===t&&jQuery(".growtype-map-main-wrapper").on("click",(function(){event.preventDefault(),e(jQuery(this).find(".growtype-map-player"))}))}),500)}jQuery(".woocommerce-product-gallery__image.has-growtype-map").length>0&&setTimeout((function(){var e={};jQuery(".woocommerce-product-gallery__image.has-growtype-map").each((function(t,r){var o=jQuery(r),a=(o.find("iframe"),o.find(".growtype-map-cover")),n=/[^/]*$/.exec(a.find("img").attr("data-large_image"))[0].replace(/\.[^/.]+$/,"");e[n]=n})),jQuery(".woocommerce-product-gallery .product-image-thumbnail").each((function(t,r){var o=jQuery(r),a=o.find("img"),n=/[^/]*$/.exec(a.attr("src"))[0].replace(/\.[^/.]+$/,"");Object.values(e).map((function(e){n.indexOf(e+"-400x300")>=0&&o.addClass("has-growtype-map")}))}))}),1e3),t(),jQuery(document).on("pjax:end",(function(e){t()}))},84:function(){}},r={};function o(e){var a=r[e];if(void 0!==a)return a.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,o),n.exports}o.m=t,e=[],o.O=function(t,r,a,n){if(!r){var i=1/0;for(p=0;p<e.length;p++){r=e[p][0],a=e[p][1],n=e[p][2];for(var u=!0,c=0;c<r.length;c++)(!1&n||i>=n)&&Object.keys(o.O).every((function(e){return o.O[e](r[c])}))?r.splice(c--,1):(u=!1,n<i&&(i=n));if(u){e.splice(p--,1);var d=a();void 0!==d&&(t=d)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[r,a,n]},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={821:0,202:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var a,n,i=r[0],u=r[1],c=r[2],d=0;if(i.some((function(t){return 0!==e[t]}))){for(a in u)o.o(u,a)&&(o.m[a]=u[a]);if(c)var p=c(o)}for(t&&t(r);d<i.length;d++)n=i[d],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(p)},r=self.webpackChunkplugin=self.webpackChunkplugin||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}(),o.O(void 0,[202],(function(){return o(658)}));var a=o.O(void 0,[202],(function(){return o(84)}));a=o.O(a)}();
//# sourceMappingURL=growtype-map.js.map
