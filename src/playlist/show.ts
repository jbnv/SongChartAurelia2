import {Data} from '../resources/data';

export class Playlist extends Data {

  fetchRouteFn = (parameters) => 'playlists/compiled/'+parameters.slug;

  title = '(Playlist)';
  type = "playlist";
  description = "";

  songs = {};
  songListModel = {};
  songCount = 0;

  showOnly = [];
  sort: string;

  massage(inbound) {
    this.description = inbound.description;

    this.songs = inbound.songs;
    this.songCount = Object.keys(inbound.songs).length;

    this.showOnly = inbound.columns || ['rank','title','artist','score','debutDate','duration','ascent','descent'];
    this.sort = inbound.sort || "score";

  }

}
