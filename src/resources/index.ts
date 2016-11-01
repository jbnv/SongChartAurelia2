export function noop() { return null; }
export function identity(value) { return value; }

export function configure(aurelia) {
  aurelia.globalResources([
    './value-converters/any',
    './value-converters/decimal',
    './value-converters/missing',
    './value-converters/object-values',
    './value-converters/plural-case',
    './elements/song-table',
    './elements/artist-table',
    './elements/messages',
    './elements/rank-bar'
  ]);
}
