export class AnyValueConverter {
    toView(obj) {
      if (!obj) return false;
      if (/number|string|boolean/.test(typeof obj)) {
        return true;
      }
      if (Array.isArray(obj)) return obj.length > 0;
      return Object.keys(obj).length > 0;
    }
}
