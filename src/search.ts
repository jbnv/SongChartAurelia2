import {Collection} from './resources/collection';

export class Search extends Collection {
  fetchRouteFn = (parameters) => 'search/terms/'+parameters.slug;

  activate(parameters,routeConfig) {
    this.title = parameters.slug;
    super.activate(parameters,routeConfig);
    this.sortByScore();
  }
}
