import {bindable} from 'aurelia-framework';

export class PageNav {

  @bindable previous = {}; // { route, title }
  @bindable next = {}; // { route, title }
  @bindable pages = []; // [ { route, title } ]

}
