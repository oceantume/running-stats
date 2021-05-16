(this["webpackJsonprunning-stats"]=this["webpackJsonprunning-stats"]||[]).push([[1],{10:function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return a}));const s=(e,t,n)=>{const s=new URL("https://www.strava.com/oauth/authorize"),c=s.searchParams;return c.append("client_id",e),c.append("redirect_uri",t),c.append("response_type","code"),c.append("scope","activity:read"),n&&c.append("state",n),s.toString()},c=async(e,t,n)=>{const s=new URLSearchParams;s.append("client_id",e),s.append("client_secret",t),s.append("code",n),s.append("grant_type","authorization_code");const c=await fetch("https://www.strava.com/oauth/token",{method:"POST",body:s});if(!c.ok){const e=await c.text();throw new Error("Unknown error while getting initial Strava auth tokens. "+e)}const a=await c.json();return{expiresAt:new Date(1e3*a.expires_at),refreshToken:a.refresh_token,accessToken:a.access_token,info:{firstName:a.athlete.firstname,lastName:a.athlete.lastname}}},a=async(e,t,n)=>{const s=new URLSearchParams;s.append("client_id",e),s.append("client_secret",t),s.append("refresh_token",n),s.append("grant_type","refresh_token");const c=await fetch("https://www.strava.com/oauth/token",{method:"POST",body:s});if(!c.ok){const e=await c.text();throw new Error("Unknown error while refreshing Strava auth tokens: "+e)}const a=await c.json();return{expiresAt:new Date(1e3*a.expires_at),refreshToken:a.refresh_token,accessToken:a.access_token}}},17:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i}));var s=n(10),c=n(4);const a=async e=>{const t=await o(),n=new URL("https://www.strava.com/api/v3/athlete/activities");n.searchParams.append("page",e.toString());const s=await fetch(n.toString(),{headers:{Authorization:"Bearer ".concat(t.session.accessToken)}});if(s.ok){return await s.json()}return r(s)},i=async e=>{const t=await o(),n="https://www.strava.com/api/v3/activities/".concat(e),s=await fetch(n,{headers:{Authorization:"Bearer ".concat(t.session.accessToken)}});if(s.ok){return await s.json()}return r(s)},r=e=>{throw new Error("Strava API error. Status: "+e.status)},o=async()=>{const e=await Object(c.a)();if(!(null===e||void 0===e?void 0:e.client)||!(null===e||void 0===e?void 0:e.session))throw new Error("No active Strava session found.");return e.session.expiresAt<new Date?await l():e},l=async()=>{const e=await Object(c.a)();if(!(null===e||void 0===e?void 0:e.client)||!(null===e||void 0===e?void 0:e.session))throw new Error("No active Strava session found.");const{id:t,secret:n}=e.client,{refreshToken:a}=e.session,i=await Object(s.b)(t,n,a),r={client:e.client,session:{...e.session,...i}};return await Object(c.b)(r),r}},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var s=n(1),c=n.n(s),a=n(19),i=n.n(a),r=n(10),o=n(2),l=n(4),d=n(0);const h=({location:e})=>{const t=Object(l.c)(),{id:n,secret:c}=(null===t||void 0===t?void 0:t.client)||{},{search:a}=e,[i,h]=Object(s.useState)(!1),[j,u]=Object(s.useState)("");return Object(s.useEffect)((()=>{(async()=>{const e=new URLSearchParams(a),t=e.get("error"),s=e.get("code");if(t)u(t);else if(n&&c&&s){const e=await Object(r.a)(n,c,s);await Object(l.b)({client:{id:n,secret:c},session:{refreshToken:e.refreshToken,accessToken:e.accessToken,expiresAt:e.expiresAt,athlete:{id:"",avatarUrl:"",name:"".concat(e.info.firstName," ").concat(e.info.lastName)}}}),h(!0)}})()}),[n,c,a]),j?Object(d.jsxs)("p",{children:["Error during authentication with Strava: ",Object(d.jsx)("code",{children:j})]}):i?Object(d.jsx)(o.a,{to:"/settings"}):null};let j=0;const u=()=>"id-".concat(++j);n(31);const b=({children:e,...t})=>{const n=(()=>{const[e]=Object(s.useState)(u);return e})(),[c]=Object(s.useState)(!1),a=c?"text":t.type;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("label",{htmlFor:t.id||n,children:e}),Object(d.jsx)("input",{...t,type:a,id:t.id||n})]})},p=()=>{var e,t;const n=Object(l.c)(),s=Object(o.g)();return console.log("auth:",n),Object(d.jsxs)("form",{style:{display:"flex",flexDirection:"column",maxWidth:"500px"},onSubmit:e=>{e.preventDefault();const t=new FormData(e.target),n=t.get("clientId").toString().trim(),s=t.get("clientSecret").toString().trim();(async()=>{await Object(l.b)({client:{id:n,secret:s}});const e="".concat(window.location.href,"/strava-auth-return"),t=Object(r.c)(n,e);window.location.href=t})()},children:[Object(d.jsx)("h2",{children:"Settings"}),Object(d.jsx)("h3",{children:"Strava API Client"}),Object(d.jsx)(b,{required:!0,name:"clientId",defaultValue:null===n||void 0===n||null===(e=n.client)||void 0===e?void 0:e.id,children:"Client ID"}),Object(d.jsx)(b,{required:!0,name:"clientSecret",type:"password",defaultValue:null===n||void 0===n||null===(t=n.client)||void 0===t?void 0:t.secret,children:"Client Secret"}),Object(d.jsx)("button",{type:"submit",children:"Save and connect"}),!(null===n||void 0===n?void 0:n.session)&&Object(d.jsxs)("div",{children:[Object(d.jsx)("p",{children:"The app is not currently connected to strava. Enter your API credentials and connect. You will be prompted to link your account with this app, allowing it to access the Strava API."}),Object(d.jsxs)("p",{children:["This app has no back-end so you will need to"," ",Object(d.jsx)("a",{href:"https://www.strava.com/settings/api",children:"configure your own Strava API application"}),". Make sure that the ",Object(d.jsx)("i",{children:"Authorization Callback Domain"})," is set to"," ",Object(d.jsx)("code",{children:window.location.host})," or authorization will not work."]}),Object(d.jsxs)("p",{children:["Please"," ",Object(d.jsx)("a",{href:"https://www.strava.com/legal/api",children:"read the Strava API Agreement"})," ","before entering your client id and secret into the application. The creator(s) of this software are not responsible for what you do with it and will not be held accountable if Strava revokes your access to their API if they were to judge that this is not a correct use of it. Note that no data retrieved from the API will be stored anywhere other than on the browser for caching purposes."]})]}),(null===n||void 0===n?void 0:n.session)&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("h3",{children:"Strava API Session"}),Object(d.jsx)(b,{readOnly:!0,value:null===n||void 0===n?void 0:n.session.athlete.name,children:"Display Name"}),Object(d.jsx)(b,{type:"password",readOnly:!0,value:null===n||void 0===n?void 0:n.session.accessToken,children:"Access Token"}),Object(d.jsx)(b,{readOnly:!0,value:null===n||void 0===n?void 0:n.session.expiresAt.toISOString(),children:"Expires At"}),Object(d.jsx)(b,{type:"password",readOnly:!0,value:null===n||void 0===n?void 0:n.session.refreshToken,children:"Refresh Token"}),Object(d.jsx)("button",{type:"button",onClick:()=>{Object(l.b)(void 0)},children:"Clear Strava session and all cached data"})]}),Object(d.jsx)(o.b,{path:"".concat(s.path,"/strava-auth-return"),component:h})]})};var O=n(8);n(32);const v=()=>{const e=Object(l.c)();return Object(d.jsxs)("header",{className:"app-header",children:[Object(d.jsxs)("nav",{children:[Object(d.jsx)("h1",{children:"Running Stats"}),Object(d.jsxs)("ul",{children:[Object(d.jsx)("li",{children:Object(d.jsx)(O.c,{to:"/activities",children:"Activities"})}),Object(d.jsx)("li",{children:Object(d.jsx)(O.c,{to:"/maps",children:"Maps"})}),Object(d.jsx)("li",{children:Object(d.jsx)(O.c,{to:"/settings",children:"Settings"})})]})]}),Object(d.jsxs)("div",{className:"strava-status",children:[!(null===e||void 0===e?void 0:e.session)&&"Not connected",(null===e||void 0===e?void 0:e.session)&&e.session.athlete.name]})]})},w=({page:e,onOpenPage:t,canOpenNextPage:n,canOpenPreviousPage:s})=>Object(d.jsxs)("div",{children:[Object(d.jsx)("button",{disabled:!s,onClick:()=>t(e-1),children:"Previous"}),Object(d.jsxs)("span",{style:{margin:"1rem"},children:["Page ",e]}),Object(d.jsx)("button",{disabled:!n,onClick:()=>t(e+1),children:"Next"})]});var x=n(17);const f=()=>{const[e,t]=Object(s.useState)(),[n,c]=Object(s.useState)(1);return Object(s.useEffect)((()=>{(async()=>{const e=await x.b(n);t(e)})()}),[n]),Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Activities"}),Object(d.jsx)(w,{page:n,onOpenPage:c,canOpenPreviousPage:n>1,canOpenNextPage:!!e&&e.length>0}),Object(d.jsx)("ul",{children:null===e||void 0===e?void 0:e.map((e=>Object(d.jsxs)("li",{children:[Object(d.jsx)(O.b,{to:"/activities/".concat(e.id),children:e.name})," (",Math.round(e.distance/1e3)," km)"]},e.id)))}),!e&&Object(d.jsx)("p",{children:"loading..."}),e&&!e.length&&Object(d.jsx)("p",{children:"No more results"})]})};n(33);const m=()=>Object(d.jsx)("footer",{className:"app-footer",children:Object(d.jsx)("a",{href:"https://www.strava.com",children:Object(d.jsx)("img",{alt:"Powered by Strava",src:"".concat("/running-stats","/powered-by-strava.svg"),style:{height:"2rem"}})})}),g=Object(s.lazy)((()=>Promise.all([n.e(0),n.e(5)]).then(n.bind(null,42)))),y=Object(s.lazy)((()=>Promise.all([n.e(0),n.e(4)]).then(n.bind(null,40)))),k=()=>Object(d.jsxs)(O.a,{children:[Object(d.jsxs)("div",{className:"app-content-without-footer",children:[Object(d.jsx)(v,{}),Object(d.jsx)(s.Suspense,{fallback:Object(d.jsx)("p",{children:"Loading..."}),children:Object(d.jsxs)(o.d,{children:[Object(d.jsx)(o.b,{exact:!0,path:"/",render:()=>Object(d.jsx)(o.a,{to:"/settings"})}),Object(d.jsx)(o.b,{path:"/settings",component:p}),Object(d.jsx)(o.b,{path:"/activities/:id",component:y}),Object(d.jsx)(o.b,{path:"/activities",component:f}),Object(d.jsx)(o.b,{path:"/maps",component:g})]})})]}),Object(d.jsx)(m,{})]});n(34);var S=e=>{e&&e instanceof Function&&n.e(6).then(n.bind(null,41)).then((({getCLS:t,getFID:n,getFCP:s,getLCP:c,getTTFB:a})=>{t(e),n(e),s(e),c(e),a(e)}))};i.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(k,{})}),document.getElementById("root")),S()},4:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r}));var s=n(14),c=n(1);const a=async()=>await Object(s.a)("strava-auth"),i=async e=>{await Object(s.b)("strava-auth",e),o.forEach((({callback:e})=>e()))},r=()=>{const[e,t]=Object(c.useState)();return Object(c.useEffect)((()=>{let e=!1;const n=async()=>{const n=await a();e||t(n)};n();const s=(e=>{const t={callback:e};return o.push(t),()=>{const e=o.findIndex((e=>e===t));e>=0&&o.splice(e,1)}})(n);return()=>{s(),e=!0}}),[]),e},o=[]}},[[35,2,3]]]);
//# sourceMappingURL=main.9b140e05.chunk.js.map