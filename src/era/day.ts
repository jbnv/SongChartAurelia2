import {Data} from '../resources/data';
//import * as gregoria from 'gregoria';
import * as moment from 'moment';

export class Day extends Data {

  fetchRouteFn = (parameters) => 'days/'+parameters.slug; // returns array of songs
  type = "day";

  score: number;
  count: number;
  startDate: string;
  endDate: string;

  previous = {slug: null, route: null, title: null};
  next = {slug: null, route: null, title: null};
  pages = [];

  massage(inbound) {
    let dayMoment = moment(this.slug);

    this.title = dayMoment.format("MMMM D, YYYY");
    this.count = inbound.count;
    this.score = inbound.score;

    let previousDay = moment(dayMoment).add(-1,'day');
    this.previous.slug = previousDay.format("YYYY-MM-DD");
    this.previous.route = `day/${this.previous.slug}`;
    this.previous.title = previousDay.format("MMMM D, YYYY");

    let nextDay = moment(dayMoment).add(1,'day');
    this.next.slug = nextDay.format("YYYY-MM-DD");
    this.next.route = `day/${this.next.slug}`;
    this.next.title = nextDay.format("MMMM D, YYYY");

    // this.pages = Object.keys(this.dayNames).map(y => {
    //   return { title: this.dayNames[y], route: `day/${this.slug}-${y}` };
    // });

  }

}
