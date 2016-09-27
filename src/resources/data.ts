import {ReactiveCollection} from "./firebase/collection"

export class Data extends ReactiveCollection {
  title = "";
  subtitle = "";
  fetchRoute = "";
  fetchRouteFn = (x) => null;
  slug = "";
  parameters = {};
  navModel = null;

  massage(data) {}

  // refresh() {
  //   let fetchRoute = this.fetchRoute;
  //   if (this.fetchRouteFn) {
  //     fetchRoute = this.fetchRouteFn(this.parameters);
  //   }
  //   return this.http.fetch(fetchRoute)
  //     .then(response => response.json())
  //     .then(data => {
  //       data.instanceSlug = data.instanceSlug || this.slug;
  //       Object.keys(data).forEach(key => this[key] = data[key]);
  //       this.massage(data);
  //       this.navModel.setTitle(this.title);
  //     });
  // }

  activate(parameters,routeConfig) {
    this.parameters = parameters;
    this.slug = parameters.slug;
    this.navModel = routeConfig.navModel;
    //return this.refresh();
  }

}
