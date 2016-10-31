import {Collection} from './resources/collection';
import {History} from './resources/history';

export class Search extends Collection {

  activate(parameters,routeConfig) {
    this.title = parameters.slug;
    super.activate(parameters,routeConfig);

    let expression = new RegExp(parameters.slug,"gi");
    let filterFn = item => expression.test(item.title);
    this.sort("score");

    let query = firebase.database().ref("search/entities");
    query.on('value', (snapshot) => {
      let inbound = this._valueFromSnapshot(snapshot);
      this.items = {};
      for (let itemSlug in inbound) {
        let item = inbound[itemSlug];
        if (filterFn(item)) this.items[itemSlug] = item;
      }
    });
    (new History()).mark("search",{title:parameters.slug,type:"search"}).then(); //INCOMPLETE
  }

}
