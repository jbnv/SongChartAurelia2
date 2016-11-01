import {bindable} from 'aurelia-framework';

export class MessagesCustomElement {

  @bindable content = [];

  remove(index) {
    var rest = this.content.slice(index + 1 || this.content.length);
    this.content.length = index;
    return this.content.push.apply(this.content, rest);
  };

}
