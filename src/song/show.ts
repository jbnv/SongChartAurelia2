import {Data} from '../resources/data';
import * as numeral from 'numeral';

export class Song extends Data {

  fetchRouteFn = (parameters) => 'songs/compiled/'+parameters.slug;

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
  rank: number;
  status: string;
  debutEra = {};
  decade: any;
  year: any;

  scores = [];

  massage(inbound) {

    this.rank = inbound.__rank;
    this.peak = inbound.peak;
    this["ascent-weeks"] = inbound["ascent-weeks"];
    this["descent-weeks"] = inbound["descent-weeks"];

    this.score = (2/3) * inbound.peak * (inbound["ascent-weeks"]+inbound["descent-weeks"]);

    this.artists = inbound.artists || {};
    this.genres = inbound.genres || {};
    this.playlists = inbound.playlists || {};
    this.ranks = inbound.ranks || {};
    this.sources = inbound.sources || {};
    this.tags = inbound.tags || {};

    this.debutEra = inbound.debutEra || {};

    // Pull out ranks and add them to their respective entities.
    Object.keys(this.ranks).forEach(key => {
      let rank = this.ranks[key];
      let keyParts = key.split(":");
      let typeSlug = keyParts[0];
      let instanceSlug = keyParts[1];
      let entity = null;
      switch (typeSlug) {
        case "artist":
          entity = this.artists[instanceSlug];
          break;
        case "genre":
          entity = this.genres[instanceSlug];
          break;
        case "playlist":
          entity = this.playlists[instanceSlug];
          break;
        case "source":
          entity = this.sources[instanceSlug];
          break;
        case "decade":
          entity = this.decade = {"instanceSlug":key};
          break;
        case "year":
          entity = this.year = {"instanceSlug":key};
          break;
      }
      if (entity && typeof entity == "object") {
        entity.rank = rank.rank;
        entity.count = rank.total;
      }
    });

    this.scores = [];
    let ascentWeeks = this["ascent-weeks"];
    let descentWeeks = this["descent-weeks"];
    for (var i = 1; i < ascentWeeks + descentWeeks; i++) {
      let denominator = i < ascentWeeks ? ascentWeeks : descentWeeks;
      this.scores.push(
        this.peak * (1-Math.pow((i-ascentWeeks)/denominator,2))
      );
    }

  }
}
