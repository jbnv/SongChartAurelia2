import {Data} from '../resources/data';
import * as gregoria from 'gregoria';
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
      this.decadeRank = this.ranks['decade:'+this.debutEra.decade+'s'].rank;
      this.decadeCount = this.ranks['decade:'+this.debutEra.decade+'s'].total;
    }
    if (this.debutEra.year) {
      this.yearRank = this.ranks['year:'+this.debutEra.year+'s'].rank;
      this.yearCount = this.ranks['year:'+this.debutEra.year+'s'].total;
    }

    this.scores = [];
    for (var i = 1; i < this.ascentWeeks + this.descentWeeks; i++) {
      let denominator = i < this.ascentWeeks ? this.ascentWeeks : this.descentWeeks;
      this.scores.push(
        this.peak * (1-Math.pow((i-this.ascentWeeks)/denominator,2))
      );
    }

  }
}
