import {ReactiveCollection} from "./firebase/collection";

export class History extends ReactiveCollection {

  recents = [];

  constructor() {
    super();
    this.setPath("history",null);
  }

  mark(route,title) {
    if (!route || !title) return { "then": function() {} };
    this._query.child(route).child("__title").set(title);
    return this._query.child(route).child("__timestamp").set(new Date().getTime());
  }

  _listenToQuery(query) {
    query.on('value', (snapshot) => {
      this.items = this._valueFromSnapshot(snapshot);

      var recents = [];

      function _processObject(route,obj) {
        if (!obj) return;
        if (obj.__title && obj.__timestamp) {
          recents.push({
            route: route,
            title: obj.__title,
            timestamp: obj.__timestamp
          });
        }
        for (var key in obj) {
          if (!/^\_\_/.test(key)) {
            _processObject(route ? route+"/"+key : key,obj[key]);
          }
        }
      }

      _processObject(null,this.items);

      this.recents = recents.sort(function(a,b) { return b.timestamp - a.timestamp; });

    });
  }

}
