import {Data} from './resources/data';
import {History} from './resources/history';

export class Welcome extends Data {
  fetchRoute = 'summary';
  title = 'Summary';

  summary = {};
  history: History;

  massage(inbound) {
    this.summary = inbound;
    this.history = new History();
  }
}
