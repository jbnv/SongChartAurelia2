import {ReactiveCollection} from "./firebase/collection";

export class History extends ReactiveCollection {

  recents = [];
  recentsByType = {};

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
            type: obj.__type || null,
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

      function _timesort(a,b) { return b.timestamp - a.timestamp; };

      this.recents = recents.sort(_timesort);

      // Separate recents by type.
      // No need to sort since already sorted by time.
      this.recents.forEach(item => {
        let typeSlug = item.type;
        if (!typeSlug) return;
        if (!this.recentsByType[typeSlug]) this.recentsByType[typeSlug] = [];
        this.recentsByType[typeSlug].push(item);
      });

    });
  }

}
