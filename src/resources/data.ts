import {ReactiveCollection} from "./firebase/collection"
import {History} from '../resources/history';

export class Data extends ReactiveCollection {
  title = "";
  subtitle = "";
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
    (new History()).mark(fetchRoute,this.title).then();
  }

  activate(parameters,routeConfig) {
    this.parameters = parameters;
    this.slug = parameters.slug;
    this.navModel = routeConfig.navModel;
    return this.refresh();
  }

}
