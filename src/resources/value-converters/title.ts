export class TitleValueConverter {
    toView(obj) {
      const _default = "MISSING";
      if (!obj) return _default;
      if (typeof obj == "string") { return obj; }
      if (typeof obj == "number") { return obj; }
      if (typeof obj == "boolean") { return _default; }
      return obj.title || _default;
    }
}
