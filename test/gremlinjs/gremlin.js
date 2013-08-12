/*! GremlinJS - v0.4.0 - 2013-08-06 */(function(n,t){t.gremlin=n,!function(n){window.onDomReady=n()}(function(){"use strict";function n(t){if(!w){if(!s.body)return r(n);for(w=!0;t=E.shift();)r(t)}}function t(t){(v||t.type===u||s[f]===p)&&(e(),n())}function e(){v?(s[y](h,t,a),o[y](u,t,a)):(s[d](_,t),o[d](c,t))}function r(n,t){setTimeout(n,+t>=0?t:1)}function i(n){w?r(n):E.push(n)}var o=window,s=o.document,l=s.documentElement,u="load",a=!1,c="on"+u,p="complete",f="readyState",m="attachEvent",d="detachEvent",g="addEventListener",h="DOMContentLoaded",_="onreadystatechange",y="removeEventListener",v=g in s,b=a,w=a,E=[];if(s[f]===p)r(n);else if(v)s[g](h,t,a),o[g](u,t,a);else{s[m](_,t),o[m](c,t);try{b=null==o.frameElement&&l}catch(N){}b&&b.doScroll&&function A(){if(!w){try{b.doScroll("left")}catch(t){return r(A,50)}e(),n()}}()}return i.version="1.3",i});var e=e||{},r={}.hasOwnProperty,i=[].slice,o={util:{}};o.util.Helper=function(){function n(){}var t;return t=function(n,t){var e,i;for(e in t)r.call(t,e)&&(i=t[e],n[e]=i);return n},n.extend=function(){var n,t,e,r,o,s,l;for(r=arguments[0],e=arguments.length>=2?i.call(arguments,1):[],s=0,l=e.length;l>s;s++)for(n in t=e[s])o=t[n],r[n]=o;return r},n.mixin=function(n,e){return t(n.prototype,e)},n.clone=function(n){var t,e;if(null==n||"object"!=typeof n)return n;if(n instanceof Date)return new Date(n.getTime());if(n instanceof RegExp)return t="",null!=n.global&&(t+="g"),null!=n.ignoreCase&&(t+="i"),null!=n.multiline&&(t+="m"),null!=n.sticky&&(t+="y"),RegExp(n.source,t);e=new n.constructor;for(t in n)e[t]=o.util.Helper.clone(n[t]);return e},n.hasClass=function(n,t){return n.className.match(RegExp("(\\s|^)"+t+"(\\s|$)"))},n.addClass=function(n,t){return o.util.Helper.hasClass(n,t)||(n.className+=" "+t),n.className=n.className.trim()},n.removeClass=function(n,t){var e;return o.util.Helper.hasClass(n,t)?(e=RegExp("(\\s|^)"+t+"(\\s|$)"),n.className=n.className.replace(e," "),n.className=n.className.trim()):void 0},n.addStyleSheet=function(n){var t,e;return t=document.getElementsByTagName("head")[0],e=document.createElement("style"),e.type="text/css",e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n)),t.appendChild(e)},n}(),o.event={},o.event.Event=function(){function n(){this._events={}}return n.prototype.on=function(n,t){return this._events[n]=this._events[n]||[],this._events[n].push(t)},n.prototype.off=function(n,t){return!1!=n in this._events?this._events[n].splice(this._events[n].indexOf(t),1):void 0},n.prototype.emit=function(n){var t,e;if(this._events=this._events||{},!1!=n in this._events){for(t=0,e=[];this._events[n].length>t;)this._events[n][t].apply(this,Array.prototype.slice.call(arguments,1)),e.push(t++);return e}},n}(),o.conf={},o.conf.Configuration=function(){function n(n){this._options=o.util.Helper.extend({},t,n)}var t;return t={debug:!1},n.prototype.get=function(n){var t;return null!=(t=this._options[n])?t:null},n.options={DEBUG:"debug",AUTOLOAD:"autoload"},n}(),o.util.FeatureDetector=function(){function n(){}return n.hasQuerySelectorAll=document.querySelectorAll!==void 0,n.hasMutationObserver=!(!window.MutationObserver&&!window.WebKitMutationObserver&&!window.MozMutationObserver),n.hasGetClientRect=void 0!==document.documentElement.getBoundingClientRect,n.hasCssAnimations=function(){var n,t,e,r;if(e=document.documentElement,n=!1,t=["Webkit","Moz","O","ms","Khtml"],e.style.animationName&&(n=!0),!1===n)for(r=0;t.length>r;){if(void 0!==e.style[t[r]+"AnimationName"]){n=t[r],n.toLowerCase(),n=!0;break}r++}return n}(),n}(),o.gremlins={},o.gremlins.NameProvider=function(){function n(){}var t;return t=function(n,t){var e;return"function"==typeof n.hasAttribute?n.hasAttribute(t):(e=n.getAttributeNode(t),!(!e||!e.specified&&!e.nodeValue))},n.DATA_NAME_ATTR="data-gremlin",n.isGremlin=function(n){return t(n,"data-gremlin")},n.getNames=function(n){var t,e;if(t=n.getAttribute("data-gremlin"),""===t)return t=null!=(e=n.outerHTML)?e:"",o.gremlins.NameProvider.flagBrokenElement(n),a.debug.console.log("Couldn't process gremlin element, no gremlin names available, 'data-gremlin' is empty!\n"+t),[];var r,i;for(r=t.split(","),i=[],e=0,t=r.length;t>e;e++)n=r[e],i.push(n.trim());return i},n.flagBrokenElement=function(n){return o.util.Helper.addClass(n,"gremlin-error"),o.gremlins.NameProvider.flagProcessedElement(n),a.debug.reportBrokenGremlin(n)},n.flagProcessedElement=function(n){var t;return t=n.getAttribute("data-gremlin"),n.removeAttribute("data-gremlin"),n.setAttribute("data-gremlin-found",t)},n}(),o.domObserver={},o.domObserver.ElementList=function(){function n(n){this._attributeName=n}var t,e,r;return e=function(){function n(){}return n.get=function(n){var t,e,r,i;for(t=document.body.querySelectorAll("["+o.gremlins.NameProvider.DATA_NAME_ATTR+"]"),i=[],e=0,r=t.length;r>e;e++)n=t[e],i.push(n);return i},n}(),t=function(){function n(){}return n.get=function(n){var t,e,r,i;for(t=document.body.getElementsByTagName("*"),i=[],e=0,r=t.length;r>e;e++)n=t[e],o.gremlins.NameProvider.isGremlin(n)&&i.push(n);return i},n}(),r=o.util.FeatureDetector.hasQuerySelectorAll?e:t,n.prototype.getList=function(){return r.get(this._attributeName)},n}.call(this);var s=function(n,t){return function(){return n.apply(t,arguments)}};o.domObserver.clocks={},o.domObserver.clocks.MutationObserverClock=function(){function n(){if(this._onMutation=s(this._onMutation,this),null===t)throw Error("Mutation Observer not available")}var t;return t=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver||null,n.prototype.observe=function(){return new t(this._onMutation).observe(document.body,{childList:!0,subtree:!0})},n.prototype._onMutation=function(n){var t,e,r,i;for(i=[],e=0,r=n.length;r>e;e++){if(t=n[e],"childList"===t.type){this.onMutation();break}i.push(void 0)}return i},n.prototype.onMutation=function(){},n}(),s=function(n,t){return function(){return n.apply(t,arguments)}},o.domObserver.clocks.LegacyTimeoutClock=function(){function n(){this._onInterval=s(this._onInterval,this)}return n.prototype.observe=function(){return this._initiateInterval()},n.prototype._initiateInterval=function(){return this._interval=window.setTimeout(this._onInterval,500)},n.prototype._onInterval=function(){return this.onMutation(),this._initiateInterval()},n.prototype.onMutation=function(){},n}(),o.domObserver.clocks.cssAnimationStyle=function(n){return n="@keyframes {{ANIMATION_NAME}} {\n  0%   { opacity: 0.9; }\n  100% { opacity: 1; }\n}\n\n@-moz-keyframes {{ANIMATION_NAME}} {\n  0%   { opacity: 0.9; }\n  100% { opacity: 1; }\n}\n\n@-webkit-keyframes {{ANIMATION_NAME}} {\n  0%   { opacity: 0.9; }\n  100% { opacity: 1; }\n}\n\n@-o-keyframes {{ANIMATION_NAME}} {\n  0%   { opacity: 0.9; }\n  100% { opacity: 1; }\n}\n\n*[{{GREMLIN_ATTRIBUTE}}] {\n  animation-duration: 1ms;\n  -o-animation-duration: 1ms;\n  -moz-animation-duration: 1ms;\n  -webkit-animation-duration: 1ms;\n  animation-name: {{ANIMATION_NAME}};\n  -o-animation-name: {{ANIMATION_NAME}};\n  -moz-animation-name: {{ANIMATION_NAME}};\n  -webkit-animation-name: {{ANIMATION_NAME}};\n}".replace(/{{ANIMATION_NAME}}/g,n),n.replace(/{{GREMLIN_ATTRIBUTE}}/g,o.gremlins.NameProvider.DATA_NAME_ATTR)},s=function(n,t){return function(){return n.apply(t,arguments)}},o.domObserver.clocks.CssAnimationClock=function(){function n(){this._onAnimation=s(this._onAnimation,this);var n;n=o.domObserver.clocks.cssAnimationStyle(t),o.util.Helper.addStyleSheet(n)}var t,e;return t="gremlinInserted",e=["animationstart","webkitAnimationStart","oanimationstart"],n.prototype.observe=function(){var n,t,r,i;for(i=[],t=0,r=e.length;r>t;t++)n=e[t],i.push(document.body.addEventListener(n,this._onAnimation,!1));return i},n.prototype._onAnimation=function(n){return n.animationName===t?this.onMutation():void 0},n.prototype.onMutation=function(){},n}(),o.domObserver.clocks.ClockFactory=function(){function n(){}var t;return t=o.util.FeatureDetector.hasCssAnimations,n.createClock=function(){return new(t?o.domObserver.clocks.CssAnimationClock:o.domObserver.clocks.LegacyTimeoutClock)},n}();var s=function(n,t){return function(){return n.apply(t,arguments)}},r={}.hasOwnProperty,l=function(n,t){function e(){this.constructor=n}for(var i in t)r.call(t,i)&&(n[i]=t[i]);return e.prototype=t.prototype,n.prototype=new e,n.__super__=t.prototype,n};o.MutationObserverShim=function(){function n(){}var t;return t=null,n=function(n){function t(){this._onMutation=s(this._onMutation,this),t.__super__.constructor.apply(this,arguments),this._clock=o.domObserver.clocks.ClockFactory.createClock(),this._clock.onMutation=this._onMutation}return l(t,n),t.prototype._onMutation=function(){return this.emit(o.MutationObserverShim.ON_MUTATION)},t.prototype.observe=function(){return this._clock.observe(),this._onMutation()},t}(o.event.Event),n.ON_MUTATION="ON_MUTATION",n.get=function(){return null!=t?t:t=new n},n}.call(this),s=function(n,t){return function(){return n.apply(t,arguments)}},o.domObserver.DomObserver=function(){function n(){this._handleMutation=s(this._handleMutation,this),this._elementList=new o.domObserver.ElementList}return n.prototype._bindMutations=function(){var n;return n=o.MutationObserverShim.get(),n.on(o.MutationObserverShim.ON_MUTATION,this._handleMutation),n.observe()},n.prototype._handleMutation=function(){var n;return n=this._elementList.getList(),n.length>0?this.onNewElements(n):void 0},n.prototype.observe=function(){return this._bindMutations()},n.prototype.onNewElements=function(){},n}(),o.util.ElementData={},o.util.ElementData.DataValue=function(){function n(n){this._dataString=n}var t;return t=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,n.prototype.parse=function(){var n,e;if(e=n=this._dataString,"string"==typeof this._dataString)try{e="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:t.test(n)?JSON.parse(n):n}catch(r){}return e},n}(),r={}.hasOwnProperty,o.util.ElementData.ElementData=function(){function n(n){this._el=n,this._obj=e(this._el)}var t,e;return t=function(n){return n.toLowerCase().replace(/-(.)/g,function(n,t){return t.toUpperCase()})},e=function(n){var e,i,s,l;l={},void 0!==n.dataset?e=n.dataset:(e={},[].filter.call(n.attributes,function(r){var i;return(i=/^data-/.test(r.name))&&(e[t(r.name.substring(5))]=n.getAttribute(r.name)),i}));for(s in e)r.call(e,s)&&(i=e[s],i=new o.util.ElementData.DataValue(i),l[s]=i.parse());return l},n.prototype.get=function(n){var t;return null!=(t=this._obj[n])?t:null},n.prototype.toObject=function(){return o.util.Helper.clone(this._obj)},n}(),o.gremlinDefinitions={},o.gremlinDefinitions.AbstractGremlin=function(){function n(n,t,e,r){this.el=n,this.data=t,this.id=e,r.call(this)}return n.prototype.data=null,n.prototype.el=null,n.prototype.id=null,n.prototype.klass=null,n}(),r={}.hasOwnProperty,l=function(n,t){function e(){this.constructor=n}for(var i in t)r.call(t,i)&&(n[i]=t[i]);return e.prototype=t.prototype,n.prototype=new e,n.__super__=t.prototype,n},o.gremlinDefinitions.Pool=function(){function n(){}var t,e;return e=null,t={},n=function(){function n(){}return n.prototype.get=function(n){var e;return null!=(e=t[n])?e:null},n.prototype.set=function(n,e){if(t[n]!==void 0)throw Error("Trying to add new Gremlin definition, but a definition for "+n+" already exists.");return t[n]=e},n.prototype.define=function(n,t,e,i){var s,u;if("string"!=typeof n)throw Error("The first parameter when defining a gremlin has to be a string, the gremlin definition's name!");if("function"!=typeof t)throw Error("The second parameter when defining a gremlin has to be the constructor function!");if(void 0!==e&&"object"!=typeof e)throw Error("The third parameter when defining a gremlin has to be an object providing the instance members of the gremlin!");if(void 0!==i&&"object"!=typeof i)throw Error("The fourth parameter when defining a gremlin has to be an object providing the static members of the gremlin!");s=function(n){function e(){e.__super__.constructor.apply(this,arguments),t.call(this)}return l(e,n),e}(o.gremlinDefinitions.AbstractGremlin),s.prototype.klass=s,o.util.Helper.mixin(s,e);for(u in i)r.call(i,u)&&(e=i[u],s[u]=e);return this.set(n,s),s},n.prototype.addClass=function(n,t){if("string"!=typeof n)throw Error("Please provide the name of the gremlin ");if("function"!=typeof t)throw Error("When adding a gremlin, you have to provide a constructor function!");return t.prototype.klass=t,this.set(n,t),t},n}(),n.getInstance=function(){return null!=e?e:e=new n},n}(),o.gremlinDefinitions.ExtensionRegistry=function(){function n(){}var t;return t=[],n.addExtension=function(n){return n.extend(o.gremlinDefinitions.AbstractGremlin),t.push(n)},n.getExtensions=function(){return t.slice(0)},n}(),o.gremlins.GremlinFactory=function(){function n(){}var t,e;return e=function(){var n;return n=0,function(){return n++}}(),t=function(){var n,t,e,r,i;for(t=o.gremlinDefinitions.ExtensionRegistry.getExtensions(),i=[],e=0,r=t.length;r>e;e++)n=t[e],i.push(n.bind(this));return i},n.getInstance=function(n,r,i){if(n=o.gremlinDefinitions.Pool.getInstance().get(n),"function"==typeof n){if(r=new n(r,i.toObject(),e(),t),null===r.el)throw Error("Abstract gremlin class not called. Did you miss a super in your coffeescript-class?");return r}return null},n}();var u;u=o.util.FeatureDetector.hasGetClientRect,o.gremlins.GremlinDomElement=function(){function n(n,r){this._el=n,this._name=r,this._data=new o.util.ElementData.ElementData(this._el),this.isLazy=this._isLazy=!0===this._data.get(e)?!0:!1,this.name=this._name,this._triggeredPending=!1,o.util.Helper.addClass(this._el,t),a.debug.registerGremlin(this),a.emit(a.ON_ELEMENT_FOUND,this._el)}var t,e;return e="gremlinLazy",t="gremlin-loading",n.prototype._gremlinInstance=null,n.prototype.check=function(){return this._isInViewport()?this._create():void 0},n.prototype._isInViewport=function(){var n;return this._isLazy&&u?(n=document.documentElement.clientHeight,300>this._el.getBoundingClientRect().top-n):!0},n.prototype._create=function(){return this._gremlinInstance=o.gremlins.GremlinFactory.getInstance(this._name,this._el,this._data),this.hasGremlin()?(o.util.Helper.removeClass(this._el,t),o.util.Helper.removeClass(this._el,"gremlin-definition-pending"),o.util.Helper.addClass(this._el,"gremlin-ready"),a.emit(a.ON_GREMLIN_LOADED,this._el)):this._triggeredPending?void 0:(this._triggeredPending=!0,o.util.Helper.addClass(this._el,"gremlin-definition-pending"),a.debug.console.info("Gremlin <"+this._name+"> found in the dom, but there is no definition for it at the moment."),a.emit(a.ON_DEFINITION_PENDING,this._el))},n.prototype.hasGremlin=function(){return null!==this._gremlinInstance},n}(),s=function(n,t){return function(){return n.apply(t,arguments)}},o.gremlins.GremlinCollection=function(){function n(){this._scrollHandler=s(this._scrollHandler,this),this._queue=[],this._bindScroll(),this._scrollTimer=this._didScroll=!1}return n.prototype._queue=null,n.prototype._bindScroll=function(){return window.addEventListener?window.addEventListener("scroll",this._scrollHandler,!1):window.attachEvent?window.attachEvent("onscroll",this._scrollHandler):void 0},n.prototype.add=function(n){var t,e,r;for(e=0,r=n.length;r>e;e++)t=n[e],this._addGremlinElements(t);return this._processQueue()},n.prototype._addGremlinElements=function(n){var t,e,r,i,s;for(e=o.gremlins.NameProvider.getNames(n),o.gremlins.NameProvider.flagProcessedElement(n),s=[],r=0,i=e.length;i>r;r++)t=e[r],s.push(this._queue.push(new o.gremlins.GremlinDomElement(n,t)));return s},n.prototype._processQueue=function(){var n,t,e,r,i;for(t=[],i=this._queue,e=0,r=i.length;r>e;e++)n=i[e],n.check(),n.hasGremlin()||t.push(n);return this._queue=t,a.debug.updateGremlinLog()},n.prototype.process=function(){return this._processQueue()},n.prototype._scrollHandler=function(){var n=this;return 0===this._queue.length?!0:(this._didScroll||(this._scrollTimer=setInterval(function(){return n._didScroll?(n._didScroll=!1,clearTimeout(n._scrollTimer),n.process()):void 0},250)),this._didScroll=!0)},n}(),s=function(n,t){return function(){return n.apply(t,arguments)}},o.Application=function(){function n(){this._onNew=s(this._onNew,this);var n,e;n=null!=(e=new o.util.ElementData.ElementData(document.body).get(t))?e:{},this.configuration=new o.conf.Configuration(n),this._observer=new o.domObserver.DomObserver,this._coll=new o.gremlins.GremlinCollection,this._observer.onNewElements=this._onNew}var t;return t="gremlinConfig",n.prototype._onNew=function(n){return this._coll.add(n)},n.prototype.start=function(){return this._observer.observe()},n.prototype.refresh=function(){return this._coll.process()},n}(),o.util.ready=window.onDomReady,o.util.Debug=function(){function n(n){this._isDebug=n,this._gremlins=[],this._broken=[],this._logEl=null,this._createLog(),this._createConsole()}var t,e,r,i,s;return t="debug error info log warn dir dirxml trace assert count markTimeline profile profileEnd time timeEnd timeStamp group groupCollapsed groupEnd clear".split(" "),e="function"==typeof Function.prototype.bind,r="function"==typeof(null!=(s=window.console)?s.log:void 0),i=function(){},n.prototype._createLog=function(){return this._isDebug?(this._logEl=document.createElement("div"),this._logEl.className="gremlinjs-log",document.body.appendChild(this._logEl)):void 0},n.prototype._createConsole=function(){var n,s,l,u;if(this.console={},this._isDebug&&o.util.Helper.addStyleSheet(".gremlinjs-log {\nposition: fixed;\nbottom: 0;\nleft: 0;\nbackground: #fff;\npadding: 4px 6px;\n-webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.3);\nbox-shadow: 0px 0px 4px 0px rgba(0,0,0,0.3);\nz-index: 9999;\n}\n\n.gremlinjs-log p {\n  font-size: 12px;\n  color: #666666;\n  margin: 0;\n  padding: 0;\n}\n\n.gremlinjs-log p span {\n  display: inline-block;\n  margin: 0 5px;\n  cursor: help;\n}\n\n.gremlinjs-log p .gremlinjs-log-ready{\ncolor: #41bb19;\n}\n\n.gremlinjs-log p .gremlinjs-log-waiting{\ncolor: #8d46b0;\n}\n\n.gremlinjs-log p .gremlinjs-log-pending{\ncolor: #fff;\nbackground: #fe781e;\npadding: 0 4px;\n}\n\n.gremlinjs-log p .gremlinjs-log-error{\ncolor: #fff;\nbackground: #f50f43;\npadding: 0 4px;\n}\n\n*[data-gremlin-found] {\noutline: 2px solid #41bb19;\n}\n\n*[data-gremlin-found]::before {\ncolor: #41bb19;\nfont-family: monospace;\ncontent: '[' attr(data-gremlin-found) '] ready';\nposition: absolute;\nmargin-top: -14px;\nfont-size: 11px;\nfont-weight: bold;\n}\n\n.gremlin-definition-pending {\noutline: 2px solid #fe781e;\n}\n.gremlin-definition-pending::before {\ncontent: '[' attr(data-gremlin-found) '] definition pendig...';\ncolor: #fe781e;\n}\n.gremlin-error {\noutline: 2px solid red;\n}\n\n.gremlin-error[data-gremlin-found]::before {\ncontent: 'faulty gremlin!';\ncolor: red;\n}"),r&&this._isDebug){for(u=[],s=0,l=t.length;l>s;s++)n=t[s],e?u.push(this.console[n]=console[n]?Function.prototype.bind.call(console[n],console):i):console[n]?u.push(this.console[n]=function(){return Function.prototype.apply.call(console[n],console,arguments)}):u.push(this.console[n]=i);return u}for(u=[],s=0,l=t.length;l>s;s++)n=t[s],u.push(this.console[n]=i);return u},n.prototype.registerGremlin=function(n){return this._gremlins.push(n)},n.prototype.reportBrokenGremlin=function(n){return this._broken.push(n)},n.prototype.updateGremlinLog=function(){var n=this;return this._isDebug&&this._logEl?window.setTimeout(function(){var t,e,r,i,o,s,l,u,a,c,p;for(o=0,s={},l=0,u={},r=0,i={},t=n._broken.length,p=n._gremlins,a=0,c=p.length;c>a;a++)e=p[a],e.hasGremlin()?(o++,n._addName(s,e.name)):e.isLazy?(l++,n._addName(u,e.name)):(r++,n._addName(i,e.name));return t='<p>\n<span title="'+n._getTitle(s)+"\" class='gremlinjs-log-ready'><strong>"+o+'</strong> ready</span>\n<span title="'+n._getTitle(u)+"\" class='gremlinjs-log-waiting'><strong>"+l+'</strong> lazy waiting</span>\n<span title="'+n._getTitle(i)+"\" class='"+(r>0?"gremlinjs-log-pending":"")+"'><strong>"+r+"</strong> pending</span>\n<span class='"+(t>0?"gremlinjs-log-error":"")+"'><strong>"+t+"</strong> error(s)</span>\n</p>",n._logEl.innerHTML=t},50):void 0},n.prototype._addName=function(n,t){return n[t]?n[t]++:n[t]=1},n.prototype._getTitle=function(n){var t,e,r;e="";for(t in n)r=n[t],e+=""+r+"x "+t+" \n";return""===e?"":"Gremlins: \n"+e},n}(),o.util.polyfill={},"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),Array.prototype.filter||(Array.prototype.filter=function(n,t){var e,r,i,o,s;if(this===void 0||null===this)throw new TypeError;if(o=Object(this),r=o.length>>>0,"function"!=typeof n)throw new TypeError;for(i=[],e=0;r>e;)e in o&&(s=o[e],n.call(t,s,e,o)&&i.push(s)),e++;return i});var a,r={}.hasOwnProperty,l=function(n,t){function e(){this.constructor=n}for(var i in t)r.call(t,i)&&(n[i]=t[i]);return e.prototype=t.prototype,n.prototype=new e,n.__super__=t.prototype,n};a=function(){var n,t;return n=null,t=new(function(t){function e(){e.__super__.constructor.apply(this,arguments),this.debug=new o.util.Debug(!1)}return l(e,t),e.prototype.ON_ELEMENT_FOUND="elementfound",e.prototype.ON_DEFINITION_PENDING="definitionpending",e.prototype.ON_GREMLIN_LOADED="gremlinloaded",e.prototype.define=function(t,e,r,i){return t=o.gremlinDefinitions.Pool.getInstance().define(t,e,r,i),null!=n&&n.refresh(),t},e.prototype.add=function(t,e){return o.gremlinDefinitions.Pool.getInstance().addClass(t,e),null!=n?n.refresh():void 0},e.prototype.Gremlin=o.gremlinDefinitions.AbstractGremlin,e.prototype.Helper=o.util.Helper,e.prototype.registerExtension=function(n){return o.gremlinDefinitions.ExtensionRegistry.addExtension(n)},e}(o.event.Event)),o.util.ready(function(){var e;return n=new o.Application,(e=n.configuration.get(o.conf.Configuration.options.DEBUG))&&(t.debug=new o.util.Debug(e)),n.start(),t.debug.console.log("GremlinJS up and running...")}),t}(),window.GremlinJS=a,void 0===window.G&&(window.G=window.GremlinJS),"function"==typeof window.define&&window.define.amd&&define("GremlinJS",[],function(){return a}),n.goog=e,n.__hasProp=r,n.__slice=i,n.gremlin=o,n.__bind=s,n.__extends=l,n.isModern=u,n.GremlinJS=a})({},function(){return this}());