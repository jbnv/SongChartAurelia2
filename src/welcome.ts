import {Data} from './resources/data';
import {History} from './resources/history';

export class Welcome extends Data {
  fetchRoute = 'summary';
  title = 'Summary';

  summary = {};
  history: History;

  decades = {};
  years = {};

  massage(inbound) {
    this.summary = inbound;
    this.history = new History();

    this.decades = inbound.decades;
    this.years = inbound.years;

  } // massage

} // Welcome
