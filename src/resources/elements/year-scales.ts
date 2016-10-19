import {Era} from '../era';

export class YearScales {

  decades = {};
  years = {};
  countScales = [];
  aaScales = [];

  showCountGraph = true;
  showSaaGraph = true;

  toggleCountGraph() { this.showCountGraph = !this.showCountGraph; }
  toggleSaaGraph() { this.showSaaGraph = !this.showSaaGraph; }

  activate(songs) {

    this.decades = {};
    this.years = {};

    for (let decade = 1950; decade <= 2010; decade += 10) {
      let title = (""+decade)+"s"
      this.decades[decade] = {title:title, songCount:0, score:0};
    }

    for (let year = 1950; year <= 2016; year++) {
      let title = (""+year).substr(2,1)+" "+(""+year).substr(3,1);
      this.years[year] = {title:title, songCount:0, score:0};
    }

    songs.forEach(song => {
      if (!song.debutEra) {
        song.debutEra = new Era(song.debut);
      }
      let decade = song.debutEra.decade;
      if (decade) {
        this.decades[decade].songCount++;
        this.decades[decade].score += song.score;
      }
      let year = song.debutEra.year;
      if (year) {
        this.years[year].songCount++;
        this.years[year].score += song.score;
      }
    })

    let maxCount = 1; // ensure that divisor is always greater than 0
    let maxAA = 0.01;

    Object.keys(this.decades).forEach(decadeNumber => {
      let decade = this.decades[decadeNumber];
      decade.songAdjustedAverage = decade.score / Math.sqrt(decade.songCount);
      if (decade.songCount > maxCount) maxCount = decade.songCount;
      if (decade.songAdjustedAverage > maxAA) maxAA = decade.songAdjustedAverage;
    });

    Object.keys(this.decades).forEach(decadeNumber => {
      let decade = this.decades[decadeNumber];
      let r = (decade.songAdjustedAverage/maxAA)/(decade.songCount/maxCount);
      decade.highlight = "";
      if (r >= 1.2) {
        decade.highlight = "leader";
      } else if (r <= 0.8) {
        decade.highlight = "lagger";
      }
    });

    maxCount = 1; // ensure that divisor is always greater than 0
    maxAA = 0.01;

    Object.keys(this.years).forEach(yearNumber => {
      let year = this.years[yearNumber];
      year.songAdjustedAverage = year.score / Math.sqrt(year.songCount);
      if (year.songCount > maxCount) maxCount = year.songCount;
      if (year.songAdjustedAverage > maxAA) maxAA = year.songAdjustedAverage;
    });

    Object.keys(this.years).forEach(yearNumber => {
      let year = this.years[yearNumber];
      let r = (year.songAdjustedAverage/maxAA)/(year.songCount/maxCount);
      year.highlight = "";
      if (r >= 1.2) {
        year.highlight = "leader";
      } else if (r <= 0.8) {
        year.highlight = "lagger";
      }
    });

  }
}
