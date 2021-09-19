import {Element as YngwieElement, Error as YngwieError} from "yngwie";
import Util from "../Util/main.js";

export default class YngwieView {

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
    switch (Util.getType(arg)) {
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
        this._elem = () => YngwieElement.init.apply(null, args);
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
    throw new YngwieError("Only a yngwieView can be appended to another yngwieView", yngwieView);
  }

  // :: [yngwieView] -> this
  // Appends array of yngwieViews to this view:
  appends(yngwieViews) {
    if (yngwieViews instanceof Array) {
      return yngwieViews.reduce((result, view) => {
        return result.append(view);
      }, this);
    }
    throw new YngwieError("Expected ARRAY to append yngwieViews to this yngwieView", yngwieViews);
  }

  // :: STRING|ELEMENT|VOID, OJECT|VOID -> ELEMENT
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
    throw new YngwieError("Cannont re-render view because it hasn't been rendered yet.");
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
    switch (Util.getType(yngwieElement)) {
      case "YngwieElement":
      case "undefined":
        return new YngwieView(yngwieElement);
      default:
        let elem = YngwieElement.init.apply(null, arguments);
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
    let argType = Util.getType(target);
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
        throw new YngwieError("Argument cannot be a NODE", argType);
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
