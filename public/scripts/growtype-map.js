!function(){"use strict";var o,n={151:function(){function o(o,n,e,a){var t,i;return(t=document.createElement("canvas")).width=o,t.height=n,(i=t.getContext("2d")).clearRect(0,0,o,n),i.fillStyle="#23A073",i.strokeStyle="white",i.beginPath(),i.moveTo(e,0),i.lineTo(o-e,0),i.quadraticCurveTo(o,0,o,e),i.lineTo(o,n-e),i.quadraticCurveTo(o,n,o-e,n),i.lineTo(e,n),i.quadraticCurveTo(0,n,0,n-e),i.lineTo(0,e),i.quadraticCurveTo(0,0,e,0),i.lineWidth=5,i.closePath(),i.fill(),i.stroke(),i.font="16px Arial",i.fillStyle="white",i.textAlign="center",i.fillText(a,t.width/2,t.height/2+6),t.toDataURL()}function n(o,n,e){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,t=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i=!1,r=!1;if(window.growtypeMap[o].dynamic.selectedTax.map((function(o){(null!==n&&-1!=n.indexOf(o)||a&&-1!=a.indexOf(o))&&(r=!0)})),r&&0===window.growtypeMap[o].dynamic.selectedTax2.length)return!0;var p=!1;return window.growtypeMap[o].dynamic.selectedTax2.map((function(o){(null!==e&&-1!=e.indexOf(o)||t&&-1!=t.indexOf(o))&&(p=!0)})),!(!p||0!==selectedTax.length)||(!(!r||!p)||(0===window.growtypeMap[o].dynamic.selectedTax.length&&0===window.growtypeMap[o].dynamic.selectedTax2.length||i))}function e(o){return{show:function(){void 0!==window.growtypeMap[o].dynamic.loader?window.growtypeMap[o].dynamic.loader.push(1):window.growtypeMap[o].dynamic.loader=[1],$('.growtype-map-container-wrapper[data-map-id="'+o+'"]').addClass("is-loading")},hide:function(){window.growtypeMap[o].dynamic.loader.pop(),0===window.growtypeMap[o].dynamic.loader.length&&$('.growtype-map-container-wrapper[data-map-id="'+o+'"]').removeClass("is-loading")}}}var a=!1;function t(t,r){var p=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!a){e(t).show(),Array.isArray(window.growtypeMap[t].dynamic.markersGroups)&&p&&Object.values(window.growtypeMap[t].dynamic.markersGroups).map((function(o){o.markers.map((function(o){o.setMap(null)}))})),void 0!==window.growtypeMap[t].dynamic.markerCluster&&p&&window.growtypeMap[t].dynamic.markerCluster.clearMarkers();var w=new google.maps.LatLngBounds,d=[],s=1,c=window.growtypeMap[t].static.markersGroups[r].categories,l=window.growtypeMap[t].static.markersGroups[r].locations;return"false"===window.growtypeMap[t].static.initiallyShowAllRoutes&&p&&window.growtypeMap[t].dynamic.polylines.map((function(o){o.setMap(null)})),window.growtypeMap[t].static.markersGroups[r].markers.map((function(e,a){if("false"===e.enabled)return!1;if(window.growtypeMap[t].dynamic.currentlyVisibleMarkersIds&&!window.growtypeMap[t].dynamic.currentlyVisibleMarkersIds.includes(e.id.toString())&&window.growtypeMap[t].dynamic.currentlyVisibleMarkersIds.length>0)return!1;if(window.growtypeMap[t].dynamic.currentMarkersGroupId&&window.growtypeMap[t].dynamic.currentMarkersGroupId!==r)return!1;if(!n(t,e.categories,e.locations,c,l))return!1;var p=e.latLng.replace(/\s/g,"").split(","),g=p[0],y=p[1];if(!i(-90,g,90)||!i(-180,y,180))return console.error("Growtype Map. Marker is not in range. Marker: ",e),!1;var m=new google.maps.LatLng(g,y);w.extend(m),"true"===window.growtypeMap[t].static.initiallyFitBounds&&window.growtypeMap[t].dynamic.mapInstance.fitBounds(w);var u=new google.maps.Size(parseInt(e.icon.width),parseInt(e.icon.height)),M={url:e.icon.url,scaledSize:u,origin:new google.maps.Point(0,0),anchor:new google.maps.Point(15,40)};"route"===window.growtypeMap[t].static.map_type&&(M.anchor=new google.maps.Point(10,40));var f={id:e.id,position:m,optimized:!0,map:window.growtypeMap[t].dynamic.mapInstance};void 0!==e.icon&&e.icon.url?"route"===window.growtypeMap[t].static.map_type?(f.icon={url:o(30,30,19,s),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(15,20)},s++):f.icon=M:"hidden"===location.type&&(f.icon="#");var v=new google.maps.Marker(f),h=null;if("true"===e.infowindow.enabled){var k=e.infowindow?e.infowindow.content:"";h=new google.maps.InfoWindow({content:k})}google.maps.event.addListener(window.growtypeMap[t].dynamic.mapInstance,"click",(function(o){"true"===e.infowindow.enabled&&(h&&h.close(),window.growtypeMap[t].dynamic.prevInfoWindow&&window.growtypeMap[t].dynamic.prevInfoWindow.close())})),google.maps.event.addListener(window.growtypeMap[t].dynamic.mapInstance,"zoom_changed",(function(){"true"===e.infowindow.enabled&&window.growtypeMap[t].dynamic.prevInfoWindow&&window.growtypeMap[t].dynamic.prevInfoWindow.close();var o=google.maps.event.addListener(window.growtypeMap[t].dynamic.mapInstance,"bounds_changed",(function(n){this.getZoom()>15&&1==this.initialZoom&&(this.setZoom(15),this.initialZoom=!1),google.maps.event.removeListener(o)}))})),google.maps.event.addListener(v,"click",(function(o){"true"===e.infowindow.enabled&&(window.growtypeMap[t].dynamic.prevInfoWindow&&window.growtypeMap[t].dynamic.prevInfoWindow.close(),h.open({anchor:v,map:window.growtypeMap[t].dynamic.mapInstance,shouldFocus:!1}),window.growtypeMap[t].dynamic.prevInfoWindow=h),void 0!==e.url&&e.url.length>0&&(window.location.href=e.url)})),d.push(v)})),"route"===window.growtypeMap[t].static.map_type&&(void 0!==window.growtypeMap[t].dynamic.polylines[r]&&"function"==typeof window.growtypeMap[t].dynamic.polylines[r].setMap&&p&&window.growtypeMap[t].dynamic.polylines[r].setMap(null),window.growtypeMap[t].dynamic.polylines[r]=new google.maps.Polyline({strokeColor:"#0F524A",strokeOpacity:.8,strokeWeight:5}),setPreciseRoute(r,d,window.growtypeMap[t].dynamic.polylines)),window.growtypeMap[t].dynamic.mapInstance.initialZoom=!0,0!==d.length&&null===window.growtypeMap[t].static.initialZoom&&window.growtypeMap[t].dynamic.mapInstance.fitBounds(w),e(t).hide(),a=!1,d}}function i(o,n,e){return!isNaN(n)&&n>=o&&n<=e}function r(o){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];null===n?Object.entries(window.growtypeMap[o].static.markersGroups).map((function(n,a){n[1].markers.length>0&&(window.growtypeMap[o].dynamic.markersGroups[n[0]]={markers:t(o,n[0],e)})})):window.growtypeMap[o].dynamic.markersGroups[n]={markers:t(o,n,e)}}function p(o,n){var e,a=n.filter((function(o){return!o.is_featured})),t=[{url:(e="#3548ff","data:image/svg+xml;base64,"+window.btoa('<svg fill="'+e+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><circle cx="120" cy="120" opacity=".6" r="70" /><circle cx="120" cy="120" opacity=".3" r="90" /><circle cx="120" cy="120" opacity=".2" r="110" /></svg>')),width:40,height:40,textColor:"white",textSize:12}];window.growtypeMap[o].dynamic.markerCluster=new MarkerClusterer(window.growtypeMap[o].dynamic.mapInstance,a,{maxZoom:"route"===window.growtypeMap[o].static.mapType?10:16,gridSize:80,styles:t})}function w(){alert("Geolocation is not supported by your browser. Please enable it in your browser settings and refresh the page.")}function d(o){var n=$(o).attr("data-map-id");window.growtypeMap[n].dynamic={mapInstance:null,markersGroups:[],markerCluster:null,selectedTax:[],selectedTax2:[],prevInfoWindow:null,visibleMarkersPostsIds:{},mapsInitialLoading:!0,previousVisibleMarkersPostsIds:{},lastPostWasRetrieved:!1,mainMarker:null,postsRequested:!1,polylines:[],currentMarkersGroupId:null,initialZoom:$(o).attr("data-initial-zoom")&&$(o).attr("data-initial-zoom").length>0?parseInt($(o).attr("data-initial-zoom")):null,searchBox:null},"false"===window.growtypeMap[n].static.initiallyShowAllRoutes&&(window.growtypeMap[n].dynamic.currentMarkersGroupId=window.growtypeMap[n].static.initialGroupId),window.growtypeMap[n].dynamic.mapInstance=function(o,n,e,a,t){return new google.maps.Map(n,{center:new google.maps.LatLng(e,a),zoom:parseInt(t),options:{gestureHandling:"greedy"},scrollwheel:!1,disableDefaultUI:!0,mapTypeControl:!1,scaleControl:!1,zoomControl:!0,styles:window.growtypeMap[o].static.mapStyle})}(n,$(o).find(".growtype-map-container").get(0),window.growtypeMap[n].static.initialLat,window.growtypeMap[n].static.initialLng,window.growtypeMap[n].static.initialZoom),"true"===window.growtypeMap[n].static.disableMapDragging&&window.growtypeMap[n].dynamic.mapInstance.setOptions({draggable:!1}),"true"===window.growtypeMap[n].static.showUserLocation&&function(o,n){navigator.geolocation?(e(o).show(),navigator.geolocation.getCurrentPosition((function(a){var t;e(o).hide();var i={lat:a.coords.latitude,lng:a.coords.longitude};window.growtypeMap[o].dynamic.currentUserLocation=i;var p=null!==(t=window.growtypeMap[o].static.markersGroups[n].markers[0])&&void 0!==t?t:"";if(0===p.length)return!1;var w=Object.assign({},p);w.latLng=i.lat+","+i.lng,w.icon=window.growtypeMap[o].static.userLocation.icon;var d=google.maps.geometry.spherical.computeDistanceBetween({lat:parseFloat(p.latLng.split(",")[0]),lng:parseFloat(p.latLng.split(",")[1])},i);window.growtypeMap[o].static.markersGroups[n].markers.push(w),r(o,n,!0);var s=new CustomEvent("growtypeMapUserLocation",{detail:{position:a,distanceBetweenMarkers:d}});setTimeout((function(){document.dispatchEvent(s)}),500)}),(function(){w()}))):w()}(n,window.growtypeMap[n].dynamic.currentMarkersGroupId),r(n,window.growtypeMap[n].dynamic.currentMarkersGroupId,!1),p(n,[]),function(o){if(window.location.search.length>0&&window.location.search.indexOf("location")>0){var n=new google.maps.Geocoder,e=window.location.search.replace("?location=","");n.geocode({address:e},(function(o,n){"OK"===n?(mapInstance.setCenter(o[0].geometry.location),mapInstance.setZoom(14)):console.log("Geocode was not successful for the following reason: "+n)}))}var a=document.getElementById("growtype-map-search");window.growtypeMap[o].dynamic.searchBox=null!==a?new google.maps.places.SearchBox(a):null,a&&mapInstance.controls[google.maps.ControlPosition.TOP_LEFT].push(a),window.growtypeMap[o].dynamic.searchBox&&window.growtypeMap[o].dynamic.searchBox.addListener("places_changed",(function(){null!==prevInfowindow&&prevInfowindow.close();var n=window.growtypeMap[o].dynamic.searchBox.getPlaces();if(0!=n.length){var e=new google.maps.LatLngBounds;n.forEach((function(o){o.geometry&&o.geometry.location?o.geometry.viewport?e.union(o.geometry.viewport):e.extend(o.geometry.location):console.log("Returned place contains no geometry")})),window.growtypeMap[o].dynamic.mapInstance.fitBounds(e)}}))}(n),function(o){google.maps.event.addListener(window.growtypeMap[o].dynamic.mapInstance,"tilesloaded",(function(){if(window.growtypeMap[o].dynamic.markerCluster.clearMarkers(),Array.isArray(window.growtypeMap[o].dynamic.markersGroups[window.growtypeMap[o].dynamic.currentMarkersGroupId].markers)){var n=window.growtypeMap[o].dynamic.markersGroups[window.growtypeMap[o].dynamic.currentMarkersGroupId].markers.filter((function(n){return window.growtypeMap[o].dynamic.mapInstance.getBounds().contains(n.getPosition())}));p(o,n)}google.maps.event.addListener(window.growtypeMap[o].dynamic.markerCluster,"click",(function(n){null!==window.growtypeMap[o].dynamic.prevInfoWindow&&window.growtypeMap[o].dynamic.prevInfoWindow.close()}))}))}(n),function(o){window.growtypeMap[o].dynamic.mapInstance.addListener("idle",(function(){window.growtypeMap[o].dynamic.visibleMarkersPostsIds={},Array.isArray(window.growtypeMap[o].dynamic.markersGroups[window.growtypeMap[o].static.initialGroupId])&&window.growtypeMap[o].dynamic.markersGroups[window.growtypeMap[o].static.initialGroupId].markers.map((function(n,e){window.growtypeMap[o].dynamic.mapInstance.getBounds().contains(n.getPosition())&&(n.location_id==$('.growtype-map-container-wrapper[data-map-id="'+o+'"]').attr("main-marker")&&(window.growtypeMap[o].dynamic.mainMarker={location_id:n.location_id,index:e}),visibleMarkersPostsIds[n.location_id]=n.location_id)})),!window.growtypeMap[o].dynamic.mapsInitialLoading&&(JSON.stringify(window.growtypeMap[o].dynamic.previousVisibleMarkersPostsIds),JSON.stringify(window.growtypeMap[o].dynamic.visibleMarkersPostsIds)),window.growtypeMap[o].dynamic.searchBox&&window.growtypeMap[o].dynamic.searchBox.setBounds(window.growtypeMap[o].dynamic.mapInstance.getBounds()),window.growtypeMap[o].dynamic.mapsInitialLoading&&$('.growtype-map-container-wrapper[data-map-id="'+o+'"]').attr("infowindow-open")&&null!==mainMarker&&google.maps.event.trigger(window.growtypeMap[o].dynamic.markersGroups[window.growtypeMap[o].static.initialGroupId][window.growtypeMap[o].dynamic.mainMarker.index],"click"),window.growtypeMap[o].dynamic.mapsInitialLoading=!1,window.growtypeMap[o].dynamic.previousVisibleMarkersPostsIds=window.growtypeMap[o].dynamic.visibleMarkersPostsIds}))}(n),function(o){$(".growtype-map-taxonomy-nav .growtype-map-taxonomy-item .btn").click((function(){var n=$(this);n.toggleClass("is-active"),"false"!==window.growtypeMap[o].static.initiallyShowAllRoutes&&(window.growtypeMap[o].dynamic.currentMarkersGroupId=null),window.growtypeMap[o].dynamic.selectedTax=[],window.growtypeMap[o].dynamic.selectedTax2=[],n.closest(".growtype-map-taxonomy-nav").find(".btn.is-active").map((function(n,e){$(e).attr("data-tax")&&window.growtypeMap[o].dynamic.selectedTax.push($(e).attr("data-tax")),$(e).attr("data-tax2")&&window.growtypeMap[o].dynamic.selectedTax2.push($(e).attr("data-tax2"))})),setTimeout((function(){r(o,window.growtypeMap[o].dynamic.currentMarkersGroupId,!0),p(o,window.growtypeMap[o].dynamic.markersGroups[window.growtypeMap[o].dynamic.currentMarkersGroupId].markers)}),500)}))}(n)}$=jQuery,window.growtypeMapInit=function(){$(".growtype-map-container-wrapper").each((function(o,n){var e=$(n).attr("data-map-id");"load"===window.growtypeMap[e].static.mapInitType?d(n):"click"===window.growtypeMap[e].static.mapInitType&&(window.growtypeMap[e].static.mapCoverImage&&$(n).css({"background-image":"url("+window.growtypeMap[e].static.mapCoverImage+")","background-size":"cover","background-position":"center"}).addClass("has-cover"),$(".growtype-map-container").click((function(){$(n).css("background-image","none"),$(this).hasClass("is-loaded")||($(this).addClass("is-loaded"),d(n))})))}))}},283:function(){}},e={};function a(o){var t=e[o];if(void 0!==t)return t.exports;var i=e[o]={exports:{}};return n[o](i,i.exports,a),i.exports}a.m=n,o=[],a.O=function(n,e,t,i){if(!e){var r=1/0;for(s=0;s<o.length;s++){e=o[s][0],t=o[s][1],i=o[s][2];for(var p=!0,w=0;w<e.length;w++)(!1&i||r>=i)&&Object.keys(a.O).every((function(o){return a.O[o](e[w])}))?e.splice(w--,1):(p=!1,i<r&&(r=i));if(p){o.splice(s--,1);var d=t();void 0!==d&&(n=d)}}return n}i=i||0;for(var s=o.length;s>0&&o[s-1][2]>i;s--)o[s]=o[s-1];o[s]=[e,t,i]},a.o=function(o,n){return Object.prototype.hasOwnProperty.call(o,n)},function(){var o={986:0,301:0};a.O.j=function(n){return 0===o[n]};var n=function(n,e){var t,i,r=e[0],p=e[1],w=e[2],d=0;if(r.some((function(n){return 0!==o[n]}))){for(t in p)a.o(p,t)&&(a.m[t]=p[t]);if(w)var s=w(a)}for(n&&n(e);d<r.length;d++)i=r[d],a.o(o,i)&&o[i]&&o[i][0](),o[i]=0;return a.O(s)},e=self.webpackChunkplugin=self.webpackChunkplugin||[];e.forEach(n.bind(null,0)),e.push=n.bind(null,e.push.bind(e))}(),a.O(void 0,[301],(function(){return a(151)}));var t=a.O(void 0,[301],(function(){return a(283)}));t=a.O(t)}();
//# sourceMappingURL=growtype-map.js.map