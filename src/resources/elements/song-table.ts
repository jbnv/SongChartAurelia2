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
    'motion': 'Motion',
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
      this.items = {};
    }

    // Make sure that each song has good data.
    for (let songSlug in data) {
      if (/^\_\_/.test(songSlug)) { delete data[songSlug]; continue; }
      this.makeQuery(`songs/compiled/${songSlug}`, song => {
        if (!song) song = {}; // This should never happen!
        let oldSong = data[songSlug] || {}; // data preserved from original load
        data[songSlug] = song || {};
        if (/boolean|number|string/.test(typeof song))
          data[songSlug] = { title: song }; // This should never happen!

        if (!song.artists) data[songSlug].artists = {};
        if (!song.debutEra) data[songSlug].debutEra = new gregoria(song.debut);
        if (typeof oldSong === "number") data[songSlug].score = oldSong;
        if (typeof oldSong === "object") {
          data[songSlug].role = oldSong.role;
          data[songSlug].score = oldSong.score;
        }
      })
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

  scoring = Scoring;

}
