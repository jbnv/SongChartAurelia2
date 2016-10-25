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

  _massage(inbound) {
    console.log("Data.massage",inbound); //PERMANENT
    this.title = inbound.title;

    // Determine exact route for history.
    let route = this.route;
    for (var key in this.parameters) {
      route = route.replace(":"+key,this.parameters[key]);
    }
    (new History()).mark(route,this.title).then();

    this.massage(inbound); // custom massaging by derived class
  }

  massage(inbound) {
  }

  refresh() {
    let fetchRoute = this.fetchRoute;
    if (this.fetchRouteFn) { fetchRoute = this.fetchRouteFn(this.parameters); }
    this.navModel.setTitle(this.title);
    this.setPath(fetchRoute,this._massage.bind(this));

  }

  activate(parameters,routeConfig) {
    console.log("Data.activate",parameters); //PERMANENT
    this.parameters = parameters;
    this.slug = parameters.slug;
    this.route = routeConfig.route;
    this.navModel = routeConfig.navModel;
    return this.refresh();
  }

}
