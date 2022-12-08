!function(){"use strict";var n,o={882:function(){function n(n,o,e,a){var i,t;return(i=document.createElement("canvas")).width=n,i.height=o,(t=i.getContext("2d")).clearRect(0,0,n,o),t.fillStyle="#23A073",t.strokeStyle="white",t.beginPath(),t.moveTo(e,0),t.lineTo(n-e,0),t.quadraticCurveTo(n,0,n,e),t.lineTo(n,o-e),t.quadraticCurveTo(n,o,n-e,o),t.lineTo(e,o),t.quadraticCurveTo(0,o,0,o-e),t.lineTo(0,e),t.quadraticCurveTo(0,0,e,0),t.lineWidth=5,t.closePath(),t.fill(),t.stroke(),t.font="16px Arial",t.fillStyle="white",t.textAlign="center",t.fillText(a,i.width/2,i.height/2+6),i.toDataURL()}function o(n,o,e){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,t=!1,r=!1;if(window.growtypeMap[n].dynamic.selectedTax.map((function(n){(null!==o&&-1!=o.indexOf(n)||a&&-1!=a.indexOf(n))&&(r=!0)})),r&&0===window.growtypeMap[n].dynamic.selectedTax2.length)return!0;var p=!1;return window.growtypeMap[n].dynamic.selectedTax2.map((function(n){(null!==e&&-1!=e.indexOf(n)||i&&-1!=i.indexOf(n))&&(p=!0)})),!(!p||0!==selectedTax.length)||(!(!r||!p)||(0===window.growtypeMap[n].dynamic.selectedTax.length&&0===window.growtypeMap[n].dynamic.selectedTax2.length||t))}var e=!1;function a(a,t){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!e){$('.growtype-map-container[data-map-id="'+a+'"] + .spinner-border').show(),Array.isArray(window.growtypeMap[a].dynamic.markersGroups)&&r&&Object.values(window.growtypeMap[a].dynamic.markersGroups).map((function(n){n.markers.map((function(n){n.setMap(null)}))})),void 0!==window.growtypeMap[a].dynamic.markerCluster&&r&&window.growtypeMap[a].dynamic.markerCluster.clearMarkers();var p=new google.maps.LatLngBounds,w=[],d=1,s=window.growtypeMap[a].static.markersGroups[t].categories,c=window.growtypeMap[a].static.markersGroups[t].locations;return"false"===window.growtypeMap[a].static.initiallyShowAllRoutes&&r&&window.growtypeMap[a].dynamic.polylines.map((function(n){n.setMap(null)})),window.growtypeMap[a].static.markersGroups[t].markers.map((function(e,r){if("false"===e.enabled)return!1;if(window.growtypeMap[a].dynamic.currentMarkersGroupId&&window.growtypeMap[a].dynamic.currentMarkersGroupId!==t)return!1;if(!o(a,e.categories,e.locations,s,c))return!1;var l=e.latLng.replace(/\s/g,"").split(","),y=l[0],g=l[1];if(!i(-90,y,90)||!i(-180,g,180))return console.error("Growtype Map. Marker is not in range. Marker: ",e),!1;var m=new google.maps.LatLng(y,g);p.extend(m),window.growtypeMap[a].dynamic.mapInstance.fitBounds(p);var u=new google.maps.Size(parseInt(e.icon.width),parseInt(e.icon.height)),M={url:e.icon.url,scaledSize:u,origin:new google.maps.Point(0,0),anchor:new google.maps.Point(15,40)};"route"===window.growtypeMap[a].static.map_type&&(M.anchor=new google.maps.Point(10,40));var f={position:m,optimized:!0,map:window.growtypeMap[a].dynamic.mapInstance};void 0!==e.icon&&e.icon.url?"route"===window.growtypeMap[a].static.map_type?(f.icon={url:n(30,30,19,d),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(15,20)},d++):f.icon=M:"hidden"===location.type&&(f.icon="#");var v=new google.maps.Marker(f),h=null;if("true"===e.infowindow.enabled){var k=e.infowindow?e.infowindow.content:"";h=new google.maps.InfoWindow({content:k})}google.maps.event.addListener(window.growtypeMap[a].dynamic.mapInstance,"click",(function(n){"true"===e.infowindow.enabled&&(h&&h.close(),window.growtypeMap[a].dynamic.prevInfoWindow&&window.growtypeMap[a].dynamic.prevInfoWindow.close())})),google.maps.event.addListener(window.growtypeMap[a].dynamic.mapInstance,"zoom_changed",(function(){"true"===e.infowindow.enabled&&window.growtypeMap[a].dynamic.prevInfoWindow&&window.growtypeMap[a].dynamic.prevInfoWindow.close();var n=google.maps.event.addListener(window.growtypeMap[a].dynamic.mapInstance,"bounds_changed",(function(o){this.getZoom()>15&&1==this.initialZoom&&(this.setZoom(15),this.initialZoom=!1),google.maps.event.removeListener(n)}))})),google.maps.event.addListener(v,"click",(function(n){"true"===e.infowindow.enabled&&(window.growtypeMap[a].dynamic.prevInfoWindow&&window.growtypeMap[a].dynamic.prevInfoWindow.close(),h.open({anchor:v,map:window.growtypeMap[a].dynamic.mapInstance,shouldFocus:!1}),window.growtypeMap[a].dynamic.prevInfoWindow=h),void 0!==e.url&&e.url.length>0&&(window.location.href=e.url)})),w.push(v)})),"route"===window.growtypeMap[a].static.map_type&&(void 0!==window.growtypeMap[a].dynamic.polylines[t]&&"function"==typeof window.growtypeMap[a].dynamic.polylines[t].setMap&&r&&window.growtypeMap[a].dynamic.polylines[t].setMap(null),window.growtypeMap[a].dynamic.polylines[t]=new google.maps.Polyline({strokeColor:"#0F524A",strokeOpacity:.8,strokeWeight:5}),setPreciseRoute(t,w,window.growtypeMap[a].dynamic.polylines)),window.growtypeMap[a].dynamic.mapInstance.initialZoom=!0,0!==w.length&&null===window.growtypeMap[a].static.initialZoom&&window.growtypeMap[a].dynamic.mapInstance.fitBounds(p),$('.growtype-map-container[data-map-id="'+a+'"] + .spinner-border').hide(),e=!1,w}}function i(n,o,e){return!isNaN(o)&&o>=n&&o<=e}function t(n){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];null===o?Object.entries(window.growtypeMap[n].static.markersGroups).map((function(o,i){o[1].markers.length>0&&(window.growtypeMap[n].dynamic.markersGroups[o[0]]={markers:a(n,o[0],e)})})):window.growtypeMap[n].dynamic.markersGroups[o]={markers:a(n,o,e)}}function r(n,o){var e,a=o.filter((function(n){return!n.is_featured})),i=[{url:(e="#3548ff","data:image/svg+xml;base64,"+window.btoa('<svg fill="'+e+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><circle cx="120" cy="120" opacity=".6" r="70" /><circle cx="120" cy="120" opacity=".3" r="90" /><circle cx="120" cy="120" opacity=".2" r="110" /></svg>')),width:40,height:40,textColor:"white",textSize:12}];window.growtypeMap[n].dynamic.markerCluster=new MarkerClusterer(window.growtypeMap[n].dynamic.mapInstance,a,{maxZoom:"route"===window.growtypeMap[n].static.mapType?10:16,gridSize:80,styles:i})}$=jQuery,window.growtypeMapInit=function(){$(".growtype-map-container").each((function(n,o){var e=$(o).attr("data-map-id");window.growtypeMap[e].dynamic={mapInstance:null,markersGroups:[],markerCluster:null,selectedTax:[],selectedTax2:[],prevInfoWindow:null,visibleMarkersPostsIds:{},mapsInitialLoading:!0,previousVisibleMarkersPostsIds:{},lastPostWasRetrieved:!1,mainMarker:null,postsRequested:!1,polylines:[],currentMarkersGroupId:null,initialZoom:$(o).attr("data-initial-zoom")&&$(o).attr("data-initial-zoom").length>0?parseInt($(o).attr("data-initial-zoom")):null,searchBox:null},"false"===window.growtypeMap[e].static.initiallyShowAllRoutes&&(window.growtypeMap[e].dynamic.currentMarkersGroupId=window.growtypeMap[e].static.initialGroupId),window.growtypeMap[e].dynamic.mapInstance=function(n,o,e,a,i){return new google.maps.Map(o,{center:new google.maps.LatLng(e,a),zoom:parseInt(i),options:{gestureHandling:"greedy"},scrollwheel:!1,disableDefaultUI:!0,mapTypeControl:!1,scaleControl:!1,zoomControl:!0,styles:window.growtypeMap[n].static.mapStyle})}(e,o,window.growtypeMap[e].static.initialLat,window.growtypeMap[e].static.initialLng,window.growtypeMap[e].static.initialZoom),t(e,window.growtypeMap[e].dynamic.currentMarkersGroupId,!1),r(e,[]),function(n){if(window.location.search.length>0&&window.location.search.indexOf("location")>0){var o=new google.maps.Geocoder,e=window.location.search.replace("?location=","");o.geocode({address:e},(function(n,o){"OK"===o?(mapInstance.setCenter(n[0].geometry.location),mapInstance.setZoom(14)):console.log("Geocode was not successful for the following reason: "+o)}))}var a=document.getElementById("growtype-map-search");window.growtypeMap[n].dynamic.searchBox=null!==a?new google.maps.places.SearchBox(a):null,a&&mapInstance.controls[google.maps.ControlPosition.TOP_LEFT].push(a),window.growtypeMap[n].dynamic.searchBox&&window.growtypeMap[n].dynamic.searchBox.addListener("places_changed",(function(){null!==prevInfowindow&&prevInfowindow.close();var o=window.growtypeMap[n].dynamic.searchBox.getPlaces();if(0!=o.length){var e=new google.maps.LatLngBounds;o.forEach((function(n){n.geometry&&n.geometry.location?n.geometry.viewport?e.union(n.geometry.viewport):e.extend(n.geometry.location):console.log("Returned place contains no geometry")})),window.growtypeMap[n].dynamic.mapInstance.fitBounds(e)}}))}(e),function(n){google.maps.event.addListener(window.growtypeMap[n].dynamic.mapInstance,"tilesloaded",(function(){if(window.growtypeMap[n].dynamic.markerCluster.clearMarkers(),Array.isArray(window.growtypeMap[n].dynamic.markersGroups[window.growtypeMap[n].dynamic.currentMarkersGroupId].markers)){var o=window.growtypeMap[n].dynamic.markersGroups[window.growtypeMap[n].dynamic.currentMarkersGroupId].markers.filter((function(o){return window.growtypeMap[n].dynamic.mapInstance.getBounds().contains(o.getPosition())}));r(n,o)}google.maps.event.addListener(window.growtypeMap[n].dynamic.markerCluster,"click",(function(o){null!==window.growtypeMap[n].dynamic.prevInfoWindow&&window.growtypeMap[n].dynamic.prevInfoWindow.close()}))}))}(e),function(n){window.growtypeMap[n].dynamic.mapInstance.addListener("idle",(function(){window.growtypeMap[n].dynamic.visibleMarkersPostsIds={},Array.isArray(window.growtypeMap[n].dynamic.markersGroups[window.growtypeMap[n].static.initialGroupId])&&window.growtypeMap[n].dynamic.markersGroups[window.growtypeMap[n].static.initialGroupId].markers.map((function(o,e){window.growtypeMap[n].dynamic.mapInstance.getBounds().contains(o.getPosition())&&(o.location_id==$('.growtype-map-container[data-map-id="'+n+'"]').attr("main-marker")&&(window.growtypeMap[n].dynamic.mainMarker={location_id:o.location_id,index:e}),visibleMarkersPostsIds[o.location_id]=o.location_id)})),!window.growtypeMap[n].dynamic.mapsInitialLoading&&(JSON.stringify(window.growtypeMap[n].dynamic.previousVisibleMarkersPostsIds),JSON.stringify(window.growtypeMap[n].dynamic.visibleMarkersPostsIds)),window.growtypeMap[n].dynamic.searchBox&&window.growtypeMap[n].dynamic.searchBox.setBounds(window.growtypeMap[n].dynamic.mapInstance.getBounds()),window.growtypeMap[n].dynamic.mapsInitialLoading&&$('.growtype-map-container[data-map-id="'+n+'"]').attr("infowindow-open")&&null!==mainMarker&&google.maps.event.trigger(window.growtypeMap[n].dynamic.markersGroups[window.growtypeMap[n].static.initialGroupId][window.growtypeMap[n].dynamic.mainMarker.index],"click"),window.growtypeMap[n].dynamic.mapsInitialLoading=!1,window.growtypeMap[n].dynamic.previousVisibleMarkersPostsIds=window.growtypeMap[n].dynamic.visibleMarkersPostsIds}))}(e),function(n){$(".growtype-map-taxonomy-nav .growtype-map-taxonomy-item .btn").click((function(){var o=$(this);o.toggleClass("is-active"),"false"!==window.growtypeMap[n].static.initiallyShowAllRoutes&&(window.growtypeMap[n].dynamic.currentMarkersGroupId=null),window.growtypeMap[n].dynamic.selectedTax=[],window.growtypeMap[n].dynamic.selectedTax2=[],o.closest(".growtype-map-taxonomy-nav").find(".btn.is-active").map((function(o,e){$(e).attr("data-tax")&&window.growtypeMap[n].dynamic.selectedTax.push($(e).attr("data-tax")),$(e).attr("data-tax2")&&window.growtypeMap[n].dynamic.selectedTax2.push($(e).attr("data-tax2"))})),setTimeout((function(){t(n,window.growtypeMap[n].dynamic.currentMarkersGroupId,!0),r(n,window.growtypeMap[n].dynamic.markersGroups[window.growtypeMap[n].dynamic.currentMarkersGroupId].markers)}),500)}))}(e)}))}},283:function(){}},e={};function a(n){var i=e[n];if(void 0!==i)return i.exports;var t=e[n]={exports:{}};return o[n](t,t.exports,a),t.exports}a.m=o,n=[],a.O=function(o,e,i,t){if(!e){var r=1/0;for(s=0;s<n.length;s++){e=n[s][0],i=n[s][1],t=n[s][2];for(var p=!0,w=0;w<e.length;w++)(!1&t||r>=t)&&Object.keys(a.O).every((function(n){return a.O[n](e[w])}))?e.splice(w--,1):(p=!1,t<r&&(r=t));if(p){n.splice(s--,1);var d=i();void 0!==d&&(o=d)}}return o}t=t||0;for(var s=n.length;s>0&&n[s-1][2]>t;s--)n[s]=n[s-1];n[s]=[e,i,t]},a.o=function(n,o){return Object.prototype.hasOwnProperty.call(n,o)},function(){var n={986:0,301:0};a.O.j=function(o){return 0===n[o]};var o=function(o,e){var i,t,r=e[0],p=e[1],w=e[2],d=0;if(r.some((function(o){return 0!==n[o]}))){for(i in p)a.o(p,i)&&(a.m[i]=p[i]);if(w)var s=w(a)}for(o&&o(e);d<r.length;d++)t=r[d],a.o(n,t)&&n[t]&&n[t][0](),n[t]=0;return a.O(s)},e=self.webpackChunkplugin=self.webpackChunkplugin||[];e.forEach(o.bind(null,0)),e.push=o.bind(null,e.push.bind(e))}(),a.O(void 0,[301],(function(){return a(882)}));var i=a.O(void 0,[301],(function(){return a(283)}));i=a.O(i)}();
//# sourceMappingURL=growtype-map.js.map