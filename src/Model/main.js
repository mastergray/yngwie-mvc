import Util from "../Util/main.js";
import {Error as YngwieError} from "yngwie";

export default class YngwieModel {

  // CONSTRUCTOR :: OBJECT -> yngwieModel
  constructor(data) {
    this._state = data;
  }

  // :: VOID|STRING -> OBJECT
  // Returns data of model with applied scope, otherwise returns all data stored in model:
  state(scope) {
    return scope === undefined ? this._state : YngwieModel.resolveScope(scope, this._state);
  }

  // :: STRING|FUNCTION, (OBJECT, OBJECT -> *)|VOID -> this;
  // Applies function to state and optional scope, replacing state with the result of that function:
  update(a, b) {
    let typeArg = Util.getType(a);
    switch (typeArg) {
      case "Function":
        this._state = a(this._state);
      break;
      case "String":
        this._state = b(this._state, this.state(a));
      break;
      default:
        throw new YngwieError("Argument passed to yngwieModel.update is of an unsupported type", typeArg);
    }
    return this;
  }

  // :: STRING|(yngwieModel -> VOID), (yngwieModel -> VOID)|VOID -> VOID
  // Applies function to every element of scope, if only function is given then it's applied to every element of state:
  each(a, b) {
    let typeArg = Util.getType(a);
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
          throw new YngwieError("Scope is not an array", typeArg);
        }
      break;
      default:
        throw new YngwieError("Argument passed to YngwieModel.forEach is of an unsupported type", typeArg);
    }
  }

  // :: STRING, *|VOID -> this|*
  // Sets or gets property from model:
  prop(id, val) {
    if (val === undefined) {
      if (this._state[id] !== undefined) {
        return this._state[id];
      }
      throw new YngwieError("No property found for given ID", id);
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

  // :: OBJECT, STRING -> yngwieModelscope
  // Static factory method:
  static init(data, onUpdate) {
    return new YngwieModel(data, onUpdate);
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
