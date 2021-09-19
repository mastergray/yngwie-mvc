!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.YngwieMVC=t():e.YngwieMVC=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Controller:()=>c,Error:()=>n,Model:()=>d,Transform:()=>h,View:()=>l});const r=class{static getType(e){return void 0===e?"undefined":null===e?"null":e.constructor.name}};class n extends Error{constructor(e,t){super(e),this.data=`${t}`}log(){console.log(this.stack),console.log("What Failed: ",this.data)}}class i{constructor(e){if("string"!=typeof e)throw new n("Value of YngwieNode must be STRING",e);this._value=e,this._parent=void 0,this._first=void 0,this._last=void 0,this._next=void 0,this._prev=void 0}children(){let e=this._first,t=[];for(;e;)t.push(e),e=e._next;return t}append(e){if(e instanceof i)return e._parent&&e.detach(),void 0!==this._first?(e._prev=this._last,this._last._next=e,this._last=e):(this._first=e,this._last=e),e._parent=this,this;throw new n("Can only apppend YngwieNode to other YngwieNodes",e)}appends(e){if(e instanceof Array)return e.reduce(((e,t)=>this.append(t)),this);throw new n("Expected array as arguemnt",e)}detach(){return this._prev?this._prev._next=this._next:this._parent&&(this._parent._first=this._next),this._next&&(this._next._prev=this._prev),this._next=void 0,this._prev=void 0,this._parent=void 0,this}insertBefore(e){if(e instanceof i)return e._prev=this._prev,e._next=this,e._parent=this._parent,this._prev?this._prev._next=e:this._parent&&(this._parent._first=e),this._prev=e,this;throw new n("Can only insert a YngwieNode before other YngwieNodes",e)}replaceWith(e){if(e instanceof i){if(void 0!==this._parent)return this.insertBefore(e),this.detach(),e;throw new n("Can only replace YngwieNode if YngwieNode being replaced has parent",this)}throw new n("Can only replace a YngwieNode with another YngwieNode",e)}clone(){let e=`${this._value}`,t=new i(e);return this.children().reduce(((e,r)=>(t=r.clone(),e.append(t))),t)}step(e,t){return next=e(this,t),next&&next.step(e,t),t}parse(e,t){return i.parse(this,(r=>{t=e(r,t)})),t}static init(e){return new i(e)}static parse(e,t){if(!(e instanceof i))throw new n("Can only parse a YngwieNode",e);for(t(e),e=e._first;e;)i.parse(e,t),e=e._next}}class s{constructor(e,t){this._evtName=e,this._fns=t||[]}add(e){return this._fns.push(e),this}clone(){let e=`${this._evtName}`,t=this._fns.map((e=>new Function("evt","elem",e.toString())));return new s(e,t)}render(e,t){return this._fns.reduce(((e,r)=>(e.addEventListener(this._evtName,(function(n){r.call(void 0===t?e:t,n,e)})),e)),e)}static init(e,t){return void 0!==t?new s(e,!0===Array.isArray(t)?t:[t]):new s(e)}}class o extends i{constructor(e,t,r,n){super(e.toUpperCase()),this._attribs=t||{},this._text=r,this._listeners=[]}tagName(){return this._value}attribs(e){if(void 0===e)return this._attribs;if("object"==typeof e)return this._attribs=e,this;throw new n("YngwieElement attributes can only be set with OBJECT",e)}hasAttribute(e){return this._attribs.hasOwnProperty(e)}getAttribute(e){return this._attribs[e]}setAttribute(e,t){return this._attribs[e]=t,this}removeAttribute(e){return delete this._attribs[e],this}text(e){if(void 0===e)return this._text;if("string"==typeof e)return this._text=e,this;throw new n("Text of element can only be set with a STRING",e)}removeText(){return this._text=void 0,this}getElementsBy(e){return this.parse(((t,r)=>(t instanceof o&&!0===e(t)&&r.push(t),r)),[])}getElementsByTagName(e){return this.getElementsBy((t=>t.tagName()===e))}getElementsByAttribute(e,t){return this.getElementsBy((r=>!!r.hasAttribute(e)&&(void 0===t||r.getAttribute(e)===t)))}getElementsByClass(e){return this.getElementsByAttribute("class",e)}getElementByID(e){return this.getElementsByAttribute("id",e).pop()}on(e,t){let r=s.init(e,t);return this._listeners.push(r),this}clone(){let e=`${this._value}`,t=Object.keys(this._attribs).reduce(((e,t)=>(e[t]=`${this._attribs[t]}`,e)),{}),r=void 0!==this._text?`${this._text}`:void 0,n=this._listeners.map((e=>e.clone())),i=new o(e,t,r,n);return this.children().reduce(((e,t)=>(t=t.clone(),e.append(t))),i)}render(e,t){let r=void 0===t?document:t,n=Object.keys(this._attribs).reduce(((e,t)=>(e.setAttribute(t,this._attribs[t]),e)),r.createElement(this._value));if(n=this._listeners.reduce(((e,t)=>t.render(e,this)),n),"string"==typeof this._text){let e=r.createTextNode(this._text);n.appendChild(e)}let i=this.children().reduce(((e,t)=>(t=t.render(),e.appendChild(t),e)),n);return void 0!==e&&("string"==typeof e?r.querySelector(e).appendChild(i):e.appendChild(i)),i}static init(e,t,r,n){return new o(e,t,r,n)}static renderTo(e,t,r){let i=void 0===r?document:r;if(t instanceof Array){let r="string"==typeof e?i.querySelector(e):e;return t.reduce(((e,t)=>{if(t instanceof o)return t.render(e),e;throw new n("Only YngwieElement can be rendered to target",t)}),r)}throw new n("Expected array as argument",t)}static inject(e,t,r){if(t instanceof o){let n=void 0===r?document:r,i="string"==typeof e?n.querySelector(e):e,s=t.render();return i.replaceWith(s),i}throw new n("Only YngwieElement can be injected into target",t)}}class a extends i{constructor(e){super(e)}text(){return this._value}append(e){if("string"==typeof e)return this._value+=e,this;if(e instanceof a)return this._value+=e.text(),this;throw new n("Only STRINGs and other YngwieTextNodes can append a YngwieTextNode",e)}render(e,t){let r=void 0===t?document:t,n=r.createTextNode(this._value);return void 0!==e&&("string"==typeof e&&r.querySelector(e),e.appendChild(n)),n}clone(){return new a(`${this._value}`)}static init(e){return new a(e)}}class h{constructor(e){this._value=e,this._type=h.getType(e)}toNODE(){switch(this._type){case"NODE":return this._value;case"STRING":return(new DOMParser).parseFromString(this._value,"text/html").body.firstChild;case"YNGWIE":return this._value.render();default:throw new h("Cannot transform to NODE from unsuppoted type",this._value)}}toSTRING(){switch(this._type){case"NODE":return 1===this._value.nodeType?this._value.outerHTML:this._value.nodeValue;case"STRING":return this._value;case"YNGWIE":console.log(this._value);let e=this._value.render();return console.log(e),1===e.nodeType?e.outerHTML:e.nodeValue;default:throw new h("Cannot transform to STRING from unsuppoted type",this._value)}}toYNGWIE(){switch(this._type){case"NODE":case"STRING":return h.init(this._value);case"YNGWIE":return this._value;default:throw new h("Cannot transform to YngwieElement from unsuppoted type",this._value)}}static init(e){return u("STRING"===h.getType(e)?h.toNODE(e):e)}static toNODE(e){return new h(e).toNODE()}static toSTRING(e){return new h(e).toSTRING()}static toYNGWIE(e){return new h(e).toYNGWIE()}static getType(e){return e instanceof Node?"NODE":"string"==typeof e?"STRING":e instanceof i?"YNGWIE":void 0}}function u(e,t){if(1===e.nodeType){let r=function(e){return Array.from(e.attributes).reduce(((e,t)=>(e[t.name]=t.value,e)),{})}(e),n=new o(e.tagName,r);t=void 0===t?n:t.append(n)}if(3===e.nodeType){let r=new a(e.nodeValue);t=void 0===t?r:t.append(r)}for(e=e.firstChild;e;){let r=u(e);void 0!==r&&t.append(r),e=e.nextSibling}return t}class d{constructor(e){this._state=e}state(e){return void 0===e?this._state:d.resolveScope(e,this._state)}update(e,t){let i=r.getType(e);switch(i){case"Function":this._state=e(this._state);break;case"String":this._state=t(this._state,this.state(e));break;default:throw new n("Argument passed to yngwieModel.update is of an unsupported type",i)}return this}each(e,t){let i=r.getType(e);switch(i){case"Function":this._state.forEach((t=>{e(d.init(t))}));break;case"String":let r=this.state(e);if(!(r instanceof Array))throw new n("Scope is not an array",i);r.forEach((e=>{t(d.init(e))}));break;default:throw new n("Argument passed to YngwieModel.forEach is of an unsupported type",i)}}prop(e,t){if(void 0===t){if(void 0!==this._state[e])return this._state[e];throw new n("No property found for given ID",e)}return this._state[e]=t,this}static init(e,t){return new d(e,t)}static resolveScope(e,t){if(void 0!==e){let r=e.split("."),n=t;for(let e=0;e<r.length&&(n=n[r[e]],void 0!==n);e++);return n}return t}static setAsModel(e){return e instanceof d?e:d.init(e)}}class l{constructor(e){this._elem=()=>e,this._fns=[],this._node=void 0,this._children=[]}elem(e){switch(r.getType(e)){case"undefined":return this._fns.length>0?this._fns.reduce(((e,t)=>t(e)),this._elem()):this._elem();case"YngwieElement":return this._elem=()=>e,this;default:let t=arguments;return this._elem=()=>o.init.apply(null,t),this}}modify(e){return this._fns.push(e),this}on(e,t){return this.modify((r=>r.on(e,t)))}text(e){return this.modify((t=>t.text(e)))}append(e){if(l.is(e))return this._children.push(e),this;throw new n("Only a yngwieView can be appended to another yngwieView",e)}appends(e){if(e instanceof Array)return e.reduce(((e,t)=>e.append(t)),this);throw new n("Expected ARRAY to append yngwieViews to this yngwieView",e)}render(e,t){return this._node=l.render(this,e,t),this._node}renderAgain(){if(this._node){let e=l.render(this);return this._node.replaceWith(e),this._node=e,this._node}throw new n("Cannont re-render view because it hasn't been rendered yet.")}inject(e,t){let r=this.render(),n=l.setAsNode(e,t);return n.innerHTML="",n.append(r),n}static init(e){switch(r.getType(e)){case"YngwieElement":case"undefined":return new l(e);default:let t=o.init.apply(null,arguments);return new l(t)}}static is(e){return e instanceof l}static setAsNode(e,t){let i=r.getType(e);switch(i){case"String":return void 0===t?document.querySelector(e):t.querySelector(e);case"Element":return e;case"undefined":return new DocumentFragment;default:throw new n("Argument cannot be a NODE",i)}}static render(e,t,r){let n=e.elem(),i=l.setAsNode(t,r),s=e._children.reduce(((e,t)=>{let r=t.render();return e.appendChild(r),e}),void 0===n?i:n.render(i));return s instanceof DocumentFragment?s.querySelector("body").firstElementChild:s}}class c{constructor(e){this._registry=e||{}}isRegistered(e){return void 0!==this._registry[e]}register(e,t){return!1===this.isRegistered(e)&&(this._registry[e]=[]),this._registry[e].push(t),this}unregister(e){if(!0===this.isRegistered(e))return delete this._registry[e],this;throw new n("No functions bound to given ID",e)}signal(){let e=arguments[0],t=Array.from(arguments);if(!0===this.isRegistered(e))return this._registry[e].forEach((e=>{e.apply(this,t.slice(1))})),this;throw new n("Cannot dispatch value to an ID that doesn't exist",e)}static init(e){return new c(e)}}return t})()}));