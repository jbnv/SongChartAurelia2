import {bindable,computedFrom} from 'aurelia-framework';

import {Columns} from '../columns';
import {Collection} from '../collection';

export class SmartSelectCustomElement extends Collection {

  @bindable eid: string; // id for the modal
  @bindable title: string;
  @bindable path: string;
  @bindable transformFn = function(x) { return x; }

  items = {};
  value: any;
  filter: string;

  matches = {};

  applyTrigger() {
    if (!this.filter) {
      this.matches = this.items;
      return;
    }
    let outbound = {}, expression = new RegExp(this.filter,"i");
    for (let key in this.items) {
      if (typeof this.items[key] == "string" && expression.test(this.items[key])) {
        outbound[key] = this.items[key];
      }
      if (expression.test(this.items[key].title)) {
        outbound[key] = this.items[key].title;
      }
    }
    this.matches = outbound;
  }

  attached() {
    this.setPath(this.path,this.massage.bind(this));
  }

  massage(data) {
    if (!data) {
      throw "No data given.";
    }

    this.items = data;
    this.matches = data;
  }


}
