import {count} from "../index";

export class CountFlagValueConverter {
    toView(obj,spec) {
      if (!obj) return null;
      var itemCount = count(obj);
      if (spec[0] === "=") return itemCount == parseInt(spec[1]);
      if (spec[0] === ">") return itemCount > parseInt(spec[1]);
      if (spec[0] === "<") return itemCount < parseInt(spec[1]);
      return false;
    }
}
