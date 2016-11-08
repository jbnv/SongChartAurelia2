import {Data} from '../resources/data';
import * as numeral from 'numeral';

export class Artist extends Data {

  fetchRouteFn = (parameters) => 'artists/compiled/'+parameters.slug;

  title = '(Artist)';
  type = "artist";
  complete = false;
  active = false;
  typeTitle = "NOT SET";
  genres = {};
  birth = "";
  death = "";
  origin = {};
  songs = {};
  rank: number;
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
    this.rank = inbound.__rank;
    this.type = inbound.type.slug;
    this.typeTitle = inbound.type.title || "NOT SET";
    this.status
      = inbound.complete ? "complete"
      : inbound.active ? "active" : "incomplete";
    this.birth = inbound.birth;
    this.death = inbound.death;

    //TODO Make origin a hierarchical object.
    this.origin = {};
    if (inbound.origin) this.origin[inbound.origin.instanceSlug] = inbound.origin;

    this.genres = inbound.genres || {};
    this.members = inbound.members || {};
    this.xref = inbound.xref || {};
    this.tags = inbound.tags || {};
    this.ranks = inbound.ranks || {};
    this.songs = inbound.songs || {};

    this.score = numeral(inbound.score || 0).format("0.00");
    this.songAdjustedAverage = numeral(inbound.songAdjustedAverage || 0).format("0.00");

  } // massage()
}
