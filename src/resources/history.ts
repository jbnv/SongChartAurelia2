import {ReactiveCollection} from "./firebase/collection";

export class History extends ReactiveCollection {

  recents = [];

  constructor() {
    super();
    this.setPath("history",null);
  }

  mark(route,data) {
    if (!route || !data) return { "then": function() {} };
    var outbound = {
      __title: data.title || null,
      __type: data.type || null,
      __timestamp: new Date().getTime(),
      data: data
    };
    delete outbound.data.title;
    delete outbound.data.type;
    return this._query.child(route).set(outbound);
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
            timestamp: obj.__timestamp,
            type: obj.__type,
            data: obj.data
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
