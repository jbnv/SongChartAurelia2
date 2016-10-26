// A ValueConverter for iterating an Object's values inside of a repeat.for in Aurelia.
export class ObjectValuesValueConverter {
    toView(obj) {
        if (Array.isArray(obj)) return obj;
        let temp = [];
        if (/number|string|boolean/.test(obj)) {
          temp.push(obj);
          return temp;
        }
        for (let key in obj) {
          let value = obj[key];
          temp.push(value);
        }
        return temp;
    }
}
