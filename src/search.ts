import {Collection} from './resources/collection';
import {History} from './resources/history';
import * as Hasher from "hashids";

export class Search extends Collection {

  _activate(expression) {
    let re = new RegExp(expression,"gi");
    let filterFn = item => re.test(item.title);
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
    let hasher = new Hasher(expression);
    let hash = hasher.encode(1);
    (new History()).mark(`search/${hash}`,{title:expression,type:"search"}).then();
  }

  activate(parameters,routeConfig) {
    if (parameters.slug) {
      let query = firebase.database().ref("history/search").child(parameters.slug);
      query.once('value', (snapshot) => {
        let entry = snapshot.val();
        this.title = entry.title;
        super.activate(parameters,routeConfig);
        this._activate(entry.title);
      });
      return;
    }
    this.title = parameters.term;
    super.activate(parameters,routeConfig);
    this._activate(parameters.term);
  }

}
