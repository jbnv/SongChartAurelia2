import {Data} from '../resources/data';
import * as gregoria from 'gregoria';
import * as moment from 'moment';
import * as numeral from 'numeral';
import * as Scoring from '../resources/scoring';

export class Song extends Data {

  fetchRouteFn = (parameters) => 'songs/compiled/'+parameters.slug;

  editMode = false;

  title = '(Song)';
  typeTitle = "NOT SET";
  artists = {};
  genres = {};
  ranks = {};
  sources = {};
  playlists = {};
  tags = {};

  score: number;
  peak: number;
  ascentWeeks: number;
  descentWeeks: number;
  rank: number;
  status: string;

  debutEra = {};
  decadeRank: number;
  decadeCount: number;
  yearRank:number;
  yearCount:number;

  scores = [];

  scoring = Scoring;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  massage(inbound) {

    this.rank = ((inbound.ranks || {}).overall || {}).rank;
    this.peak = inbound.peak;
    this.ascentWeeks = inbound["ascent-weeks"];
    this.descentWeeks = inbound["descent-weeks"];

    this.score = (2/3) * inbound.peak * (inbound["ascent-weeks"]+inbound["descent-weeks"]);

    this.artists = inbound.artists || {};
    this.genres = inbound.genres || {};
    this.playlists = inbound.playlists || {};
    this.ranks = inbound.ranks || {};
    this.sources = inbound.sources || {};
    this.tags = inbound.tags || {};

    this.debutEra = new gregoria(inbound.debut) || {decade:null,year:null};
    if (this.debutEra.decade) {
      let rank = this.ranks['decade:'+this.debutEra.decade+'s'] || {};
      this.decadeRank = rank.rank;
      this.decadeCount = rank.total;
    }
    if (this.debutEra.year) {
      let rank = this.ranks['year:'+this.debutEra.year] || {};
      this.yearRank = rank.rank;
      this.yearCount = rank.total;
    }

    this.scores = [];
    let momentIterator = moment(inbound.debut);
    for (var d = 1; d < (this.ascentWeeks+this.descentWeeks)*7; d++) {
      let w = d / 7.0;
      let denominator = w < this.ascentWeeks ? this.ascentWeeks : this.descentWeeks;
      let value = this.peak * (1-Math.pow((w-this.ascentWeeks)/denominator,2));
      let header = `${d}`;
      if (momentIterator.isValid()) {
        momentIterator.add(1,'day');
        header = momentIterator.format("YYYY-MM-DD");
      }
      this.scores.push({
          class: Math.abs(w-this.ascentWeeks)*7 < 1 ? "vertical-bar-peak" : "vertical-bar",
          title: `${header}: ${numeral(value).format("0.000")}`,
          value: value,
        }
      );
    }

  }
}
