import {Data} from './data';
import * as Transform from './transform';

export class Collection extends Data {

  sortColumn = "title";

  maxes = {};
  maxFields = [];

  sort(column,fn = null) {

    if (this.sortColumn == column) {
      this.viewSortOrder = !this.viewSortOrder;
    } else {
      this.sortColumn = column;
      this.viewSortOrder = true;
    }

    if (!fn) {
      switch (column) {
        case 'rank': fn = Transform.sortByRank; break;
        case 'title': fn = Transform.sortByTitle; break;
        case 'artistCount': fn = Transform.sortByArtistCount; break;
        case 'songCount': fn = Transform.sortBySongCount; break;
        case 'debutDate': fn = Transform.sortByDebutDate; break;
        case 'score': fn = Transform.sortByScore; break;
        case 'songAdjustedAverage': fn = Transform.sortBySAA; break;
        case 'artistAdjustedAverage': fn = Transform.sortByAAA; break;
        default: fn = function(a,b) { return 0; }
      }
    }

    this.viewSortFn =  fn;
    return this.view;
  }

  sortByRank()        { this.sort("rank"); }
  sortByTitle()       { this.sort("title"); }
  sortByDebutDate()   { this.sort("debutDate"); }
  sortBySongCount()   { this.sort("songCount"); }
  sortByArtistCount() { this.sort("artistCount"); }
  sortByScore()       { this.sort("score"); }
  sortBySAA()         { this.sort("songAdjustedAverage"); }
  sortByAAA()         { this.sort("artistAdjustedAverage"); }
  sortByDuration()    { this.sort("duration", function(a,b) {
    return (b["ascent-weeks"] || 0) + (b["descent-weeks"] || 0)
    - (a["ascent-weeks"] || 0) - (a["descent-weeks"] || 0);
  }); }
  sortByAscent()      { this.sort("ascent", function(a,b) {
    return (b["ascent-weeks"] || 0) - (a["ascent-weeks"] || 0);
  }); }
  sortByDescent()     { this.sort("descent", function(a,b) {
    return (b["descent-weeks"] || 0) - (a["descent-weeks"] || 0);
  }); }

  aggregate() {

    for (var slug in this.items) {
      let item = this.items[slug] || {};

      if (item.songs && item.songs.length > 0) {
        item.songCount = item.songs.length;
      }

      if (item.artists && item.artists.length > 0) {
        item.artistCount = item.artists.length;
      }

      this.maxFields.forEach(field => {
        if (item[field] > (this.maxes[field] || 0)) {
          this.maxes[field] = item[field];
        }
      });
    }

  }

  massage(inbound) {
    this.items = inbound
  }

}
