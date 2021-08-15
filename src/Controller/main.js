import YngwieModel from "../Model/main.js";
import YngwieView from "../View/main.js";
import {Error as YngwieError} from "yngwie";

export default class YngwieController {

  // CONSTRUCTOR :: {STRING:*->VOID} -> yngwieController
  constructor(registry) {
    this._registry = registry || {};
  }

  // :: STRING, (* -> VOID) -> this;
  // Binds function to given STRING:
  register(id, fn) {
    this._registry[id] = fn;
    return this;
  }

  // :: STRING -> BOOLEAN
  // Returns boolean for if any functions are bound to given ID:
  isRegistered(id) {
    return this._registry[id] !== undefined;
  }

  // :: STRING -> this;
  // Removes function bound to given STRING:
  // NOTE: If ID does not exist, an yngwieError is thrown:
  unregister(id) {
    if (this.isRegistered(id) === true) {
      delete this._registry[id];
      return this;
    }
    throw new YngwieError("No functions bound to given ID", id);
  }

  // STRING, * -> this;
  // Applies value to function bound to signal ID
  // NOTE: If ID does not exist, a yngwieError is thrown:
  signal(id, val) {
    if (this.isRegistered(id) === true) {
      this._registry[id].call(this, val);
      return this;
    }
    throw new YngwieError("Cannot dispatch value to an ID that doesn't exist", id);
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
