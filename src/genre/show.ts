import {Data} from '../resources/data';

export class Genre extends Data {

  fetchRouteFn = (parameters) => 'genres/compiled/'+parameters.slug;

  title = '(Genre)';
  type = "genre";
  slug = "";
  parents = [];
  children = [];
  artists = [];
  songs = [];

  massage(inbound) {
    this.title = inbound.title;
    this.slug = inbound.instanceSlug;
    this.parents = inbound.parents;
    this.children = inbound.children;

    for (let artistSlug in inbound.artists) {
      this.artists.push(inbound.artists[artistSlug]);
    }

    for (let songSlug in inbound.songs) {
      this.songs.push(inbound.songs[songSlug]);
    }

  }

}
