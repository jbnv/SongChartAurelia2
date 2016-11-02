import {bindable} from 'aurelia-framework';

import {Columns} from '../columns';
import {Collection} from '../collection';

export class ArtistTableCustomElement extends Collection {

  @bindable path: string;
  @bindable showOnly = [];
  @bindable sortSlug: string;
  @bindable subsetSlug: string;
  @bindable take: number;

  _defaultCount = 100;

  maxFields = ['songCount','score'];

  columns = new Columns({
    'rank': 'Rank',
    'title': 'Name',
    'type': 'Type',
    'complete': 'Complete',
    'songCount': 'Songs',
    'score': 'Score',
    'songAdjustedAverage': 'SAA',
  });

  // Lifecycle methods

  attached() {
    this.setPath(this.path,this.massage.bind(this));
  }

  massage(data) {

    if (!data) {
      throw "No data given.";
    }

    // Make sure that each artist has good data.
    for (let artistSlug in data) {
      if (/^\_\_/.test(artistSlug)) { delete data[artistSlug]; continue; }
      if (!data[artistSlug]) data[artistSlug] = {};
      if (/boolean|number|string/.test(typeof data[artistSlug])) data[artistSlug] = { title: data[artistSlug] }; // This should never happen!
      let artist = data[artistSlug] || {};
      if (!artist.songs) artist.songs = {};
      if (!this.columns.songAdjustedAverage.hidden && !artist.songAdjustedAverage) {
        artist.songAdjustedAverage = artist.score;
      }
    }

    this.aggregate();

    if (data.showOnly) {
      Columns.prototype.showOnly.apply(this.columns,data.showOnly);
    } else if (data.hide) {
      Columns.prototype.hide.apply(this.columns,data.hide);
    }

    if (this.subsetSlug) {
      let subsetParts = this.subsetSlug.split(":");
      if (subsetParts[0] == "top") {
        this.viewCount = parseInt(subsetParts[1] || this._defaultCount);
      }
    }

    this.sort('songAdjustedAverage');
    this.viewCount = this.take;

  }

  artistType(artist) {
    if (!artist) return null;
    if (typeof artist.type == "string") return artist.type;
    return (artist.type || {}).slug;
  }
}
