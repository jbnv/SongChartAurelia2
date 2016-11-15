import {Data} from '../resources/data';
//import * as gregoria from 'gregoria';
import * as moment from 'moment';

export class Month extends Data {

  fetchRouteFn = (parameters) => 'months/'+parameters.slug; // returns array of songs
  type = "month";

  score: number;
  count: number;
  startDate: string;
  endDate: string;

  previous = {slug: null, route: null, title: null};
  next = {slug: null, route: null, title: null};
  pages = [];

  massage(inbound) {
    this.title = moment(this.slug).format("MMMM YYYY");
    this.count = inbound.count;
    this.score = inbound.score;

    this.startDate = this.slug+"-01";
    this.endDate = moment(this.startDate).endOf('month').format("YYYY-MM-DD");

    let previousMonth = moment(this.startDate).add(-1,'month');
    this.previous.slug = previousMonth.format("YYYY-MM");
    this.previous.route = `month/${this.previous.slug}`;
    this.previous.title = previousMonth.format("MMMM YYYY");

    let nextMonth = moment(this.startDate).add(1,'month');
    this.next.slug = nextMonth.format("YYYY-MM");
    this.next.route = `month/${this.next.slug}`;
    this.next.title = nextMonth.format("MMMM YYYY");

    // this.pages = Object.keys(this.monthNames).map(y => {
    //   return { title: this.monthNames[y], route: `month/${this.slug}-${y}` };
    // });

  }

}
