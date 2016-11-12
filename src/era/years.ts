import {Columns} from '../resources/columns';
import {Collection} from '../resources/collection';

export class Years extends Collection {

  fetchRouteFn = (parameters) => 'summary/years'; // returns array of songs

  years = {};

  maxFields = ['count','score'];

  columns = new Columns({
    'title': 'Name',
    'count': 'Songs',
    'score': 'Score'
  });

  massage() {
    this.aggregate();
    this.viewSortFn = (a,b) => parseInt(a.key) - parseInt(b.key);
  }

}
