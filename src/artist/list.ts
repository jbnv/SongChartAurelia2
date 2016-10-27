import {Collection} from '../resources/collection';

export class Artists extends Collection {

  _defaultCount = 100;
  count: number;

  fetchRouteFn = (parameters) => {
    if (parameters.filter) {
      return 'artists/subset/'+parameters.filter;
    }
    return 'artists/compiled';
  }

  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  massage(inbound) {
    const totalCount = Object.keys(inbound).length;

    let filter = null;

    if (this.parameters.filter) {
      filter = this.parameters.filter.replace(":","-");
      this.subtitle = `${this.count} of ${totalCount}`; //FIX
    } else {
      this.count = this._defaultCount;
      this.subtitle = `top ${this.count} of ${totalCount}`;
    }
  }
}
