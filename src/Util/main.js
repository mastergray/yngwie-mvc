// Singleton of utility methods:
export default class {

  // :: * -> STRING
  // Returns type of given value as STRING:
  static getType(val) {
    if (val === undefined) return "undefined";
    if (val === null) return "null";
    return val.constructor.name;
  }
  
}
