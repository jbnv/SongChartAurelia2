import {ScaleGraph} from './scale-graph';
import {useView} from 'aurelia-framework';

function title(year) {
  return (""+year.slug).substr(2,1)+" "+(""+year.slug).substr(3,1);
}

@useView('./scale-graph.html')
export class YearCountGraph extends ScaleGraph {

  transformFn = function(year) {
    return {
      ordinal: year.slug,
      value: year.songCount || 0,
      route: "year/"+year.slug,
      tooltip: year.slug+": "+year.songCount
    };
  }

}
