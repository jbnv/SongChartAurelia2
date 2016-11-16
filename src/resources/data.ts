import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator'; // jspm install aurelia-event-aggregator

import {ReactiveCollection} from "./firebase/collection"
import {History} from '../resources/history';

@inject(EventAggregator)
export class Data extends ReactiveCollection {

  title = "";
  subtitle = "";  // A subtitle for filtered results.

  type: string;
  route = "";
  fetchRoute = "";
  fetchRouteFn = null;
  slug = "";
  parameters: any;
  navModel = null;

  subscription: any;
  eventAggregator: any;

  constructor(eventAggregator) {
    super();
    this.eventAggregator = eventAggregator;
  }

  _massage(inbound) {
    console.log("Data._massage [18]"); //TEMP
    this.title = inbound.title || this.title;
    this.title = inbound.title;

    // Determine exact route for history.
    let route = this.route;
    for (var key in this.parameters) {
      route = route.replace(":"+key,this.parameters[key]);
    }
    (new History()).mark(route,{title:this.title || this.slug,type:this.type}).then();

    this.massage(inbound); // custom massaging by derived class
  }

  massage(inbound) {
    console.log("Data.massage [33] (does nothing)"); //TEMP
  }

  refresh() {
    console.log("Data.refresh [35]"); //TEMP
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

  bind() {
    this.subscription = this.eventAggregator.subscribe('reload',this.refresh);
  }

  unbind() {
    this.subscription.dispose();
  }

}
