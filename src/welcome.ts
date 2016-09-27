import {Data} from './resources/data';

export class Welcome extends Data {
  fetchRoute = 'summary';
  title = 'Summary';

  summary = {};

  massage(inbound) {
    this.summary = inbound;
  }
}
