import {ScaleGraph} from './scale-graph';
import {useView} from 'aurelia-framework';

@useView('./scale-graph.html')
export class DecadeCountGraph extends ScaleGraph {

  transformFn = function(decade) {
    return {
      ordinal: parseInt(decade.slug.substring(0,4)),
      value: decade.count || 0,
      route: "decade/"+decade.slug,
      tooltip: decade.slug+"s: "+decade.count,
      leader: decade.leader,
      lagger: decade.lagger
    };
  };

}
