export class PluralCaseValueConverter {
    toView(obj,a) {
      let singular = a[0], plural = a[1];
      if (!obj) return null;
      if (/number|string|boolean/.test(typeof obj)) {
        return singular;
      }
      if (Array.isArray(obj)) return obj.length == 1 ? singular : plural;
      return Object.keys(obj).length == 1 ? singular : plural;
    }
}
