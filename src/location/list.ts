import {Collection} from '../resources/collection';

export class Locations extends Collection {
  fetchRoute = 'geo/compiled';
  title = 'Locations';
  type = "location";
}
