export class MissingValueConverter {
    toView(value,slug) {
      return value || `MISSING (${slug})`;
    }
}
