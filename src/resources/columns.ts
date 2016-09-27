export class Columns {

  keys = [];

  // init: { slug: title }
  constructor(init) {
  	if (init) {
      Object.keys(init).forEach(key => {
        var title = init[key];
        this.keys.push(key);
  			this[key] = { 'title': title };
  		});
  	}
  }

  column = (slug) => this[slug] || {};

  show() {
  	for (var index in arguments) {
      this.column(arguments[index]).hidden = false;
  	}
  }

  showOnly() {
    this.keys.forEach(key => this[key].hidden = true);
    for (var index in arguments) {
      this.column(arguments[index]).hidden = false;
  	}
  }

  hide(slug) {
  	for (var index in arguments) {
      this.column(arguments[index]).hidden = true;
  	}
  }

}
