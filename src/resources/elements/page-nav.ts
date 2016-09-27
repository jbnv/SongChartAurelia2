export class PageNav {

  previous = {}; // { route, title }
  next = {}; // { route, title }
  pages = []; // [ { route, title } ]

  activate(data) {
    this.previous = data.previous || {};
    this.next = data.next || {};
    this.pages = data.pages || [];
  }

}
