import {Data} from '../resources/data';
//import * as gregoria from 'gregoria';

export class Year extends Data {

  fetchRouteFn = (parameters) => 'years/'+parameters.slug; // returns array of songs
  type = "year";

  score: number;
  count: number;

  songs = {};
  months = [];
  month0 = 0;

  previous = {slug: null, route: null, title: null};
  next = {slug: null, route: null, title: null};
  pages = [];

  countScales = [];
  aaScales = [];

  monthNames = {
    "01":"Jan","02":"Feb","03":"Mar","04":"Apr","05":"May","06":"Jun",
    "07":"Jul","08":"Aug","09":"Sep","10":"Oct","11":"Nov","12":"Dec"
  };

  massage(inbound) {
    this.title = this.slug;
    this.songs = inbound.songs || {};
    this.count = inbound.count;
    this.score = inbound.score;
    this.months = Object.keys(this.monthNames).map(n => `${this.slug}-${n}`);

    this.previous.slug = `${parseInt(this.slug)-1}`;
    this.previous.route = `year/${this.previous.slug}`;
    this.previous.title = this.previous.slug

    this.next.slug = `${parseInt(this.slug)+1}`;
    this.next.route = `year/${this.next.slug}`;
    this.next.title = this.next.slug;

    this.pages = Object.keys(this.monthNames).map(y => {
      title: this.monthNames[y], route: `month/${this.slug}-${y}`
    });

    // Get months.
    firebase.database().ref("months").once("value", (snapshot) => {
      let months = snapshot.val();

      this.countScales = [];
      this.aaScales = [];

      this.months.forEach(monthSlug => {
        let month = months[monthSlug];
        this.countScales.push({
          title: monthSlug,
          value: month.count,
          route: "month/"+monthSlug
        });
        this.aaScales.push({
          title: monthSlug,
          value: Math.floor(month.score*100)/100,
          route: "month/"+monthSlug
        });
      });

    })


  }

}
