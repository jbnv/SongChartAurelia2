import {bindable} from 'aurelia-framework';

export class RankedDetail {

  @bindable items = {};
  @bindable allItems = {};
  @bindable ranks = {};
  @bindable typeSlug:string;
  @bindable editable:false;

  rankItem(item) {
    return this.ranks[`${this.typeSlug}:${item.__key}`];
  }

}
