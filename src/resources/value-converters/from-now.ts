import * as moment from 'moment';

export class FromNowValueConverter {
  toView(value) {
    return moment(value).fromNow(true);
  }
}
