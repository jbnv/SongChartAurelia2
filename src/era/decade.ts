import {Data} from '../resources/data';
//import * as gregoria from 'gregoria';

export class Decade extends Data {

  fetchRouteFn = (parameters) => 'decades/'+parameters.slug; // returns array of songs
  type = "decade";

  score: number;
  count: number;

  songs = {};
  years = [];
  year0 = 0;

  previous = {slug: null, route: null, title: null};
  next = {slug: null, route: null, title: null};
  pages = [];

  countScales = [];
  aaScales = [];

  massage(inbound) {
    console.log("[22]",inbound); //TEMP
    this.title = this.slug;
    this.songs = inbound.songs || {};
    this.count = inbound.count;
    this.score = inbound.score;
    this.year0 = parseInt(this.slug.substring(0,4));
    this.years = [0,1,2,3,4,5,6,7,8,9].map(n => this.year0+n);

    this.previous.slug = `${this.year0-10}s`;
    this.previous.route = `decade/${this.previous.slug}`;
    this.previous.title = this.previous.slug

    this.next.slug = `${this.year0+10}s`;
    this.next.route = `decade/${this.next.slug}`;
    this.next.title = this.next.slug;

    this.pages = this.years.map(function(y) { return { title: y, route: "year/"+y };})

    // Get years.
    firebase.database().ref("years").once("value", (snapshot) => {
      let years = snapshot.val();

      this.countScales = [];
      this.aaScales = [];

      this.years.forEach(yearSlug => {
        let year = years[yearSlug];
        this.countScales.push({
          title: yearSlug,
          value: year.count,
          route: "year/"+yearSlug
        });
        this.aaScales.push({
          title: yearSlug,
          value: Math.floor(year.score*100)/100,
          route: "year/"+yearSlug
        });
      });

    })


  }

}
