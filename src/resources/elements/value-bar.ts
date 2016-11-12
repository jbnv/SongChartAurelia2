import {bindable} from 'aurelia-framework';

export class ValueBar {

  @bindable value = 0;
  @bindable max = 1;
  @bindable width = "5em";
  @bindable context:string;

}
