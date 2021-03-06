import {Data} from '../resources/data';

export class Source extends Data {

  fetchRouteFn = (parameters) => 'sources/compiled/'+parameters.slug;

  title = '(Source)';
  type = "source";
  subtype = "movie";

  songs = {};
  songListModel = {};
  songCount = 0;

  showOnly = [];

  massage(inbound) {

    this.subtype = inbound.type;

    this.songs = inbound.songs;
    this.songCount = Object.keys(inbound.songs).length;

    this.showOnly = ['rank','title','artist','score','debutDate'];

  }

}
