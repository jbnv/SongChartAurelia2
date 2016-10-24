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

    this.decades = {};
    this.years = {};

    for (let decadeSlug in inbound.decades) {
      this.decades[decadeSlug] = {
        songCount: inbound.decades[decadeSlug].count,
        songAdjustedAverage: inbound.decades[decadeSlug].score
      }
    }

    for (let yearSlug in inbound.years) {
      this.years[yearSlug] = {
        songCount: inbound.years[yearSlug].count,
        songAdjustedAverage: inbound.years[yearSlug].score
      }
    }

  } // massage

} // Welcome
