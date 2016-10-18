import 'firebase';
import {Container} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Configuration} from './configuration';
import {noop} from '../index';

export class ReactiveCollection {

  _query = null;
  _events: EventAggregator
  items: any; // firebase will return an object keyed to object IDs.

  onValue = (value) => {};

  constructor() {
    if (!Container || !Container.instance) throw Error('Container has not been made global');
    let config = Container.instance.get(Configuration);
    if (!config) throw Error('Configuration has not been set');
    this._events = Container.instance.get(EventAggregator);
  }


  viewFilters = []; // array of functions on which to filter the data
  viewSortFn = (a,b) => 0; // default: do nothing
  viewSortOrder = true; // allows for easy reversing of sort order

  // Returns a Promise that items will actually be available.
  waitForItems(retriesAllowed) : firebase.Promise<any> {
    return new firebase.Promise<any>(() => {
      var retriesMade = 0;

      var check = () => {
          if (this.items) { return this.items; }
          if (retriesMade >= retriesAllowed) { throw new Error(); }
          ++retriesMade;
          setTimeout(check, 1000);
      }

      check(); // invoke check once to start the cycle
    });
  }

  setPath(pathString,onValue) {
    this._query = firebase.database().ref(pathString);
    this._listenToQuery(this._query,onValue);
  }

  // view(): Returns items as a filtered and sorted array.
  get view() {

    let rawItems = this.items;
    let subset = [];
    for (var key in rawItems) {
      if (key !== "__firebaseKey__") {
        var item = rawItems[key];
        item.key = key;
        subset.push(item);
      }
    }

    subset = this.viewFilters.reduce((prev,fn) => prev.filter(fn), subset);
    subset.sort(this.viewSortFn);
    if (!this.viewSortOrder) subset = subset.reverse();
    return subset;
  }

  add(item:any,key:string = null) : firebase.Promise<Object> {
    if (key) {
      return this._query.child(key).set(item);
    }
    return this._query.push(item);
  }

  remove(item: any): firebase.Promise<Object> {
    if (item === null || item.__firebaseKey__ === null) {
      return Promise.reject({message: 'Unknown item'});
    }
    return this.removeByKey(item.__firebaseKey__);
  }

  getByKey(key): any {
    if (!this.items) return null;
    return this.items[key];
  }

  removeByKey(key): firebase.Promise<Object> {
    return this._query.child(key).remove();
  }

  clear(): firebase.Promise<Object> {
    return this._query.remove();
  }

  _listenToQuery(query,callback) {
    query.on('value', (snapshot) => {
      this.items = this._valueFromSnapshot(snapshot);
      console.log("items",this.items); //TEMP
      if (callback) callback(this.items);
    });
  }

  _stopListeningToQuery(query) {
    query.off();
  }

  _valueFromSnapshot(snapshot) {
    let value = snapshot.val();
    if (!(value instanceof Object)) {
      value = {
        value: value,
        __firebasePrimitive__: true
      };
    }
    value.__firebaseKey__ = snapshot.key;
    return value;
  }

  static _getChildLocation(root: string, path: Array<string>) {
    if (!path) {
      return root;
    }
    if (!root.endsWith('/')) {
      root = root + '/';
    }

    return root  + (Array.isArray(path) ? path.join('/') : path);
  }
}
