!function(D,_){"use strict";window.XList=function(a){"number"==typeof a?(this.limit=a,this.add(_.slice(arguments,1))):this.add(arguments)},_={version:"0.13.2",slice:Array.prototype.slice,zero:function(){return 0},nodes:[Element,Text,Comment],lists:[NodeList,HTMLCollection,XList],isList:function(a){return a&&"object"==typeof a&&"length"in a&&!a.nodeType||a instanceof NodeList||a instanceof HTMLCollection},define:function(a,b,c,d){if("string"==typeof b)for(var e=0,f=a.length;f>e;e++)_.defprop(a[e].prototype||a[e],b,c,d);else for(var g in b)_.define(a,g,b[g],c)},defprop:function(a,b,c,d){if(d||!(b in a))try{var e=c.get||c.set?c:{value:c,writable:!0};e.configurable=!0,Object.defineProperty(a,b,e)}catch(f){}},resolve:function(a,b,c,d){var e=a,f=b;if(c=c.length?_.fill(c,d,f):null,e.indexOf(".")>0){for(var g=e.split(".");g.length>1&&(f=f[e=g.shift()]););f=f||b,e=f?g[0]:a}var h=f[e];if(void 0!==h){if("function"==typeof h&&h.apply)return h.apply(f,c);if(!c)return h;f[e]=c[0]}else if(1===b.nodeType){if(!c)return b.getAttribute(a);null===c[0]?b.removeAttribute(a):b.setAttribute(a,c[0])}},fill:function(a,b,c){for(var d=[],e=0,f=a.length;f>e;e++){var g=a[e],h=typeof g;d[e]="string"===h?g.replace(/\$\{i\}/g,b):"function"===h?g(c,b,a):g}return d}},_.defprop(D,"_",_),_.define([Node].concat(_.lists),{each:function(a){var b,c,d=_.isList(this)?this:[this],e=[];"string"==typeof a&&(b=_.resolve[a]||a,c=_.slice.call(arguments,1),a=function(a,d){return _.resolve(b,a,c,d)});for(var f,g=0,h=d.length;h>g;g++)f=a.call(d[g],d[g],g,d),(f||b&&void 0!==f)&&e.push(f);return e.length?_.isList(this)?e[0]&&e[0].each?new XList(e):e:e[0]:this},toArray:function(a){if(a=a||[],_.isList(this))for(var b=0,c=this.length;c>b;b++)a.push(this[b]);else a.push(this);return a}}),_.define([XList],{length:0,limit:void 0,add:function(a){var b=this.length;if(arguments.length>1||_.isList(a))for(var c=arguments.length>1?arguments:a,d=0,e=c.length;e>d;d++)this.add(c[d]);else null!==a&&void 0!==a&&this.indexOf(a)<0&&(this[this.length++]=a,this.length===this.limit&&(this.add=_.zero));return this.length-b},isFull:function(){return this.add===_.zero},indexOf:function(a){for(var b=0;b<this.length;b++)if(a===this[b])return b;return-1}}),_.defprop(D,"extend",function(a,b,c,d){Array.isArray(c)||(d=c,c=[Element]),_.define(c,a,b,d),_.define(_.lists,a,function(){var a=arguments;return this.each(function(){return b.apply(this,a)})},d)}),_.parents=[Element,DocumentFragment,D],_.define(_.parents.concat(_.lists),{queryAll:function(a,b){for(var c=_.isList(this)?this:[this],d=new XList(b),e=0,f=c.length;f>e&&(!b||b>d.length);e++)d.add(c[e][b===d.length+1?"querySelector":"querySelectorAll"](a));return d},query:function(a){return this.queryAll(a,1)[0]}}),_.define(_.lists,{only:function(a,b){var c=this.toArray();return c=a>=0||0>a?c.slice(a,b||a+1||void 0):c.filter("function"==typeof a?a:1===arguments.length?function(b){return b[b.matches?"matches":"hasOwnProperty"](a)}:function(c){return(c.each?c.each(a):c[a])===b}),new XList(c)},not:function(){var a=this.only.apply(this,arguments);return this.only(function(b){return a.indexOf(b)<0})}}),_.estFnArgs=function(a,b,c,d){if(b=_.resolve[b]||b,b in a||(d=void 0===c?"boolean"==typeof b?b:!0:c,c=b,b="parentElement"),"boolean"==typeof c&&(d=c,c=null),c){if("string"==typeof c){var e=c;c=function(a){return a.matches&&a.matches(e)}}}else c=function(){return!0};return[b,c,d||!1]},_.define(_.nodes,"farthest",function(a,b,c){var d=_.estFnArgs(this,a,b,c);return _.farthest(this,d[0],d[1],d[2]&&d[1](this)?this:null)}),_.farthest=function(a,b,c,d){return a&&(a=a[b])?_.farthest(a,b,c,c(a)?a:d):d},_.define(_.nodes,"closest",function(a,b,c){var d=_.estFnArgs(this,a,b,c);return d[2]&&d[1](this)?this:_.closest(this,d[0],d[1])}),_.closest=function(a,b,c){return a&&(a=a[b])?c(a)?a:_.closest(a,b,c):null},D.extend("all",function(a,b,c,d){b===!0&&(c=b,b=void 0),d=d||new XList;var e=c?this:this[_.resolve[a]||a];if(e){var f=b&&b.call(this,e,d);null!==f&&d.add(f||e),!e.all||!e.length&&_.isList(e)||e.all(a,b,!1,d)}return d},[Node]);var Ep=Element.prototype,aS="atchesSelector";_.defprop(Ep,"matches",Ep.m||Ep["webkitM"+aS]||Ep["mozM"+aS]||Ep["msM"+aS]);var A=_.append={create:function(a,b,c){return A.insert(a,D.createElement(b),c)},insert:function(a,b,c){var d=A.find(a,c);return d?a.insertBefore(b,d):a.appendChild(b),b},find:function(a,b){switch(typeof b){case"string":return a[b]||a.only(b);case"number":return a.children[b];case"object":return b;case"function":return b.call(a,a)}}};D.extend("append",function(a,b){if("string"==typeof a)return A.create(this,a,b);if(_.isList(a)){for(var c=new XList,d=0,e=a.length;e>d;d++)c.add(this.append(a[d],b));return c}return A.insert(this,a,b),a},_.parents),D.extend("remove",function(){var a=this.parentNode;a&&a.removeChild(this)},_.nodes);var V=_.xValue={resolve:function(context,reference){return eval('context["'+reference+'"]')},name:function(a){return 3!==a.nodeType||a.noSubNames||a.splitOnName(),"FORM"===a.tagName?a.getAttribute("name"):a.name},parse:function(a){if("string"==typeof a)try{a=JSON.parse(a)}catch(b){}else Array.isArray(a)&&(a=a.map(V.parse));return a},string:function(a){if(void 0!==a&&"string"!=typeof a)try{a=JSON.stringify(a)}catch(b){a+=""}return a},stringifyFor:function(a){var b=a.getAttribute("xvalue-stringify");return b&&V.resolve(window,b)||V.string},nameNodes:function(a,b,c,d){for(var e=[],f=0;f<a.childNodes.length;f++){var g=a.childNodes[f],h=V.name(g),i=null;if(h&&e.indexOf(g)<0?(e.push(g),i=b(h,g)):c&&!g.useBaseValue()&&c(g),g.useAttrValues)for(var j=0;j<g.attributes.length;j++)d(g.attributes[j],i)}},combine:function(a,b,c){return void 0===a||a===b||c&&null===a?b:Array.isArray(a)?(a.indexOf(b)<0&&a.push(b),a):[a,b]},getNameValue:function(a,b){return V.nameNodes(a,function(a,c){return b[a]=V.combine(b[a],c.nameValue)},function(a){V.getNameValue(a,b)},function(a,c){var d=c||b;d[a.name]=a.baseValue}),b},setNameValue:function(a,b){V.nameNodes(a,function(a,c){var d=V.resolve(b,a);return void 0!==d?c.nameValue=d:void 0},function(a){V.setNameValue(a,b)},function(a,c,d){var e=V.resolve(d||b,a.name);void 0!==e&&(a.baseValue=e)})},booleanAttr:function(a){return{get:function(){return this.hasAttribute(a)},set:function(b){this[b?"setAttribute":"removeAttribute"](a,!0)}}},nameRE:/\$\{([^}]+)\}/,changeEvent:window.CustomEvent?function(a){a.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}:function(a){var b=D.createEvent("CustomEvent");b.initCustomEvent("change",!0),a.dispatchEvent(b)}};_.define([Node],{value:{get:function(){return this.hasAttribute&&this.hasAttribute("value")?this.getAttribute("value"):this.textContent},set:function(a){this.hasAttribute&&this.hasAttribute("value")?this.setAttribute("value",a):this.textContent=a}},baseValue:{get:function(){return V.parse(this.value)},set:function(a){var b=this.value,c=this.value=V.string(a);b!==c&&V.changeEvent(this)}},useBaseValue:function(){var a=!this.noSubNames&&this.childNodes.length;return!a||1===a&&!!this.childNodes[0].useBaseValue()},nameParent:{get:function(){for(var a,b=this;a=b.parentNode;){if(V.name(a))return a;b=a}return b===this?null:b}},nameGroup:{get:function(){var a=this,b=V.name(a);return b?a.parentNode?a.nameParent.queryNameAll(b):new XList(a):null}},nameValue:{get:function(){var a;return V.name(this)&&this.nameGroup.each(function(b){a=V.combine(a,b.xValue)}),a||this.xValue},set:function(a){if(V.name(this)&&Array.isArray(a)){var b=this.nameGroup;for(_.repeat&&!a.length&&b.length&&!b[0].hasAttribute(_.repeat.id)&&_.repeat.init(b[0],!0),b.each(function(b,c){c<a.length?b.nameValue=a[c]:b.remove()});b.length<a.length;){var c=b[b.length-1];b.add(c.repeat(a[b.length]))}}else this.xValue=a}},xValue:{get:function(){return this.useBaseValue()?this.baseValue:V.getNameValue(this,{})},set:function(a){this.useBaseValue()||"object"!=typeof a?this.baseValue=a:V.setNameValue(this,a)}}}),_.define([Attr],{useBaseValue:function(){return!0}},!0),_.define([Element],{name:{get:function(){return this.getAttribute("name")},set:function(a){this.setAttribute("name",a)}},baseProperty:"value",baseValue:{get:function(){var a=this.getAttribute("xvalue-parse");return a=a&&V.resolve(window,a)||V.parse,a.call(this,this[this.baseProperty])},set:function(a){var b=this[this.baseProperty],c=this[this.baseProperty]=V.stringifyFor(this).call(this,a);b!==c&&V.changeEvent(this)}},useAttrValues:V.booleanAttr("xvalue-attr"),noSubNames:V.booleanAttr("xvalue-none")},!0),_.define(_.parents.concat(_.lists),{queryName:function(a){return this.queryNameAll(a,1)[0]},queryNameAll:function(a,b,c){c=c||new XList(b);for(var d=_.isList(this)?this:[this],e=0;e<d.length&&!c.isFull();e++){for(var f=d[e],g=0;g<f.childNodes.length&&!c.isFull();g++){var h=f.childNodes[g],i=V.name(h);i===a&&"X-REPEAT"!==h.tagName?c.add(h):1===h.nodeType&&(i?0===a.indexOf(i+".")&&h.queryNameAll(a.substring(i.length+1),b,c):h.queryNameAll(a,b,c))}if(f.useAttrValues&&!c.isFull())for(var j=this,k=0;k<j.attributes.length;k++){var l=j.attributes[k];if(l.name===a){l.parentNode=j,c.add(l);break}}}return c}}),_.define([Text],{useBaseValue:function(){return this.noSubNames||!this.splitOnName()},splitOnName:function(){var a=this,b=a.textContent.match(V.nameRE);if(b){var c=b.index,d=b[0];c>0&&(a.splitText(c),a.noSubNames=!0,a=a.nextSibling),a.textContent.length>d.length&&a.splitText(d.length),a.name=b[1],a.textContent=""}return a.noSubNames=!0,!!b}},!0),_.define([HTMLInputElement],{xValue:{get:function(){var a=this;return"radio"!==a.type&&"checkbox"!==a.type||a.checked?a.baseValue:null},set:function(a){var b=this;if("checkbox"===b.type||"radio"===b.type){a=(Array.isArray(a)?a:[a]).map(V.stringifyFor(this));var c=b.checked;b.checked=a.indexOf(b.value)>=0,c!==b.checked&&V.changeEvent(b)}else this.baseValue=a}},nameValue:{get:function(){var a=this.type;if("radio"===a||"checkbox"===a){var b,c=this.nameGroup;return c.each(function(a){b=V.combine(b,a.xValue,!0)}),!Array.isArray(b)||"radio"!==this.type&&1!==c.length?b:b[0]}return this.baseValue},set:function(a){if("checkbox"===this.type||"radio"===this.type){a=(Array.isArray(a)?a:[a]).map(V.stringifyFor(this));var b=!1;this.nameGroup.each(function(c){var d=c.checked;c.checked=a.indexOf(c.value)>=0,d!==c.checked&&(b=!0)}),b&&V.changeEvent(this)}else this.baseValue=a}}},!0),_.define([HTMLSelectElement],{xValue:{get:function(){if(this.multiple){var a=this.children.only("selected",!0);return a.length?a.each("xValue"):this.children.length>1?[]:null}return V.parse(this.baseValue)},set:function(a){if(this.multiple){a=(Array.isArray(a)?a:[a]).map(V.string);var b=!1;this.children.each(function(c){var d=c.selected;c.selected=a.indexOf(c.value)>=0,c.select!==d&&(b=!0)}),b&&V.changeEvent(this)}else this.baseValue=a}}},!0),_.define([HTMLLIElement],{baseProperty:{get:function(){return this.parentNode instanceof HTMLOListElement?"value":"textContent"}}},!0);var R=_.repeat={id:"data-repeat-id",count:0,init:function(a,b){var c=a.getAttribute("data-repeat"),d=R.count++,e=c&&D.query(c).cloneNode(!0)||a,f=D.createElement("x-repeat");e.setAttribute(R.id,d),f.setAttribute(R.id,d);for(var g=0,h=a.attributes.length;h>g;g++){var i=a.attributes[g];"data-repeat-none"===i.name&&(f.value=i.value||a.innerHTML),f.setAttribute(i.name,i.value)}return a.parentNode.insertBefore(f,a.nextSibling),_.defprop(f,"source",e),b!==!0&&a.remove(),d},repeat:function(a,b,c,d){var e=c.cloneNode(!0);return void 0!==d&&null!==d&&(e.xValue=d),a.insertBefore(e,b),e},style:D.head.append("style")};D.extend("repeat",function(a){var b=this.parentNode,c=this.getAttribute(R.id)||R.init(this,!0),d="["+R.id+'="'+c+'"]',e=d+":not(x-repeat)";if(a===!1)return b.queryAll(e).remove();var f=b.query("x-repeat"+d),g=f.source;f.hasAttribute("data-repeat-first")&&(f=b.query(d+"[data-index]")||f);var h=Array.isArray(a)?a.map(function(a){return R.repeat(b,f,g,a)}):R.repeat(b,f,g,a);return b.queryAll(e).each("setAttribute","data-index","${i}"),h}),R.style.textContent="[data-repeat] { display: none }",D.addEventListener("DOMContentLoaded",function(){D.queryAll("[data-repeat]").each(R.init),R.style.textContent="\nx-repeat { display: none }\nx-repeat[data-repeat-none] { display: inline-block; }\n["+R.id+"] + x-repeat[data-repeat-none] { display: none; }"});var AE=_.append;AE.create=function(a,b,c){var d=b.split(AE.emmetRE()),e=D.createDocumentFragment(),f=D.createElement(d[0]);e.appendChild(f);for(var g=1,h=d.length;h>g;g++){var i=d[g];f=AE.emmet[i.charAt(0)].call(f,i.substr(1),e)||f}return AE.insert(a,e,c),f},AE.emmetRE=function(){var a="\\"+Object.keys(AE.emmet).join("|\\");return new RegExp("(?="+a+")","g")},AE.emmet={"#":function(a){this.id=a},".":function(a){var b=this.getAttribute("class")||"";b=b+(b?" ":"")+a,this.setAttribute("class",b)},"[":function(a){a=a.substr(0,a.length-1).match(/(?:[^\s"]+|"[^"]*")+/g);for(var b=0,c=a.length;c>b;b++){var d=a[b].split("=");this.setAttribute(d[0],(d[1]||"").replace(/"/g,""))}},">":function(a){if(a){var b=D.createElement(a);return this.appendChild(b),b}return this},"+":function(a,b){return AE.emmet[">"].call(this.parentNode||b,a)},"*":function(a){for(var b=this.parentNode,c=new XList(this),d=1;a>d;d++)c.add(this.cloneNode(!0)),b.appendChild(c[d]);return c},"^":function(a,b){return AE.emmet["+"].call(this.parentNode||b,a,b)},"{":function(a){this.appendChild(D.createTextNode(a.substr(0,a.length-1)))}},_.defprop(D,"html",D.documentElement);var dot=_.dot={names:{3:"$text",8:"$comment",7:"$procins"},fns:{},fn:function(a,b){return dot.fns[b]||(dot.fns[b]=1===a?function(){return this.each("children").only(b).dot()}:function(){return this.each("childNodes").only("nodeType",a)})},init:function(){D.queryAll("[data-domx-dot]").each(function(a){a.dot(!0),Observer&&!a._observer&&(a._observer=new Observer(function(a){for(var b=0,c=a.length;c>b;b++)a[b].target.dot(!0)})).observe(a,{childList:!0,subtree:!0})})}},Observer=window.MutationObserver;_.define(_.parents.concat(_.lists),"dot",function(a){var b=this;return(a||!b._dotted)&&(b.each("childNodes").each(function(a){var c=a.nodeType,d=dot.names[c]||a.tagName.toLowerCase();d in b||_.defprop(b,d,{get:dot.fn(c,d)}),1===c&&a.dot()}),_.defprop(b,"_dotted",!0)),b}),dot.init(),D.addEventListener("DOMContentLoaded",dot.init)}(document),function(global,document){"use strict";function Eventi(a){return"string"==typeof a?_.create.apply(_,arguments):Eventi.fy(this)}try{new CustomEvent("test")}catch(err){global.CustomEvent=function(a,b){b=b||{};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail),c}}Eventi.toString=Eventi.prototype.toString=function(){return"Eventi, v"+_.version},Eventi.fy=function(a){for(var b in _.fns)Object.defineProperty(a,b,{value:Eventi[b],writable:!0,configurable:!0});return a};var _=Eventi._={version:"1.3.6",global:new Function("return this")(),noop:function(){},slice:function(a,b){return Array.prototype.slice.call(a,b)},copy:function(a,b,c){if("object"==typeof a)for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c])},async:global.setImmediate&&setImmediate.bind(global)||function(a){return setTimeout(a,0)},resolveRE:/^([\w\$]+)?((\.[\w\$]+)|\[(\d+|'(\\'|[^'])+'|"(\\"|[^"])+")\])*$/,resolve:function(reference,context,tested){if(tested||_.resolveRE.test(reference)){context=context||global;try{return eval("context"+("["!==reference.charAt(0)?"."+reference:reference))}catch(e){}}},create:function(a,b){var c={text:a+""};a=_.parse(c.text,c,c),_.copy(b,c),"bubbles"in c||(c.bubbles=!0);var d=new CustomEvent(a,c);for(var e in c)_.skip.indexOf(e)<0&&(d[_.prop(e)]=c[e]);return d},skip:"bubbles cancelable detail type".split(" "),prop:function(a){return a},parse:function(a,b,c){return _.parsers.forEach(function(d){a=a.replace(d[0],function(){var a=_.slice(arguments,1);return a.unshift(b,c),d[1].apply(b,a)||""})}),a?b.type=a:a},parsers:[[/^(\W*)_/,function(a,b,c){return a.bubbles=!1,c}],[/\((.*)\)/,function(a,b,c){try{a.detail=_.resolve(c)||JSON.parse(c)}catch(d){a.detail=c}}],[/#(\w+)/g,function(a,b,c){(a.tags||(a.tags=[])).push(c),a[c]=!0}],[/^(\w+):/,function(a,b,c){a.category=c}]],fn:function(a,b){Eventi[a]=_.fns[a]=function(c){var d=_.slice(arguments);(!c||"string"==typeof c||c instanceof Event)&&d.unshift(c=this&&this!==Eventi?this:_.global),d.length>b&&(d[b]=d.slice(b),d=d.slice(0,b+1)),d[1]&&"string"!=typeof d[1]||(d[1]=_.split.ter(d[1]));var e,f=_[a];if(!c.nodeType&&c!==_.global&&"length"in c)for(var g=0,h=c.length;h>g;g++)e=f.apply(d[0]=c[g],d);else e=f.apply(c,d);return void 0===e?this:e}},fns:{},split:{guard:{"(":")"},ter:function(a,b){var c,d=[],e="";if(a){b=_.slice(arguments,1),b.unshift(" ");for(var f=0,g=a.length;g>f;f++){var h=a.charAt(f);!c&&b.indexOf(h)>=0?(e&&d.push(e),e=""):(e+=h,c?c===h&&("\\"===e.charAt(e.length-2)?e=e.replace("\\"+h,h):c=null):c=_.split.guard[h])}e&&d.push(e)}else d.push("");return d}}};_.parsers.unshift([/^(\W*)\//,function(a,b,c){return b.global=!0,c}]),_.fire=function(a,b,c){return b instanceof Event?(b.data=c,_.dispatch(a,b),b):_.fireAll(a,b,{data:c})},_.fireAll=function(a,b,c){for(var d,e=0;e<b.length;e++)d=_.create(b[e],c),_.dispatch(a,d);return d},_.dispatch=function(a,b,c){b.global&&(a=_.global),(a.dispatchEvent||a[_key]||_.noop).call(a,b),a.parentObject&&b.bubbles&&!b.propagationStopped&&_.dispatch(a.parentObject,b,!0),!c&&b.singleton&&_.singleton(a,b)},_.fn("fire",2),_.parsers.unshift([/^(\W*)\!/,function(a,b,c){return b.important=!0,c}]),_.on=function(a,b,c,d){if(a!==_.global&&1===b.length&&""===b[0]&&(b=a,a=_.global),Array.isArray(b))for(var e=0,f=b.length;f>e;e++)_.handler(a,b[e],c,d);else{void 0!==c&&(d=d?d.unshift(c)&&d:[c]);for(var g in b)_.handler(a,g,b[g],d)}},_.handler=function(a,b,c,d){var e={target:a,fn:c,data:d,text:b,event:{}};return _.parse(b,e.event,e),delete e.event.tags,a!==_&&Eventi.fire(_,"on:handler",e),e.fn!==_.noop&&(a=e.global===!0?_.global:e.target,_.handlers(a,e.event.type).push(e)),e},_.handlers=function(a,b){var c=_.listener(a),d=c.s[b];return d||(d=c.s[b]=[],a.addEventListener&&a.addEventListener(b,c,_.capture.indexOf(b)>=0)),d},_.capture=["focus","blur"];var _key=_._key="_eventi"+Date.now();if(_.listener=function(a){var b=a[_key];return b||(b=function(a){var c=b.s[a.type];c&&_.handle(a,c)},b.s={},Object.defineProperty(a,_key,{value:b,writeable:!1,configurable:!0})),b},_.handle=function(a,b){for(var c,d=0;d<b.length&&(!_.matches(a,(c=b[d]).event)||(_.execute(a,c),!a.immediatePropagationStopped));d++);},_.execute=function(a,b){var c=[a],d=b.fn,e={target:b.target,args:c};if(a.data&&c.push.apply(c,a.data),b.data&&c.push.apply(c,b.data),b.filters)for(var f=0,g=b.filters.length;g>f&&e.target;f++)b.filters[f].call(e,a,b);if(e.target){try{d.apply(e.target,e.args)}catch(h){_.async(function(){throw h})}b.end&&b.end.apply(e.target,e.args)&&_.unhandle(b)}},_.filter=function(a,b){a.filters=a.filters||[],a.filters.push(b)},_.unhandle=function(a){a.fn=_.noop},_.matches=function(a,b){for(var c in b)if(b[c]!==a[c])return!1;return!0},_.fn("on",3),_.split.guard["<"]=">",_.parsers.unshift([/<(.+)>/,function(a,b,c){b.selector=c,_.delegate&&a!==b&&_.filter(b,_.delegate)}]),global.Element){_.delegate=function(a,b){this.target=_.closest(a.target,b.selector)},_.closest=function(a,b){for(;a&&a.matches;){if(a.matches(b))return a;a=a.parentNode}};var Ep=Element.prototype,aS="atchesSelector";Ep.matches||Object.defineProperty(Ep,"matches",{value:Ep["webkitM"+aS]||Ep["mozM"+aS]||Ep["msM"+aS]})}_.parsers.unshift([/=>(\w+)$/,function(a,b,c){b.alias=c,b!==a&&(b.data=b.data||[],b.data.push(c))}]),_.alias=function(a,b,c){return function(a){var d=_.slice(arguments),e="object"!=typeof a||!a.dispatchEvent&&!a[_key]?0:1;return d.splice(e,0,b),this.apply(c,d)}},Eventi.alias=function(a,b){"string"==typeof a&&(b=a,a=Eventi);var c,d=_.split.ter(b);for(var e in _.fns)for(var f=0,g=d.length;g>f;f++)c={},_.parse(d[f],c,c),c.alias=c.alias||c.type,a[e][c.alias]=_.alias(c.alias,d[f],a);return c},document&&(_.init=function(){for(var a=document.querySelectorAll("[eventi],[data-eventi]"),b=0,c=a.length;c>b;b++){var d=a[b],e=d.getAttribute("data-eventi")||d.getAttribute("eventi");e!==d.eventi&&(_.off&&d.eventi&&Eventi.off(d,d.eventi,_.declared),d.eventi=e,_.declare(d,e))}(a.length||document.querySelector("[click],[data-click]"))&&Eventi.on("click keyup",_.check)},_.declare=function(a,b){for(var c=_.split.ter(b),d=0,e=c.length;e>d;d++)Eventi.on(a,c[d],_.declared)},_.declared=function(a,b){b="string"==typeof b?b:a.type;for(var c=_.declarers(this,b,a.target),d=0,e=c.length;e>d;d++)_.respond(c[d],b,a)},_.declarers=function(a,b,c){for(var d="["+b+"],[data-"+b+"]",e=[],f=!1;c&&c.matches;){if(c.matches(d)&&e.push(c),c===a){f=!0;break}c=c.parentNode}return f?e:a.querySelectorAll(d)},_.respond=function(a,b,c){var d=a.getAttribute("data-"+b)||a.getAttribute(b)||b;if(d){var e=_.resolve(d,a)||_.resolve(d);"function"==typeof e?e.call(a,c):Eventi.fire(a,d,c)}},_.check=function(a){var b=a.target.getAttribute&&("click"===a.type&&_.click(a.target)||13===a.keyCode&&_.click(a.target,!0));b&&(_.declared.call(document.documentElement,a,"click"),"noDefault"!==b||_.allowDefault(a.target)||a.preventDefault())},_.allowDefault=function(a){return"radio"===a.type||"checkbox"===a.type},_.click=function(a,b){var c=a.getAttribute("click");if(!b&&c&&"false"!==c)return"noDefault";if(!a.isContentEditable){var d=a.nodeName.toLowerCase();return"textarea"!==d&&("select"!==d||b)&&(b?!("a"===d&&a.getAttribute("href")||"button"===d||"input"===d&&_.buttonRE.test(a.type)):"input"!==d||_.buttonRE.test(a.type))}},_.buttonRE=/^(submit|button|reset)$/,Eventi.on("DOMContentLoaded",_.init)),_.split.guard["["]="]",_.parsers.push([/\[([^ ]+)\]/,function(a,b,c){for(var d;(d=c.indexOf("-"))>0;)a[c.substring(0,d)+"Key"]=!0,c=c.substring(d+1);c&&(a.keyCode=_.codes[c]||parseInt(c,10)||c)}]),_.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,capsLock:20,escape:27,start:91,command:224,pageUp:33,pageDown:34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,"delete":46,multiply:106,plus:107,minus:109,point:110,divide:111,numLock:144,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222,space:32};for(var n=0;10>n;n++)_.codes["num"+n]=96+n;for(var f=1;13>f;f++)_.codes["f"+f]=111+f;if("abcdefghijklmnopqrstuvwxyz 0123456789".split("").forEach(function(a){_.codes[a]=a.toUpperCase().charCodeAt(0)}),Eventi.on(_,"on:handler",function(a,b){b.event.keyCode&&!b.event.type&&(b.event.type="keyup")}),_.split.guard["@"]="@",_.parsers.unshift([/@([^@]+)(@|$)/,function(a,b,c){b.location=c,_.location&&a!==b&&_.locationHandler(c,b)}]),global.history&&global.location){var intercept=function(a){_[a]=history[a],history[a]=function(){var b=_[a].apply(this,arguments);return _.dispatch(_.global,new CustomEvent("pushstate")),b}};intercept("pushState"),intercept("replaceState");var current;_.location=function(a){var b=_.getLocation();b!==current&&_.dispatch(_.global,new Eventi("location",{oldLocation:current,location:current=b,srcEvent:a}))},_.getLocation=function(){return decodeURI(location.pathname+location.search+location.hash)},_.setLocation=function(a,b,c){if(!a.oldLocation&&("string"!=typeof b&&(c=b,b=a.location),b)){var d=_.keys(b);d&&(b=d.reduce(function(a,b){return a.replace(new RegExp("\\{"+b+"\\}","g"),c[b]||location[b]||"")},b)),a.stopPropagation(),a.stopImmediatePropagation(),history.pushState(null,null,encodeURI(b))}},_.keys=function(a){var b=a.match(/\{\w+\}/g);return b&&b.map(function(a){return a.substring(1,a.length-1)})},_.locationHandler=function(a,b){var c=a;"`"===a.charAt(0)?c=c.substring(1,c.length-1):(c=c.replace(/([.*+?^=!:$(|\[\/\\])/g,"\\$1"),(b.keys=_.keys(c))?c=c.replace(/\{[\w@\-\.]+\}/g,"([^/?#]+)"):c.replace(/\{/g,"\\{")),b.uriRE=new RegExp(c),_.filter(b,_.locationFilter)},_.locationFilter=function(a,b){var c=(a.location||current).match(b.uriRE);c?(this.args.splice.apply(this.args,[1,0].concat(c)),b.keys&&(this.args[1]=b.keys.reduce(function(a,b){return a[b]=c.shift(),a},{match:c.shift()}))):this.target=void 0};var historyTypes=["popstate","hashchange","pushstate"];Eventi.on("!"+historyTypes.join(" !"),_.location).on("!location",_.setLocation).on(_,"on:handler",function(a,b){var c=b.event.type;b.location&&!c&&(c=b.event.type="location"),"location"===c?(b.global=!0,current||(current=_.getLocation()),_.execute(new Eventi("location",{location:current,srcEvent:a}),b)):historyTypes.indexOf(c)>=0&&(b.global=!0)})}_.off=function(a,b,c){var d=a[_key];if(d){for(var e=0,f=b.length;f>e;e++){var g={event:{},handler:{},fn:c,text:b[e]};if(_.parse(b[e],g.event,g.handler),delete g.event.tags,delete g.handler.filters,delete g.handler.end,a!==_&&Eventi.fire(_,"off:filter",g),g.event.type)_.clean(g.event.type,g,d,a);else for(var h in d.s)_.clean(h,g,d,a)}_.empty(d.s)&&delete a[_key]}},_.unhandle=function(a){_.off(a.target,[a.text],a.fn)},_.empty=function(a){for(var b in a)return!b;return!0},_.clean=function(a,b,c,d){var e=c.s[a];if(e){for(var f=0,g=e.length;g>f;f++)if(_.cleans(e[f],b)){var h=e.splice(f--,1)[0];d!==_&&Eventi.fire(_,"off:cleaned",h),g--}e.length||(d.removeEventListener&&d.removeEventListener(a,c,_.capture.indexOf(a)>=0),delete c.s[a])}},_.cleans=function(a,b){return _.matches(a.event,b.event)&&_.matches(a,b.handler)&&(!a.important||b.handler.important&&_.matches(b.event,a.event))&&(!b.fn||b.fn===a.fn)},_.fn("off",3),_.parsers.unshift([/^(\W*)\^/,function(a,b,c){return b.singleton=!0,a!==b&&_.filter(b,_.before),c}]),_.singleton=function(a,b){_.remember(a,b),b.bubbles&&!b.propagationStopped&&a!==_.global&&_.singleton(a.parentNode||a.parentObject||_.global,b)};var _skey=_._skey="^"+_key;_.remember=function(a,b){var c=a[_skey]||[];c.length||Object.defineProperty(a,_skey,{value:c,configurable:!0}),b[_skey]=!0,c.push(b)},_.before=function(a,b){_.unhandle(b),b.fn=_.noop,a[_skey]||_.remember(this.target,a)},Eventi.on(_,"on:handler",function(a,b){if(b.singleton)for(var c=b.target[_skey]||[],d=0,e=c.length;e>d;d++){var f=c[d];if(_.matches(f,b.event)){_.execute(f,b);break}}}),document&&Eventi.on("DOMContentLoaded",function(a){Eventi.fire(document.documentElement,"^ready",a)}),_.parsers.unshift([/\$(\!?\w+(\.\w+)*)/,function(a,b,c){b.endtest=c,b.end=_.endTest(c)}]),_.endTest=function(a){var b=parseInt(a,10);if(b)return function(){return!--b};var c="!"===a.charAt(0);return c&&(a=a.substring(1)),a&&_.resolveRE.test(a)?function(){var b=_.resolve(a,this,!0);return void 0===b&&(b=_.resolve(a,!0)),"function"==typeof b&&(b=b.apply(this,arguments)),c?!b:b}:void 0},_.fireAll=function(a,b,c,d){for(var e,f,g=0;g<b.length;g++){f=c.sequence=_.split.ter(b[g],"+",",");for(var h=d||0;h<f.length&&(!e||!e.isSequencePaused());h++)f[h]?(c.index=h,e=c.previousEvent=_.create(f[h],c),_.sequence(e,c,a),_.dispatch(a,e)):f.splice(h--,1)}return e},_.sequence=function(a,b,c,d){a.resumeSequence=function(a){d&&(d=!1,_.fireAll(c,[b.sequence.join(",")],b,a||b.index+1))},a.pauseSequence=function(a){return d!==!1?(d=!0,a&&a.then(this.resumeSequence)):void 0},a.isSequencePaused=function(){return!!d}},_.combo={convert:function(a,b,c){a.event=_.combo.event(b),a.data&&"number"==typeof a.data[0]&&(a.timeout=a.data.shift()),delete a.singleton,delete a.selector,delete a.location,delete a.filters,delete a.endtest,delete a.end,a.texts=c,a.ordered=c.ordered,a.reset=_.combo.reset.bind(a),a.handlers=c.map(function(b,c){return _.handler(a.target,b,_.combo.eventFn.bind(a,c))}),a.reset()},event:function(a){return _.combo[a]||(_.combo[a]={category:"combo",type:"_"+ ++_.combo.count})},split:function(a){var b=_.split.ter(a,"+");return b.length>1?b.ordered=!1:(b=_.split.ter(a,","),b.length>1&&(b.ordered=!0)),b},count:0,reset:function(){this.clear&&clearTimeout(this.clear),this.unfired=this.texts.slice(),this.events=[]},eventFn:function(a,b){if(this.timeout&&!this.clear&&(this.clear=setTimeout(this.reset,this.timeout)),this.events.indexOf(b)<0&&(!this.ordered||a-1===this.unfired.lastIndexOf(""))&&(this.unfired[a]="",this.events.push(b),!this.unfired.join(""))){var c=_.create("combo:"+this.event.type);c.events=this.events,c.text=this.text,_.dispatch(this.target,c),this.reset()}}},Eventi.on(_,"on:handler",function(a,b){var c=b.text,d=_.combo.split(c);d.length>1&&_.combo.convert(b,c,d)}).on(_,"off:filter",function(a,b){_.combo.split(b.text).length>1&&(b.event=_.combo.event(b.text))}).on(_,"off:cleaned",function(a,b){b.handlers&&b.handlers.forEach(_.unhandle)});var sP=Event.prototype.stopPropagation||_.noop,sIP=Event.prototype.stopImmediatePropagation||_.noop;CustomEvent.prototype.stopPropagation=function(){this.propagationStopped=!0,sP.call(this)},CustomEvent.prototype.stopImmediatePropagation=function(){this.immediatePropagationStopped=!0,sIP.call(this)};var define=global.define||_.noop;define((global.exports||global).Eventi=Eventi)}(this,this.document),function(a,b,c,d){"use strict";var e=function(){e=!1,g._list=[],g.style=b.createElement("style"),b.head.appendChild(g.style),a.addEventListener("hashchange",g.update),a.addEventListener("popstate",g.update);var c=function(a){var b=g["_"+a]=d[a];d[a]=function(){var a=b.apply(this,arguments);return g.update(),a}};c("pushState"),c("replaceState"),g.define("start"),g.update()},f=b.documentElement,g={version:"2.0.1",define:function(a,b,c){switch(e&&e(),typeof b){case"undefined":b=a;case"string":b=new RegExp(b);case"object":b=b.test.bind(b)}g._list.push({name:a,test:b}),g.style.textContent+=g.rules(a,c)},rules:function(a,b){return'[vista~="'+a+'"],\n[vista-'+a+'] [vista~="!'+a+'"] {\n  display: none !important;\n}\n[vista-'+a+'] [vista~="'+a+'"] {\n  display: block !important;\n  display: '+(b||"initial")+" !important;\n}\n"},update:function(){var a=c+"",b=!0;g._list.forEach(function(c){var d=c.test(a);g.toggle(c.name,d),d&&(b=!1)}),g.toggle("start",b)},active:function(a){return f.hasAttribute("vista-"+a)},toggle:function(a,b){b=void 0===b?!g.active(a):b,f[b?"setAttribute":"removeAttribute"]("vista-"+a,"active")},config:function(){for(var a=b.querySelectorAll("meta[itemprop=vista]"),c=0,d=a.length;d>c;c++){for(var e=a[c],f=(e.getAttribute("define")||"").split(" "),h=e.getAttribute("style"),i=0,j=f.length;j>i;i++){var k=f[i],l=k.indexOf("=");l>0?g.define(k.substring(0,l),k.substring(l+1),h):g.define(k,void 0,h)}e.setAttribute("itemprop",f.length?"vista-done":"vista-fail")}a.length&&g.update()}};g.config(),b.addEventListener("DOMContentLoaded",g.config);var h=a.define||function(){};h((a.exports||a).Vista=g)}(window,document,window.location,window.history),function(a,b){"use strict";var c=b.stringify={map:Array.prototype.map,specialPrefix:"_",markup:{"\n":"<br>","<":'<span class="markup">&lt;</span>',">":'<span class="markup">&gt;</span>',"</":'<span class="markup">&lt;/</span>',"	":"&nbsp;&nbsp;&nbsp;&nbsp;"},plain:{"\n":"\n","<":"<",">":">","</":"</","/>":"/>","	":"    "},type:{attr:"attr",string:"string",tag:"tag"},print:function(a,b,d){var e=a.tagName.toLowerCase(),f=b?c.markup:c.plain,g=c.isInline(a)?"":f["\n"],h=c.content(a,b,d+f["	"],g),i=c.attrs(a,b),j=b?c.special(a):[];b&&(e=c.mark(e,c.type.tag));var k=c.mark(f["<"]+e+(i?" "+i:"")+f[">"],j),l=c.mark(f["</"]+e+f[">"],j);return h&&g&&(h=g+h+g+d),d+k+h+l},isInline:function(a){return"inline"===(a.currentStyle||window.getComputedStyle(a,"")).display||a.tagName.match(/^(H\d|LI)$/i)},content:function(a,b,d,e){for(var f=[],g=0,h=a.childNodes.length;h>g;g++){var i=a.childNodes[g];if(i.tagName)f.push(c.print(i,b,e?d:""));else if(3===i.nodeType){var j=i.textContent.replace(/^\s+|\s+$/g," ");j.match(/[^\s]/)&&f.push(j)}}return f.join(e)},attrs:function(a,b){return c.map.call(a.attributes,function(a){var d=a.nodeName,e=a.nodeValue;return b&&0===d.indexOf(c.specialPrefix)?void 0:b?c.mark(d+"=",c.type.attr)+c.mark('"'+e+'"',c.type.string):d+'="'+e+'"'}).filter(c.notEmpty).join(" ")},special:function(a){return c.map.call(a.attributes,function(a){var b=a.nodeName;return 0===b.indexOf(c.specialPrefix)?b.substr(1)+'="'+a.nodeValue+'"':void 0}).filter(c.notEmpty)},mark:function(a,b){return b.length?("string"==typeof b&&(b=['class="'+b+'"']),"<span "+b.join(" ")+">"+a+"</span>"):a},notEmpty:function(a){return void 0!==a&&null!==a&&""!==a
}};a.extend("stringify",function(a,b){var d="";return this.each(function(e){d+=c.print(e,a||!1,b||"")}),d})}(document,document._);var Sintax={highlight:function(a){a?a.innerHTML=Sintax.syntaxHighlight(a.innerText||a.textContent):Array.prototype.forEach.call(document.getElementsByTagName("pre"),function(a){a.innerHTML=Sintax.syntaxHighlight(a.innerText||a.textContent)})},syntaxHighlight:function(a){var b={"((?:\"|')[^\"']*(?:\"|'))":'<span class="quote">$1</span>',"\\b([0-9]+)\\b":'<span class="number">$1</span>',"(\\+|\\-|\\*|\\^)":'<span class="operator">$1</span>'},c={js:["var","new","function","return"],element:["document","window"],type:["Object","Number","String","Array","Boolean"],bool:["true","false"],reserved:["if","for","in","while","switch","try","catch","else"]};for(var d in b)a=a.replace(new RegExp(d,"g"),b[d]);for(var e in c)c[e].forEach(function(b){a=a.replace(new RegExp("\\b("+b+")\\b","g"),'<span class="keyword '+e+'">$1</span>')});return a=a.replace(new RegExp("(\\/\\/.*)","g"),'<span class="comment">$1</span>'),a=a.replace(new RegExp("(/\\*[^(?:\\*/)]*\\*/)","g"),'<span class="comment">$1</span>'),a=a.replace(new RegExp("\\t","g"),'<span class="tab">&#8213;&#8213; </span>')}};Sintax.highlight(),function(window,D){"use strict";var Demo=function a(b){return this instanceof a?void(b.demo||this.init(b)):new a(b)};Demo.prototype={timing:{intent:1e3,backspace:25,typing:50,tick:250,minTicks:8},init:function(a){var b=a.demo=this;b.root=a,b.display=a.query("demo-dom"),b.input=a.query("demo-in"),b.output=a.query("demo-out"),b.intent(b.input),b._exec=function(){b.execute(b.doc)},b.input.children.length&&b.initStory(),b.display?(b.doc=Demo.docify(b.display.children),b.initDisplay()):b.doc=Demo.docify(new DOMxList),b.initControls()},initDisplay:function(){function a(){b.display.innerHTML=b.doc.body.stringify(!0)}var b=this;a(),b._observer=new MutationObserver(a).observe(b.doc.html,{childList:!0,subtree:!0,attributes:!0,characterData:!0})},initStory:function(){var a=this;a._next=function(){a.next()},a.story=a.input.children.each("textContent"),a.input.innerHTML="",this._tick=function(){a.index&&a.execute(a.doc),setTimeout(a._next,a.calcPause())},this._tick()},initControls:function(){var a=this,b=a.root.query("[stop]"),c=a.root.query("[start]");a._stop=function(){a.stopped=!0,a.root.classList.add("stopped")},a._start=function(){a.root.classList.remove("stopped"),a.index in a.story||(a.index=0),a.stopped=!1,a.next()},a.input.addEventListener("keydown",a._stop),b&&b.addEventListener("click",a._stop),c&&c.addEventListener("click",a._start)},next:function(){var a=this,b=a.story[a.index];if(b&&!a.stopped){var c=a.input;a.animate(a.input.value,b,function(a){c.value=a},a._tick),a.index++}else b||a._stop()},calcPause:function(){var a=this.story[this.index-1]||"";return!a||0===a.indexOf("//")&&a.indexOf("\n")<0?0:Math.max(a.replace(/\w|\s/g,"").length,this.timing.minTicks)*this.timing.tick},intent:function(a){var b,c=this;a.addEventListener("keydown",function(){b&&clearTimeout(b),b=setTimeout(c._exec,c.timing.intent)})},execute:function(document){var code=this.input.value,result;if(code&&0!==code.indexOf("//")){try{result=eval(code),Demo.flash(result)}catch(e){e.code=code,result=e}if(this.output){var log=this.output.innerHTML;this.output.innerHTML='<p class="line">'+Demo.describe(result)+"</p>"+log}else console.log(code),console.log(result)}},animate:function(a,b,c,d){var e=a.length,f=this,g="typing";!function h(){if(!f.stopped){if(b.indexOf(a)<0)g="backspace",a=a.substr(0,--e);else{if(!(e<b.length))return d();g="typing",a=b.substr(0,++e)}c(a),setTimeout(h,f.timing[g])}}()},index:0},Demo.docify=function(a){var b=document.createDocumentFragment();b.html=b.documentElement=document.createElement("html"),b.appendChild(b.html),b.html.appendChild(b.body=document.createElement("body")),a.each(function(a){a.remove(),b.body.append(a)}),b.html.dot();try{delete b.parentNode,b.parentNode=window}catch(c){}return b},Demo.describe=function(a){if(document._.isList(a)&&a.each)return a.each(Demo.describe).join(", ");if(a instanceof HTMLElement){var b=a.getAttribute("id"),c=a.getAttribute("class");return"&lt;"+a.tagName.toLowerCase()+(b?"#"+b:"")+(c?"."+c.split(" ").join("."):"")+"&gt;"}return a instanceof Node?a.value:"object"==typeof a?JSON.stringify(a):a&&a.value||a+""},Demo.highlight=function(a){a.setAttribute&&a.setAttribute("_highlight","true")},Demo.unhighlight=function(a){a.removeAttribute&&a.removeAttribute("_highlight")};var flashTimeout;Demo.flash=function(a){a&&a.each&&(flashTimeout&&clearTimeout(flashTimeout),flashTimeout=setTimeout(function(){a.each(Demo.highlight),setTimeout(function(){a.each(Demo.unhighlight)},1e3)},Demo.flash.time||100))},Demo.onload=function(){D.queryAll("demo-x").each(Demo)},window.Demo=Demo,Demo.onload(),D.addEventListener("DOMContentLoaded",Demo.onload)}(window,document),window.D=document;
//# sourceMappingURL=domx-docs.js.map