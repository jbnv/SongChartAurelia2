import {Data} from '../resources/data';

export class Location extends Data {

  fetchRouteFn = (parameters) => 'geo/compiled/'+parameters.slug;

  title = '(Location)';
  type = "location";
  parents = [];
  children = [];
  artists = [];

  massage(inbound) {
    this.title = inbound.title;
    this.parents = inbound.parents;
    this.children = inbound.children;
    this.artists = inbound.artists;
  }

}
