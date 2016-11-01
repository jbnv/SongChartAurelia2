import * as numeral from 'numeral';

export class DecimalValueConverter {
  toView(value,places) {
    var exponent = Math.pow(10,places);
    //return Math.floor(parseFloat(value) * exponent) / exponent;
    return numeral(value).format('0.0000'.substring(0,places+2));
  }
}
