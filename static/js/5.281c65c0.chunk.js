(this["webpackJsonprunning-stats"]=this["webpackJsonprunning-stats"]||[]).push([[5],{44:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(48),a=n.n(r),c=function(e){var t="pk.eyJ1Ijoib2NlYW50dW1lIiwiYSI6ImNrb3JtcGJldTAwbjIyd25wb3NzMnVzaGUifQ._04Bz2j9Ot3v6zIxNk1gJw";return new a.a.Map({accessToken:t,container:e,style:"mapbox://styles/mapbox/streets-v11"})}},76:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),c=n(4),i=n(9),s=n(1),o=n(21),u=(n(46),n(47)),p=n(44),d=n(0),b=function(){var e=Object(s.useRef)(null),t=Object(s.useRef)(),n=Object(s.useState)(),r=Object(i.a)(n,2),b=r[0],l=r[1];return Object(s.useEffect)((function(){Object(c.a)(a.a.mark((function e(){var t,n,r,c,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=[],n=1,r=-1;case 2:if(0===r){e.next=12;break}return e.next=5,o.b(n);case 5:c=e.sent,r=c.length,i=c.filter((function(e){var t=e.map;return null===t||void 0===t?void 0:t.summary_polyline})),Array.prototype.push.apply(t,i.flatMap((function(e){var t=e.map;return Object(u.toGeoJSON)(t.summary_polyline).coordinates})));case 9:n++,e.next=2;break;case 12:l(t);case 13:case"end":return e.stop()}}),e)})))()}),[]),Object(s.useEffect)((function(){b&&(t.current||(t.current=Object(p.a)(e.current)),t.current.on("load",(function(e){var t=e.target;t.setCenter([-73.55,45.54]).setZoom(12),t.addSource("heatpoints",{type:"geojson",data:{type:"Feature",properties:{},geometry:{type:"MultiPoint",coordinates:b}}}),t.addLayer({id:"my-heat",type:"heatmap",source:"heatpoints",paint:{"heatmap-radius":6,"heatmap-weight":{type:"identity",property:"point_count"}}})})))}),[b]),Object(d.jsx)("div",{ref:e,style:{minHeight:"600px",minWidth:"600px"}})};t.default=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Activity maps"}),Object(d.jsx)("div",{children:Object(d.jsxs)("label",{children:[Object(d.jsx)("input",{type:"radio",defaultChecked:!0}),"Heatmap"]})}),Object(d.jsx)(b,{})]})}}}]);
//# sourceMappingURL=5.281c65c0.chunk.js.map