// import numeral from 'numeral';

export class ScaleGraph {

  items = [];
  transformFn = (x) => x;

  saa(o) {
    // return numeral( || 0).format("0.00")
    return Math.floor(parseFloat(o.songAdjustedAverage) * 100) / 100;
  }

  // items: object (associative array)
  activate(items) {

    if (!items) { items = {}; }

    // Determine maximum value.
    let max = 1;
    var outbound = [];
    Object.keys(items).forEach(key => {
      let item = items[key];
      item.slug = key;
      item = this.transformFn(item);
      if (item.value > max) max = item.value;
      outbound.push(item);
    });

    // Project to array.
    if (max > 0) {
      outbound.forEach(item => {
        item.scale = 1.0 * item.value / max;
      });
    }

    this.items = outbound
      .sort((a,b) => {
        return ((a || {}).ordinal || 0) - ((b || {}).ordinal || 0);
      });

  }
}
