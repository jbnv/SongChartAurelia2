export function noop() { return null; }
export function identity(value) { return value; }

export function count(obj) {
  if (obj === null) return 0;
  if (/number|string|boolean/.test(typeof obj)) {
    return 1;
  }
  if (Array.isArray(obj)) return obj.length;
  return Object.keys(obj).length;
}

export function configure(aurelia) {
  aurelia.globalResources([
    './value-converters/any',
    './value-converters/count',
    './value-converters/count-flag',
    './value-converters/decimal',
    './value-converters/missing',
    './value-converters/object-values',
    './value-converters/plural-case',
    './value-converters/title',
    './elements/song-table',
    './elements/artist-table',
    './elements/messages',
    './elements/rank-bar',
    './elements/smart-select',
    './elements/value-bar'
  ]);
}
