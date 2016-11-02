import {Data} from '../resources/data';
import * as numeral from 'numeral';

export class Artist extends Data {

  fetchRouteFn = (parameters) => 'artists/compiled/'+parameters.slug;

  title = '(Artist)';
  complete = false;
  active = false;
  typeTitle = "NOT SET";
  genres = {};
  birth = "";
  death = "";
  origin = "";
  songs = {};
  score = 0.00;
  songAdjustedAverage = 0.00;
  status = "";
  ranks = {};
  roles = {}
  members = {};
  xref = {};
  tags = {};

  songSort: string;
  songShowOnly = [ 'rank','title','role','score', 'debutDate','peakScore','ascent','descent' ];

  collaboratorSort: string;
  collaboratorShowOnly = [ 'title','songCount','score' ];

  massage(inbound) {
    console.log("inbound",inbound);
    this.type = inbound.type.slug;
    this.typeTitle = inbound.type.title || "NOT SET";
    this.status
      = inbound.complete ? "complete"
      : inbound.active ? "active" : "incomplete";
    this.genres = inbound.genres || {};
    this.members = inbound.members || {};
    this.xref = inbound.xref || {};
    this.tags = inbound.tags || {};

    this.score = numeral(inbound.score || 0).format("0.00");
    this.songAdjustedAverage = numeral(inbound.songAdjustedAverage || 0).format("0.00");

    // Pull out ranks and add them to their respective entities.
    // (Could this maybe go on the server side?)
    Object.keys(this.ranks || {}).forEach(key => {
      let rank = this.ranks[key];
      let keyParts = key.split(":");
      let typeSlug = keyParts[0];
      let instanceSlug = keyParts[1];
      let entity = null;
      switch (typeSlug) {
        case "genre":
          entity = this.genres[instanceSlug];
          break;
        case "role":
          entity = this.roles[instanceSlug];
          break;
        case "origin":
          entity = this.origin || {};
          break;
        case "tag":
          entity = this.tags[instanceSlug];
          break;
      }
      if (entity) {
        entity.rank = rank.rank;
        entity.count = rank.total;
      }
    });

  } // massage()
}
