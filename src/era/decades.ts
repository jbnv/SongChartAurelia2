import {Columns} from '../resources/columns';
import {Collection} from '../resources/collection';

export class Decades extends Collection {

  fetchRouteFn = (parameters) => 'summary/decades'; // returns array of songs

  decades = {};

  maxFields = ['count','score'];

  columns = new Columns({
    'title': 'Name',
    'count': 'Songs',
    'score': 'Score'
  });

  massage() {
    this.aggregate();
  }

}
