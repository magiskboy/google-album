(this.webpackJsonpalbum=this.webpackJsonpalbum||[]).push([[4],{39:function(t,e,n){},41:function(t,e,n){},42:function(t,e,n){},43:function(t,e,n){},44:function(t,e,n){},46:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return C}));var a=n(4),c=n.n(a),r=n(7),o=n(2),i=n(0),s=n(3),u=n(20),l=n(22);function b(t){return d.apply(this,arguments)}function d(){return(d=Object(r.a)(c.a.mark((function t(e){var n,a,r,o,i,s=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:10,a=s.length>2&&void 0!==s[2]?s[2]:null,r="https://photoslibrary.googleapis.com/v1/albums?&pageSize=".concat(n),a&&(r+="&pageToken=".concat(a)),t.next=6,fetch(r,{method:"GET",headers:{Authorization:e}});case 6:if(200===(o=t.sent).status){t.next=9;break}throw new Error("".concat(o.status,": Fail to load list albums"));case 9:return t.next=11,o.json();case 11:return i=t.sent,t.abrupt("return",i);case 13:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function h(t,e){return f.apply(this,arguments)}function f(){return(f=Object(r.a)(c.a.mark((function t(e,n){var a,r,o,i,s,u,l=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=l.length>2&&void 0!==l[2]?l[2]:10,r=l.length>3&&void 0!==l[3]?l[3]:null,o="https://photoslibrary.googleapis.com/v1/mediaItems:search",i={albumId:n,pageSize:a,pageToken:r},t.next=6,fetch(o,{method:"POST",headers:{Authorization:e},body:JSON.stringify(i)});case 6:if(200===(s=t.sent).status){t.next=9;break}throw new Error("".concat(s.status,": Fail to load list photo in the album"));case 9:return t.next=11,s.json();case 11:return u=t.sent,t.abrupt("return",u);case 13:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var p=function(){function t(e,n){Object(u.a)(this,t),this.auth=e,this.authReload=n}return Object(l.a)(t,[{key:"getToken",value:function(){return"".concat(this.auth.token_type," ").concat(this.auth.access_token)}},{key:"invoke",value:function(){var t=Object(r.a)(c.a.mark((function t(e){var n,a,r,o,i,s=arguments;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=e,t.next="getListAlbums"===t.t0?3:"getPhotoInAlbum"===t.t0?5:7;break;case 3:return n=b,t.abrupt("break",8);case 5:return n=h,t.abrupt("break",8);case 7:throw new Error("Can't found action ".concat(e));case 8:for(r=s.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=s[i];return t.prev=9,t.next=12,n.apply(void 0,[this.this.getToken()].concat(o));case 12:a=t.sent,t.next=22;break;case 15:return t.prev=15,t.t1=t.catch(9),t.next=19,this.authReload();case 19:return t.next=21,n.apply(void 0,[this.getToken()].concat(o));case 21:a=t.sent;case 22:return t.abrupt("return",a);case 23:case"end":return t.stop()}}),t,this,[[9,15]])})));return function(e){return t.apply(this,arguments)}}()}]),t}();var j=n(28),m=n(37),v=n(40),O=(n(39),n(1)),x=function(t){return{x:0,y:-4*t,scale:1,rot:20*Math.random()-10,delay:100*t}},g=function(t,e){return"perspective(1500px) rotateX(30deg) rotateY(".concat(t/10,"deg) rotateZ(").concat(t,"deg) scale(").concat(e,")")};function k(t){var e=t.papers,n=t.onNext,a=t.onClickItem,c=t.onPushoutItem,r=t.onClick,s=Object(i.useState)((function(){return new Set})),u=Object(o.a)(s,1)[0],l=Object(m.useSprings)(e.length,(function(t){return Object(j.a)(Object(j.a)({},x(t)),{},{from:{x:0,rot:0,scale:1.5,y:-1e3}})})),b=Object(o.a)(l,2),d=b[0],h=b[1],f=Object(v.a)((function(t){var r=Object(o.a)(t.args,1)[0],i=t.down,s=Object(o.a)(t.delta,1)[0],l=(t.distance,Object(o.a)(t.direction,1)[0]),b=t.velocity,d=b>.2,f=l<0?-1:1;!i&&d?(u.add(r),c&&c(e[r])):i||d||a&&a(e[r]),h((function(t){if(r===t){var e=u.has(r);return{x:e?(200+window.innerWidth)*f:i?s:0,rot:s/100+(e?10*f*b:0),scale:i?1.1:1,delay:void 0,config:{friction:50,tension:i?800:e?200:500}}}})),i||u.size!==e.length||(n?n().then((function(){u.clear()||h((function(t){return x(t)}))})):u.clear()||h((function(t){return x(t)})))})),p=Math.min(window.screen.availWidth,600),k=d.map((function(t,n){var a=t.x,c=t.y,o=t.rot,i=t.scale,s=e[n],u=s.width>s.height,l=window.screen.availWidth<660,b={transform:Object(m.interpolate)([o,i],g),backgroundImage:"url(".concat(e[n].url,"=w").concat(p,")"),backgroundSize:"100%"};return Object(O.jsx)(m.animated.div,{style:{transform:Object(m.interpolate)([a,c],(function(t,e){return"translate3d(".concat(t,"px,").concat(e,"px,0)")}))},onClick:r,children:Object(O.jsx)(m.animated.div,Object(j.a)(Object(j.a)({},f(n)),{},{style:l?b:Object(j.a)(Object(j.a)({},b),{},{width:u?"85vh":"45vh",height:u?"45vh":"85vh",maxWidth:u?"570px":"500px",maxHeight:u?"500px":"570px",backgroundSize:u?"85% auto":"auto 85%"})}))},n)}));return Object(O.jsx)("div",{className:"StackPaper",onClick:r,children:k})}n(41),n(42);function w(t){var e=t.children;return Object(O.jsx)("button",Object(j.a)(Object(j.a)({},t),{},{className:"Button ".concat(t.className),children:e}))}function y(t){var e=t.children,n=Object(s.d)().logout;return Object(O.jsxs)("div",{className:"Sidebar ".concat(t.className),children:[e,Object(O.jsx)(w,{className:"LogoutButton",onClick:n,style:{position:"absolute",bottom:"10px",left:"20px"},children:"Logout"})]})}n(43);function S(t){return Object(O.jsx)("div",{className:"loader ".concat(t.className)})}var N=n.p+"static/media/bg-2-desktop.cef3ab49.jpg",A=n.p+"static/media/bg-2-mobile.f3cb29fc.jpg";n(44);function C(){var t=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,e=Object(i.useState)([]),n=Object(o.a)(e,2),a=n[0],u=n[1],l=Object(i.useState)(),b=Object(o.a)(l,2),d=b[0],h=b[1],f=Object(s.d)(),j=f.auth,m=f.authReload,v=Object(i.useCallback)(Object(r.a)(c.a.mark((function e(){var n,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!j){e.next=7;break}return n=new p(j,m),e.next=4,n.invoke("getListAlbums",t,d);case 4:a=e.sent,h(null===a||void 0===a?void 0:a.nextPageToken),u(null===a||void 0===a?void 0:a.albums);case 7:case"end":return e.stop()}}),e)}))),[j,u,d,m,t]);return Object(i.useEffect)((function(){v()}),[j]),{albums:a,fetchNext:v}}(49).albums,e={isMobile:window.screen.availWidth<660}.isMobile,n=Object(i.useState)(!1),a=Object(o.a)(n,2),u=a[0],l=a[1],b=Object(i.useState)(),d=Object(o.a)(b,2),h=d[0],f=d[1],j=Object(s.d)(),m=j.auth,v=j.authReload,x=Object(i.useState)(),g=Object(o.a)(x,2),C=g[0],I=g[1],T=Object(i.useState)(),M=Object(o.a)(T,2),P=M[0],z=M[1],E=Object(i.useCallback)((function(){return l(!0)}),[l]),W=Object(i.useCallback)((function(){return l(!1)}),[l]),B=function(){var t=Object(r.a)(c.a.mark((function t(){var e,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new p(m,v),t.next=3,e.invoke("getPhotoInAlbum",h.id,10,P);case 3:n=t.sent,z(null===n||void 0===n?void 0:n.nextPageToken),I(null===n||void 0===n?void 0:n.mediaItems);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(i.useEffect)((function(){Object(r.a)(c.a.mark((function t(){var e,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!h){t.next=7;break}return e=new p(m,v),t.next=4,e.invoke("getPhotoInAlbum",h.id,10);case 4:n=t.sent,z(null===n||void 0===n?void 0:n.nextPageToken),I(null===n||void 0===n?void 0:n.mediaItems);case 7:case"end":return t.stop()}}),t)})))()}),[h,m]),Object(i.useEffect)((function(){return t}),[t]);return Object(O.jsxs)("div",{className:"Home BackApp",children:[Object(O.jsx)("div",{className:"bg",style:{backgroundImage:"url(".concat(e?A:N,")")}}),t&&t.length>0?Object(O.jsx)(w,{className:"ShowAlbumMenuButton",onClick:E,children:"Albums"}):Object(O.jsx)(S,{className:"ShowAlbumMenuButton"}),!!t&&t.length>0&&Object(O.jsx)(y,{className:"MenuAlbum ".concat(u?"Show":"Hidden"),children:Object(O.jsx)("ul",{className:"AlbumList",children:t.map((function(t){return Object(O.jsx)("li",{className:"AlbumItem",onClick:function(){return function(t){f(t),W()}(t)},children:t.title},t.id)}))})}),!!C&&C.length>0&&Object(O.jsx)(k,{onClick:W,onNext:B,papers:C.filter((function(t){return t.mimeType.startsWith("image/")})).map((function(t){return{id:t.id,url:t.baseUrl,width:t.mediaMetadata.width,height:t.mediaMetadata.height,title:t.filename}}))})]})}}}]);
//# sourceMappingURL=4.20305094.chunk.js.map