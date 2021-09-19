(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["YngwieMVC"] = factory();
	else
		root["YngwieMVC"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/yngwie/src/Element/main.js":
/*!*************************************************!*\
  !*** ./node_modules/yngwie/src/Element/main.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieElement)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Node/main.js */ "./node_modules/yngwie/src/Node/main.js");
/* harmony import */ var _Listener_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Listener/main.js */ "./node_modules/yngwie/src/Listener/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Error/main.js */ "./node_modules/yngwie/src/Error/main.js");




class YngwieElement extends _Node_main_js__WEBPACK_IMPORTED_MODULE_0__.default {

  // CONSTRUCTOR :: STRING. OBJECT, STRING, [yngwieListener] -> yngwieElement
  constructor(tagName, attribs, text, listeners) {
    super(tagName.toUpperCase());     // Stores tagName in ALL CAPS
    this._attribs = attribs || {};     // Element Attributes
    this._text = text;                 // Element text that's appended as first child of this element
    this._listeners = [];            // Listeners bound to this element
  }

  // :: VOID -> STRING
  // Returns tagName of this element:
  tagName() {
    return this._value;
  }

  // :: OBJECT|VOID -> this|OBJECT
  // Sets "attribs" OBJECT with given OBJECT:
  // NOTE: If no argument is given, set attributes are returned:
  attribs(attribs) {
    if (attribs === undefined) {
      return this._attribs;
    } else {
      if (typeof(attribs) === "object") {
        this._attribs = attribs;
        return this;
      }
      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("YngwieElement attributes can only be set with OBJECT", attribs);
    }
  }

  // :: STRING -> BOOLEAN
  // Returns BOOLEAN for if attribute with given name exists in "attribs" OBJECT:
  hasAttribute(name) {
    return this._attribs.hasOwnProperty(name);
  }

  // :: STRING -> *|UNDEFINED
  // Returns value of attribute by name stored in "attribs" OBJECT, otherwise returns UNDEFINED
  getAttribute(name) {
    return this._attribs[name];
  }

  // :: STRING, * -> this
  // Binds  value to "attribs" OBJECT with given name:
  setAttribute(name, value) {
    this._attribs[name] = value;
    return this;
  }

  // :: STRING -> this
  // Remove attribute with given name from "attribs" OBJECT:
  removeAttribute(name) {
    delete this._attribs[name];
    return this;
  }

  // :: STRING|VOID -> this|UNDEFINED
  // Appends text node as first child of element at render with given string as it's value:
  // NOTE: If no argument is given, set text is returned:
  text(str) {
    if (str === undefined) {
      return this._text;
    } else {
      if (typeof(str) === "string") {
        this._text = str;
        return this;
      }
      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("Text of element can only be set with a STRING", str);
    }
  }

  // :: VOID -> this
  // Sets text as UNDEFINED for this element:
  removeText() {
    this._text = undefined;
    return this;
  }

  // :: (yngwieElement -> BOOLEAN) -> [yngwieElement]
  // Returns all the elements that, when the given function is applied to this elements and it's desendants, that function returns TRUE:
  getElementsBy(fn) {
    return this.parse((node, result) => {
      if (node instanceof YngwieElement) {
        if (fn(node) === true) {
          result.push(node);
        }
      }
      return result;
    }, []);
  }

  // :: STRING -> [yngwieElement]
  // Returns an array of YngwieElemnts that have the given tagName:
  // NOTE: Returns an empty array if no elements are found with the given tag name:
  getElementsByTagName(tagName) {
    return this.getElementsBy(elem => elem.tagName() === tagName);
  }

  // STRING, STRING|VOID -> [yngwieElement]
  // Returns an array of yngwieElements that have the given attribute with the given value:
  // NOTE: If no value is given, then any element that has the given attribute name is returned
  getElementsByAttribute(name, value) {
    return this.getElementsBy(elem => {
      if (elem.hasAttribute(name)) {
        if (value === undefined) {
          return true;
        } else {
          return elem.getAttribute(name) === value;
        }
      }
      return false;
    });
  }

  // STRING -> [yngwieElement]
  // Returns all elements that have the given class name
  // NOTE: Returns an empty array if no elements are found with the given class name:
  getElementsByClass(className) {
    return this.getElementsByAttribute("class", className);
  }

  // Returns YngwieElement that has the given ID:
  // NOTE: Returns UNDEFINED if no elements are found with the given ID
  getElementByID(id) {
    return this.getElementsByAttribute("id", id).pop();
  }

  // :: STRING, [(EVENT, ELEMENT) -> VOID]|(EVENT, ELEMENT) -> VOID ->  this
  // Binds listener by event name to node at render:
  // NOTE: Function bound to listener is called in the context of this element
  on(evtName, fns) {
    let listener = _Listener_main_js__WEBPACK_IMPORTED_MODULE_1__.default.init(evtName, fns);
    this._listeners.push(listener);
    return this;
  }

  // VOID -> yngwieElement
  // Returns clone of this yngwieElement:
  clone() {

    // Copy tagname:
    let tagName = `${this._value}`;

    // Copy attributes:
    let attribs = Object.keys(this._attribs).reduce((result, id) => {
      result[id] = `${this._attribs[id]}`;
      return result;
    }, {});

    // Copy set:
    let text = this._text !== undefined
      ? `${this._text}`
      : undefined;

    // Copy listeners:
    let listeners = this._listeners.map((listener) => {
      return listener.clone();
    });

    // Copy children and return element:
    let elem = new YngwieElement(tagName, attribs, text, listeners);
    return this.children().reduce((elem, child) => {
      child = child.clone();
      return elem.append(child);
    }, elem);

  }

  // :: STRING|ELEMENT, OBJECT -> ELEMENT
  // Transforms this element and it's desendants into a DOM ELEMENT, appending result to given target
  // and rendering that ELEMENT in the context of the given OBJECT. If no target to append is given,
  // the rendered ELEMENT is returned. If no context is given, then DOCUMENT is used by default.
  render(target, ctx) {

    // Check if default context of DOCUMENT should be used:
    let context = ctx === undefined ? document : ctx;

    // Intialize DOMElement:
    let elem = Object.keys(this._attribs).reduce((elem, id) => {
      elem.setAttribute(id, this._attribs[id]);
      return elem;
    }, context.createElement(this._value));

    // Bind Listeners:
    elem = this._listeners.reduce((elem, listener) => {
      return listener.render(elem, this);
    }, elem);

    // If set, create and append text node:
    if (typeof(this._text) === "string") {
      let elemText = context.createTextNode(this._text);
      elem.appendChild(elemText);
    }

    // Render and append all children and return result:
    let result = this.children().reduce((result, child) => {
      child = child.render();
      result.appendChild(child);
      return result;
    }, elem);

    // If target is given, appends result of render to that target:
    if (target !== undefined) {
      // If target is string, find node using query selector:
      if (typeof(target) === "string") {
        context.querySelector(target).appendChild(result);
      } else {
        // Otherise assume that target is DOMElement:
        target.appendChild(result);
      }
    }

    return result;

  }

  /**
   *
   *  Static Methods
   *
   */

  // :: STRING. OBJECT, STRING, [yngwieListener] -> yngwieElement
  // Static factory method:
  static init(tagName, attribs, text, listeners) {
    return new YngwieElement(tagName, attribs, text, listeners)
  }

  // :: STRING|ELEMENT, [yngwieElement], OBJECT -> ELEMENT
  // Renders an array of yngwieElements in the given context and appends result to given target:
  // NOTE: ELEMENT of target is returned
  static renderTo(target, elems, ctx) {
    let context = ctx === undefined ? document : ctx;
    if (elems instanceof Array) {
      let node = typeof(target) === "string"
        ? context.querySelector(target)
        : target;
      return elems.reduce((result, elem) => {
        if (elem instanceof YngwieElement) {
          elem.render(result);
          return result;
        }
        throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("Only YngwieElement can be rendered to target", elem);
      }, node);
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("Expected array as argument", elems);
  }

  // :: STRING|ELEMENT, yngwieElement, OBJECT -> ELEMENT
  // Replaces the given target with the render of the given instance  of YngwieElement in the given context:
  static inject(target, elem, ctx) {
    if (elem instanceof YngwieElement) {
      let context = ctx === undefined ? document : ctx;
      let node = typeof(target) === "string"
        ? context.querySelector(target)
        : target;
      let result = elem.render();
      node.replaceWith(result);
      return node;
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("Only YngwieElement can be injected into target", elem);
  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/Error/main.js":
/*!***********************************************!*\
  !*** ./node_modules/yngwie/src/Error/main.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieError)
/* harmony export */ });
class YngwieError extends Error {

  // CONSTRUCTOR :: STRING, * -> ERROR
  // NOTE :: "data" argument is always cast as STRING:
  constructor(msg, data) {
    super(msg);
    this.data = `${data}`;
  }

  // :: VOID ->  VOID
  // Consoles out stack trace of error, along with the data that caused the exception to be thrown:
  log() {
    console.log(this.stack);
    console.log("What Failed: ", this.data);
  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/Listener/main.js":
/*!**************************************************!*\
  !*** ./node_modules/yngwie/src/Listener/main.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieListener)
/* harmony export */ });
class YngwieListener {

  // CONSTRUCTOR :: STRING, [(EVENT, ELEMENT -> VOID)] -> yngwieListener
  constructor(evtName, fns) {
    this._evtName = evtName;
    this._fns = fns || [];
  }

  // :: (EVENT, ELEMENT -> VOID) -> this;
  // Adds function to listener:
  add(fn) {
    this._fns.push(fn);
    return this;
  }

  // :: VOID -> yngwieListener
  // Creates clone of this yngwieListener:
  clone() {
    let evtName = `${this._evtName}`;
    let fns = this._fns.map(fn=>{
      return new Function("evt", "elem", fn.toString());
    });
    return new YngwieListener(evtName, fns);
  }

  // :: ELEMENT, OBJECT -> ELEMENT
  // Creates event listener and binds it to given DOM ELEMENT, and calls function of listener to given context
  // NOTE: If no context is given, function is called in the context of the ELEMENT the listener is bound to
  render(elem, ctx) {
    return this._fns.reduce((elem, fn) => {
      elem.addEventListener(this._evtName, function (evt) {
        fn.call(ctx === undefined ? elem : ctx, evt, elem);
      });
      return elem;
    }, elem);
  }

  // :: STRING, [(EVENT, ELEMENT -> VOID)]|(EVENT, ELEMENT -> VOID) -> yngwieListener
  // Static factory method:
  static init(evtName, fns) {
    return fns !== undefined
      ? new YngwieListener(evtName, Array.isArray(fns) === true ? fns : [fns])
      : new YngwieListener(evtName);
  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/Node/main.js":
/*!**********************************************!*\
  !*** ./node_modules/yngwie/src/Node/main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieNode)
/* harmony export */ });
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Error/main.js */ "./node_modules/yngwie/src/Error/main.js");


class YngwieNode {

  // CONSTRUCTOR :: STRING -> yngwieNode
  constructor(value) {
    if (typeof(value) === "string") {
      this._value = value;       // Arbitrary STRING value that can be stored by this node
      this._parent = undefined;  // Parent of this node
      this._first = undefined;   // First child of this node
      this._last = undefined;    // Last child of this node;
      this._next = undefined;    // Next sibling of this node
      this._prev = undefined;    // Previous sibling of the node
    } else {
      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Value of YngwieNode must be STRING", value);
    }
  }

  // :: VOID -> [yngwieNode]
  // Returns all the children of this node:
  children() {

    let child = this._first;   // First child
    let children = [];         // Array of children to return

    // Looks for next sibling until there are no more siblings:
    while (child) {
      children.push(child);
      child = child._next;
    }

    // Returns an arrary yngiwNode elements:
    return children;

  }

  // :: yngwieNode -> this
  // Adds given node to children of this node:
  // NOTE: If given node already has a parent, that node is detached and appened to this node:
  append(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      // If given node has parent, detach that node from it's parent:
      if (node._parent) {
        node.detach();
      }

      // Set new node as last sibling:
      if (this._first !== undefined) {
        node._prev = this._last;    // Sets new last child's previous node to old last node
        this._last._next = node;    // Set old last child next element to new last child
        this._last = node;         // Set new last child to given node
      } else {
        // If ther are no children, then this node is an only child:
        this._first = node;
        this._last = node;
      }

      // Set parent
      node._parent = this;

      // Return instance:cosnole
      return this;

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only apppend YngwieNode to other YngwieNodes", node);

  }

  // :: [yngwieNode] -> this
  // Appends an array of YngwieNodes to this instance:
  appends(nodes) {
    if (nodes instanceof Array) {
      return nodes.reduce((result, node) => {
        return this.append(node);
      }, this);
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Expected array as arguemnt", nodes);
  }

  // :: VOID -> this
  // Detaches this node from it's parent:
  detach() {

    // Make previous node's next node this node's next node:
    if (this._prev) {
      this._prev._next = this._next;
    } else {
      // if no previous node, then this node must be first child of parent (if node has parent):
      if (this._parent) {
        this._parent._first = this._next;
      }
    }

    // Make next node's previous node this node's previous node:
    if (this._next) {
      this._next._prev = this._prev;
    }

    // Unset all relations:
    this._next = undefined;
    this._prev = undefined;
    this._parent = undefined;

    // Return instance:
    return this;

  }

  // :: yngwieNode -> this;
  // Inserts given yngwieNode before this instance of yngwieNode:
  // NOTE: a.insertsBefore(b) means "b" is inserted before "a"
  insertBefore(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      // Set relations
      node._prev = this._prev;
      node._next = this;
      node._parent = this._parent;

      // Set previous sibling relations:
      if (this._prev) {
        this._prev._next = node;
      } else {
        if (this._parent) {
          this._parent._first = node;
        }
      }

      // Set previous sibling:
      this._prev = node;

      return this;

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only insert a YngwieNode before other YngwieNodes", node);

  }

  // :: yngwieNode -> yngwieNode
  // Replace this node with given node:
  replaceWith(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      // Checks if this node has a parent
      if (this._parent !== undefined) {

        // Replacement is accomplished by first inserting given node, then detatching this node:
        this.insertBefore(node);
        this.detach();

        // Return given node:
        return node;

      }

      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only replace YngwieNode if YngwieNode being replaced has parent", this);

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only replace a YngwieNode with another YngwieNode", node);

  }

  // :: VOID -> yngwieNode
  // Returns deep clone of this node:
  clone() {
    let value = `${this._value}`;
    let clone = new YngwieNode(value)
    return this.children().reduce((result, child) => {
      clone = child.clone();
      return result.append(clone);
    }, clone);
  }

  // NODE, * -> NODE -> *
  // Applies function to a result and this node, where that function returns the next node to that function is applied to
  // NOTE: Result is returned when there is no next node to apply function to
  step(fn, result) {
    next = fn(this, result);
    if (next) {
      next.step(fn, result);
    }
    return result;
  }

  // :: NODE, * -> *, * -> *
  // Applies function to this node and it's descendants, returning the result of that function:
  parse(fn, result) {
    YngwieNode.parse(this, (node) => {
      result = fn(node, result);
    });
    return result;
  }

  /**
   *
   * Static Function
   *
   */

  // STRING -> yngwieNode
  // Static factory method
  static init(value) {
    return new YngwieNode(value);
  }

  // NODE, NODE -> VOID -> VOID
  // Applies a function to a node and all it's desendants
  // NODE: This is a re-implementation of Crockford's DOM walk algorithm from "Javascript: The Good Parts"
  static parse(node, fn) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      fn(node);
      node = node._first;
      while (node) {
        YngwieNode.parse(node, fn);
        node = node._next;
      }

    } else {

      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only parse a YngwieNode", node);

    }

  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/TextNode/main.js":
/*!**************************************************!*\
  !*** ./node_modules/yngwie/src/TextNode/main.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieTextNode)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Node/main.js */ "./node_modules/yngwie/src/Node/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Error/main.js */ "./node_modules/yngwie/src/Error/main.js");



class YngwieTextNode extends _Node_main_js__WEBPACK_IMPORTED_MODULE_0__.default {

  // CONSTRUCTOR :: STRING -> yngwieTextNode
  constructor(text) {
    super(text);
  }

  // :: VOID -> STRING
  // Returns text of this text node:
  text() {
    return this._value;
  }

  // :: STRING|yngwieTextNode -> this
  // Appends STRING instead of NODE since a TextNode has no children
  append(val) {

    if (typeof(val) === "string") {
        this._value += val;
        return this;
    }

    if (val instanceof YngwieTextNode) {
        this._value += val.text();
        return this;
    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_1__.default("Only STRINGs and other YngwieTextNodes can append a YngwieTextNode", val);
  }

  //:: STRING|ELEMENT|VOID, OBJECT -> TEXT
  // Creates DOM Text node set with the STRING stored in _value:
  render(target, ctx) {
    let context = ctx === undefined ? document : ctx;
    let textNode = context.createTextNode(this._value);
    if (target !== undefined) {
      let node = typeof(target) === "string"
        ? context.querySelector(target)
        : target;
      target.appendChild(textNode);
    }
    return textNode;
  }

  // :: VOID -> yngwieTextNode
  // Creates a clone of this yngwieTextNode:
  clone() {
    return new YngwieTextNode(`${this._value}`);
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: STRING -> yngwieTextNode
  // Static factory method:
  static init(text) {
    return new YngwieTextNode(text);
  }

}


/***/ }),

/***/ "./node_modules/yngwie/src/Transform/main.js":
/*!***************************************************!*\
  !*** ./node_modules/yngwie/src/Transform/main.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieTransform)
/* harmony export */ });
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Element/main.js */ "./node_modules/yngwie/src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TextNode/main.js */ "./node_modules/yngwie/src/TextNode/main.js");
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Node/main.js */ "./node_modules/yngwie/src/Node/main.js");
/* harmony import */ var _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Transform/main.js */ "./node_modules/yngwie/src/Transform/main.js");





class YngwieTransform {

  // CONSTRUCTOR :: * -> yngwieTransform
  constructor(val) {
    this._value = val;                         // Value to transform
    this._type = YngwieTransform.getType(val); // Stores value's type for determining how it can be transformed
  }

  // :: VOID -> NODE
  // Transforms stored value into a DOMElement NODE:
  toNODE() {
    switch (this._type) {
      case "NODE":
        return this._value;
      case "STRING":
        let parser = new DOMParser();
        let doc = parser.parseFromString(this._value, "text/html");
        return doc.body.firstChild;
      case "YNGWIE":
        return this._value.render();
      default:
        throw new _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__.default("Cannot transform to NODE from unsuppoted type", this._value);
    }
  }

  // :: VOID -> STRING
  // Transforms stored value into a STRING:
  toSTRING() {
    switch (this._type) {
      case "NODE":
        return this._value.nodeType === 1 ? this._value.outerHTML : this._value.nodeValue;
      case "STRING":
        return this._value;
      case "YNGWIE":
        console.log(this._value);
        let node = this._value.render();
        console.log(node)
        return node.nodeType === 1 ? node.outerHTML : node.nodeValue;
      default:
        throw new _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__.default("Cannot transform to STRING from unsuppoted type", this._value);
    }
  }

  // :: VOID -> STRING
  // Transforms stored value into a yngwieElement:
  toYNGWIE() {
    switch (this._type) {
      case "NODE":
      case "STRING":
        return YngwieTransform.init(this._value);
      case "YNGWIE":
        return this._value;
      default:
        throw new _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__.default("Cannot transform to YngwieElement from unsuppoted type", this._value);
    }
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: STRING|NODE -> yngwieElement
  // Transforms string of HTML or DOMElement NODE into a yngwieElement
  // NOTE: This DOES NOT transform event handlers into YngwieListener objects:
  static init(html) {
    return walkNode(YngwieTransform.getType(html) === "STRING" ? YngwieTransform.toNODE(html) : html);
  }

  // :: * -> NODE
  // Static factory method that transforms given value into a NODE:
  static toNODE(val) {
    let transform = new YngwieTransform(val);
    return transform.toNODE();
  }

  // :: * -> STRING
  // Static factory method that transforms given value into a STRING:
  static toSTRING(val) {
    let transform = new YngwieTransform(val);
    return transform.toSTRING();
  }

  // :: * -> yngwieElement
  // Static factory method that transforms given value into a yngwieElement:
  static toYNGWIE(val) {
    let transform = new YngwieTransform(val);
    return transform.toYNGWIE();
  }

  // * -> "NODE"|"STRING"|"YNGWIE"|UNDEFINED
  // Returns name of type for given value:
  static getType(val) {

    if (val instanceof Node) {
      return "NODE";
    }

    if (typeof(val) === "string") {
      return "STRING";
    }

    if (val instanceof _Node_main_js__WEBPACK_IMPORTED_MODULE_2__.default) {
      return "YNGWIE";
    }

    return undefined;

  }

}

/**
 *
 *  Local Functions
 *
 */

// :: NODE, NODE, node.nodeType -> VOID
// Creates an instance of YngwieElement from the given node and all of it's desendents:
// NOTE: Inspired by Crockford's DOM walking algorithm from "Javascript:The Good Parts"
function walkNode(node, result) {

  if (node.nodeType === 1) {
    let attribs = getAttributes(node);
    let elem = new _Element_main_js__WEBPACK_IMPORTED_MODULE_0__.default(node.tagName, attribs);
    result = result === undefined
      ? elem
      : result.append(elem);
  }

  if (node.nodeType === 3) {
    let textNode = new _TextNode_main_js__WEBPACK_IMPORTED_MODULE_1__.default(node.nodeValue);
    result = result === undefined
      ? textNode
      : result.append(textNode);
  }

  node = node.firstChild;

  while (node) {
    let child = walkNode(node);
    if (child !== undefined) {
        result.append(child);
    }
    node = node.nextSibling;
  }

  return result;

}

// :: DOMElement -> OBJECT
// Returns OBJECT of attributes from the given DOM Element:
function getAttributes(elem) {
  return Array.from(elem.attributes).reduce((result, attrib) => {
    result[attrib.name] = attrib.value;
    return result;
  }, {});
}


/***/ }),

/***/ "./node_modules/yngwie/src/main.js":
/*!*****************************************!*\
  !*** ./node_modules/yngwie/src/main.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Node": () => (/* reexport safe */ _Node_main_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "Element": () => (/* reexport safe */ _Element_main_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "TextNode": () => (/* reexport safe */ _TextNode_main_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "Listener": () => (/* reexport safe */ _Listener_main_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "Transform": () => (/* reexport safe */ _Transform_main_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "Error": () => (/* reexport safe */ _Error_main_js__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node/main.js */ "./node_modules/yngwie/src/Node/main.js");
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element/main.js */ "./node_modules/yngwie/src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextNode/main.js */ "./node_modules/yngwie/src/TextNode/main.js");
/* harmony import */ var _Listener_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Listener/main.js */ "./node_modules/yngwie/src/Listener/main.js");
/* harmony import */ var _Transform_main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transform/main.js */ "./node_modules/yngwie/src/Transform/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Error/main.js */ "./node_modules/yngwie/src/Error/main.js");










/***/ }),

/***/ "./src/Controller/main.js":
/*!********************************!*\
  !*** ./src/Controller/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieController)
/* harmony export */ });
/* harmony import */ var _Model_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/main.js */ "./src/Model/main.js");
/* harmony import */ var _View_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../View/main.js */ "./src/View/main.js");
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");




class YngwieController {

  // CONSTRUCTOR :: {STRING:(... -> *)} -> yngwieController
  constructor(registry) {
    this._registry = registry || {};
  }

  // :: STRING -> BOOLEAN
  // Returns boolean for if any functions are bound to given ID:
  isRegistered(id) {
    return this._registry[id] !== undefined;
  }

  // :: STRING, (... -> VOID) -> this;
  // Binds function to given STRING:
  // NOTE: Functions bound to signal ID are stored in ARRAY, so multiple functions can be bound to the same ID
  register(id, fn) {
    if (this.isRegistered(id) === false) {
      this._registry[id] = [];
    }
    this._registry[id].push(fn);
    return this;
  }

  // :: STRING -> this;
  // Removes function bound to given STRING:
  // NOTE: If ID does not exist, an yngwieError is thrown:
  // NOTE: Unregistering signal removes ALL functions bound to that signal ID:
  unregister(id) {
    if (this.isRegistered(id) === true) {
      delete this._registry[id];
      return this;
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_2__.Error("No functions bound to given ID", id);
  }

  // STRING, ... -> this;
  // Applies values to function bound to signal ID
  // NOTE: If ID does not exist, a yngwieError is thrown:
  signal() {
    let id = arguments[0];
    let args = Array.from(arguments);
    if (this.isRegistered(id) === true) {
      this._registry[id].forEach(fn=>{
        fn.apply(this, args.slice(1));
      });
      return this;
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_2__.Error("Cannot dispatch value to an ID that doesn't exist", id);
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: {STRING:[*->VOID]} -> yngwieController
  // Static factory method:
  static init(registry) {
    return new YngwieController(registry);
  }

}


/***/ }),

/***/ "./src/Model/main.js":
/*!***************************!*\
  !*** ./src/Model/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieModel)
/* harmony export */ });
/* harmony import */ var _Util_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/main.js */ "./src/Util/main.js");
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");



class YngwieModel {

  // CONSTRUCTOR :: OBJECT -> yngwieModel
  constructor(data) {
    this._state = data;
  }

  // :: VOID|STRING -> OBJECT
  // Returns data of model with applied scope, otherwise returns all data stored in model:
  state(scope) {
    return scope === undefined ? this._state : YngwieModel.resolveScope(scope, this._state);
  }

  // :: STRING|OBJECT -> *, OBJECT, OBJECT -> *|VOID -> this;
  // Applies function to state and optional scope, replacing state with the result of that function:
  update(a, b) {
    let typeArg = _Util_main_js__WEBPACK_IMPORTED_MODULE_0__.default.getType(a);
    switch (typeArg) {
      case "Function":
        this._state = a(this._state);
      break;
      case "String":
        this._state[a] = b(this._state, this.state(a));
      break;
      default:
        throw new yngwie__WEBPACK_IMPORTED_MODULE_1__.Error("Argument passed to yngwieModel.update is of an unsupported type", typeArg);
    }
    return this;
  }

  // :: STRING|(yngwieModel -> VOID), (yngwieModel -> VOID)|VOID -> VOID
  // Applies function to every element of scope, if only function is given then it's applied to every element of state:
  each(a, b) {
    let typeArg = _Util_main_js__WEBPACK_IMPORTED_MODULE_0__.default.getType(a);
    switch (typeArg) {
      case "Function":
        this._state.forEach(elem=>{
          a(YngwieModel.init(elem));
        });
      break;
      case "String":
        let state = this.state(a);
        if (state instanceof Array) {
          state.forEach(elem=>{
            b(YngwieModel.init(elem));
          });
        } else {
          throw new yngwie__WEBPACK_IMPORTED_MODULE_1__.Error("Scope is not an array", typeArg);
        }
      break;
      default:
        throw new yngwie__WEBPACK_IMPORTED_MODULE_1__.Error("Argument passed to YngwieModel.forEach is of an unsupported type", typeArg);
    }
  }

  // :: STRING, *|VOID -> this|*
  // Sets or gets property from model:
  prop(id, val) {
    if (val === undefined) {
      if (this._state[id] !== undefined) {
        return this._state[id];
      }
      throw new yngwie__WEBPACK_IMPORTED_MODULE_1__.Error("No property found for given ID", id);
    } else {
      this._state[id] = val;
    }
    return this;
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: OBJECT -> yngwieModel
  // Static factory method:
  static init(data) {
    return new YngwieModel(data);
  }

  // :: STRING, OBJECT -> OBJECT|UNDEFINED
  // Returns object for the given scope - if scope can't re resolved then UNDEFINED is returned:
  static resolveScope(scope, obj) {
    if (scope !== undefined) {
      let scopes = scope.split(".");
      let result = obj;
      for (let i = 0; i < scopes.length; i++) {
        let currentScope = scopes[i];
        result = result[currentScope];
        if (result === undefined) {
          break;
        }
      }
      return result;
    }
    return obj;
  }

  // :: OBJECT|yngwieModel -> yngwieModel
  // Returns value as yngwieModel:
  static setAsModel(model) {
    return model instanceof YngwieModel
      ? model
      : YngwieModel.init(model);
  }

}


/***/ }),

/***/ "./src/Util/main.js":
/*!**************************!*\
  !*** ./src/Util/main.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Singleton of utility methods:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {

  // :: * -> STRING
  // Returns type of given value as STRING:
  static getType(val) {
    if (val === undefined) return "undefined";
    if (val === null) return "null";
    return val.constructor.name;
  }
  
});


/***/ }),

/***/ "./src/View/main.js":
/*!**************************!*\
  !*** ./src/View/main.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieView)
/* harmony export */ });
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");
/* harmony import */ var _Util_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Util/main.js */ "./src/Util/main.js");



class YngwieView {

  // :: CONSTRUCTOR :: yngwieElement|VOID -> yngwieView
  constructor(yngwieElement) {
    this._elem = () => yngwieElement;
    this._fns = [];
    this._node = undefined;
    this._children = [];
  }

  // :: VOID|yngwieElement|STRING, STRING, OBJECT, STRING, [yngwieListener] -> yngwieElement|this|this
  // Setter/getter method for yngwieElement stored by view:
  // NOTE: Getting the yngiweElement stored by view will apply every stored modifer function to that yngwieElement
  elem(arg) {
    switch (_Util_main_js__WEBPACK_IMPORTED_MODULE_1__.default.getType(arg)) {
      // Applies view to every modifier function, if there are no modifer functions elem is returned:
      case "undefined":
        return this._fns.length > 0
          ? this._fns.reduce((view, fn) => {
            return fn(view);
          }, this._elem())
          : this._elem();
      // Sets _elem to given yngwieElement:
      case "YngwieElement":
        this._elem = () => arg;
        return this;
      // Tries to initalize yngwieElement using given arguments:
      default:
        let args = arguments;
        this._elem = () => yngwie__WEBPACK_IMPORTED_MODULE_0__.Element.init.apply(null, args);
        return this;
    }
  }

  // :: (yngwieElement -> yngwieElement) -> this
  // Adds function to apply to yngwieElement when view is retrieved or rendered:
  modify(fn) {
    this._fns.push(fn);
    return this;
  }

  // :: STRING, (EVENT, NODE -> VOID) -> this
  // Initializes yngwieListener for yngwieElement stored by view:
  on(id, fn) {
    return this.modify(yngwieElement=>{
      return yngwieElement.on(id, fn);
    });
  }

  // :: STRING -> this
  // Modifes element of view to show given text:
  text(str) {
    return this.modify(yngwieElement=>{
      return yngwieElement.text(str);
    });
  }

  // :: yngwieView -> this;
  // Appends another yngwieView to this view:
  append(yngwieView) {
    if (YngwieView.is(yngwieView)) {
      this._children.push(yngwieView);
      return this;
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Only a yngwieView can be appended to another yngwieView", yngwieView);
  }

  // :: [yngwieView] -> this
  // Appends array of yngwieViews to this view:
  appends(yngwieViews) {
    if (yngwieViews instanceof Array) {
      return yngwieViews.reduce((result, view) => {
        return result.append(view);
      }, this);
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Expected ARRAY to append yngwieViews to this yngwieView", yngwieViews);
  }

  // :: STRING|ELEMENT|VOID, OBJECT|VOID -> ELEMENT
  // Creates and returns rendered ELEMENT from view, storing result of render:
  render(target, context) {
    // Store result of render:
    this._node = YngwieView.render(this, target, context);
    // Return render:
    return this._node;
  }

  // :: VOID -> ELEMENT
  // Re-renders view using stored node:
  // NOTE: If no node has been stored, then a yngwieError is thrown:
  renderAgain() {
    if (this._node) {
      let result = YngwieView.render(this);
      this._node.replaceWith(result);
      this._node = result;
      return this._node;
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Cannont re-render view because it hasn't been rendered yet.");
  }

  // STRING|NODE, OBJECT|VOID -> ELEMENT
  // Empties content of given target and appends it with rendered node:
  inject(target, context) {
    let render = this.render();
    let elem = YngwieView.setAsNode(target, context);
    elem.innerHTML = "";
    elem.append(render);
    return elem;
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: yngwieElement|STRING, STRING, OBJECT, STRING, [yngwieListener] -> yngwieView
  // Static factory method:
  static init(yngwieElement) {
    switch (_Util_main_js__WEBPACK_IMPORTED_MODULE_1__.default.getType(yngwieElement)) {
      case "YngwieElement":
      case "undefined":
        return new YngwieView(yngwieElement);
      default:
        let elem = yngwie__WEBPACK_IMPORTED_MODULE_0__.Element.init.apply(null, arguments);
        return new YngwieView(elem);
    }
  }

  // :: * -> BOOLEAN
  // Return TRUE if given value is an instance of YngwieView
  static is(val) {
    return val instanceof YngwieView;
  }

  // STRING|ELEMENT|VOID, DOCUMENT|VOID -> ELEMENT|DOCUMENTFRAGMENT
  // Returns NODE for given target and context
  static setAsNode(target, context) {
    let argType = _Util_main_js__WEBPACK_IMPORTED_MODULE_1__.default.getType(target);
    switch (argType) {
      case "String":
        return context === undefined
          ? document.querySelector(target)
          : context.querySelector(target);
      case "Element":
        return target;
      case "undefined":
        return new DocumentFragment();
      default:
        throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Argument cannot be a NODE", argType);
    }
  }

  // :: ynviewView, STRING|ELEMENT|VOID, DOCUMENT|VOID -> ELEMENT
  // Renders given view and all of it children using given target and context:
  static render(view, target, context) {
    let elem = view.elem();
    let node = YngwieView.setAsNode(target, context);
    let result = view._children.reduce((elem, child) => {
      let view = child.render();
      elem.appendChild(view);
      return elem;
    }, elem === undefined ? node : elem.render(node));
    return result instanceof DocumentFragment
      ? result.querySelector("body").firstElementChild
      : result;
  }

}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => (/* reexport safe */ _Model_main_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "View": () => (/* reexport safe */ _View_main_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "Controller": () => (/* reexport safe */ _Controller_main_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "Transform": () => (/* reexport safe */ yngwie__WEBPACK_IMPORTED_MODULE_3__.Transform),
/* harmony export */   "Error": () => (/* reexport safe */ yngwie__WEBPACK_IMPORTED_MODULE_3__.Error)
/* harmony export */ });
/* harmony import */ var _Model_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model/main.js */ "./src/Model/main.js");
/* harmony import */ var _View_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View/main.js */ "./src/View/main.js");
/* harmony import */ var _Controller_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controller/main.js */ "./src/Controller/main.js");
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");







})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWVNVkMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZU1WQy8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL0VsZW1lbnQvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvLi9ub2RlX21vZHVsZXMveW5nd2llL3NyYy9FcnJvci9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZU1WQy8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL0xpc3RlbmVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvTm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZU1WQy8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL1RleHROb2RlL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvVHJhbnNmb3JtL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvLi9zcmMvQ29udHJvbGxlci9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZU1WQy8uL3NyYy9Nb2RlbC9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZU1WQy8uL3NyYy9VdGlsL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDLy4vc3JjL1ZpZXcvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWeUM7QUFDUTtBQUNOOztBQUU1Qiw0QkFBNEIsa0RBQVU7O0FBRXJEO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsa0NBQWtDO0FBQ2xDLHNCQUFzQjtBQUN0Qix5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkRBQW1CO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsWUFBWTs7QUFFakM7QUFDQTtBQUNBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQSxLQUFLLElBQUk7O0FBRVQ7QUFDQTtBQUNBLFdBQVcsV0FBVztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsbURBQVc7QUFDN0IsT0FBTztBQUNQO0FBQ0EsY0FBYyxtREFBVztBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1EQUFXO0FBQ3pCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUM1UWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ2hCZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QzJDOztBQUU1Qjs7QUFFZjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsK0JBQStCO0FBQy9CLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUM3QixLQUFLO0FBQ0wsZ0JBQWdCLG1EQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUE0QjtBQUM1QixzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLDBCQUEwQjtBQUMxQixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGNBQWMsbURBQVc7O0FBRXpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLGNBQWMsbURBQVc7QUFDekI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxjQUFjLG1EQUFXOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGdCQUFnQixtREFBVzs7QUFFM0I7O0FBRUEsY0FBYyxtREFBVzs7QUFFekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMLGdCQUFnQixtREFBVzs7QUFFM0I7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOU95QztBQUNFOztBQUU1Qiw2QkFBNkIsa0RBQVU7O0FBRXREO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsbURBQVc7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLFlBQVk7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakUrQztBQUNFO0FBQ1I7QUFDTTs7QUFFaEM7O0FBRWY7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qiw4Q0FBOEM7QUFDOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsdURBQVc7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHVEQUFXO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsdURBQVc7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsa0RBQVU7QUFDakM7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIscURBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsc0RBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckt3QztBQUNNO0FBQ0U7QUFDQTtBQUNFO0FBQ1I7O0FBU3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkMEM7QUFDRjtBQUNHOztBQUU3Qjs7QUFFZixxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMseUNBQVc7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxjQUFjLHlDQUFXO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxpQkFBaUI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVtQztBQUNTOztBQUU3Qjs7QUFFZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwREFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHlDQUFXO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsMERBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxvQkFBb0IseUNBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHlDQUFXO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IseUNBQVc7QUFDM0IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUM5R0E7QUFDQSxpRUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hxRTtBQUNuQzs7QUFFcEI7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBEQUFZO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixzREFBd0I7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHlDQUFXO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLGNBQWMseUNBQVc7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMseUNBQVc7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzREFBd0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDBEQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHlDQUFXO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O1VDM0tBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04wQztBQUNGO0FBQ1k7QUFDWjs7QUFRdkMiLCJmaWxlIjoieW5nd2llLW12Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlluZ3dpZU1WQ1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJZbmd3aWVNVkNcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJpbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llTGlzdGVuZXIgZnJvbSBcIi4uL0xpc3RlbmVyL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVFbGVtZW50IGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLiBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUxpc3RlbmVyXSAtPiB5bmd3aWVFbGVtZW50XG4gIGNvbnN0cnVjdG9yKHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGxpc3RlbmVycykge1xuICAgIHN1cGVyKHRhZ05hbWUudG9VcHBlckNhc2UoKSk7ICAgICAvLyBTdG9yZXMgdGFnTmFtZSBpbiBBTEwgQ0FQU1xuICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzIHx8IHt9OyAgICAgLy8gRWxlbWVudCBBdHRyaWJ1dGVzXG4gICAgdGhpcy5fdGV4dCA9IHRleHQ7ICAgICAgICAgICAgICAgICAvLyBFbGVtZW50IHRleHQgdGhhdCdzIGFwcGVuZGVkIGFzIGZpcnN0IGNoaWxkIG9mIHRoaXMgZWxlbWVudFxuICAgIHRoaXMuX2xpc3RlbmVycyA9IFtdOyAgICAgICAgICAgIC8vIExpc3RlbmVycyBib3VuZCB0byB0aGlzIGVsZW1lbnRcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFJldHVybnMgdGFnTmFtZSBvZiB0aGlzIGVsZW1lbnQ6XG4gIHRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLy8gOjogT0JKRUNUfFZPSUQgLT4gdGhpc3xPQkpFQ1RcbiAgLy8gU2V0cyBcImF0dHJpYnNcIiBPQkpFQ1Qgd2l0aCBnaXZlbiBPQkpFQ1Q6XG4gIC8vIE5PVEU6IElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCBzZXQgYXR0cmlidXRlcyBhcmUgcmV0dXJuZWQ6XG4gIGF0dHJpYnMoYXR0cmlicykge1xuICAgIGlmIChhdHRyaWJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hdHRyaWJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mKGF0dHJpYnMpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIlluZ3dpZUVsZW1lbnQgYXR0cmlidXRlcyBjYW4gb25seSBiZSBzZXQgd2l0aCBPQkpFQ1RcIiwgYXR0cmlicyk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IEJPT0xFQU5cbiAgLy8gUmV0dXJucyBCT09MRUFOIGZvciBpZiBhdHRyaWJ1dGUgd2l0aCBnaXZlbiBuYW1lIGV4aXN0cyBpbiBcImF0dHJpYnNcIiBPQkpFQ1Q6XG4gIGhhc0F0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnMuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gKnxVTkRFRklORURcbiAgLy8gUmV0dXJucyB2YWx1ZSBvZiBhdHRyaWJ1dGUgYnkgbmFtZSBzdG9yZWQgaW4gXCJhdHRyaWJzXCIgT0JKRUNULCBvdGhlcndpc2UgcmV0dXJucyBVTkRFRklORURcbiAgZ2V0QXR0cmlidXRlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlic1tuYW1lXTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgKiAtPiB0aGlzXG4gIC8vIEJpbmRzICB2YWx1ZSB0byBcImF0dHJpYnNcIiBPQkpFQ1Qgd2l0aCBnaXZlbiBuYW1lOlxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLl9hdHRyaWJzW25hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpc1xuICAvLyBSZW1vdmUgYXR0cmlidXRlIHdpdGggZ2l2ZW4gbmFtZSBmcm9tIFwiYXR0cmlic1wiIE9CSkVDVDpcbiAgcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5fYXR0cmlic1tuYW1lXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xWT0lEIC0+IHRoaXN8VU5ERUZJTkVEXG4gIC8vIEFwcGVuZHMgdGV4dCBub2RlIGFzIGZpcnN0IGNoaWxkIG9mIGVsZW1lbnQgYXQgcmVuZGVyIHdpdGggZ2l2ZW4gc3RyaW5nIGFzIGl0J3MgdmFsdWU6XG4gIC8vIE5PVEU6IElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCBzZXQgdGV4dCBpcyByZXR1cm5lZDpcbiAgdGV4dChzdHIpIHtcbiAgICBpZiAoc3RyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mKHN0cikgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy5fdGV4dCA9IHN0cjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJUZXh0IG9mIGVsZW1lbnQgY2FuIG9ubHkgYmUgc2V0IHdpdGggYSBTVFJJTkdcIiwgc3RyKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHRoaXNcbiAgLy8gU2V0cyB0ZXh0IGFzIFVOREVGSU5FRCBmb3IgdGhpcyBlbGVtZW50OlxuICByZW1vdmVUZXh0KCkge1xuICAgIHRoaXMuX3RleHQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiAoeW5nd2llRWxlbWVudCAtPiBCT09MRUFOKSAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQsIHdoZW4gdGhlIGdpdmVuIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gdGhpcyBlbGVtZW50cyBhbmQgaXQncyBkZXNlbmRhbnRzLCB0aGF0IGZ1bmN0aW9uIHJldHVybnMgVFJVRTpcbiAgZ2V0RWxlbWVudHNCeShmbikge1xuICAgIHJldHVybiB0aGlzLnBhcnNlKChub2RlLCByZXN1bHQpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgICBpZiAoZm4obm9kZSkgPT09IHRydWUpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgWW5nd2llRWxlbW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIHRhZ05hbWU6XG4gIC8vIE5PVEU6IFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIHRhZyBuYW1lOlxuICBnZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeShlbGVtID0+IGVsZW0udGFnTmFtZSgpID09PSB0YWdOYW1lKTtcbiAgfVxuXG4gIC8vIFNUUklORywgU1RSSU5HfFZPSUQgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgeW5nd2llRWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBhdHRyaWJ1dGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWU6XG4gIC8vIE5PVEU6IElmIG5vIHZhbHVlIGlzIGdpdmVuLCB0aGVuIGFueSBlbGVtZW50IHRoYXQgaGFzIHRoZSBnaXZlbiBhdHRyaWJ1dGUgbmFtZSBpcyByZXR1cm5lZFxuICBnZXRFbGVtZW50c0J5QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeShlbGVtID0+IHtcbiAgICAgIGlmIChlbGVtLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNUUklORyAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbGwgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBjbGFzcyBuYW1lXG4gIC8vIE5PVEU6IFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIGNsYXNzIG5hbWU6XG4gIGdldEVsZW1lbnRzQnlDbGFzcyhjbGFzc05hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3NOYW1lKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgWW5nd2llRWxlbWVudCB0aGF0IGhhcyB0aGUgZ2l2ZW4gSUQ6XG4gIC8vIE5PVEU6IFJldHVybnMgVU5ERUZJTkVEIGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiBJRFxuICBnZXRFbGVtZW50QnlJRChpZCkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnlBdHRyaWJ1dGUoXCJpZFwiLCBpZCkucG9wKCk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIFsoRVZFTlQsIEVMRU1FTlQpIC0+IFZPSURdfChFVkVOVCwgRUxFTUVOVCkgLT4gVk9JRCAtPiAgdGhpc1xuICAvLyBCaW5kcyBsaXN0ZW5lciBieSBldmVudCBuYW1lIHRvIG5vZGUgYXQgcmVuZGVyOlxuICAvLyBOT1RFOiBGdW5jdGlvbiBib3VuZCB0byBsaXN0ZW5lciBpcyBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgdGhpcyBlbGVtZW50XG4gIG9uKGV2dE5hbWUsIGZucykge1xuICAgIGxldCBsaXN0ZW5lciA9IFluZ3dpZUxpc3RlbmVyLmluaXQoZXZ0TmFtZSwgZm5zKTtcbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBWT0lEIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gUmV0dXJucyBjbG9uZSBvZiB0aGlzIHluZ3dpZUVsZW1lbnQ6XG4gIGNsb25lKCkge1xuXG4gICAgLy8gQ29weSB0YWduYW1lOlxuICAgIGxldCB0YWdOYW1lID0gYCR7dGhpcy5fdmFsdWV9YDtcblxuICAgIC8vIENvcHkgYXR0cmlidXRlczpcbiAgICBsZXQgYXR0cmlicyA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgocmVzdWx0LCBpZCkgPT4ge1xuICAgICAgcmVzdWx0W2lkXSA9IGAke3RoaXMuX2F0dHJpYnNbaWRdfWA7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcblxuICAgIC8vIENvcHkgc2V0OlxuICAgIGxldCB0ZXh0ID0gdGhpcy5fdGV4dCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGAke3RoaXMuX3RleHR9YFxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBDb3B5IGxpc3RlbmVyczpcbiAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzLm1hcCgobGlzdGVuZXIpID0+IHtcbiAgICAgIHJldHVybiBsaXN0ZW5lci5jbG9uZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gQ29weSBjaGlsZHJlbiBhbmQgcmV0dXJuIGVsZW1lbnQ6XG4gICAgbGV0IGVsZW0gPSBuZXcgWW5nd2llRWxlbWVudCh0YWdOYW1lLCBhdHRyaWJzLCB0ZXh0LCBsaXN0ZW5lcnMpO1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChlbGVtLCBjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIGVsZW0uYXBwZW5kKGNoaWxkKTtcbiAgICB9LCBlbGVtKTtcblxuICB9XG5cbiAgLy8gOjogU1RSSU5HfEVMRU1FTlQsIE9CSkVDVCAtPiBFTEVNRU5UXG4gIC8vIFRyYW5zZm9ybXMgdGhpcyBlbGVtZW50IGFuZCBpdCdzIGRlc2VuZGFudHMgaW50byBhIERPTSBFTEVNRU5ULCBhcHBlbmRpbmcgcmVzdWx0IHRvIGdpdmVuIHRhcmdldFxuICAvLyBhbmQgcmVuZGVyaW5nIHRoYXQgRUxFTUVOVCBpbiB0aGUgY29udGV4dCBvZiB0aGUgZ2l2ZW4gT0JKRUNULiBJZiBubyB0YXJnZXQgdG8gYXBwZW5kIGlzIGdpdmVuLFxuICAvLyB0aGUgcmVuZGVyZWQgRUxFTUVOVCBpcyByZXR1cm5lZC4gSWYgbm8gY29udGV4dCBpcyBnaXZlbiwgdGhlbiBET0NVTUVOVCBpcyB1c2VkIGJ5IGRlZmF1bHQuXG4gIHJlbmRlcih0YXJnZXQsIGN0eCkge1xuXG4gICAgLy8gQ2hlY2sgaWYgZGVmYXVsdCBjb250ZXh0IG9mIERPQ1VNRU5UIHNob3VsZCBiZSB1c2VkOlxuICAgIGxldCBjb250ZXh0ID0gY3R4ID09PSB1bmRlZmluZWQgPyBkb2N1bWVudCA6IGN0eDtcblxuICAgIC8vIEludGlhbGl6ZSBET01FbGVtZW50OlxuICAgIGxldCBlbGVtID0gT2JqZWN0LmtleXModGhpcy5fYXR0cmlicykucmVkdWNlKChlbGVtLCBpZCkgPT4ge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoaWQsIHRoaXMuX2F0dHJpYnNbaWRdKTtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH0sIGNvbnRleHQuY3JlYXRlRWxlbWVudCh0aGlzLl92YWx1ZSkpO1xuXG4gICAgLy8gQmluZCBMaXN0ZW5lcnM6XG4gICAgZWxlbSA9IHRoaXMuX2xpc3RlbmVycy5yZWR1Y2UoKGVsZW0sIGxpc3RlbmVyKSA9PiB7XG4gICAgICByZXR1cm4gbGlzdGVuZXIucmVuZGVyKGVsZW0sIHRoaXMpO1xuICAgIH0sIGVsZW0pO1xuXG4gICAgLy8gSWYgc2V0LCBjcmVhdGUgYW5kIGFwcGVuZCB0ZXh0IG5vZGU6XG4gICAgaWYgKHR5cGVvZih0aGlzLl90ZXh0KSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbGV0IGVsZW1UZXh0ID0gY29udGV4dC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl90ZXh0KTtcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoZWxlbVRleHQpO1xuICAgIH1cblxuICAgIC8vIFJlbmRlciBhbmQgYXBwZW5kIGFsbCBjaGlsZHJlbiBhbmQgcmV0dXJuIHJlc3VsdDpcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgocmVzdWx0LCBjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQgPSBjaGlsZC5yZW5kZXIoKTtcbiAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIGVsZW0pO1xuXG4gICAgLy8gSWYgdGFyZ2V0IGlzIGdpdmVuLCBhcHBlbmRzIHJlc3VsdCBvZiByZW5kZXIgdG8gdGhhdCB0YXJnZXQ6XG4gICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBJZiB0YXJnZXQgaXMgc3RyaW5nLCBmaW5kIG5vZGUgdXNpbmcgcXVlcnkgc2VsZWN0b3I6XG4gICAgICBpZiAodHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29udGV4dC5xdWVyeVNlbGVjdG9yKHRhcmdldCkuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyaXNlIGFzc3VtZSB0aGF0IHRhcmdldCBpcyBET01FbGVtZW50OlxuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklORy4gT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVMaXN0ZW5lcl0gLT4geW5nd2llRWxlbWVudFxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGxpc3RlbmVycykge1xuICAgIHJldHVybiBuZXcgWW5nd2llRWxlbWVudCh0YWdOYW1lLCBhdHRyaWJzLCB0ZXh0LCBsaXN0ZW5lcnMpXG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RUxFTUVOVCwgW3luZ3dpZUVsZW1lbnRdLCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBSZW5kZXJzIGFuIGFycmF5IG9mIHluZ3dpZUVsZW1lbnRzIGluIHRoZSBnaXZlbiBjb250ZXh0IGFuZCBhcHBlbmRzIHJlc3VsdCB0byBnaXZlbiB0YXJnZXQ6XG4gIC8vIE5PVEU6IEVMRU1FTlQgb2YgdGFyZ2V0IGlzIHJldHVybmVkXG4gIHN0YXRpYyByZW5kZXJUbyh0YXJnZXQsIGVsZW1zLCBjdHgpIHtcbiAgICBsZXQgY29udGV4dCA9IGN0eCA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBjdHg7XG4gICAgaWYgKGVsZW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBub2RlID0gdHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICA6IHRhcmdldDtcbiAgICAgIHJldHVybiBlbGVtcy5yZWR1Y2UoKHJlc3VsdCwgZWxlbSkgPT4ge1xuICAgICAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtLnJlbmRlcihyZXN1bHQpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBZbmd3aWVFbGVtZW50IGNhbiBiZSByZW5kZXJlZCB0byB0YXJnZXRcIiwgZWxlbSk7XG4gICAgICB9LCBub2RlKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiRXhwZWN0ZWQgYXJyYXkgYXMgYXJndW1lbnRcIiwgZWxlbXMpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfEVMRU1FTlQsIHluZ3dpZUVsZW1lbnQsIE9CSkVDVCAtPiBFTEVNRU5UXG4gIC8vIFJlcGxhY2VzIHRoZSBnaXZlbiB0YXJnZXQgd2l0aCB0aGUgcmVuZGVyIG9mIHRoZSBnaXZlbiBpbnN0YW5jZSAgb2YgWW5nd2llRWxlbWVudCBpbiB0aGUgZ2l2ZW4gY29udGV4dDpcbiAgc3RhdGljIGluamVjdCh0YXJnZXQsIGVsZW0sIGN0eCkge1xuICAgIGlmIChlbGVtIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgbGV0IGNvbnRleHQgPSBjdHggPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogY3R4O1xuICAgICAgbGV0IG5vZGUgPSB0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgIDogdGFyZ2V0O1xuICAgICAgbGV0IHJlc3VsdCA9IGVsZW0ucmVuZGVyKCk7XG4gICAgICBub2RlLnJlcGxhY2VXaXRoKHJlc3VsdCk7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBZbmd3aWVFbGVtZW50IGNhbiBiZSBpbmplY3RlZCBpbnRvIHRhcmdldFwiLCBlbGVtKTtcbiAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcsICogLT4gRVJST1JcbiAgLy8gTk9URSA6OiBcImRhdGFcIiBhcmd1bWVudCBpcyBhbHdheXMgY2FzdCBhcyBTVFJJTkc6XG4gIGNvbnN0cnVjdG9yKG1zZywgZGF0YSkge1xuICAgIHN1cGVyKG1zZyk7XG4gICAgdGhpcy5kYXRhID0gYCR7ZGF0YX1gO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiAgVk9JRFxuICAvLyBDb25zb2xlcyBvdXQgc3RhY2sgdHJhY2Ugb2YgZXJyb3IsIGFsb25nIHdpdGggdGhlIGRhdGEgdGhhdCBjYXVzZWQgdGhlIGV4Y2VwdGlvbiB0byBiZSB0aHJvd246XG4gIGxvZygpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YWNrKTtcbiAgICBjb25zb2xlLmxvZyhcIldoYXQgRmFpbGVkOiBcIiwgdGhpcy5kYXRhKTtcbiAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVMaXN0ZW5lciB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLCBbKEVWRU5ULCBFTEVNRU5UIC0+IFZPSUQpXSAtPiB5bmd3aWVMaXN0ZW5lclxuICBjb25zdHJ1Y3RvcihldnROYW1lLCBmbnMpIHtcbiAgICB0aGlzLl9ldnROYW1lID0gZXZ0TmFtZTtcbiAgICB0aGlzLl9mbnMgPSBmbnMgfHwgW107XG4gIH1cblxuICAvLyA6OiAoRVZFTlQsIEVMRU1FTlQgLT4gVk9JRCkgLT4gdGhpcztcbiAgLy8gQWRkcyBmdW5jdGlvbiB0byBsaXN0ZW5lcjpcbiAgYWRkKGZuKSB7XG4gICAgdGhpcy5fZm5zLnB1c2goZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVMaXN0ZW5lclxuICAvLyBDcmVhdGVzIGNsb25lIG9mIHRoaXMgeW5nd2llTGlzdGVuZXI6XG4gIGNsb25lKCkge1xuICAgIGxldCBldnROYW1lID0gYCR7dGhpcy5fZXZ0TmFtZX1gO1xuICAgIGxldCBmbnMgPSB0aGlzLl9mbnMubWFwKGZuPT57XG4gICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZXZ0XCIsIFwiZWxlbVwiLCBmbi50b1N0cmluZygpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUxpc3RlbmVyKGV2dE5hbWUsIGZucyk7XG4gIH1cblxuICAvLyA6OiBFTEVNRU5ULCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBDcmVhdGVzIGV2ZW50IGxpc3RlbmVyIGFuZCBiaW5kcyBpdCB0byBnaXZlbiBET00gRUxFTUVOVCwgYW5kIGNhbGxzIGZ1bmN0aW9uIG9mIGxpc3RlbmVyIHRvIGdpdmVuIGNvbnRleHRcbiAgLy8gTk9URTogSWYgbm8gY29udGV4dCBpcyBnaXZlbiwgZnVuY3Rpb24gaXMgY2FsbGVkIGluIHRoZSBjb250ZXh0IG9mIHRoZSBFTEVNRU5UIHRoZSBsaXN0ZW5lciBpcyBib3VuZCB0b1xuICByZW5kZXIoZWxlbSwgY3R4KSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zucy5yZWR1Y2UoKGVsZW0sIGZuKSA9PiB7XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5fZXZ0TmFtZSwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBmbi5jYWxsKGN0eCA9PT0gdW5kZWZpbmVkID8gZWxlbSA6IGN0eCwgZXZ0LCBlbGVtKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSwgZWxlbSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIFsoRVZFTlQsIEVMRU1FTlQgLT4gVk9JRCldfChFVkVOVCwgRUxFTUVOVCAtPiBWT0lEKSAtPiB5bmd3aWVMaXN0ZW5lclxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KGV2dE5hbWUsIGZucykge1xuICAgIHJldHVybiBmbnMgIT09IHVuZGVmaW5lZFxuICAgICAgPyBuZXcgWW5nd2llTGlzdGVuZXIoZXZ0TmFtZSwgQXJyYXkuaXNBcnJheShmbnMpID09PSB0cnVlID8gZm5zIDogW2Zuc10pXG4gICAgICA6IG5ldyBZbmd3aWVMaXN0ZW5lcihldnROYW1lKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HIC0+IHluZ3dpZU5vZGVcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTsgICAgICAgLy8gQXJiaXRyYXJ5IFNUUklORyB2YWx1ZSB0aGF0IGNhbiBiZSBzdG9yZWQgYnkgdGhpcyBub2RlXG4gICAgICB0aGlzLl9wYXJlbnQgPSB1bmRlZmluZWQ7ICAvLyBQYXJlbnQgb2YgdGhpcyBub2RlXG4gICAgICB0aGlzLl9maXJzdCA9IHVuZGVmaW5lZDsgICAvLyBGaXJzdCBjaGlsZCBvZiB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX2xhc3QgPSB1bmRlZmluZWQ7ICAgIC8vIExhc3QgY2hpbGQgb2YgdGhpcyBub2RlO1xuICAgICAgdGhpcy5fbmV4dCA9IHVuZGVmaW5lZDsgICAgLy8gTmV4dCBzaWJsaW5nIG9mIHRoaXMgbm9kZVxuICAgICAgdGhpcy5fcHJldiA9IHVuZGVmaW5lZDsgICAgLy8gUHJldmlvdXMgc2libGluZyBvZiB0aGUgbm9kZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJWYWx1ZSBvZiBZbmd3aWVOb2RlIG11c3QgYmUgU1RSSU5HXCIsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFt5bmd3aWVOb2RlXVxuICAvLyBSZXR1cm5zIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICBjaGlsZHJlbigpIHtcblxuICAgIGxldCBjaGlsZCA9IHRoaXMuX2ZpcnN0OyAgIC8vIEZpcnN0IGNoaWxkXG4gICAgbGV0IGNoaWxkcmVuID0gW107ICAgICAgICAgLy8gQXJyYXkgb2YgY2hpbGRyZW4gdG8gcmV0dXJuXG5cbiAgICAvLyBMb29rcyBmb3IgbmV4dCBzaWJsaW5nIHVudGlsIHRoZXJlIGFyZSBubyBtb3JlIHNpYmxpbmdzOlxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgYW4gYXJyYXJ5IHluZ2l3Tm9kZSBlbGVtZW50czpcbiAgICByZXR1cm4gY2hpbGRyZW47XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4gdGhpc1xuICAvLyBBZGRzIGdpdmVuIG5vZGUgdG8gY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICAvLyBOT1RFOiBJZiBnaXZlbiBub2RlIGFscmVhZHkgaGFzIGEgcGFyZW50LCB0aGF0IG5vZGUgaXMgZGV0YWNoZWQgYW5kIGFwcGVuZWQgdG8gdGhpcyBub2RlOlxuICBhcHBlbmQobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgLy8gSWYgZ2l2ZW4gbm9kZSBoYXMgcGFyZW50LCBkZXRhY2ggdGhhdCBub2RlIGZyb20gaXQncyBwYXJlbnQ6XG4gICAgICBpZiAobm9kZS5fcGFyZW50KSB7XG4gICAgICAgIG5vZGUuZGV0YWNoKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBuZXcgbm9kZSBhcyBsYXN0IHNpYmxpbmc6XG4gICAgICBpZiAodGhpcy5fZmlyc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBub2RlLl9wcmV2ID0gdGhpcy5fbGFzdDsgICAgLy8gU2V0cyBuZXcgbGFzdCBjaGlsZCdzIHByZXZpb3VzIG5vZGUgdG8gb2xkIGxhc3Qgbm9kZVxuICAgICAgICB0aGlzLl9sYXN0Ll9uZXh0ID0gbm9kZTsgICAgLy8gU2V0IG9sZCBsYXN0IGNoaWxkIG5leHQgZWxlbWVudCB0byBuZXcgbGFzdCBjaGlsZFxuICAgICAgICB0aGlzLl9sYXN0ID0gbm9kZTsgICAgICAgICAvLyBTZXQgbmV3IGxhc3QgY2hpbGQgdG8gZ2l2ZW4gbm9kZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlciBhcmUgbm8gY2hpbGRyZW4sIHRoZW4gdGhpcyBub2RlIGlzIGFuIG9ubHkgY2hpbGQ6XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBwYXJlbnRcbiAgICAgIG5vZGUuX3BhcmVudCA9IHRoaXM7XG5cbiAgICAgIC8vIFJldHVybiBpbnN0YW5jZTpjb3Nub2xlXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IGFwcHBlbmQgWW5nd2llTm9kZSB0byBvdGhlciBZbmd3aWVOb2Rlc1wiLCBub2RlKTtcblxuICB9XG5cbiAgLy8gOjogW3luZ3dpZU5vZGVdIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBhbiBhcnJheSBvZiBZbmd3aWVOb2RlcyB0byB0aGlzIGluc3RhbmNlOlxuICBhcHBlbmRzKG5vZGVzKSB7XG4gICAgaWYgKG5vZGVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHJldHVybiBub2Rlcy5yZWR1Y2UoKHJlc3VsdCwgbm9kZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBlbmQobm9kZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiRXhwZWN0ZWQgYXJyYXkgYXMgYXJndWVtbnRcIiwgbm9kZXMpO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB0aGlzXG4gIC8vIERldGFjaGVzIHRoaXMgbm9kZSBmcm9tIGl0J3MgcGFyZW50OlxuICBkZXRhY2goKSB7XG5cbiAgICAvLyBNYWtlIHByZXZpb3VzIG5vZGUncyBuZXh0IG5vZGUgdGhpcyBub2RlJ3MgbmV4dCBub2RlOlxuICAgIGlmICh0aGlzLl9wcmV2KSB7XG4gICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gdGhpcy5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm8gcHJldmlvdXMgbm9kZSwgdGhlbiB0aGlzIG5vZGUgbXVzdCBiZSBmaXJzdCBjaGlsZCBvZiBwYXJlbnQgKGlmIG5vZGUgaGFzIHBhcmVudCk6XG4gICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudC5fZmlyc3QgPSB0aGlzLl9uZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2UgbmV4dCBub2RlJ3MgcHJldmlvdXMgbm9kZSB0aGlzIG5vZGUncyBwcmV2aW91cyBub2RlOlxuICAgIGlmICh0aGlzLl9uZXh0KSB7XG4gICAgICB0aGlzLl9uZXh0Ll9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICB9XG5cbiAgICAvLyBVbnNldCBhbGwgcmVsYXRpb25zOlxuICAgIHRoaXMuX25leHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJldiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wYXJlbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBSZXR1cm4gaW5zdGFuY2U6XG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4gdGhpcztcbiAgLy8gSW5zZXJ0cyBnaXZlbiB5bmd3aWVOb2RlIGJlZm9yZSB0aGlzIGluc3RhbmNlIG9mIHluZ3dpZU5vZGU6XG4gIC8vIE5PVEU6IGEuaW5zZXJ0c0JlZm9yZShiKSBtZWFucyBcImJcIiBpcyBpbnNlcnRlZCBiZWZvcmUgXCJhXCJcbiAgaW5zZXJ0QmVmb3JlKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIFNldCByZWxhdGlvbnNcbiAgICAgIG5vZGUuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgICAgbm9kZS5fbmV4dCA9IHRoaXM7XG4gICAgICBub2RlLl9wYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG5cbiAgICAgIC8vIFNldCBwcmV2aW91cyBzaWJsaW5nIHJlbGF0aW9uczpcbiAgICAgIGlmICh0aGlzLl9wcmV2KSB7XG4gICAgICAgIHRoaXMuX3ByZXYuX25leHQgPSBub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgIHRoaXMuX3BhcmVudC5fZmlyc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBwcmV2aW91cyBzaWJsaW5nOlxuICAgICAgdGhpcy5fcHJldiA9IG5vZGU7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgaW5zZXJ0IGEgWW5nd2llTm9kZSBiZWZvcmUgb3RoZXIgWW5nd2llTm9kZXNcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4geW5nd2llTm9kZVxuICAvLyBSZXBsYWNlIHRoaXMgbm9kZSB3aXRoIGdpdmVuIG5vZGU6XG4gIHJlcGxhY2VXaXRoKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIENoZWNrcyBpZiB0aGlzIG5vZGUgaGFzIGEgcGFyZW50XG4gICAgICBpZiAodGhpcy5fcGFyZW50ICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAvLyBSZXBsYWNlbWVudCBpcyBhY2NvbXBsaXNoZWQgYnkgZmlyc3QgaW5zZXJ0aW5nIGdpdmVuIG5vZGUsIHRoZW4gZGV0YXRjaGluZyB0aGlzIG5vZGU6XG4gICAgICAgIHRoaXMuaW5zZXJ0QmVmb3JlKG5vZGUpO1xuICAgICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgIC8vIFJldHVybiBnaXZlbiBub2RlOlxuICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSByZXBsYWNlIFluZ3dpZU5vZGUgaWYgWW5nd2llTm9kZSBiZWluZyByZXBsYWNlZCBoYXMgcGFyZW50XCIsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcmVwbGFjZSBhIFluZ3dpZU5vZGUgd2l0aCBhbm90aGVyIFluZ3dpZU5vZGVcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llTm9kZVxuICAvLyBSZXR1cm5zIGRlZXAgY2xvbmUgb2YgdGhpcyBub2RlOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgdmFsdWUgPSBgJHt0aGlzLl92YWx1ZX1gO1xuICAgIGxldCBjbG9uZSA9IG5ldyBZbmd3aWVOb2RlKHZhbHVlKVxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChyZXN1bHQsIGNoaWxkKSA9PiB7XG4gICAgICBjbG9uZSA9IGNoaWxkLmNsb25lKCk7XG4gICAgICByZXR1cm4gcmVzdWx0LmFwcGVuZChjbG9uZSk7XG4gICAgfSwgY2xvbmUpO1xuICB9XG5cbiAgLy8gTk9ERSwgKiAtPiBOT0RFIC0+ICpcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byBhIHJlc3VsdCBhbmQgdGhpcyBub2RlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uIHJldHVybnMgdGhlIG5leHQgbm9kZSB0byB0aGF0IGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG9cbiAgLy8gTk9URTogUmVzdWx0IGlzIHJldHVybmVkIHdoZW4gdGhlcmUgaXMgbm8gbmV4dCBub2RlIHRvIGFwcGx5IGZ1bmN0aW9uIHRvXG4gIHN0ZXAoZm4sIHJlc3VsdCkge1xuICAgIG5leHQgPSBmbih0aGlzLCByZXN1bHQpO1xuICAgIGlmIChuZXh0KSB7XG4gICAgICBuZXh0LnN0ZXAoZm4sIHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyA6OiBOT0RFLCAqIC0+ICosICogLT4gKlxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIHRoaXMgbm9kZSBhbmQgaXQncyBkZXNjZW5kYW50cywgcmV0dXJuaW5nIHRoZSByZXN1bHQgb2YgdGhhdCBmdW5jdGlvbjpcbiAgcGFyc2UoZm4sIHJlc3VsdCkge1xuICAgIFluZ3dpZU5vZGUucGFyc2UodGhpcywgKG5vZGUpID0+IHtcbiAgICAgIHJlc3VsdCA9IGZuKG5vZGUsIHJlc3VsdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBTdGF0aWMgRnVuY3Rpb25cbiAgICpcbiAgICovXG5cbiAgLy8gU1RSSU5HIC0+IHluZ3dpZU5vZGVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kXG4gIHN0YXRpYyBpbml0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVOb2RlKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE5PREUsIE5PREUgLT4gVk9JRCAtPiBWT0lEXG4gIC8vIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBhIG5vZGUgYW5kIGFsbCBpdCdzIGRlc2VuZGFudHNcbiAgLy8gTk9ERTogVGhpcyBpcyBhIHJlLWltcGxlbWVudGF0aW9uIG9mIENyb2NrZm9yZCdzIERPTSB3YWxrIGFsZ29yaXRobSBmcm9tIFwiSmF2YXNjcmlwdDogVGhlIEdvb2QgUGFydHNcIlxuICBzdGF0aWMgcGFyc2Uobm9kZSwgZm4pIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIGZuKG5vZGUpO1xuICAgICAgbm9kZSA9IG5vZGUuX2ZpcnN0O1xuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgWW5nd2llTm9kZS5wYXJzZShub2RlLCBmbik7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcGFyc2UgYSBZbmd3aWVOb2RlXCIsIG5vZGUpO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZVRleHROb2RlIGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HIC0+IHluZ3dpZVRleHROb2RlXG4gIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICBzdXBlcih0ZXh0KTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFJldHVybnMgdGV4dCBvZiB0aGlzIHRleHQgbm9kZTpcbiAgdGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8eW5nd2llVGV4dE5vZGUgLT4gdGhpc1xuICAvLyBBcHBlbmRzIFNUUklORyBpbnN0ZWFkIG9mIE5PREUgc2luY2UgYSBUZXh0Tm9kZSBoYXMgbm8gY2hpbGRyZW5cbiAgYXBwZW5kKHZhbCkge1xuXG4gICAgaWYgKHR5cGVvZih2YWwpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHZhbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIFluZ3dpZVRleHROb2RlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHZhbC50ZXh0KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgU1RSSU5HcyBhbmQgb3RoZXIgWW5nd2llVGV4dE5vZGVzIGNhbiBhcHBlbmQgYSBZbmd3aWVUZXh0Tm9kZVwiLCB2YWwpO1xuICB9XG5cbiAgLy86OiBTVFJJTkd8RUxFTUVOVHxWT0lELCBPQkpFQ1QgLT4gVEVYVFxuICAvLyBDcmVhdGVzIERPTSBUZXh0IG5vZGUgc2V0IHdpdGggdGhlIFNUUklORyBzdG9yZWQgaW4gX3ZhbHVlOlxuICByZW5kZXIodGFyZ2V0LCBjdHgpIHtcbiAgICBsZXQgY29udGV4dCA9IGN0eCA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBjdHg7XG4gICAgbGV0IHRleHROb2RlID0gY29udGV4dC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl92YWx1ZSk7XG4gICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgbm9kZSA9IHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgOiB0YXJnZXQ7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dE5vZGU7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHluZ3dpZVRleHROb2RlOlxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZVRleHROb2RlKGAke3RoaXMuX3ZhbHVlfWApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkcgLT4geW5nd2llVGV4dE5vZGVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdCh0ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVUZXh0Tm9kZSh0ZXh0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi4vRWxlbWVudC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVGV4dE5vZGUgZnJvbSBcIi4uL1RleHROb2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vVHJhbnNmb3JtL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llVHJhbnNmb3JtIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiAqIC0+IHluZ3dpZVRyYW5zZm9ybVxuICBjb25zdHJ1Y3Rvcih2YWwpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbDsgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmFsdWUgdG8gdHJhbnNmb3JtXG4gICAgdGhpcy5fdHlwZSA9IFluZ3dpZVRyYW5zZm9ybS5nZXRUeXBlKHZhbCk7IC8vIFN0b3JlcyB2YWx1ZSdzIHR5cGUgZm9yIGRldGVybWluaW5nIGhvdyBpdCBjYW4gYmUgdHJhbnNmb3JtZWRcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gTk9ERVxuICAvLyBUcmFuc2Zvcm1zIHN0b3JlZCB2YWx1ZSBpbnRvIGEgRE9NRWxlbWVudCBOT0RFOlxuICB0b05PREUoKSB7XG4gICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICBjYXNlIFwiTk9ERVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHRoaXMuX3ZhbHVlLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgcmV0dXJuIGRvYy5ib2R5LmZpcnN0Q2hpbGQ7XG4gICAgICBjYXNlIFwiWU5HV0lFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5yZW5kZXIoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbm5vdCB0cmFuc2Zvcm0gdG8gTk9ERSBmcm9tIHVuc3VwcG90ZWQgdHlwZVwiLCB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gVHJhbnNmb3JtcyBzdG9yZWQgdmFsdWUgaW50byBhIFNUUklORzpcbiAgdG9TVFJJTkcoKSB7XG4gICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICBjYXNlIFwiTk9ERVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUubm9kZVR5cGUgPT09IDEgPyB0aGlzLl92YWx1ZS5vdXRlckhUTUwgOiB0aGlzLl92YWx1ZS5ub2RlVmFsdWU7XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgIGNhc2UgXCJZTkdXSUVcIjpcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fdmFsdWUpO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX3ZhbHVlLnJlbmRlcigpO1xuICAgICAgICBjb25zb2xlLmxvZyhub2RlKVxuICAgICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMSA/IG5vZGUub3V0ZXJIVE1MIDogbm9kZS5ub2RlVmFsdWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgdHJhbnNmb3JtIHRvIFNUUklORyBmcm9tIHVuc3VwcG90ZWQgdHlwZVwiLCB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gVHJhbnNmb3JtcyBzdG9yZWQgdmFsdWUgaW50byBhIHluZ3dpZUVsZW1lbnQ6XG4gIHRvWU5HV0lFKCkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcIk5PREVcIjpcbiAgICAgIGNhc2UgXCJTVFJJTkdcIjpcbiAgICAgICAgcmV0dXJuIFluZ3dpZVRyYW5zZm9ybS5pbml0KHRoaXMuX3ZhbHVlKTtcbiAgICAgIGNhc2UgXCJZTkdXSUVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IHRyYW5zZm9ybSB0byBZbmd3aWVFbGVtZW50IGZyb20gdW5zdXBwb3RlZCB0eXBlXCIsIHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklOR3xOT0RFIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gVHJhbnNmb3JtcyBzdHJpbmcgb2YgSFRNTCBvciBET01FbGVtZW50IE5PREUgaW50byBhIHluZ3dpZUVsZW1lbnRcbiAgLy8gTk9URTogVGhpcyBET0VTIE5PVCB0cmFuc2Zvcm0gZXZlbnQgaGFuZGxlcnMgaW50byBZbmd3aWVMaXN0ZW5lciBvYmplY3RzOlxuICBzdGF0aWMgaW5pdChodG1sKSB7XG4gICAgcmV0dXJuIHdhbGtOb2RlKFluZ3dpZVRyYW5zZm9ybS5nZXRUeXBlKGh0bWwpID09PSBcIlNUUklOR1wiID8gWW5nd2llVHJhbnNmb3JtLnRvTk9ERShodG1sKSA6IGh0bWwpO1xuICB9XG5cbiAgLy8gOjogKiAtPiBOT0RFXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZCB0aGF0IHRyYW5zZm9ybXMgZ2l2ZW4gdmFsdWUgaW50byBhIE5PREU6XG4gIHN0YXRpYyB0b05PREUodmFsKSB7XG4gICAgbGV0IHRyYW5zZm9ybSA9IG5ldyBZbmd3aWVUcmFuc2Zvcm0odmFsKTtcbiAgICByZXR1cm4gdHJhbnNmb3JtLnRvTk9ERSgpO1xuICB9XG5cbiAgLy8gOjogKiAtPiBTVFJJTkdcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kIHRoYXQgdHJhbnNmb3JtcyBnaXZlbiB2YWx1ZSBpbnRvIGEgU1RSSU5HOlxuICBzdGF0aWMgdG9TVFJJTkcodmFsKSB7XG4gICAgbGV0IHRyYW5zZm9ybSA9IG5ldyBZbmd3aWVUcmFuc2Zvcm0odmFsKTtcbiAgICByZXR1cm4gdHJhbnNmb3JtLnRvU1RSSU5HKCk7XG4gIH1cblxuICAvLyA6OiAqIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kIHRoYXQgdHJhbnNmb3JtcyBnaXZlbiB2YWx1ZSBpbnRvIGEgeW5nd2llRWxlbWVudDpcbiAgc3RhdGljIHRvWU5HV0lFKHZhbCkge1xuICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgWW5nd2llVHJhbnNmb3JtKHZhbCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybS50b1lOR1dJRSgpO1xuICB9XG5cbiAgLy8gKiAtPiBcIk5PREVcInxcIlNUUklOR1wifFwiWU5HV0lFXCJ8VU5ERUZJTkVEXG4gIC8vIFJldHVybnMgbmFtZSBvZiB0eXBlIGZvciBnaXZlbiB2YWx1ZTpcbiAgc3RhdGljIGdldFR5cGUodmFsKSB7XG5cbiAgICBpZiAodmFsIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgcmV0dXJuIFwiTk9ERVwiO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YodmFsKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIFwiU1RSSU5HXCI7XG4gICAgfVxuXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcbiAgICAgIHJldHVybiBcIllOR1dJRVwiO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgfVxuXG59XG5cbi8qKlxuICpcbiAqICBMb2NhbCBGdW5jdGlvbnNcbiAqXG4gKi9cblxuLy8gOjogTk9ERSwgTk9ERSwgbm9kZS5ub2RlVHlwZSAtPiBWT0lEXG4vLyBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFluZ3dpZUVsZW1lbnQgZnJvbSB0aGUgZ2l2ZW4gbm9kZSBhbmQgYWxsIG9mIGl0J3MgZGVzZW5kZW50czpcbi8vIE5PVEU6IEluc3BpcmVkIGJ5IENyb2NrZm9yZCdzIERPTSB3YWxraW5nIGFsZ29yaXRobSBmcm9tIFwiSmF2YXNjcmlwdDpUaGUgR29vZCBQYXJ0c1wiXG5mdW5jdGlvbiB3YWxrTm9kZShub2RlLCByZXN1bHQpIHtcblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGxldCBhdHRyaWJzID0gZ2V0QXR0cmlidXRlcyhub2RlKTtcbiAgICBsZXQgZWxlbSA9IG5ldyBZbmd3aWVFbGVtZW50KG5vZGUudGFnTmFtZSwgYXR0cmlicyk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgID8gZWxlbVxuICAgICAgOiByZXN1bHQuYXBwZW5kKGVsZW0pO1xuICB9XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICBsZXQgdGV4dE5vZGUgPSBuZXcgWW5nd2llVGV4dE5vZGUobm9kZS5ub2RlVmFsdWUpO1xuICAgIHJlc3VsdCA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICA/IHRleHROb2RlXG4gICAgICA6IHJlc3VsdC5hcHBlbmQodGV4dE5vZGUpO1xuICB9XG5cbiAgbm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcblxuICB3aGlsZSAobm9kZSkge1xuICAgIGxldCBjaGlsZCA9IHdhbGtOb2RlKG5vZGUpO1xuICAgIGlmIChjaGlsZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdC5hcHBlbmQoY2hpbGQpO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG5cbn1cblxuLy8gOjogRE9NRWxlbWVudCAtPiBPQkpFQ1Rcbi8vIFJldHVybnMgT0JKRUNUIG9mIGF0dHJpYnV0ZXMgZnJvbSB0aGUgZ2l2ZW4gRE9NIEVsZW1lbnQ6XG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVzKGVsZW0pIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oZWxlbS5hdHRyaWJ1dGVzKS5yZWR1Y2UoKHJlc3VsdCwgYXR0cmliKSA9PiB7XG4gICAgcmVzdWx0W2F0dHJpYi5uYW1lXSA9IGF0dHJpYi52YWx1ZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCB7fSk7XG59XG4iLCJpbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFbGVtZW50IGZyb20gXCIuL0VsZW1lbnQvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVRleHROb2RlIGZyb20gXCIuL1RleHROb2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVMaXN0ZW5lciBmcm9tIFwiLi9MaXN0ZW5lci9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVHJhbnNmb3JtIGZyb20gXCIuL1RyYW5zZm9ybS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQge1xuICBZbmd3aWVOb2RlIGFzIE5vZGUsXG4gIFluZ3dpZUVsZW1lbnQgYXMgRWxlbWVudCxcbiAgWW5nd2llVGV4dE5vZGUgYXMgVGV4dE5vZGUsXG4gIFluZ3dpZUxpc3RlbmVyIGFzIExpc3RlbmVyLFxuICBZbmd3aWVUcmFuc2Zvcm0gYXMgVHJhbnNmb3JtLFxuICBZbmd3aWVFcnJvciBhcyBFcnJvclxufVxuIiwiaW1wb3J0IFluZ3dpZU1vZGVsIGZyb20gXCIuLi9Nb2RlbC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVmlldyBmcm9tIFwiLi4vVmlldy9tYWluLmpzXCI7XG5pbXBvcnQge0Vycm9yIGFzIFluZ3dpZUVycm9yfSBmcm9tIFwieW5nd2llXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUNvbnRyb2xsZXIge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IHtTVFJJTkc6KC4uLiAtPiAqKX0gLT4geW5nd2llQ29udHJvbGxlclxuICBjb25zdHJ1Y3RvcihyZWdpc3RyeSkge1xuICAgIHRoaXMuX3JlZ2lzdHJ5ID0gcmVnaXN0cnkgfHwge307XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gQk9PTEVBTlxuICAvLyBSZXR1cm5zIGJvb2xlYW4gZm9yIGlmIGFueSBmdW5jdGlvbnMgYXJlIGJvdW5kIHRvIGdpdmVuIElEOlxuICBpc1JlZ2lzdGVyZWQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnlbaWRdICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsICguLi4gLT4gVk9JRCkgLT4gdGhpcztcbiAgLy8gQmluZHMgZnVuY3Rpb24gdG8gZ2l2ZW4gU1RSSU5HOlxuICAvLyBOT1RFOiBGdW5jdGlvbnMgYm91bmQgdG8gc2lnbmFsIElEIGFyZSBzdG9yZWQgaW4gQVJSQVksIHNvIG11bHRpcGxlIGZ1bmN0aW9ucyBjYW4gYmUgYm91bmQgdG8gdGhlIHNhbWUgSURcbiAgcmVnaXN0ZXIoaWQsIGZuKSB7XG4gICAgaWYgKHRoaXMuaXNSZWdpc3RlcmVkKGlkKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuX3JlZ2lzdHJ5W2lkXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLl9yZWdpc3RyeVtpZF0ucHVzaChmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpcztcbiAgLy8gUmVtb3ZlcyBmdW5jdGlvbiBib3VuZCB0byBnaXZlbiBTVFJJTkc6XG4gIC8vIE5PVEU6IElmIElEIGRvZXMgbm90IGV4aXN0LCBhbiB5bmd3aWVFcnJvciBpcyB0aHJvd246XG4gIC8vIE5PVEU6IFVucmVnaXN0ZXJpbmcgc2lnbmFsIHJlbW92ZXMgQUxMIGZ1bmN0aW9ucyBib3VuZCB0byB0aGF0IHNpZ25hbCBJRDpcbiAgdW5yZWdpc3RlcihpZCkge1xuICAgIGlmICh0aGlzLmlzUmVnaXN0ZXJlZChpZCkgPT09IHRydWUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9yZWdpc3RyeVtpZF07XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiTm8gZnVuY3Rpb25zIGJvdW5kIHRvIGdpdmVuIElEXCIsIGlkKTtcbiAgfVxuXG4gIC8vIFNUUklORywgLi4uIC0+IHRoaXM7XG4gIC8vIEFwcGxpZXMgdmFsdWVzIHRvIGZ1bmN0aW9uIGJvdW5kIHRvIHNpZ25hbCBJRFxuICAvLyBOT1RFOiBJZiBJRCBkb2VzIG5vdCBleGlzdCwgYSB5bmd3aWVFcnJvciBpcyB0aHJvd246XG4gIHNpZ25hbCgpIHtcbiAgICBsZXQgaWQgPSBhcmd1bWVudHNbMF07XG4gICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXMuaXNSZWdpc3RlcmVkKGlkKSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fcmVnaXN0cnlbaWRdLmZvckVhY2goZm49PntcbiAgICAgICAgZm4uYXBwbHkodGhpcywgYXJncy5zbGljZSgxKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgZGlzcGF0Y2ggdmFsdWUgdG8gYW4gSUQgdGhhdCBkb2Vzbid0IGV4aXN0XCIsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjoge1NUUklORzpbKi0+Vk9JRF19IC0+IHluZ3dpZUNvbnRyb2xsZXJcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdChyZWdpc3RyeSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihyZWdpc3RyeSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL1V0aWwvbWFpbi5qc1wiO1xuaW1wb3J0IHtFcnJvciBhcyBZbmd3aWVFcnJvcn0gZnJvbSBcInluZ3dpZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVNb2RlbCB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogT0JKRUNUIC0+IHluZ3dpZU1vZGVsXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IGRhdGE7XG4gIH1cblxuICAvLyA6OiBWT0lEfFNUUklORyAtPiBPQkpFQ1RcbiAgLy8gUmV0dXJucyBkYXRhIG9mIG1vZGVsIHdpdGggYXBwbGllZCBzY29wZSwgb3RoZXJ3aXNlIHJldHVybnMgYWxsIGRhdGEgc3RvcmVkIGluIG1vZGVsOlxuICBzdGF0ZShzY29wZSkge1xuICAgIHJldHVybiBzY29wZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fc3RhdGUgOiBZbmd3aWVNb2RlbC5yZXNvbHZlU2NvcGUoc2NvcGUsIHRoaXMuX3N0YXRlKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xPQkpFQ1QgLT4gKiwgT0JKRUNULCBPQkpFQ1QgLT4gKnxWT0lEIC0+IHRoaXM7XG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gc3RhdGUgYW5kIG9wdGlvbmFsIHNjb3BlLCByZXBsYWNpbmcgc3RhdGUgd2l0aCB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb246XG4gIHVwZGF0ZShhLCBiKSB7XG4gICAgbGV0IHR5cGVBcmcgPSBVdGlsLmdldFR5cGUoYSk7XG4gICAgc3dpdGNoICh0eXBlQXJnKSB7XG4gICAgICBjYXNlIFwiRnVuY3Rpb25cIjpcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBhKHRoaXMuX3N0YXRlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgICAgICB0aGlzLl9zdGF0ZVthXSA9IGIodGhpcy5fc3RhdGUsIHRoaXMuc3RhdGUoYSkpO1xuICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgdG8geW5nd2llTW9kZWwudXBkYXRlIGlzIG9mIGFuIHVuc3VwcG9ydGVkIHR5cGVcIiwgdHlwZUFyZyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfCh5bmd3aWVNb2RlbCAtPiBWT0lEKSwgKHluZ3dpZU1vZGVsIC0+IFZPSUQpfFZPSUQgLT4gVk9JRFxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIGV2ZXJ5IGVsZW1lbnQgb2Ygc2NvcGUsIGlmIG9ubHkgZnVuY3Rpb24gaXMgZ2l2ZW4gdGhlbiBpdCdzIGFwcGxpZWQgdG8gZXZlcnkgZWxlbWVudCBvZiBzdGF0ZTpcbiAgZWFjaChhLCBiKSB7XG4gICAgbGV0IHR5cGVBcmcgPSBVdGlsLmdldFR5cGUoYSk7XG4gICAgc3dpdGNoICh0eXBlQXJnKSB7XG4gICAgICBjYXNlIFwiRnVuY3Rpb25cIjpcbiAgICAgICAgdGhpcy5fc3RhdGUuZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgYShZbmd3aWVNb2RlbC5pbml0KGVsZW0pKTtcbiAgICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZShhKTtcbiAgICAgICAgaWYgKHN0YXRlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBzdGF0ZS5mb3JFYWNoKGVsZW09PntcbiAgICAgICAgICAgIGIoWW5nd2llTW9kZWwuaW5pdChlbGVtKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiU2NvcGUgaXMgbm90IGFuIGFycmF5XCIsIHR5cGVBcmcpO1xuICAgICAgICB9XG4gICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCB0byBZbmd3aWVNb2RlbC5mb3JFYWNoIGlzIG9mIGFuIHVuc3VwcG9ydGVkIHR5cGVcIiwgdHlwZUFyZyk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogU1RSSU5HLCAqfFZPSUQgLT4gdGhpc3wqXG4gIC8vIFNldHMgb3IgZ2V0cyBwcm9wZXJ0eSBmcm9tIG1vZGVsOlxuICBwcm9wKGlkLCB2YWwpIHtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLl9zdGF0ZVtpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVbaWRdO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiTm8gcHJvcGVydHkgZm91bmQgZm9yIGdpdmVuIElEXCIsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3RhdGVbaWRdID0gdmFsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogT0JKRUNUIC0+IHluZ3dpZU1vZGVsXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQoZGF0YSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llTW9kZWwoZGF0YSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIE9CSkVDVCAtPiBPQkpFQ1R8VU5ERUZJTkVEXG4gIC8vIFJldHVybnMgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gc2NvcGUgLSBpZiBzY29wZSBjYW4ndCByZSByZXNvbHZlZCB0aGVuIFVOREVGSU5FRCBpcyByZXR1cm5lZDpcbiAgc3RhdGljIHJlc29sdmVTY29wZShzY29wZSwgb2JqKSB7XG4gICAgaWYgKHNjb3BlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBzY29wZXMgPSBzY29wZS5zcGxpdChcIi5cIik7XG4gICAgICBsZXQgcmVzdWx0ID0gb2JqO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29wZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGN1cnJlbnRTY29wZSA9IHNjb3Blc1tpXTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0W2N1cnJlbnRTY29wZV07XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgLy8gOjogT0JKRUNUfHluZ3dpZU1vZGVsIC0+IHluZ3dpZU1vZGVsXG4gIC8vIFJldHVybnMgdmFsdWUgYXMgeW5nd2llTW9kZWw6XG4gIHN0YXRpYyBzZXRBc01vZGVsKG1vZGVsKSB7XG4gICAgcmV0dXJuIG1vZGVsIGluc3RhbmNlb2YgWW5nd2llTW9kZWxcbiAgICAgID8gbW9kZWxcbiAgICAgIDogWW5nd2llTW9kZWwuaW5pdChtb2RlbCk7XG4gIH1cblxufVxuIiwiLy8gU2luZ2xldG9uIG9mIHV0aWxpdHkgbWV0aG9kczpcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAvLyA6OiAqIC0+IFNUUklOR1xuICAvLyBSZXR1cm5zIHR5cGUgb2YgZ2l2ZW4gdmFsdWUgYXMgU1RSSU5HOlxuICBzdGF0aWMgZ2V0VHlwZSh2YWwpIHtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHJldHVybiBcIm51bGxcIjtcbiAgICByZXR1cm4gdmFsLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbiAgXG59XG4iLCJpbXBvcnQge0VsZW1lbnQgYXMgWW5nd2llRWxlbWVudCwgRXJyb3IgYXMgWW5nd2llRXJyb3J9IGZyb20gXCJ5bmd3aWVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llVmlldyB7XG5cbiAgLy8gOjogQ09OU1RSVUNUT1IgOjogeW5nd2llRWxlbWVudHxWT0lEIC0+IHluZ3dpZVZpZXdcbiAgY29uc3RydWN0b3IoeW5nd2llRWxlbWVudCkge1xuICAgIHRoaXMuX2VsZW0gPSAoKSA9PiB5bmd3aWVFbGVtZW50O1xuICAgIHRoaXMuX2ZucyA9IFtdO1xuICAgIHRoaXMuX25vZGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgfVxuXG4gIC8vIDo6IFZPSUR8eW5nd2llRWxlbWVudHxTVFJJTkcsIFNUUklORywgT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVMaXN0ZW5lcl0gLT4geW5nd2llRWxlbWVudHx0aGlzfHRoaXNcbiAgLy8gU2V0dGVyL2dldHRlciBtZXRob2QgZm9yIHluZ3dpZUVsZW1lbnQgc3RvcmVkIGJ5IHZpZXc6XG4gIC8vIE5PVEU6IEdldHRpbmcgdGhlIHluZ2l3ZUVsZW1lbnQgc3RvcmVkIGJ5IHZpZXcgd2lsbCBhcHBseSBldmVyeSBzdG9yZWQgbW9kaWZlciBmdW5jdGlvbiB0byB0aGF0IHluZ3dpZUVsZW1lbnRcbiAgZWxlbShhcmcpIHtcbiAgICBzd2l0Y2ggKFV0aWwuZ2V0VHlwZShhcmcpKSB7XG4gICAgICAvLyBBcHBsaWVzIHZpZXcgdG8gZXZlcnkgbW9kaWZpZXIgZnVuY3Rpb24sIGlmIHRoZXJlIGFyZSBubyBtb2RpZmVyIGZ1bmN0aW9ucyBlbGVtIGlzIHJldHVybmVkOlxuICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fZm5zLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IHRoaXMuX2Zucy5yZWR1Y2UoKHZpZXcsIGZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm4odmlldyk7XG4gICAgICAgICAgfSwgdGhpcy5fZWxlbSgpKVxuICAgICAgICAgIDogdGhpcy5fZWxlbSgpO1xuICAgICAgLy8gU2V0cyBfZWxlbSB0byBnaXZlbiB5bmd3aWVFbGVtZW50OlxuICAgICAgY2FzZSBcIlluZ3dpZUVsZW1lbnRcIjpcbiAgICAgICAgdGhpcy5fZWxlbSA9ICgpID0+IGFyZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAvLyBUcmllcyB0byBpbml0YWxpemUgeW5nd2llRWxlbWVudCB1c2luZyBnaXZlbiBhcmd1bWVudHM6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdGhpcy5fZWxlbSA9ICgpID0+IFluZ3dpZUVsZW1lbnQuaW5pdC5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogKHluZ3dpZUVsZW1lbnQgLT4geW5nd2llRWxlbWVudCkgLT4gdGhpc1xuICAvLyBBZGRzIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIHluZ3dpZUVsZW1lbnQgd2hlbiB2aWV3IGlzIHJldHJpZXZlZCBvciByZW5kZXJlZDpcbiAgbW9kaWZ5KGZuKSB7XG4gICAgdGhpcy5fZm5zLnB1c2goZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCAoRVZFTlQsIE5PREUgLT4gVk9JRCkgLT4gdGhpc1xuICAvLyBJbml0aWFsaXplcyB5bmd3aWVMaXN0ZW5lciBmb3IgeW5nd2llRWxlbWVudCBzdG9yZWQgYnkgdmlldzpcbiAgb24oaWQsIGZuKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kaWZ5KHluZ3dpZUVsZW1lbnQ9PntcbiAgICAgIHJldHVybiB5bmd3aWVFbGVtZW50Lm9uKGlkLCBmbik7XG4gICAgfSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpc1xuICAvLyBNb2RpZmVzIGVsZW1lbnQgb2YgdmlldyB0byBzaG93IGdpdmVuIHRleHQ6XG4gIHRleHQoc3RyKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kaWZ5KHluZ3dpZUVsZW1lbnQ9PntcbiAgICAgIHJldHVybiB5bmd3aWVFbGVtZW50LnRleHQoc3RyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIDo6IHluZ3dpZVZpZXcgLT4gdGhpcztcbiAgLy8gQXBwZW5kcyBhbm90aGVyIHluZ3dpZVZpZXcgdG8gdGhpcyB2aWV3OlxuICBhcHBlbmQoeW5nd2llVmlldykge1xuICAgIGlmIChZbmd3aWVWaWV3LmlzKHluZ3dpZVZpZXcpKSB7XG4gICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKHluZ3dpZVZpZXcpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgYSB5bmd3aWVWaWV3IGNhbiBiZSBhcHBlbmRlZCB0byBhbm90aGVyIHluZ3dpZVZpZXdcIiwgeW5nd2llVmlldyk7XG4gIH1cblxuICAvLyA6OiBbeW5nd2llVmlld10gLT4gdGhpc1xuICAvLyBBcHBlbmRzIGFycmF5IG9mIHluZ3dpZVZpZXdzIHRvIHRoaXMgdmlldzpcbiAgYXBwZW5kcyh5bmd3aWVWaWV3cykge1xuICAgIGlmICh5bmd3aWVWaWV3cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4geW5nd2llVmlld3MucmVkdWNlKChyZXN1bHQsIHZpZXcpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5hcHBlbmQodmlldyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiRXhwZWN0ZWQgQVJSQVkgdG8gYXBwZW5kIHluZ3dpZVZpZXdzIHRvIHRoaXMgeW5nd2llVmlld1wiLCB5bmd3aWVWaWV3cyk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RUxFTUVOVHxWT0lELCBPQkpFQ1R8Vk9JRCAtPiBFTEVNRU5UXG4gIC8vIENyZWF0ZXMgYW5kIHJldHVybnMgcmVuZGVyZWQgRUxFTUVOVCBmcm9tIHZpZXcsIHN0b3JpbmcgcmVzdWx0IG9mIHJlbmRlcjpcbiAgcmVuZGVyKHRhcmdldCwgY29udGV4dCkge1xuICAgIC8vIFN0b3JlIHJlc3VsdCBvZiByZW5kZXI6XG4gICAgdGhpcy5fbm9kZSA9IFluZ3dpZVZpZXcucmVuZGVyKHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG4gICAgLy8gUmV0dXJuIHJlbmRlcjpcbiAgICByZXR1cm4gdGhpcy5fbm9kZTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gRUxFTUVOVFxuICAvLyBSZS1yZW5kZXJzIHZpZXcgdXNpbmcgc3RvcmVkIG5vZGU6XG4gIC8vIE5PVEU6IElmIG5vIG5vZGUgaGFzIGJlZW4gc3RvcmVkLCB0aGVuIGEgeW5nd2llRXJyb3IgaXMgdGhyb3duOlxuICByZW5kZXJBZ2FpbigpIHtcbiAgICBpZiAodGhpcy5fbm9kZSkge1xuICAgICAgbGV0IHJlc3VsdCA9IFluZ3dpZVZpZXcucmVuZGVyKHRoaXMpO1xuICAgICAgdGhpcy5fbm9kZS5yZXBsYWNlV2l0aChyZXN1bHQpO1xuICAgICAgdGhpcy5fbm9kZSA9IHJlc3VsdDtcbiAgICAgIHJldHVybiB0aGlzLl9ub2RlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub250IHJlLXJlbmRlciB2aWV3IGJlY2F1c2UgaXQgaGFzbid0IGJlZW4gcmVuZGVyZWQgeWV0LlwiKTtcbiAgfVxuXG4gIC8vIFNUUklOR3xOT0RFLCBPQkpFQ1R8Vk9JRCAtPiBFTEVNRU5UXG4gIC8vIEVtcHRpZXMgY29udGVudCBvZiBnaXZlbiB0YXJnZXQgYW5kIGFwcGVuZHMgaXQgd2l0aCByZW5kZXJlZCBub2RlOlxuICBpbmplY3QodGFyZ2V0LCBjb250ZXh0KSB7XG4gICAgbGV0IHJlbmRlciA9IHRoaXMucmVuZGVyKCk7XG4gICAgbGV0IGVsZW0gPSBZbmd3aWVWaWV3LnNldEFzTm9kZSh0YXJnZXQsIGNvbnRleHQpO1xuICAgIGVsZW0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBlbGVtLmFwcGVuZChyZW5kZXIpO1xuICAgIHJldHVybiBlbGVtO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiB5bmd3aWVFbGVtZW50fFNUUklORywgU1RSSU5HLCBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUxpc3RlbmVyXSAtPiB5bmd3aWVWaWV3XG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQoeW5nd2llRWxlbWVudCkge1xuICAgIHN3aXRjaCAoVXRpbC5nZXRUeXBlKHluZ3dpZUVsZW1lbnQpKSB7XG4gICAgICBjYXNlIFwiWW5nd2llRWxlbWVudFwiOlxuICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICByZXR1cm4gbmV3IFluZ3dpZVZpZXcoeW5nd2llRWxlbWVudCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZXQgZWxlbSA9IFluZ3dpZUVsZW1lbnQuaW5pdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gbmV3IFluZ3dpZVZpZXcoZWxlbSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogKiAtPiBCT09MRUFOXG4gIC8vIFJldHVybiBUUlVFIGlmIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIFluZ3dpZVZpZXdcbiAgc3RhdGljIGlzKHZhbCkge1xuICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBZbmd3aWVWaWV3O1xuICB9XG5cbiAgLy8gU1RSSU5HfEVMRU1FTlR8Vk9JRCwgRE9DVU1FTlR8Vk9JRCAtPiBFTEVNRU5UfERPQ1VNRU5URlJBR01FTlRcbiAgLy8gUmV0dXJucyBOT0RFIGZvciBnaXZlbiB0YXJnZXQgYW5kIGNvbnRleHRcbiAgc3RhdGljIHNldEFzTm9kZSh0YXJnZXQsIGNvbnRleHQpIHtcbiAgICBsZXQgYXJnVHlwZSA9IFV0aWwuZ2V0VHlwZSh0YXJnZXQpO1xuICAgIHN3aXRjaCAoYXJnVHlwZSkge1xuICAgICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgICAgICByZXR1cm4gY29udGV4dCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgICA6IGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICAgICAgY2FzZSBcIkVsZW1lbnRcIjpcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgcmV0dXJuIG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJBcmd1bWVudCBjYW5ub3QgYmUgYSBOT0RFXCIsIGFyZ1R5cGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IHludmlld1ZpZXcsIFNUUklOR3xFTEVNRU5UfFZPSUQsIERPQ1VNRU5UfFZPSUQgLT4gRUxFTUVOVFxuICAvLyBSZW5kZXJzIGdpdmVuIHZpZXcgYW5kIGFsbCBvZiBpdCBjaGlsZHJlbiB1c2luZyBnaXZlbiB0YXJnZXQgYW5kIGNvbnRleHQ6XG4gIHN0YXRpYyByZW5kZXIodmlldywgdGFyZ2V0LCBjb250ZXh0KSB7XG4gICAgbGV0IGVsZW0gPSB2aWV3LmVsZW0oKTtcbiAgICBsZXQgbm9kZSA9IFluZ3dpZVZpZXcuc2V0QXNOb2RlKHRhcmdldCwgY29udGV4dCk7XG4gICAgbGV0IHJlc3VsdCA9IHZpZXcuX2NoaWxkcmVuLnJlZHVjZSgoZWxlbSwgY2hpbGQpID0+IHtcbiAgICAgIGxldCB2aWV3ID0gY2hpbGQucmVuZGVyKCk7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKHZpZXcpO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSwgZWxlbSA9PT0gdW5kZWZpbmVkID8gbm9kZSA6IGVsZW0ucmVuZGVyKG5vZGUpKTtcbiAgICByZXR1cm4gcmVzdWx0IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudFxuICAgICAgPyByZXN1bHQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICAgIDogcmVzdWx0O1xuICB9XG5cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFluZ3dpZU1vZGVsIGZyb20gXCIuL01vZGVsL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVWaWV3IGZyb20gXCIuL1ZpZXcvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUNvbnRyb2xsZXIgZnJvbSBcIi4vQ29udHJvbGxlci9tYWluLmpzXCI7XG5pbXBvcnQge1RyYW5zZm9ybSwgRXJyb3J9IGZyb20gXCJ5bmd3aWVcIjtcblxuZXhwb3J0IHtcbiAgWW5nd2llTW9kZWwgYXMgTW9kZWwsXG4gIFluZ3dpZVZpZXcgYXMgVmlldyxcbiAgWW5nd2llQ29udHJvbGxlciBhcyBDb250cm9sbGVyLFxuICBUcmFuc2Zvcm0sXG4gIEVycm9yXG59XG4iXSwic291cmNlUm9vdCI6IiJ9