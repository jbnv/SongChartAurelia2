// A ValueConverter for iterating an Object's values inside of a repeat.for in Aurelia.
export class ObjectValuesValueConverter {
    toView(obj) {
        let temp = [];
        for (let key in obj) {
          let value = obj[key];
          value.__key = key;
          temp.push(value);
        }
        return temp;
    }
}
