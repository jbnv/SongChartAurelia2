// A ValueConverter for iterating an Object's values inside of a repeat.for in Aurelia.
export class ObjectValuesValueConverter {
    toView(obj,options) {
        if (!options) options = {};
        if (Array.isArray(obj)) return obj;
        let temp = [];
        if (/number|string|boolean/.test(typeof obj)) {
          temp.push(obj);
          return temp;
        }
        for (let key in obj) {
          let value = obj[key];
          if (typeof value === "object") value.__key = key;
          if (options.kvp) value = {__key: key, __value:obj[key]};
          temp.push(value);
        }
        return temp;
    }
}
