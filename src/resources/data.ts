import {ReactiveCollection} from "./firebase/collection"
import {History} from '../resources/history';

export class Data extends ReactiveCollection {
  title = "";
  subtitle = "";
  route = "";
  fetchRoute = "";
  fetchRouteFn = null;
  slug = "";
  parameters = {};
  navModel = null;

  massage(data) {}

  refresh() {
    let fetchRoute = this.fetchRoute;
    if (this.fetchRouteFn) { fetchRoute = this.fetchRouteFn(this.parameters); }
    this.navModel.setTitle(this.title);
    this.setPath(fetchRoute,this.massage.bind(this));

    // Determine exact route for history.
    let route = this.route;
    for (var key in this.parameters) {
      route = route.replace(":"+key,this.parameters[key]);
    }
    (new History()).mark(route,this.title).then();
  }

  activate(parameters,routeConfig) {
    this.parameters = parameters;
    this.slug = parameters.slug;
    this.route = routeConfig.route;
    this.navModel = routeConfig.navModel;
    return this.refresh();
  }

}
