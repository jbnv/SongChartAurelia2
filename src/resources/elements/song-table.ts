import {bindable} from 'aurelia-framework';

import {Columns} from '../columns';
import {Collection} from '../collection';
import * as Scoring from '../scoring';
import * as gregoria from 'gregoria';

export class SongTableCustomElement extends Collection {

  @bindable path: string;
  @bindable showOnly = [];
  @bindable sortSlug: string;
  @bindable subsetSlug: string;
  @bindable take: number;

  maxFields = ['score','peak','ascent-weeks','descent-weeks'];

  columns = new Columns({
    'rank': 'Rank',
    'overallRank':"Overall Rank",
    'title': 'Title',
    'artist': "Artist",
    'role': "Role",
    'score': 'Score',
    'genre': 'Genre',
    'source': 'Source',
    'projectedRank': "Projected Rank",
    'debutDate': "Debut Date",
    'debutScore': "Debut Score",
    'peakScore': "Peak Score",
    'debutRank': "Debut Rank",
    'peakRank': "Peak Rank",
    'duration': "Duration (Months)",
    'ascent': "Ascent (Weeks)",
    'descent': "Descent (Weeks)"
  });

  attached() {
    this.setPath(this.path,this.massage.bind(this));
  }

  massage(data) {

    if (!data) {
      throw "No data given.";
    }

    // Make sure that each song has good data.
    for (let songSlug in data) {
      if (/^\_\_/.test(songSlug)) { delete data[songSlug]; continue; }
      if (!data[songSlug]) data[songSlug] = {};
      if (/boolean|number|string/.test(typeof data[songSlug])) data[songSlug] = { title: data[songSlug] }; // This should never happen!
      let song = data[songSlug] || {};
      if (!song.artists) song.artists = {};
      if (!song.debutEra) song.debutEra = new gregoria(song.debut);
    }

    this.items = data;
    this.aggregate();

    if (this.showOnly) {
      Columns.prototype.showOnly.apply(this.columns,this.showOnly);
    }

    this.sort(this.sortSlug || 'score');
    this.viewCount = this.take;

  }

  titleArtists(artists) {
    let outbound = [];
    for (let artistSlug in artists) {
      if (artists[artistSlug].roleSlug === true) outbound.push(artists[artistSlug]);
    }
    return outbound;
  }

  bendUp = Scoring.bendUp;
  bendDown = Scoring.bendDown;
  ascentUp = Scoring.ascentUp;
  descentUp = Scoring.descentUp;
}
