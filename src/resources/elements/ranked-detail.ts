import {bindable} from 'aurelia-framework';

export class RankedDetail {

  @bindable items = {};
  @bindable ranks = {};
  @bindable typeSlug:string;

  rankItem(item) {
    return this.ranks[`${this.typeSlug}:${item.__key}`];
  }

}
