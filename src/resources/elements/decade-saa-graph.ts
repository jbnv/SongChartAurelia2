import {ScaleGraph} from './scale-graph';
import {useView} from 'aurelia-framework';

@useView('./scale-graph.html')
export class DecadeSaaGraph extends ScaleGraph {

  transformFn = function(decade) {
    return {
      ordinal: parseInt(decade.slug.substring(0,4)),
      value: decade.songAdjustedAverage || 0,
      route: "decade/"+decade.slug,
      tooltip: decade.slug+"s: "+this.saa(decade),
    };
  };

}
