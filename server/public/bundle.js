(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by roberto on 11/9/14.
 */
require('satellizer/satellizer.min');
},{"satellizer/satellizer.min":2}],2:[function(require,module,exports){
!function(e,t){"use strict";var n=e.location.origin||e.location.protocol+"//"+e.location.host;t.module("satellizer",[]).constant("satellizer.config",{loginOnSignup:!0,loginRedirect:"/",logoutRedirect:"/",signupRedirect:"/login",loginUrl:"/auth/login",signupUrl:"/auth/signup",loginRoute:"/login",signupRoute:"/signup",tokenName:"token",tokenPrefix:"satellizer",unlinkUrl:"/auth/unlink/",authHeader:"Authorization",providers:{google:{url:"/auth/google",authorizationEndpoint:"https://accounts.google.com/o/oauth2/auth",redirectUri:n,scope:["profile","email"],scopePrefix:"openid",scopeDelimiter:" ",requiredUrlParams:["scope"],optionalUrlParams:["display"],display:"popup",type:"2.0",popupOptions:{width:452,height:633}},facebook:{url:"/auth/facebook",authorizationEndpoint:"https://www.facebook.com/dialog/oauth",redirectUri:n+"/",scope:["email"],scopeDelimiter:",",requiredUrlParams:["display","scope"],display:"popup",type:"2.0",popupOptions:{width:481,height:269}},linkedin:{url:"/auth/linkedin",authorizationEndpoint:"https://www.linkedin.com/uas/oauth2/authorization",redirectUri:n,requiredUrlParams:["state"],scope:["r_emailaddress"],scopeDelimiter:" ",state:"STATE",type:"2.0",popupOptions:{width:527,height:582}},github:{url:"/auth/github",authorizationEndpoint:"https://github.com/login/oauth/authorize",redirectUri:n,scope:[],scopeDelimiter:" ",type:"2.0",popupOptions:{width:1020,height:618}},yahoo:{url:"/auth/yahoo",authorizationEndpoint:"https://api.login.yahoo.com/oauth2/request_auth",redirectUri:n,scope:[],scopeDelimiter:",",type:"2.0",popupOptions:{width:559,height:519}},twitter:{url:"/auth/twitter",type:"1.0",popupOptions:{width:495,height:645}}}}).provider("$auth",["satellizer.config",function(e){Object.defineProperties(this,{logoutRedirect:{get:function(){return e.logoutRedirect},set:function(t){e.logoutRedirect=t}},loginRedirect:{set:function(t){e.loginRedirect=t},get:function(){return e.loginRedirect}},signupRedirect:{get:function(){return e.signupRedirect},set:function(t){e.signupRedirect=t}},loginOnSignup:{get:function(){return e.loginOnSignup},set:function(t){e.loginOnSignup=t}},loginUrl:{get:function(){return e.loginUrl},set:function(t){e.loginUrl=t}},signupUrl:{get:function(){return e.signupUrl},set:function(t){e.signupUrl=t}},loginRoute:{get:function(){return e.loginRoute},set:function(t){e.loginRoute=t}},signupRoute:{get:function(){return e.signupRoute},set:function(t){e.signupRoute=t}},tokenName:{get:function(){return e.tokenName},set:function(t){e.tokenName=t}},tokenPrefix:{get:function(){return e.tokenPrefix},set:function(t){e.tokenPrefix=t}},unlinkUrl:{get:function(){return e.unlinkUrl},set:function(t){e.unlinkUrl=t}},authHeader:{get:function(){return e.authHeader},set:function(t){e.authHeader=t}}}),t.forEach(Object.keys(e.providers),function(n){this[n]=function(r){return t.extend(e.providers[n],r)}},this);var n=function(n){e.providers[n.name]=e.providers[n.name]||{},t.extend(e.providers[n.name],n)};this.oauth1=function(t){n(t),e.providers[t.name].type="1.0"},this.oauth2=function(t){n(t),e.providers[t.name].type="2.0"},this.$get=["$q","satellizer.shared","satellizer.local","satellizer.oauth",function(e,t,n,r){var o={};return o.authenticate=function(e,t){return r.authenticate(e,!1,t)},o.login=function(e){return n.login(e)},o.signup=function(e){return n.signup(e)},o.logout=function(){return t.logout()},o.isAuthenticated=function(){return t.isAuthenticated()},o.link=function(e,t){return r.authenticate(e,!0,t)},o.unlink=function(e){return r.unlink(e)},o.getToken=function(){return t.getToken()},o.getPayload=function(){return t.getPayload()},o}]}]).factory("satellizer.shared",["$q","$window","$location","satellizer.config",function(e,t,n,r){var o={};return o.getToken=function(){var e=r.tokenPrefix?r.tokenPrefix+"_"+r.tokenName:r.tokenName;return t.localStorage[e]},o.getPayload=function(){var e=r.tokenPrefix?r.tokenPrefix+"_"+r.tokenName:r.tokenName,n=t.localStorage[e];if(n&&3===n.split(".").length){var o=n.split(".")[1],i=o.replace("-","+").replace("_","/");return JSON.parse(t.atob(i))}},o.setToken=function(e,o){var i=e.access_token||e.data[r.tokenName],u=r.tokenPrefix?r.tokenPrefix+"_"+r.tokenName:r.tokenName;if(!i)throw new Error('Expecting a token named "'+r.tokenName+'" but instead got: '+JSON.stringify(e.data));t.localStorage[u]=i,r.loginRedirect&&!o&&n.path(r.loginRedirect)},o.isAuthenticated=function(){var e=r.tokenPrefix?r.tokenPrefix+"_"+r.tokenName:r.tokenName,n=t.localStorage[e];if(n){if(3===n.split(".").length){var o=n.split(".")[1],i=o.replace("-","+").replace("_","/"),u=JSON.parse(t.atob(i)).exp;return Math.round((new Date).getTime()/1e3)<=u}return!0}return!1},o.logout=function(){var o=r.tokenPrefix?r.tokenPrefix+"_"+r.tokenName:r.tokenName;return delete t.localStorage[o],r.logoutRedirect&&n.path(r.logoutRedirect),e.when()},o}]).factory("satellizer.oauth",["$q","$http","satellizer.config","satellizer.shared","satellizer.Oauth1","satellizer.Oauth2",function(e,t,n,r,o,i){var u={};return u.authenticate=function(e,t,u){var a="1.0"===n.providers[e].type?new o:new i;return a.open(n.providers[e],u||{}).then(function(e){return r.setToken(e,t),e})},u.unlink=function(e){return t.get(n.unlinkUrl+e)},u}]).factory("satellizer.local",["$q","$http","$location","satellizer.utils","satellizer.shared","satellizer.config",function(e,t,n,r,o,i){var u={};return u.login=function(e){return t.post(i.loginUrl,e).then(function(e){return o.setToken(e),e})},u.signup=function(e){return t.post(i.signupUrl,e).then(function(e){return i.loginOnSignup?o.setToken(e):n.path(i.signupRedirect),e})},u}]).factory("satellizer.Oauth2",["$q","$http","satellizer.popup","satellizer.utils","satellizer.config",function(e,n,r,o){return function(){var e={url:null,name:null,scope:null,scopeDelimiter:null,clientId:null,redirectUri:null,popupOptions:null,authorizationEndpoint:null,requiredUrlParams:null,optionalUrlParams:null,defaultUrlParams:["response_type","client_id","redirect_uri"],responseType:"code"},i={};return i.open=function(n,o){t.extend(e,n);var u=i.buildUrl();return r.open(u,e.popupOptions).then(function(t){return"token"===e.responseType?t:i.exchangeForToken(t,o)})},i.exchangeForToken=function(r,o){var i=t.extend({},o,{code:r.code,clientId:e.clientId,redirectUri:e.redirectUri});return n.post(e.url,i)},i.buildUrl=function(){var t=e.authorizationEndpoint,n=i.buildQueryString();return[t,n].join("?")},i.buildQueryString=function(){var n=[],r=["defaultUrlParams","requiredUrlParams","optionalUrlParams"];return t.forEach(r,function(r){t.forEach(e[r],function(t){var r=o.camelCase(t),i=e[r];"scope"===t&&Array.isArray(i)&&(i=i.join(e.scopeDelimiter),e.scopePrefix&&(i=[e.scopePrefix,i].join(e.scopeDelimiter))),n.push([t,i])})}),n.map(function(e){return e.join("=")}).join("&")},i}}]).factory("satellizer.Oauth1",["$q","$http","satellizer.popup",function(e,n,r){return function(){var e={url:null,name:null,popupOptions:null},o={};return o.open=function(n,i){return t.extend(e,n),r.open(e.url,e.popupOptions).then(function(e){return o.exchangeForToken(e,i)})},o.exchangeForToken=function(r,i){var u=t.extend({},i,r),a=o.buildQueryString(u);return n.get(e.url+"?"+a)},o.buildQueryString=function(e){var n=[];return t.forEach(e,function(e,t){n.push(encodeURIComponent(t)+"="+encodeURIComponent(e))}),n.join("&")},o}}]).factory("satellizer.popup",["$q","$interval","$window","$location","satellizer.utils",function(n,r,o,i,u){var a=null,l=null,c={};return c.popupWindow=a,c.open=function(t,n){var r=c.stringifyOptions(c.prepareOptions(n||{}));return a=e.open(t,"_blank",r),a&&a.focus&&a.focus(),c.pollPopup()},c.pollPopup=function(){var e=n.defer();return l=r(function(){try{if(a.document.domain===document.domain&&(a.location.search||a.location.hash)){var n=a.location.search.substring(1).replace(/\/$/,""),o=a.location.hash.substring(1).replace(/\/$/,""),i=u.parseQueryString(o),c=u.parseQueryString(n);t.extend(c,i),c.error?e.reject({error:c.error}):e.resolve(c),a.close(),r.cancel(l)}}catch(p){}a.closed&&(r.cancel(l),e.reject({data:"Authorization Failed"}))},35),e.promise},c.prepareOptions=function(e){var n=e.width||500,r=e.height||500;return t.extend({width:n,height:r,left:o.screenX+(o.outerWidth-n)/2,top:o.screenY+(o.outerHeight-r)/2.5},e)},c.stringifyOptions=function(e){var n=[];return t.forEach(e,function(e,t){n.push(t+"="+e)}),n.join(",")},c}]).service("satellizer.utils",function(){this.camelCase=function(e){return e.replace(/([\:\-\_]+(.))/g,function(e,t,n,r){return r?n.toUpperCase():n})},this.parseQueryString=function(e){var n,r,o={};return t.forEach((e||"").split("&"),function(e){e&&(r=e.split("="),n=decodeURIComponent(r[0]),o[n]=t.isDefined(r[1])?decodeURIComponent(r[1]):!0)}),o}}).config(["$httpProvider","$authProvider","satellizer.config",function(e,t,n){e.interceptors.push(["$q",function(e){var t=n.tokenPrefix?n.tokenPrefix+"_"+n.tokenName:n.tokenName;return{request:function(e){var r=localStorage.getItem(t);return r&&(r="Authorization"===n.authHeader?"Bearer "+r:r,e.headers[n.authHeader]=r),e},responseError:function(t){return e.reject(t)}}}])}])}(window,window.angular),function(){function e(e){this.message=e}var t="undefined"!=typeof exports?exports:this,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.prototype=new Error,e.prototype.name="InvalidCharacterError",t.btoa||(t.btoa=function(t){for(var r,o,i=String(t),u=0,a=n,l="";i.charAt(0|u)||(a="=",u%1);l+=a.charAt(63&r>>8-u%1*8)){if(o=i.charCodeAt(u+=.75),o>255)throw new e("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");r=r<<8|o}return l}),t.atob||(t.atob=function(t){var r=String(t).replace(/=+$/,"");if(r.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var o,i,u=0,a=0,l="";i=r.charAt(a++);~i&&(o=u%4?64*o+i:i,u++%4)?l+=String.fromCharCode(255&o>>(-2*u&6)):0)i=n.indexOf(i);return l})}();
},{}]},{},[1]);