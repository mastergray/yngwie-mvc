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

  // :: STRING, (... -> *) -> this
  // Ensures only one function is bound to the given signal ID:
  registerOnce(id, fn) {
    this._registry[id] = [fn];
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
    this._elem = yngwieElement || yngwie__WEBPACK_IMPORTED_MODULE_0__.Element.init("div");
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
        return  this._fns.reduce((view, fn) => {
          return fn(view);
        }, this._elem);
      // Sets _elem to given yngwieElement:
      case "YngwieElement":
        this._elem = arg;
        return this;
      // Tries to initalize yngwieElement using given arguments:
      default:
        this._elem = yngwie__WEBPACK_IMPORTED_MODULE_0__.Element.init.apply(null, arguments);
        return this;
    }
  }

  // :: (yngwieElement -> yngwieElement) -> this
  // Adds function to apply to yngwieElement when view is retrieved or rendered:
  modify(fn) {
    this._fns.push(fn);
    return this;
  }

  // :: (yngwieElement -> yngwieElement) -> this
  // Ensure only the given function will modify the yngwieElement of this view:
  modifyOnce(fn) {
    this._fns = [fn];
    return this;
  }

  // :: STRING, (EVENT, NODE -> VOID) -> this
  // Initializes yngwieListener for yngwieElement stored by view:
  on(id, fn) {
    this._elem.on(id, fn);
    return this;
  }

  // :: STRING -> this
  // Sets text of yngwieElment for this view:
  text(str) {
    this._elem.text(str);
    return this;
  }

  // :: OBJECT|VOID -> this|OBJECT
  // Sets or gets attributes of yngwieElment for this view:
  attribs(arg) {
    let argtype = _Util_main_js__WEBPACK_IMPORTED_MODULE_1__.default.getType(arg).toUpperCase();
    switch (argtype) {
      case "OBJECT":
        this._elem.attribs(arg);
        return this;
      case "UNDEFINED":
        return this._elem.attribs();
      default:
        throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Cannot set or get attributes of yngwieView for type of given arugment", argtype);
    }
  }

  // :: STRING, *|VOID -> this|*
  // Sets or get attribute of yngwieElement:
  attrib(attr, val) {
    let attrType = _Util_main_js__WEBPACK_IMPORTED_MODULE_1__.default.getType(attr).toUpperCase();
    let valType = _Util_main_js__WEBPACK_IMPORTED_MODULE_1__.default.getType(val).toUpperCase();
    if (attrType === "STRING") {
      if (attrType !== "UNDEFINED") {
        this._elem.setAttribute(attr, val);
        return this;
      }
      return this._elem.getAttribute(attr);
    }
    throw new yngwie__WEBPACK_IMPORTED_MODULE_0__.Error("Name of attribute must be of type STRING", attrType);
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
/* harmony export */   "Transform": () => (/* reexport safe */ yngwie__WEBPACK_IMPORTED_MODULE_4__.Transform),
/* harmony export */   "Error": () => (/* reexport safe */ yngwie__WEBPACK_IMPORTED_MODULE_4__.Error),
/* harmony export */   "Util": () => (/* reexport safe */ _Util_main_js__WEBPACK_IMPORTED_MODULE_3__.default)
/* harmony export */ });
/* harmony import */ var _Model_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model/main.js */ "./src/Model/main.js");
/* harmony import */ var _View_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View/main.js */ "./src/View/main.js");
/* harmony import */ var _Controller_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controller/main.js */ "./src/Controller/main.js");
/* harmony import */ var _Util_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Util/main.js */ "./src/Util/main.js");
/* harmony import */ var yngwie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! yngwie */ "./node_modules/yngwie/src/main.js");








})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWVNVkMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZU1WQy8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL0VsZW1lbnQvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvLi9ub2RlX21vZHVsZXMveW5nd2llL3NyYy9FcnJvci9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZU1WQy8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL0xpc3RlbmVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvTm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZU1WQy8uL25vZGVfbW9kdWxlcy95bmd3aWUvc3JjL1RleHROb2RlL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvVHJhbnNmb3JtL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDLy4vbm9kZV9tb2R1bGVzL3luZ3dpZS9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvLi9zcmMvQ29udHJvbGxlci9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZU1WQy8uL3NyYy9Nb2RlbC9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZU1WQy8uL3NyYy9VdGlsL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDLy4vc3JjL1ZpZXcvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llTVZDL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWVNVkMvLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWeUM7QUFDUTtBQUNOOztBQUU1Qiw0QkFBNEIsa0RBQVU7O0FBRXJEO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsa0NBQWtDO0FBQ2xDLHNCQUFzQjtBQUN0Qix5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkRBQW1CO0FBQ3RDO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMseUNBQVc7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzREFBd0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDBEQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHlDQUFXO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O1VDM01BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjBDO0FBQ0Y7QUFDWTtBQUNsQjtBQUNNOztBQVN2QyIsImZpbGUiOiJ5bmd3aWUtbXZjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiWW5nd2llTVZDXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlluZ3dpZU1WQ1wiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVMaXN0ZW5lciBmcm9tIFwiLi4vTGlzdGVuZXIvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUVsZW1lbnQgZXh0ZW5kcyBZbmd3aWVOb2RlIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcuIE9CSkVDVCwgU1RSSU5HLCBbeW5nd2llTGlzdGVuZXJdIC0+IHluZ3dpZUVsZW1lbnRcbiAgY29uc3RydWN0b3IodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgbGlzdGVuZXJzKSB7XG4gICAgc3VwZXIodGFnTmFtZS50b1VwcGVyQ2FzZSgpKTsgICAgIC8vIFN0b3JlcyB0YWdOYW1lIGluIEFMTCBDQVBTXG4gICAgdGhpcy5fYXR0cmlicyA9IGF0dHJpYnMgfHwge307ICAgICAvLyBFbGVtZW50IEF0dHJpYnV0ZXNcbiAgICB0aGlzLl90ZXh0ID0gdGV4dDsgICAgICAgICAgICAgICAgIC8vIEVsZW1lbnQgdGV4dCB0aGF0J3MgYXBwZW5kZWQgYXMgZmlyc3QgY2hpbGQgb2YgdGhpcyBlbGVtZW50XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gW107ICAgICAgICAgICAgLy8gTGlzdGVuZXJzIGJvdW5kIHRvIHRoaXMgZWxlbWVudFxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gUmV0dXJucyB0YWdOYW1lIG9mIHRoaXMgZWxlbWVudDpcbiAgdGFnTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICAvLyA6OiBPQkpFQ1R8Vk9JRCAtPiB0aGlzfE9CSkVDVFxuICAvLyBTZXRzIFwiYXR0cmlic1wiIE9CSkVDVCB3aXRoIGdpdmVuIE9CSkVDVDpcbiAgLy8gTk9URTogSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHNldCBhdHRyaWJ1dGVzIGFyZSByZXR1cm5lZDpcbiAgYXR0cmlicyhhdHRyaWJzKSB7XG4gICAgaWYgKGF0dHJpYnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2F0dHJpYnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YoYXR0cmlicykgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhpcy5fYXR0cmlicyA9IGF0dHJpYnM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiWW5nd2llRWxlbWVudCBhdHRyaWJ1dGVzIGNhbiBvbmx5IGJlIHNldCB3aXRoIE9CSkVDVFwiLCBhdHRyaWJzKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gQk9PTEVBTlxuICAvLyBSZXR1cm5zIEJPT0xFQU4gZm9yIGlmIGF0dHJpYnV0ZSB3aXRoIGdpdmVuIG5hbWUgZXhpc3RzIGluIFwiYXR0cmlic1wiIE9CSkVDVDpcbiAgaGFzQXR0cmlidXRlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlicy5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiAqfFVOREVGSU5FRFxuICAvLyBSZXR1cm5zIHZhbHVlIG9mIGF0dHJpYnV0ZSBieSBuYW1lIHN0b3JlZCBpbiBcImF0dHJpYnNcIiBPQkpFQ1QsIG90aGVyd2lzZSByZXR1cm5zIFVOREVGSU5FRFxuICBnZXRBdHRyaWJ1dGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJzW25hbWVdO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCAqIC0+IHRoaXNcbiAgLy8gQmluZHMgIHZhbHVlIHRvIFwiYXR0cmlic1wiIE9CSkVDVCB3aXRoIGdpdmVuIG5hbWU6XG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMuX2F0dHJpYnNbbmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiB0aGlzXG4gIC8vIFJlbW92ZSBhdHRyaWJ1dGUgd2l0aCBnaXZlbiBuYW1lIGZyb20gXCJhdHRyaWJzXCIgT0JKRUNUOlxuICByZW1vdmVBdHRyaWJ1dGUobmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLl9hdHRyaWJzW25hbWVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfFZPSUQgLT4gdGhpc3xVTkRFRklORURcbiAgLy8gQXBwZW5kcyB0ZXh0IG5vZGUgYXMgZmlyc3QgY2hpbGQgb2YgZWxlbWVudCBhdCByZW5kZXIgd2l0aCBnaXZlbiBzdHJpbmcgYXMgaXQncyB2YWx1ZTpcbiAgLy8gTk9URTogSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHNldCB0ZXh0IGlzIHJldHVybmVkOlxuICB0ZXh0KHN0cikge1xuICAgIGlmIChzdHIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Yoc3RyKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aGlzLl90ZXh0ID0gc3RyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIlRleHQgb2YgZWxlbWVudCBjYW4gb25seSBiZSBzZXQgd2l0aCBhIFNUUklOR1wiLCBzdHIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gdGhpc1xuICAvLyBTZXRzIHRleHQgYXMgVU5ERUZJTkVEIGZvciB0aGlzIGVsZW1lbnQ6XG4gIHJlbW92ZVRleHQoKSB7XG4gICAgdGhpcy5fdGV4dCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6ICh5bmd3aWVFbGVtZW50IC0+IEJPT0xFQU4pIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFsbCB0aGUgZWxlbWVudHMgdGhhdCwgd2hlbiB0aGUgZ2l2ZW4gZnVuY3Rpb24gaXMgYXBwbGllZCB0byB0aGlzIGVsZW1lbnRzIGFuZCBpdCdzIGRlc2VuZGFudHMsIHRoYXQgZnVuY3Rpb24gcmV0dXJucyBUUlVFOlxuICBnZXRFbGVtZW50c0J5KGZuKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2UoKG5vZGUsIHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVFbGVtZW50KSB7XG4gICAgICAgIGlmIChmbihub2RlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiBZbmd3aWVFbGVtbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gdGFnTmFtZTpcbiAgLy8gTk9URTogUmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gdGFnIG5hbWU6XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5KGVsZW0gPT4gZWxlbS50YWdOYW1lKCkgPT09IHRhZ05hbWUpO1xuICB9XG5cbiAgLy8gU1RSSU5HLCBTVFJJTkd8Vk9JRCAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiB5bmd3aWVFbGVtZW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIGF0dHJpYnV0ZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZTpcbiAgLy8gTk9URTogSWYgbm8gdmFsdWUgaXMgZ2l2ZW4sIHRoZW4gYW55IGVsZW1lbnQgdGhhdCBoYXMgdGhlIGdpdmVuIGF0dHJpYnV0ZSBuYW1lIGlzIHJldHVybmVkXG4gIGdldEVsZW1lbnRzQnlBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5KGVsZW0gPT4ge1xuICAgICAgaWYgKGVsZW0uaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gU1RSSU5HIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFsbCBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIGNsYXNzIG5hbWVcbiAgLy8gTk9URTogUmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gY2xhc3MgbmFtZTpcbiAgZ2V0RWxlbWVudHNCeUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnlBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc05hbWUpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBZbmd3aWVFbGVtZW50IHRoYXQgaGFzIHRoZSBnaXZlbiBJRDpcbiAgLy8gTk9URTogUmV0dXJucyBVTkRFRklORUQgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIElEXG4gIGdldEVsZW1lbnRCeUlEKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShcImlkXCIsIGlkKS5wb3AoKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgWyhFVkVOVCwgRUxFTUVOVCkgLT4gVk9JRF18KEVWRU5ULCBFTEVNRU5UKSAtPiBWT0lEIC0+ICB0aGlzXG4gIC8vIEJpbmRzIGxpc3RlbmVyIGJ5IGV2ZW50IG5hbWUgdG8gbm9kZSBhdCByZW5kZXI6XG4gIC8vIE5PVEU6IEZ1bmN0aW9uIGJvdW5kIHRvIGxpc3RlbmVyIGlzIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiB0aGlzIGVsZW1lbnRcbiAgb24oZXZ0TmFtZSwgZm5zKSB7XG4gICAgbGV0IGxpc3RlbmVyID0gWW5nd2llTGlzdGVuZXIuaW5pdChldnROYW1lLCBmbnMpO1xuICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFZPSUQgLT4geW5nd2llRWxlbWVudFxuICAvLyBSZXR1cm5zIGNsb25lIG9mIHRoaXMgeW5nd2llRWxlbWVudDpcbiAgY2xvbmUoKSB7XG5cbiAgICAvLyBDb3B5IHRhZ25hbWU6XG4gICAgbGV0IHRhZ05hbWUgPSBgJHt0aGlzLl92YWx1ZX1gO1xuXG4gICAgLy8gQ29weSBhdHRyaWJ1dGVzOlxuICAgIGxldCBhdHRyaWJzID0gT2JqZWN0LmtleXModGhpcy5fYXR0cmlicykucmVkdWNlKChyZXN1bHQsIGlkKSA9PiB7XG4gICAgICByZXN1bHRbaWRdID0gYCR7dGhpcy5fYXR0cmlic1tpZF19YDtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pO1xuXG4gICAgLy8gQ29weSBzZXQ6XG4gICAgbGV0IHRleHQgPSB0aGlzLl90ZXh0ICE9PSB1bmRlZmluZWRcbiAgICAgID8gYCR7dGhpcy5fdGV4dH1gXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIC8vIENvcHkgbGlzdGVuZXJzOlxuICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMubWFwKChsaXN0ZW5lcikgPT4ge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLmNsb25lKCk7XG4gICAgfSk7XG5cbiAgICAvLyBDb3B5IGNoaWxkcmVuIGFuZCByZXR1cm4gZWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IG5ldyBZbmd3aWVFbGVtZW50KHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGxpc3RlbmVycyk7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4oKS5yZWR1Y2UoKGVsZW0sIGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZCA9IGNoaWxkLmNsb25lKCk7XG4gICAgICByZXR1cm4gZWxlbS5hcHBlbmQoY2hpbGQpO1xuICAgIH0sIGVsZW0pO1xuXG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RUxFTUVOVCwgT0JKRUNUIC0+IEVMRU1FTlRcbiAgLy8gVHJhbnNmb3JtcyB0aGlzIGVsZW1lbnQgYW5kIGl0J3MgZGVzZW5kYW50cyBpbnRvIGEgRE9NIEVMRU1FTlQsIGFwcGVuZGluZyByZXN1bHQgdG8gZ2l2ZW4gdGFyZ2V0XG4gIC8vIGFuZCByZW5kZXJpbmcgdGhhdCBFTEVNRU5UIGluIHRoZSBjb250ZXh0IG9mIHRoZSBnaXZlbiBPQkpFQ1QuIElmIG5vIHRhcmdldCB0byBhcHBlbmQgaXMgZ2l2ZW4sXG4gIC8vIHRoZSByZW5kZXJlZCBFTEVNRU5UIGlzIHJldHVybmVkLiBJZiBubyBjb250ZXh0IGlzIGdpdmVuLCB0aGVuIERPQ1VNRU5UIGlzIHVzZWQgYnkgZGVmYXVsdC5cbiAgcmVuZGVyKHRhcmdldCwgY3R4KSB7XG5cbiAgICAvLyBDaGVjayBpZiBkZWZhdWx0IGNvbnRleHQgb2YgRE9DVU1FTlQgc2hvdWxkIGJlIHVzZWQ6XG4gICAgbGV0IGNvbnRleHQgPSBjdHggPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogY3R4O1xuXG4gICAgLy8gSW50aWFsaXplIERPTUVsZW1lbnQ6XG4gICAgbGV0IGVsZW0gPSBPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJzKS5yZWR1Y2UoKGVsZW0sIGlkKSA9PiB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShpZCwgdGhpcy5fYXR0cmlic1tpZF0pO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSwgY29udGV4dC5jcmVhdGVFbGVtZW50KHRoaXMuX3ZhbHVlKSk7XG5cbiAgICAvLyBCaW5kIExpc3RlbmVyczpcbiAgICBlbGVtID0gdGhpcy5fbGlzdGVuZXJzLnJlZHVjZSgoZWxlbSwgbGlzdGVuZXIpID0+IHtcbiAgICAgIHJldHVybiBsaXN0ZW5lci5yZW5kZXIoZWxlbSwgdGhpcyk7XG4gICAgfSwgZWxlbSk7XG5cbiAgICAvLyBJZiBzZXQsIGNyZWF0ZSBhbmQgYXBwZW5kIHRleHQgbm9kZTpcbiAgICBpZiAodHlwZW9mKHRoaXMuX3RleHQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBsZXQgZWxlbVRleHQgPSBjb250ZXh0LmNyZWF0ZVRleHROb2RlKHRoaXMuX3RleHQpO1xuICAgICAgZWxlbS5hcHBlbmRDaGlsZChlbGVtVGV4dCk7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIGFuZCBhcHBlbmQgYWxsIGNoaWxkcmVuIGFuZCByZXR1cm4gcmVzdWx0OlxuICAgIGxldCByZXN1bHQgPSB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChyZXN1bHQsIGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZCA9IGNoaWxkLnJlbmRlcigpO1xuICAgICAgcmVzdWx0LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgZWxlbSk7XG5cbiAgICAvLyBJZiB0YXJnZXQgaXMgZ2l2ZW4sIGFwcGVuZHMgcmVzdWx0IG9mIHJlbmRlciB0byB0aGF0IHRhcmdldDpcbiAgICBpZiAodGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIElmIHRhcmdldCBpcyBzdHJpbmcsIGZpbmQgbm9kZSB1c2luZyBxdWVyeSBzZWxlY3RvcjpcbiAgICAgIGlmICh0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KS5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJpc2UgYXNzdW1lIHRoYXQgdGFyZ2V0IGlzIERPTUVsZW1lbnQ6XG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogU1RSSU5HLiBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUxpc3RlbmVyXSAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgbGlzdGVuZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVFbGVtZW50KHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGxpc3RlbmVycylcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xFTEVNRU5ULCBbeW5nd2llRWxlbWVudF0sIE9CSkVDVCAtPiBFTEVNRU5UXG4gIC8vIFJlbmRlcnMgYW4gYXJyYXkgb2YgeW5nd2llRWxlbWVudHMgaW4gdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFwcGVuZHMgcmVzdWx0IHRvIGdpdmVuIHRhcmdldDpcbiAgLy8gTk9URTogRUxFTUVOVCBvZiB0YXJnZXQgaXMgcmV0dXJuZWRcbiAgc3RhdGljIHJlbmRlclRvKHRhcmdldCwgZWxlbXMsIGN0eCkge1xuICAgIGxldCBjb250ZXh0ID0gY3R4ID09PSB1bmRlZmluZWQgPyBkb2N1bWVudCA6IGN0eDtcbiAgICBpZiAoZWxlbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgbGV0IG5vZGUgPSB0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgIDogdGFyZ2V0O1xuICAgICAgcmV0dXJuIGVsZW1zLnJlZHVjZSgocmVzdWx0LCBlbGVtKSA9PiB7XG4gICAgICAgIGlmIChlbGVtIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgICAgIGVsZW0ucmVuZGVyKHJlc3VsdCk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFluZ3dpZUVsZW1lbnQgY2FuIGJlIHJlbmRlcmVkIHRvIHRhcmdldFwiLCBlbGVtKTtcbiAgICAgIH0sIG5vZGUpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJFeHBlY3RlZCBhcnJheSBhcyBhcmd1bWVudFwiLCBlbGVtcyk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RUxFTUVOVCwgeW5nd2llRWxlbWVudCwgT0JKRUNUIC0+IEVMRU1FTlRcbiAgLy8gUmVwbGFjZXMgdGhlIGdpdmVuIHRhcmdldCB3aXRoIHRoZSByZW5kZXIgb2YgdGhlIGdpdmVuIGluc3RhbmNlICBvZiBZbmd3aWVFbGVtZW50IGluIHRoZSBnaXZlbiBjb250ZXh0OlxuICBzdGF0aWMgaW5qZWN0KHRhcmdldCwgZWxlbSwgY3R4KSB7XG4gICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBZbmd3aWVFbGVtZW50KSB7XG4gICAgICBsZXQgY29udGV4dCA9IGN0eCA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBjdHg7XG4gICAgICBsZXQgbm9kZSA9IHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgOiB0YXJnZXQ7XG4gICAgICBsZXQgcmVzdWx0ID0gZWxlbS5yZW5kZXIoKTtcbiAgICAgIG5vZGUucmVwbGFjZVdpdGgocmVzdWx0KTtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFluZ3dpZUVsZW1lbnQgY2FuIGJlIGluamVjdGVkIGludG8gdGFyZ2V0XCIsIGVsZW0pO1xuICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORywgKiAtPiBFUlJPUlxuICAvLyBOT1RFIDo6IFwiZGF0YVwiIGFyZ3VtZW50IGlzIGFsd2F5cyBjYXN0IGFzIFNUUklORzpcbiAgY29uc3RydWN0b3IobXNnLCBkYXRhKSB7XG4gICAgc3VwZXIobXNnKTtcbiAgICB0aGlzLmRhdGEgPSBgJHtkYXRhfWA7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+ICBWT0lEXG4gIC8vIENvbnNvbGVzIG91dCBzdGFjayB0cmFjZSBvZiBlcnJvciwgYWxvbmcgd2l0aCB0aGUgZGF0YSB0aGF0IGNhdXNlZCB0aGUgZXhjZXB0aW9uIHRvIGJlIHRocm93bjpcbiAgbG9nKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhY2spO1xuICAgIGNvbnNvbGUubG9nKFwiV2hhdCBGYWlsZWQ6IFwiLCB0aGlzLmRhdGEpO1xuICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUxpc3RlbmVyIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcsIFsoRVZFTlQsIEVMRU1FTlQgLT4gVk9JRCldIC0+IHluZ3dpZUxpc3RlbmVyXG4gIGNvbnN0cnVjdG9yKGV2dE5hbWUsIGZucykge1xuICAgIHRoaXMuX2V2dE5hbWUgPSBldnROYW1lO1xuICAgIHRoaXMuX2ZucyA9IGZucyB8fCBbXTtcbiAgfVxuXG4gIC8vIDo6IChFVkVOVCwgRUxFTUVOVCAtPiBWT0lEKSAtPiB0aGlzO1xuICAvLyBBZGRzIGZ1bmN0aW9uIHRvIGxpc3RlbmVyOlxuICBhZGQoZm4pIHtcbiAgICB0aGlzLl9mbnMucHVzaChmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZUxpc3RlbmVyXG4gIC8vIENyZWF0ZXMgY2xvbmUgb2YgdGhpcyB5bmd3aWVMaXN0ZW5lcjpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IGV2dE5hbWUgPSBgJHt0aGlzLl9ldnROYW1lfWA7XG4gICAgbGV0IGZucyA9IHRoaXMuX2Zucy5tYXAoZm49PntcbiAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJldnRcIiwgXCJlbGVtXCIsIGZuLnRvU3RyaW5nKCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgWW5nd2llTGlzdGVuZXIoZXZ0TmFtZSwgZm5zKTtcbiAgfVxuXG4gIC8vIDo6IEVMRU1FTlQsIE9CSkVDVCAtPiBFTEVNRU5UXG4gIC8vIENyZWF0ZXMgZXZlbnQgbGlzdGVuZXIgYW5kIGJpbmRzIGl0IHRvIGdpdmVuIERPTSBFTEVNRU5ULCBhbmQgY2FsbHMgZnVuY3Rpb24gb2YgbGlzdGVuZXIgdG8gZ2l2ZW4gY29udGV4dFxuICAvLyBOT1RFOiBJZiBubyBjb250ZXh0IGlzIGdpdmVuLCBmdW5jdGlvbiBpcyBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIEVMRU1FTlQgdGhlIGxpc3RlbmVyIGlzIGJvdW5kIHRvXG4gIHJlbmRlcihlbGVtLCBjdHgpIHtcbiAgICByZXR1cm4gdGhpcy5fZm5zLnJlZHVjZSgoZWxlbSwgZm4pID0+IHtcbiAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0aGlzLl9ldnROYW1lLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGZuLmNhbGwoY3R4ID09PSB1bmRlZmluZWQgPyBlbGVtIDogY3R4LCBldnQsIGVsZW0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9LCBlbGVtKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgWyhFVkVOVCwgRUxFTUVOVCAtPiBWT0lEKV18KEVWRU5ULCBFTEVNRU5UIC0+IFZPSUQpIC0+IHluZ3dpZUxpc3RlbmVyXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQoZXZ0TmFtZSwgZm5zKSB7XG4gICAgcmV0dXJuIGZucyAhPT0gdW5kZWZpbmVkXG4gICAgICA/IG5ldyBZbmd3aWVMaXN0ZW5lcihldnROYW1lLCBBcnJheS5pc0FycmF5KGZucykgPT09IHRydWUgPyBmbnMgOiBbZm5zXSlcbiAgICAgIDogbmV3IFluZ3dpZUxpc3RlbmVyKGV2dE5hbWUpO1xuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVOb2RlIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcgLT4geW5nd2llTm9kZVxuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YodmFsdWUpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlOyAgICAgICAvLyBBcmJpdHJhcnkgU1RSSU5HIHZhbHVlIHRoYXQgY2FuIGJlIHN0b3JlZCBieSB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX3BhcmVudCA9IHVuZGVmaW5lZDsgIC8vIFBhcmVudCBvZiB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX2ZpcnN0ID0gdW5kZWZpbmVkOyAgIC8vIEZpcnN0IGNoaWxkIG9mIHRoaXMgbm9kZVxuICAgICAgdGhpcy5fbGFzdCA9IHVuZGVmaW5lZDsgICAgLy8gTGFzdCBjaGlsZCBvZiB0aGlzIG5vZGU7XG4gICAgICB0aGlzLl9uZXh0ID0gdW5kZWZpbmVkOyAgICAvLyBOZXh0IHNpYmxpbmcgb2YgdGhpcyBub2RlXG4gICAgICB0aGlzLl9wcmV2ID0gdW5kZWZpbmVkOyAgICAvLyBQcmV2aW91cyBzaWJsaW5nIG9mIHRoZSBub2RlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIlZhbHVlIG9mIFluZ3dpZU5vZGUgbXVzdCBiZSBTVFJJTkdcIiwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gW3luZ3dpZU5vZGVdXG4gIC8vIFJldHVybnMgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGU6XG4gIGNoaWxkcmVuKCkge1xuXG4gICAgbGV0IGNoaWxkID0gdGhpcy5fZmlyc3Q7ICAgLy8gRmlyc3QgY2hpbGRcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTsgICAgICAgICAvLyBBcnJheSBvZiBjaGlsZHJlbiB0byByZXR1cm5cblxuICAgIC8vIExvb2tzIGZvciBuZXh0IHNpYmxpbmcgdW50aWwgdGhlcmUgYXJlIG5vIG1vcmUgc2libGluZ3M6XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBhbiBhcnJhcnkgeW5naXdOb2RlIGVsZW1lbnRzOlxuICAgIHJldHVybiBjaGlsZHJlbjtcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB0aGlzXG4gIC8vIEFkZHMgZ2l2ZW4gbm9kZSB0byBjaGlsZHJlbiBvZiB0aGlzIG5vZGU6XG4gIC8vIE5PVEU6IElmIGdpdmVuIG5vZGUgYWxyZWFkeSBoYXMgYSBwYXJlbnQsIHRoYXQgbm9kZSBpcyBkZXRhY2hlZCBhbmQgYXBwZW5lZCB0byB0aGlzIG5vZGU6XG4gIGFwcGVuZChub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBJZiBnaXZlbiBub2RlIGhhcyBwYXJlbnQsIGRldGFjaCB0aGF0IG5vZGUgZnJvbSBpdCdzIHBhcmVudDpcbiAgICAgIGlmIChub2RlLl9wYXJlbnQpIHtcbiAgICAgICAgbm9kZS5kZXRhY2goKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IG5ldyBub2RlIGFzIGxhc3Qgc2libGluZzpcbiAgICAgIGlmICh0aGlzLl9maXJzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5vZGUuX3ByZXYgPSB0aGlzLl9sYXN0OyAgICAvLyBTZXRzIG5ldyBsYXN0IGNoaWxkJ3MgcHJldmlvdXMgbm9kZSB0byBvbGQgbGFzdCBub2RlXG4gICAgICAgIHRoaXMuX2xhc3QuX25leHQgPSBub2RlOyAgICAvLyBTZXQgb2xkIGxhc3QgY2hpbGQgbmV4dCBlbGVtZW50IHRvIG5ldyBsYXN0IGNoaWxkXG4gICAgICAgIHRoaXMuX2xhc3QgPSBub2RlOyAgICAgICAgIC8vIFNldCBuZXcgbGFzdCBjaGlsZCB0byBnaXZlbiBub2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiB0aGVyIGFyZSBubyBjaGlsZHJlbiwgdGhlbiB0aGlzIG5vZGUgaXMgYW4gb25seSBjaGlsZDpcbiAgICAgICAgdGhpcy5fZmlyc3QgPSBub2RlO1xuICAgICAgICB0aGlzLl9sYXN0ID0gbm9kZTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHBhcmVudFxuICAgICAgbm9kZS5fcGFyZW50ID0gdGhpcztcblxuICAgICAgLy8gUmV0dXJuIGluc3RhbmNlOmNvc25vbGVcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgYXBwcGVuZCBZbmd3aWVOb2RlIHRvIG90aGVyIFluZ3dpZU5vZGVzXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiBbeW5nd2llTm9kZV0gLT4gdGhpc1xuICAvLyBBcHBlbmRzIGFuIGFycmF5IG9mIFluZ3dpZU5vZGVzIHRvIHRoaXMgaW5zdGFuY2U6XG4gIGFwcGVuZHMobm9kZXMpIHtcbiAgICBpZiAobm9kZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgcmV0dXJuIG5vZGVzLnJlZHVjZSgocmVzdWx0LCBub2RlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGVuZChub2RlKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJFeHBlY3RlZCBhcnJheSBhcyBhcmd1ZW1udFwiLCBub2Rlcyk7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHRoaXNcbiAgLy8gRGV0YWNoZXMgdGhpcyBub2RlIGZyb20gaXQncyBwYXJlbnQ6XG4gIGRldGFjaCgpIHtcblxuICAgIC8vIE1ha2UgcHJldmlvdXMgbm9kZSdzIG5leHQgbm9kZSB0aGlzIG5vZGUncyBuZXh0IG5vZGU6XG4gICAgaWYgKHRoaXMuX3ByZXYpIHtcbiAgICAgIHRoaXMuX3ByZXYuX25leHQgPSB0aGlzLl9uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBubyBwcmV2aW91cyBub2RlLCB0aGVuIHRoaXMgbm9kZSBtdXN0IGJlIGZpcnN0IGNoaWxkIG9mIHBhcmVudCAoaWYgbm9kZSBoYXMgcGFyZW50KTpcbiAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50Ll9maXJzdCA9IHRoaXMuX25leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBuZXh0IG5vZGUncyBwcmV2aW91cyBub2RlIHRoaXMgbm9kZSdzIHByZXZpb3VzIG5vZGU6XG4gICAgaWYgKHRoaXMuX25leHQpIHtcbiAgICAgIHRoaXMuX25leHQuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgIH1cblxuICAgIC8vIFVuc2V0IGFsbCByZWxhdGlvbnM6XG4gICAgdGhpcy5fbmV4dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3BhcmVudCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIFJldHVybiBpbnN0YW5jZTpcbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB0aGlzO1xuICAvLyBJbnNlcnRzIGdpdmVuIHluZ3dpZU5vZGUgYmVmb3JlIHRoaXMgaW5zdGFuY2Ugb2YgeW5nd2llTm9kZTpcbiAgLy8gTk9URTogYS5pbnNlcnRzQmVmb3JlKGIpIG1lYW5zIFwiYlwiIGlzIGluc2VydGVkIGJlZm9yZSBcImFcIlxuICBpbnNlcnRCZWZvcmUobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgLy8gU2V0IHJlbGF0aW9uc1xuICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgICBub2RlLl9uZXh0ID0gdGhpcztcbiAgICAgIG5vZGUuX3BhcmVudCA9IHRoaXMuX3BhcmVudDtcblxuICAgICAgLy8gU2V0IHByZXZpb3VzIHNpYmxpbmcgcmVsYXRpb25zOlxuICAgICAgaWYgKHRoaXMuX3ByZXYpIHtcbiAgICAgICAgdGhpcy5fcHJldi5fbmV4dCA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgdGhpcy5fcGFyZW50Ll9maXJzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHByZXZpb3VzIHNpYmxpbmc6XG4gICAgICB0aGlzLl9wcmV2ID0gbm9kZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSBpbnNlcnQgYSBZbmd3aWVOb2RlIGJlZm9yZSBvdGhlciBZbmd3aWVOb2Rlc1wiLCBub2RlKTtcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB5bmd3aWVOb2RlXG4gIC8vIFJlcGxhY2UgdGhpcyBub2RlIHdpdGggZ2l2ZW4gbm9kZTpcbiAgcmVwbGFjZVdpdGgobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgLy8gQ2hlY2tzIGlmIHRoaXMgbm9kZSBoYXMgYSBwYXJlbnRcbiAgICAgIGlmICh0aGlzLl9wYXJlbnQgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIC8vIFJlcGxhY2VtZW50IGlzIGFjY29tcGxpc2hlZCBieSBmaXJzdCBpbnNlcnRpbmcgZ2l2ZW4gbm9kZSwgdGhlbiBkZXRhdGNoaW5nIHRoaXMgbm9kZTpcbiAgICAgICAgdGhpcy5pbnNlcnRCZWZvcmUobm9kZSk7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgLy8gUmV0dXJuIGdpdmVuIG5vZGU6XG4gICAgICAgIHJldHVybiBub2RlO1xuXG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHJlcGxhY2UgWW5nd2llTm9kZSBpZiBZbmd3aWVOb2RlIGJlaW5nIHJlcGxhY2VkIGhhcyBwYXJlbnRcIiwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSByZXBsYWNlIGEgWW5nd2llTm9kZSB3aXRoIGFub3RoZXIgWW5nd2llTm9kZVwiLCBub2RlKTtcblxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVOb2RlXG4gIC8vIFJldHVybnMgZGVlcCBjbG9uZSBvZiB0aGlzIG5vZGU6XG4gIGNsb25lKCkge1xuICAgIGxldCB2YWx1ZSA9IGAke3RoaXMuX3ZhbHVlfWA7XG4gICAgbGV0IGNsb25lID0gbmV3IFluZ3dpZU5vZGUodmFsdWUpXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4oKS5yZWR1Y2UoKHJlc3VsdCwgY2hpbGQpID0+IHtcbiAgICAgIGNsb25lID0gY2hpbGQuY2xvbmUoKTtcbiAgICAgIHJldHVybiByZXN1bHQuYXBwZW5kKGNsb25lKTtcbiAgICB9LCBjbG9uZSk7XG4gIH1cblxuICAvLyBOT0RFLCAqIC0+IE5PREUgLT4gKlxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIGEgcmVzdWx0IGFuZCB0aGlzIG5vZGUsIHdoZXJlIHRoYXQgZnVuY3Rpb24gcmV0dXJucyB0aGUgbmV4dCBub2RlIHRvIHRoYXQgZnVuY3Rpb24gaXMgYXBwbGllZCB0b1xuICAvLyBOT1RFOiBSZXN1bHQgaXMgcmV0dXJuZWQgd2hlbiB0aGVyZSBpcyBubyBuZXh0IG5vZGUgdG8gYXBwbHkgZnVuY3Rpb24gdG9cbiAgc3RlcChmbiwgcmVzdWx0KSB7XG4gICAgbmV4dCA9IGZuKHRoaXMsIHJlc3VsdCk7XG4gICAgaWYgKG5leHQpIHtcbiAgICAgIG5leHQuc3RlcChmbiwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIDo6IE5PREUsICogLT4gKiwgKiAtPiAqXG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gdGhpcyBub2RlIGFuZCBpdCdzIGRlc2NlbmRhbnRzLCByZXR1cm5pbmcgdGhlIHJlc3VsdCBvZiB0aGF0IGZ1bmN0aW9uOlxuICBwYXJzZShmbiwgcmVzdWx0KSB7XG4gICAgWW5nd2llTm9kZS5wYXJzZSh0aGlzLCAobm9kZSkgPT4ge1xuICAgICAgcmVzdWx0ID0gZm4obm9kZSwgcmVzdWx0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFN0YXRpYyBGdW5jdGlvblxuICAgKlxuICAgKi9cblxuICAvLyBTVFJJTkcgLT4geW5nd2llTm9kZVxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2RcbiAgc3RhdGljIGluaXQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZU5vZGUodmFsdWUpO1xuICB9XG5cbiAgLy8gTk9ERSwgTk9ERSAtPiBWT0lEIC0+IFZPSURcbiAgLy8gQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGEgbm9kZSBhbmQgYWxsIGl0J3MgZGVzZW5kYW50c1xuICAvLyBOT0RFOiBUaGlzIGlzIGEgcmUtaW1wbGVtZW50YXRpb24gb2YgQ3JvY2tmb3JkJ3MgRE9NIHdhbGsgYWxnb3JpdGhtIGZyb20gXCJKYXZhc2NyaXB0OiBUaGUgR29vZCBQYXJ0c1wiXG4gIHN0YXRpYyBwYXJzZShub2RlLCBmbikge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgZm4obm9kZSk7XG4gICAgICBub2RlID0gbm9kZS5fZmlyc3Q7XG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBZbmd3aWVOb2RlLnBhcnNlKG5vZGUsIGZuKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSBwYXJzZSBhIFluZ3dpZU5vZGVcIiwgbm9kZSk7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llVGV4dE5vZGUgZXh0ZW5kcyBZbmd3aWVOb2RlIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcgLT4geW5nd2llVGV4dE5vZGVcbiAgY29uc3RydWN0b3IodGV4dCkge1xuICAgIHN1cGVyKHRleHQpO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gUmV0dXJucyB0ZXh0IG9mIHRoaXMgdGV4dCBub2RlOlxuICB0ZXh0KCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3x5bmd3aWVUZXh0Tm9kZSAtPiB0aGlzXG4gIC8vIEFwcGVuZHMgU1RSSU5HIGluc3RlYWQgb2YgTk9ERSBzaW5jZSBhIFRleHROb2RlIGhhcyBubyBjaGlsZHJlblxuICBhcHBlbmQodmFsKSB7XG5cbiAgICBpZiAodHlwZW9mKHZhbCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgKz0gdmFsO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodmFsIGluc3RhbmNlb2YgWW5nd2llVGV4dE5vZGUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgKz0gdmFsLnRleHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBTVFJJTkdzIGFuZCBvdGhlciBZbmd3aWVUZXh0Tm9kZXMgY2FuIGFwcGVuZCBhIFluZ3dpZVRleHROb2RlXCIsIHZhbCk7XG4gIH1cblxuICAvLzo6IFNUUklOR3xFTEVNRU5UfFZPSUQsIE9CSkVDVCAtPiBURVhUXG4gIC8vIENyZWF0ZXMgRE9NIFRleHQgbm9kZSBzZXQgd2l0aCB0aGUgU1RSSU5HIHN0b3JlZCBpbiBfdmFsdWU6XG4gIHJlbmRlcih0YXJnZXQsIGN0eCkge1xuICAgIGxldCBjb250ZXh0ID0gY3R4ID09PSB1bmRlZmluZWQgPyBkb2N1bWVudCA6IGN0eDtcbiAgICBsZXQgdGV4dE5vZGUgPSBjb250ZXh0LmNyZWF0ZVRleHROb2RlKHRoaXMuX3ZhbHVlKTtcbiAgICBpZiAodGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBub2RlID0gdHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICA6IHRhcmdldDtcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0Tm9kZTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llVGV4dE5vZGVcbiAgLy8gQ3JlYXRlcyBhIGNsb25lIG9mIHRoaXMgeW5nd2llVGV4dE5vZGU6XG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgWW5nd2llVGV4dE5vZGUoYCR7dGhpcy5fdmFsdWV9YCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklORyAtPiB5bmd3aWVUZXh0Tm9kZVxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KHRleHQpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZVRleHROb2RlKHRleHQpO1xuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVFbGVtZW50IGZyb20gXCIuLi9FbGVtZW50L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUZXh0Tm9kZSBmcm9tIFwiLi4vVGV4dE5vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9UcmFuc2Zvcm0vbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVUcmFuc2Zvcm0ge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6ICogLT4geW5nd2llVHJhbnNmb3JtXG4gIGNvbnN0cnVjdG9yKHZhbCkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWYWx1ZSB0byB0cmFuc2Zvcm1cbiAgICB0aGlzLl90eXBlID0gWW5nd2llVHJhbnNmb3JtLmdldFR5cGUodmFsKTsgLy8gU3RvcmVzIHZhbHVlJ3MgdHlwZSBmb3IgZGV0ZXJtaW5pbmcgaG93IGl0IGNhbiBiZSB0cmFuc2Zvcm1lZFxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBOT0RFXG4gIC8vIFRyYW5zZm9ybXMgc3RvcmVkIHZhbHVlIGludG8gYSBET01FbGVtZW50IE5PREU6XG4gIHRvTk9ERSgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3R5cGUpIHtcbiAgICAgIGNhc2UgXCJOT0RFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgIGNhc2UgXCJTVFJJTkdcIjpcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcodGhpcy5fdmFsdWUsIFwidGV4dC9odG1sXCIpO1xuICAgICAgICByZXR1cm4gZG9jLmJvZHkuZmlyc3RDaGlsZDtcbiAgICAgIGNhc2UgXCJZTkdXSUVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnJlbmRlcigpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IHRyYW5zZm9ybSB0byBOT0RFIGZyb20gdW5zdXBwb3RlZCB0eXBlXCIsIHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFNUUklOR1xuICAvLyBUcmFuc2Zvcm1zIHN0b3JlZCB2YWx1ZSBpbnRvIGEgU1RSSU5HOlxuICB0b1NUUklORygpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3R5cGUpIHtcbiAgICAgIGNhc2UgXCJOT0RFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5ub2RlVHlwZSA9PT0gMSA/IHRoaXMuX3ZhbHVlLm91dGVySFRNTCA6IHRoaXMuX3ZhbHVlLm5vZGVWYWx1ZTtcbiAgICAgIGNhc2UgXCJTVFJJTkdcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgY2FzZSBcIllOR1dJRVwiOlxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl92YWx1ZSk7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5fdmFsdWUucmVuZGVyKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vZGUpXG4gICAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxID8gbm9kZS5vdXRlckhUTUwgOiBub2RlLm5vZGVWYWx1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbm5vdCB0cmFuc2Zvcm0gdG8gU1RSSU5HIGZyb20gdW5zdXBwb3RlZCB0eXBlXCIsIHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFNUUklOR1xuICAvLyBUcmFuc2Zvcm1zIHN0b3JlZCB2YWx1ZSBpbnRvIGEgeW5nd2llRWxlbWVudDpcbiAgdG9ZTkdXSUUoKSB7XG4gICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICBjYXNlIFwiTk9ERVwiOlxuICAgICAgY2FzZSBcIlNUUklOR1wiOlxuICAgICAgICByZXR1cm4gWW5nd2llVHJhbnNmb3JtLmluaXQodGhpcy5fdmFsdWUpO1xuICAgICAgY2FzZSBcIllOR1dJRVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgdHJhbnNmb3JtIHRvIFluZ3dpZUVsZW1lbnQgZnJvbSB1bnN1cHBvdGVkIHR5cGVcIiwgdGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogU1RSSU5HfE5PREUgLT4geW5nd2llRWxlbWVudFxuICAvLyBUcmFuc2Zvcm1zIHN0cmluZyBvZiBIVE1MIG9yIERPTUVsZW1lbnQgTk9ERSBpbnRvIGEgeW5nd2llRWxlbWVudFxuICAvLyBOT1RFOiBUaGlzIERPRVMgTk9UIHRyYW5zZm9ybSBldmVudCBoYW5kbGVycyBpbnRvIFluZ3dpZUxpc3RlbmVyIG9iamVjdHM6XG4gIHN0YXRpYyBpbml0KGh0bWwpIHtcbiAgICByZXR1cm4gd2Fsa05vZGUoWW5nd2llVHJhbnNmb3JtLmdldFR5cGUoaHRtbCkgPT09IFwiU1RSSU5HXCIgPyBZbmd3aWVUcmFuc2Zvcm0udG9OT0RFKGh0bWwpIDogaHRtbCk7XG4gIH1cblxuICAvLyA6OiAqIC0+IE5PREVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kIHRoYXQgdHJhbnNmb3JtcyBnaXZlbiB2YWx1ZSBpbnRvIGEgTk9ERTpcbiAgc3RhdGljIHRvTk9ERSh2YWwpIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gbmV3IFluZ3dpZVRyYW5zZm9ybSh2YWwpO1xuICAgIHJldHVybiB0cmFuc2Zvcm0udG9OT0RFKCk7XG4gIH1cblxuICAvLyA6OiAqIC0+IFNUUklOR1xuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2QgdGhhdCB0cmFuc2Zvcm1zIGdpdmVuIHZhbHVlIGludG8gYSBTVFJJTkc6XG4gIHN0YXRpYyB0b1NUUklORyh2YWwpIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gbmV3IFluZ3dpZVRyYW5zZm9ybSh2YWwpO1xuICAgIHJldHVybiB0cmFuc2Zvcm0udG9TVFJJTkcoKTtcbiAgfVxuXG4gIC8vIDo6ICogLT4geW5nd2llRWxlbWVudFxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2QgdGhhdCB0cmFuc2Zvcm1zIGdpdmVuIHZhbHVlIGludG8gYSB5bmd3aWVFbGVtZW50OlxuICBzdGF0aWMgdG9ZTkdXSUUodmFsKSB7XG4gICAgbGV0IHRyYW5zZm9ybSA9IG5ldyBZbmd3aWVUcmFuc2Zvcm0odmFsKTtcbiAgICByZXR1cm4gdHJhbnNmb3JtLnRvWU5HV0lFKCk7XG4gIH1cblxuICAvLyAqIC0+IFwiTk9ERVwifFwiU1RSSU5HXCJ8XCJZTkdXSUVcInxVTkRFRklORURcbiAgLy8gUmV0dXJucyBuYW1lIG9mIHR5cGUgZm9yIGdpdmVuIHZhbHVlOlxuICBzdGF0aWMgZ2V0VHlwZSh2YWwpIHtcblxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICByZXR1cm4gXCJOT0RFXCI7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZih2YWwpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gXCJTVFJJTkdcIjtcbiAgICB9XG5cbiAgICBpZiAodmFsIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuICAgICAgcmV0dXJuIFwiWU5HV0lFXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcblxuICB9XG5cbn1cblxuLyoqXG4gKlxuICogIExvY2FsIEZ1bmN0aW9uc1xuICpcbiAqL1xuXG4vLyA6OiBOT0RFLCBOT0RFLCBub2RlLm5vZGVUeXBlIC0+IFZPSURcbi8vIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWW5nd2llRWxlbWVudCBmcm9tIHRoZSBnaXZlbiBub2RlIGFuZCBhbGwgb2YgaXQncyBkZXNlbmRlbnRzOlxuLy8gTk9URTogSW5zcGlyZWQgYnkgQ3JvY2tmb3JkJ3MgRE9NIHdhbGtpbmcgYWxnb3JpdGhtIGZyb20gXCJKYXZhc2NyaXB0OlRoZSBHb29kIFBhcnRzXCJcbmZ1bmN0aW9uIHdhbGtOb2RlKG5vZGUsIHJlc3VsdCkge1xuXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgbGV0IGF0dHJpYnMgPSBnZXRBdHRyaWJ1dGVzKG5vZGUpO1xuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQobm9kZS50YWdOYW1lLCBhdHRyaWJzKTtcbiAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbGVtXG4gICAgICA6IHJlc3VsdC5hcHBlbmQoZWxlbSk7XG4gIH1cblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgIGxldCB0ZXh0Tm9kZSA9IG5ldyBZbmd3aWVUZXh0Tm9kZShub2RlLm5vZGVWYWx1ZSk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgID8gdGV4dE5vZGVcbiAgICAgIDogcmVzdWx0LmFwcGVuZCh0ZXh0Tm9kZSk7XG4gIH1cblxuICBub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG4gIHdoaWxlIChub2RlKSB7XG4gICAgbGV0IGNoaWxkID0gd2Fsa05vZGUobm9kZSk7XG4gICAgaWYgKGNoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0LmFwcGVuZChjaGlsZCk7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcblxufVxuXG4vLyA6OiBET01FbGVtZW50IC0+IE9CSkVDVFxuLy8gUmV0dXJucyBPQkpFQ1Qgb2YgYXR0cmlidXRlcyBmcm9tIHRoZSBnaXZlbiBET00gRWxlbWVudDpcbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoZWxlbSkge1xuICByZXR1cm4gQXJyYXkuZnJvbShlbGVtLmF0dHJpYnV0ZXMpLnJlZHVjZSgocmVzdWx0LCBhdHRyaWIpID0+IHtcbiAgICByZXN1bHRbYXR0cmliLm5hbWVdID0gYXR0cmliLnZhbHVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sIHt9KTtcbn1cbiIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVsZW1lbnQgZnJvbSBcIi4vRWxlbWVudC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVGV4dE5vZGUgZnJvbSBcIi4vVGV4dE5vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUxpc3RlbmVyIGZyb20gXCIuL0xpc3RlbmVyL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUcmFuc2Zvcm0gZnJvbSBcIi4vVHJhbnNmb3JtL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCB7XG4gIFluZ3dpZU5vZGUgYXMgTm9kZSxcbiAgWW5nd2llRWxlbWVudCBhcyBFbGVtZW50LFxuICBZbmd3aWVUZXh0Tm9kZSBhcyBUZXh0Tm9kZSxcbiAgWW5nd2llTGlzdGVuZXIgYXMgTGlzdGVuZXIsXG4gIFluZ3dpZVRyYW5zZm9ybSBhcyBUcmFuc2Zvcm0sXG4gIFluZ3dpZUVycm9yIGFzIEVycm9yXG59XG4iLCJpbXBvcnQgWW5nd2llTW9kZWwgZnJvbSBcIi4uL01vZGVsL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVWaWV3IGZyb20gXCIuLi9WaWV3L21haW4uanNcIjtcbmltcG9ydCB7RXJyb3IgYXMgWW5nd2llRXJyb3J9IGZyb20gXCJ5bmd3aWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llQ29udHJvbGxlciB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjoge1NUUklORzooLi4uIC0+ICopfSAtPiB5bmd3aWVDb250cm9sbGVyXG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJ5KSB7XG4gICAgdGhpcy5fcmVnaXN0cnkgPSByZWdpc3RyeSB8fCB7fTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiBCT09MRUFOXG4gIC8vIFJldHVybnMgYm9vbGVhbiBmb3IgaWYgYW55IGZ1bmN0aW9ucyBhcmUgYm91bmQgdG8gZ2l2ZW4gSUQ6XG4gIGlzUmVnaXN0ZXJlZChpZCkge1xuICAgIHJldHVybiB0aGlzLl9yZWdpc3RyeVtpZF0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgKC4uLiAtPiBWT0lEKSAtPiB0aGlzO1xuICAvLyBCaW5kcyBmdW5jdGlvbiB0byBnaXZlbiBTVFJJTkc6XG4gIC8vIE5PVEU6IEZ1bmN0aW9ucyBib3VuZCB0byBzaWduYWwgSUQgYXJlIHN0b3JlZCBpbiBBUlJBWSwgc28gbXVsdGlwbGUgZnVuY3Rpb25zIGNhbiBiZSBib3VuZCB0byB0aGUgc2FtZSBJRFxuICByZWdpc3RlcihpZCwgZm4pIHtcbiAgICBpZiAodGhpcy5pc1JlZ2lzdGVyZWQoaWQpID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5fcmVnaXN0cnlbaWRdID0gW107XG4gICAgfVxuICAgIHRoaXMuX3JlZ2lzdHJ5W2lkXS5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgKC4uLiAtPiAqKSAtPiB0aGlzXG4gIC8vIEVuc3VyZXMgb25seSBvbmUgZnVuY3Rpb24gaXMgYm91bmQgdG8gdGhlIGdpdmVuIHNpZ25hbCBJRDpcbiAgcmVnaXN0ZXJPbmNlKGlkLCBmbikge1xuICAgIHRoaXMuX3JlZ2lzdHJ5W2lkXSA9IFtmbl07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpcztcbiAgLy8gUmVtb3ZlcyBmdW5jdGlvbiBib3VuZCB0byBnaXZlbiBTVFJJTkc6XG4gIC8vIE5PVEU6IElmIElEIGRvZXMgbm90IGV4aXN0LCBhbiB5bmd3aWVFcnJvciBpcyB0aHJvd246XG4gIC8vIE5PVEU6IFVucmVnaXN0ZXJpbmcgc2lnbmFsIHJlbW92ZXMgQUxMIGZ1bmN0aW9ucyBib3VuZCB0byB0aGF0IHNpZ25hbCBJRDpcbiAgdW5yZWdpc3RlcihpZCkge1xuICAgIGlmICh0aGlzLmlzUmVnaXN0ZXJlZChpZCkgPT09IHRydWUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9yZWdpc3RyeVtpZF07XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiTm8gZnVuY3Rpb25zIGJvdW5kIHRvIGdpdmVuIElEXCIsIGlkKTtcbiAgfVxuXG4gIC8vIFNUUklORywgLi4uIC0+IHRoaXM7XG4gIC8vIEFwcGxpZXMgdmFsdWVzIHRvIGZ1bmN0aW9uIGJvdW5kIHRvIHNpZ25hbCBJRFxuICAvLyBOT1RFOiBJZiBJRCBkb2VzIG5vdCBleGlzdCwgYSB5bmd3aWVFcnJvciBpcyB0aHJvd246XG4gIHNpZ25hbCgpIHtcbiAgICBsZXQgaWQgPSBhcmd1bWVudHNbMF07XG4gICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXMuaXNSZWdpc3RlcmVkKGlkKSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fcmVnaXN0cnlbaWRdLmZvckVhY2goZm49PntcbiAgICAgICAgZm4uYXBwbHkodGhpcywgYXJncy5zbGljZSgxKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgZGlzcGF0Y2ggdmFsdWUgdG8gYW4gSUQgdGhhdCBkb2Vzbid0IGV4aXN0XCIsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjoge1NUUklORzpbKi0+Vk9JRF19IC0+IHluZ3dpZUNvbnRyb2xsZXJcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdChyZWdpc3RyeSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihyZWdpc3RyeSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL1V0aWwvbWFpbi5qc1wiO1xuaW1wb3J0IHtFcnJvciBhcyBZbmd3aWVFcnJvcn0gZnJvbSBcInluZ3dpZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVNb2RlbCB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogT0JKRUNUIC0+IHluZ3dpZU1vZGVsXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IGRhdGE7XG4gIH1cblxuICAvLyA6OiBWT0lEfFNUUklORyAtPiBPQkpFQ1RcbiAgLy8gUmV0dXJucyBkYXRhIG9mIG1vZGVsIHdpdGggYXBwbGllZCBzY29wZSwgb3RoZXJ3aXNlIHJldHVybnMgYWxsIGRhdGEgc3RvcmVkIGluIG1vZGVsOlxuICBzdGF0ZShzY29wZSkge1xuICAgIHJldHVybiBzY29wZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fc3RhdGUgOiBZbmd3aWVNb2RlbC5yZXNvbHZlU2NvcGUoc2NvcGUsIHRoaXMuX3N0YXRlKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xPQkpFQ1QgLT4gKiwgT0JKRUNULCBPQkpFQ1QgLT4gKnxWT0lEIC0+IHRoaXM7XG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gc3RhdGUgYW5kIG9wdGlvbmFsIHNjb3BlLCByZXBsYWNpbmcgc3RhdGUgd2l0aCB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb246XG4gIHVwZGF0ZShhLCBiKSB7XG4gICAgbGV0IHR5cGVBcmcgPSBVdGlsLmdldFR5cGUoYSk7XG4gICAgc3dpdGNoICh0eXBlQXJnKSB7XG4gICAgICBjYXNlIFwiRnVuY3Rpb25cIjpcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBhKHRoaXMuX3N0YXRlKTtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgICAgICB0aGlzLl9zdGF0ZVthXSA9IGIodGhpcy5fc3RhdGUsIHRoaXMuc3RhdGUoYSkpO1xuICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgdG8geW5nd2llTW9kZWwudXBkYXRlIGlzIG9mIGFuIHVuc3VwcG9ydGVkIHR5cGVcIiwgdHlwZUFyZyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfCh5bmd3aWVNb2RlbCAtPiBWT0lEKSwgKHluZ3dpZU1vZGVsIC0+IFZPSUQpfFZPSUQgLT4gVk9JRFxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIGV2ZXJ5IGVsZW1lbnQgb2Ygc2NvcGUsIGlmIG9ubHkgZnVuY3Rpb24gaXMgZ2l2ZW4gdGhlbiBpdCdzIGFwcGxpZWQgdG8gZXZlcnkgZWxlbWVudCBvZiBzdGF0ZTpcbiAgZWFjaChhLCBiKSB7XG4gICAgbGV0IHR5cGVBcmcgPSBVdGlsLmdldFR5cGUoYSk7XG4gICAgc3dpdGNoICh0eXBlQXJnKSB7XG4gICAgICBjYXNlIFwiRnVuY3Rpb25cIjpcbiAgICAgICAgdGhpcy5fc3RhdGUuZm9yRWFjaChlbGVtPT57XG4gICAgICAgICAgYShZbmd3aWVNb2RlbC5pbml0KGVsZW0pKTtcbiAgICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZShhKTtcbiAgICAgICAgaWYgKHN0YXRlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBzdGF0ZS5mb3JFYWNoKGVsZW09PntcbiAgICAgICAgICAgIGIoWW5nd2llTW9kZWwuaW5pdChlbGVtKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiU2NvcGUgaXMgbm90IGFuIGFycmF5XCIsIHR5cGVBcmcpO1xuICAgICAgICB9XG4gICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCB0byBZbmd3aWVNb2RlbC5mb3JFYWNoIGlzIG9mIGFuIHVuc3VwcG9ydGVkIHR5cGVcIiwgdHlwZUFyZyk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogU1RSSU5HLCAqfFZPSUQgLT4gdGhpc3wqXG4gIC8vIFNldHMgb3IgZ2V0cyBwcm9wZXJ0eSBmcm9tIG1vZGVsOlxuICBwcm9wKGlkLCB2YWwpIHtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLl9zdGF0ZVtpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVbaWRdO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiTm8gcHJvcGVydHkgZm91bmQgZm9yIGdpdmVuIElEXCIsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3RhdGVbaWRdID0gdmFsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogT0JKRUNUIC0+IHluZ3dpZU1vZGVsXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQoZGF0YSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llTW9kZWwoZGF0YSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIE9CSkVDVCAtPiBPQkpFQ1R8VU5ERUZJTkVEXG4gIC8vIFJldHVybnMgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gc2NvcGUgLSBpZiBzY29wZSBjYW4ndCByZSByZXNvbHZlZCB0aGVuIFVOREVGSU5FRCBpcyByZXR1cm5lZDpcbiAgc3RhdGljIHJlc29sdmVTY29wZShzY29wZSwgb2JqKSB7XG4gICAgaWYgKHNjb3BlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBzY29wZXMgPSBzY29wZS5zcGxpdChcIi5cIik7XG4gICAgICBsZXQgcmVzdWx0ID0gb2JqO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29wZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGN1cnJlbnRTY29wZSA9IHNjb3Blc1tpXTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0W2N1cnJlbnRTY29wZV07XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgLy8gOjogT0JKRUNUfHluZ3dpZU1vZGVsIC0+IHluZ3dpZU1vZGVsXG4gIC8vIFJldHVybnMgdmFsdWUgYXMgeW5nd2llTW9kZWw6XG4gIHN0YXRpYyBzZXRBc01vZGVsKG1vZGVsKSB7XG4gICAgcmV0dXJuIG1vZGVsIGluc3RhbmNlb2YgWW5nd2llTW9kZWxcbiAgICAgID8gbW9kZWxcbiAgICAgIDogWW5nd2llTW9kZWwuaW5pdChtb2RlbCk7XG4gIH1cblxufVxuIiwiLy8gU2luZ2xldG9uIG9mIHV0aWxpdHkgbWV0aG9kczpcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAvLyA6OiAqIC0+IFNUUklOR1xuICAvLyBSZXR1cm5zIHR5cGUgb2YgZ2l2ZW4gdmFsdWUgYXMgU1RSSU5HOlxuICBzdGF0aWMgZ2V0VHlwZSh2YWwpIHtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHJldHVybiBcIm51bGxcIjtcbiAgICByZXR1cm4gdmFsLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbiAgXG59XG4iLCJpbXBvcnQge0VsZW1lbnQgYXMgWW5nd2llRWxlbWVudCwgRXJyb3IgYXMgWW5nd2llRXJyb3J9IGZyb20gXCJ5bmd3aWVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llVmlldyB7XG5cbiAgLy8gOjogQ09OU1RSVUNUT1IgOjogeW5nd2llRWxlbWVudHxWT0lEIC0+IHluZ3dpZVZpZXdcbiAgY29uc3RydWN0b3IoeW5nd2llRWxlbWVudCkge1xuICAgIHRoaXMuX2VsZW0gPSB5bmd3aWVFbGVtZW50IHx8IFluZ3dpZUVsZW1lbnQuaW5pdChcImRpdlwiKTtcbiAgICB0aGlzLl9mbnMgPSBbXTtcbiAgICB0aGlzLl9ub2RlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gIH1cblxuICAvLyA6OiBWT0lEfHluZ3dpZUVsZW1lbnR8U1RSSU5HLCBTVFJJTkcsIE9CSkVDVCwgU1RSSU5HLCBbeW5nd2llTGlzdGVuZXJdIC0+IHluZ3dpZUVsZW1lbnR8dGhpc3x0aGlzXG4gIC8vIFNldHRlci9nZXR0ZXIgbWV0aG9kIGZvciB5bmd3aWVFbGVtZW50IHN0b3JlZCBieSB2aWV3OlxuICAvLyBOT1RFOiBHZXR0aW5nIHRoZSB5bmdpd2VFbGVtZW50IHN0b3JlZCBieSB2aWV3IHdpbGwgYXBwbHkgZXZlcnkgc3RvcmVkIG1vZGlmZXIgZnVuY3Rpb24gdG8gdGhhdCB5bmd3aWVFbGVtZW50XG4gIGVsZW0oYXJnKSB7XG4gICAgc3dpdGNoIChVdGlsLmdldFR5cGUoYXJnKSkge1xuICAgICAgLy8gQXBwbGllcyB2aWV3IHRvIGV2ZXJ5IG1vZGlmaWVyIGZ1bmN0aW9uLCBpZiB0aGVyZSBhcmUgbm8gbW9kaWZlciBmdW5jdGlvbnMgZWxlbSBpcyByZXR1cm5lZDpcbiAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgcmV0dXJuICB0aGlzLl9mbnMucmVkdWNlKCh2aWV3LCBmbikgPT4ge1xuICAgICAgICAgIHJldHVybiBmbih2aWV3KTtcbiAgICAgICAgfSwgdGhpcy5fZWxlbSk7XG4gICAgICAvLyBTZXRzIF9lbGVtIHRvIGdpdmVuIHluZ3dpZUVsZW1lbnQ6XG4gICAgICBjYXNlIFwiWW5nd2llRWxlbWVudFwiOlxuICAgICAgICB0aGlzLl9lbGVtID0gYXJnO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIC8vIFRyaWVzIHRvIGluaXRhbGl6ZSB5bmd3aWVFbGVtZW50IHVzaW5nIGdpdmVuIGFyZ3VtZW50czpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX2VsZW0gPSBZbmd3aWVFbGVtZW50LmluaXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogKHluZ3dpZUVsZW1lbnQgLT4geW5nd2llRWxlbWVudCkgLT4gdGhpc1xuICAvLyBBZGRzIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIHluZ3dpZUVsZW1lbnQgd2hlbiB2aWV3IGlzIHJldHJpZXZlZCBvciByZW5kZXJlZDpcbiAgbW9kaWZ5KGZuKSB7XG4gICAgdGhpcy5fZm5zLnB1c2goZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogKHluZ3dpZUVsZW1lbnQgLT4geW5nd2llRWxlbWVudCkgLT4gdGhpc1xuICAvLyBFbnN1cmUgb25seSB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2lsbCBtb2RpZnkgdGhlIHluZ3dpZUVsZW1lbnQgb2YgdGhpcyB2aWV3OlxuICBtb2RpZnlPbmNlKGZuKSB7XG4gICAgdGhpcy5fZm5zID0gW2ZuXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgKEVWRU5ULCBOT0RFIC0+IFZPSUQpIC0+IHRoaXNcbiAgLy8gSW5pdGlhbGl6ZXMgeW5nd2llTGlzdGVuZXIgZm9yIHluZ3dpZUVsZW1lbnQgc3RvcmVkIGJ5IHZpZXc6XG4gIG9uKGlkLCBmbikge1xuICAgIHRoaXMuX2VsZW0ub24oaWQsIGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiB0aGlzXG4gIC8vIFNldHMgdGV4dCBvZiB5bmd3aWVFbG1lbnQgZm9yIHRoaXMgdmlldzpcbiAgdGV4dChzdHIpIHtcbiAgICB0aGlzLl9lbGVtLnRleHQoc3RyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IE9CSkVDVHxWT0lEIC0+IHRoaXN8T0JKRUNUXG4gIC8vIFNldHMgb3IgZ2V0cyBhdHRyaWJ1dGVzIG9mIHluZ3dpZUVsbWVudCBmb3IgdGhpcyB2aWV3OlxuICBhdHRyaWJzKGFyZykge1xuICAgIGxldCBhcmd0eXBlID0gVXRpbC5nZXRUeXBlKGFyZykudG9VcHBlckNhc2UoKTtcbiAgICBzd2l0Y2ggKGFyZ3R5cGUpIHtcbiAgICAgIGNhc2UgXCJPQkpFQ1RcIjpcbiAgICAgICAgdGhpcy5fZWxlbS5hdHRyaWJzKGFyZyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgY2FzZSBcIlVOREVGSU5FRFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbS5hdHRyaWJzKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3Qgc2V0IG9yIGdldCBhdHRyaWJ1dGVzIG9mIHluZ3dpZVZpZXcgZm9yIHR5cGUgb2YgZ2l2ZW4gYXJ1Z21lbnRcIiwgYXJndHlwZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogU1RSSU5HLCAqfFZPSUQgLT4gdGhpc3wqXG4gIC8vIFNldHMgb3IgZ2V0IGF0dHJpYnV0ZSBvZiB5bmd3aWVFbGVtZW50OlxuICBhdHRyaWIoYXR0ciwgdmFsKSB7XG4gICAgbGV0IGF0dHJUeXBlID0gVXRpbC5nZXRUeXBlKGF0dHIpLnRvVXBwZXJDYXNlKCk7XG4gICAgbGV0IHZhbFR5cGUgPSBVdGlsLmdldFR5cGUodmFsKS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChhdHRyVHlwZSA9PT0gXCJTVFJJTkdcIikge1xuICAgICAgaWYgKGF0dHJUeXBlICE9PSBcIlVOREVGSU5FRFwiKSB7XG4gICAgICAgIHRoaXMuX2VsZW0uc2V0QXR0cmlidXRlKGF0dHIsIHZhbCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2VsZW0uZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJOYW1lIG9mIGF0dHJpYnV0ZSBtdXN0IGJlIG9mIHR5cGUgU1RSSU5HXCIsIGF0dHJUeXBlKTtcbiAgfVxuXG4gIC8vIDo6IHluZ3dpZVZpZXcgLT4gdGhpcztcbiAgLy8gQXBwZW5kcyBhbm90aGVyIHluZ3dpZVZpZXcgdG8gdGhpcyB2aWV3OlxuICBhcHBlbmQoeW5nd2llVmlldykge1xuICAgIGlmIChZbmd3aWVWaWV3LmlzKHluZ3dpZVZpZXcpKSB7XG4gICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKHluZ3dpZVZpZXcpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgYSB5bmd3aWVWaWV3IGNhbiBiZSBhcHBlbmRlZCB0byBhbm90aGVyIHluZ3dpZVZpZXdcIiwgeW5nd2llVmlldyk7XG4gIH1cblxuICAvLyA6OiBbeW5nd2llVmlld10gLT4gdGhpc1xuICAvLyBBcHBlbmRzIGFycmF5IG9mIHluZ3dpZVZpZXdzIHRvIHRoaXMgdmlldzpcbiAgYXBwZW5kcyh5bmd3aWVWaWV3cykge1xuICAgIGlmICh5bmd3aWVWaWV3cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4geW5nd2llVmlld3MucmVkdWNlKChyZXN1bHQsIHZpZXcpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5hcHBlbmQodmlldyk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiRXhwZWN0ZWQgQVJSQVkgdG8gYXBwZW5kIHluZ3dpZVZpZXdzIHRvIHRoaXMgeW5nd2llVmlld1wiLCB5bmd3aWVWaWV3cyk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RUxFTUVOVHxWT0lELCBPQkpFQ1R8Vk9JRCAtPiBFTEVNRU5UXG4gIC8vIENyZWF0ZXMgYW5kIHJldHVybnMgcmVuZGVyZWQgRUxFTUVOVCBmcm9tIHZpZXcsIHN0b3JpbmcgcmVzdWx0IG9mIHJlbmRlcjpcbiAgcmVuZGVyKHRhcmdldCwgY29udGV4dCkge1xuICAgIC8vIFN0b3JlIHJlc3VsdCBvZiByZW5kZXI6XG4gICAgdGhpcy5fbm9kZSA9IFluZ3dpZVZpZXcucmVuZGVyKHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG4gICAgLy8gUmV0dXJuIHJlbmRlcjpcbiAgICByZXR1cm4gdGhpcy5fbm9kZTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gRUxFTUVOVFxuICAvLyBSZS1yZW5kZXJzIHZpZXcgdXNpbmcgc3RvcmVkIG5vZGU6XG4gIC8vIE5PVEU6IElmIG5vIG5vZGUgaGFzIGJlZW4gc3RvcmVkLCB0aGVuIGEgeW5nd2llRXJyb3IgaXMgdGhyb3duOlxuICByZW5kZXJBZ2FpbigpIHtcbiAgICBpZiAodGhpcy5fbm9kZSkge1xuICAgICAgbGV0IHJlc3VsdCA9IFluZ3dpZVZpZXcucmVuZGVyKHRoaXMpO1xuICAgICAgdGhpcy5fbm9kZS5yZXBsYWNlV2l0aChyZXN1bHQpO1xuICAgICAgdGhpcy5fbm9kZSA9IHJlc3VsdDtcbiAgICAgIHJldHVybiB0aGlzLl9ub2RlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub250IHJlLXJlbmRlciB2aWV3IGJlY2F1c2UgaXQgaGFzbid0IGJlZW4gcmVuZGVyZWQgeWV0LlwiKTtcbiAgfVxuXG4gIC8vIFNUUklOR3xOT0RFLCBPQkpFQ1R8Vk9JRCAtPiBFTEVNRU5UXG4gIC8vIEVtcHRpZXMgY29udGVudCBvZiBnaXZlbiB0YXJnZXQgYW5kIGFwcGVuZHMgaXQgd2l0aCByZW5kZXJlZCBub2RlOlxuICBpbmplY3QodGFyZ2V0LCBjb250ZXh0KSB7XG4gICAgbGV0IHJlbmRlciA9IHRoaXMucmVuZGVyKCk7XG4gICAgbGV0IGVsZW0gPSBZbmd3aWVWaWV3LnNldEFzTm9kZSh0YXJnZXQsIGNvbnRleHQpO1xuICAgIGVsZW0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBlbGVtLmFwcGVuZChyZW5kZXIpO1xuICAgIHJldHVybiBlbGVtO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiB5bmd3aWVFbGVtZW50fFNUUklORywgU1RSSU5HLCBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUxpc3RlbmVyXSAtPiB5bmd3aWVWaWV3XG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQoeW5nd2llRWxlbWVudCkge1xuICAgIHN3aXRjaCAoVXRpbC5nZXRUeXBlKHluZ3dpZUVsZW1lbnQpKSB7XG4gICAgICBjYXNlIFwiWW5nd2llRWxlbWVudFwiOlxuICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICByZXR1cm4gbmV3IFluZ3dpZVZpZXcoeW5nd2llRWxlbWVudCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZXQgZWxlbSA9IFluZ3dpZUVsZW1lbnQuaW5pdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gbmV3IFluZ3dpZVZpZXcoZWxlbSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogKiAtPiBCT09MRUFOXG4gIC8vIFJldHVybiBUUlVFIGlmIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIFluZ3dpZVZpZXdcbiAgc3RhdGljIGlzKHZhbCkge1xuICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBZbmd3aWVWaWV3O1xuICB9XG5cbiAgLy8gU1RSSU5HfEVMRU1FTlR8Vk9JRCwgRE9DVU1FTlR8Vk9JRCAtPiBFTEVNRU5UfERPQ1VNRU5URlJBR01FTlRcbiAgLy8gUmV0dXJucyBOT0RFIGZvciBnaXZlbiB0YXJnZXQgYW5kIGNvbnRleHRcbiAgc3RhdGljIHNldEFzTm9kZSh0YXJnZXQsIGNvbnRleHQpIHtcbiAgICBsZXQgYXJnVHlwZSA9IFV0aWwuZ2V0VHlwZSh0YXJnZXQpO1xuICAgIHN3aXRjaCAoYXJnVHlwZSkge1xuICAgICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgICAgICByZXR1cm4gY29udGV4dCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgICA6IGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICAgICAgY2FzZSBcIkVsZW1lbnRcIjpcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgcmV0dXJuIG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJBcmd1bWVudCBjYW5ub3QgYmUgYSBOT0RFXCIsIGFyZ1R5cGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IHludmlld1ZpZXcsIFNUUklOR3xFTEVNRU5UfFZPSUQsIERPQ1VNRU5UfFZPSUQgLT4gRUxFTUVOVFxuICAvLyBSZW5kZXJzIGdpdmVuIHZpZXcgYW5kIGFsbCBvZiBpdCBjaGlsZHJlbiB1c2luZyBnaXZlbiB0YXJnZXQgYW5kIGNvbnRleHQ6XG4gIHN0YXRpYyByZW5kZXIodmlldywgdGFyZ2V0LCBjb250ZXh0KSB7XG4gICAgbGV0IGVsZW0gPSB2aWV3LmVsZW0oKTtcbiAgICBsZXQgbm9kZSA9IFluZ3dpZVZpZXcuc2V0QXNOb2RlKHRhcmdldCwgY29udGV4dCk7XG4gICAgbGV0IHJlc3VsdCA9IHZpZXcuX2NoaWxkcmVuLnJlZHVjZSgoZWxlbSwgY2hpbGQpID0+IHtcbiAgICAgIGxldCB2aWV3ID0gY2hpbGQucmVuZGVyKCk7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKHZpZXcpO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSwgZWxlbSA9PT0gdW5kZWZpbmVkID8gbm9kZSA6IGVsZW0ucmVuZGVyKG5vZGUpKTtcbiAgICByZXR1cm4gcmVzdWx0IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudFxuICAgICAgPyByZXN1bHQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICAgIDogcmVzdWx0O1xuICB9XG5cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFluZ3dpZU1vZGVsIGZyb20gXCIuL01vZGVsL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVWaWV3IGZyb20gXCIuL1ZpZXcvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUNvbnRyb2xsZXIgZnJvbSBcIi4vQ29udHJvbGxlci9tYWluLmpzXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi9VdGlsL21haW4uanNcIjtcbmltcG9ydCB7VHJhbnNmb3JtLCBFcnJvcn0gZnJvbSBcInluZ3dpZVwiO1xuXG5leHBvcnQge1xuICBZbmd3aWVNb2RlbCBhcyBNb2RlbCxcbiAgWW5nd2llVmlldyBhcyBWaWV3LFxuICBZbmd3aWVDb250cm9sbGVyIGFzIENvbnRyb2xsZXIsXG4gIFRyYW5zZm9ybSxcbiAgRXJyb3IsXG4gIFV0aWxcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=