export class CountValueConverter {
    toView(obj) {
      if (!obj) return null;
      if (/number|string|boolean/.test(typeof obj)) {
        return 1;
      }
      if (Array.isArray(obj)) return obj.length;
      return Object.keys(obj).length;
    }
}
