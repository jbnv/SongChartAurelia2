import * as gregoria from 'gregoria';

export class YearScales {

  decades = {};
  years = {};
  countScales = [];
  aaScales = [];

  showCountGraph = true;
  showSaaGraph = true;

  toggleCountGraph() { this.showCountGraph = !this.showCountGraph; }
  toggleSaaGraph() { this.showSaaGraph = !this.showSaaGraph; }

  _aggregateEra(collection) {
    var maxCount = 1; // ensure that divisor is always greater than 0
    var maxAA = 0.01;

    for (var slug in collection) {
      var item = collection[slug];
      if (item.count == 0) continue;
      item.score /= item.count;
      if (item.count > maxCount) maxCount = item.count;
      if (item.score > maxAA) maxAA = item.score;
    }

    for (var slug in collection) {
      var item = collection[slug];
      item.r = (item.score/maxAA)/(item.count/maxCount);
      item.leader = (item.r >= 1.2);
      item.lagger = (item.r <= 0.8);
    }

    return collection;

  }

  activate(songs) {
    if (!songs) return;

    let decades = {};
    let years = {};
    let nextYear = new Date().getFullYear() + 1;
    let nextDecade = (Math.floor(nextYear/10)+1)*10;

    for (let decade = 1950; decade <= nextDecade; decade += 10) {
      let title = (""+decade)+"s"
      decades[decade] = {title:title, count:0, score:0};
    }

    for (let year = 1950; year <= nextYear; year++) {
      let title = (""+year).substr(2,1)+" "+(""+year).substr(3,1);
      years[year] = {title:title, count:0, score:0};
    }

    for (let songSlug in (songs || {})) {
      let song = songs[songSlug];
      if (!song.debutEra) {
        song.debutEra = new gregoria(song.debut);
      }
      let decade = song.debutEra.decade;
      if (decade) {
        decades[decade].count++;
        decades[decade].score += song.score;
      }
      let year = song.debutEra.year;
      if (year) {
        years[year].count++;
        years[year].score += song.score;
      }
    }

    this.decades = this._aggregateEra(decades);
    this.years = this._aggregateEra(years);

  }

}
