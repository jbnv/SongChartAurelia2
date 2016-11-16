import {EventAggregator} from 'aurelia-event-aggregator'; // jspm install aurelia-event-aggregator
import {inject,bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {History} from '../history';

@inject(Router)
@inject(EventAggregator)
export class NavBar {

  @bindable router = null;
  eventAggregator: any;

  searchTerm = "";

  filterRoutes = [
    "artists","genres","locations",
    "playlists","songs","sources"
  ];

  history: History;

  // get currentFragment() {
  //   let history = this.router.history;
  //   let fragment = history.fragment;
  //   console.log(this.router.history.fragment);
  //   return fragment;
  // }

  get currentFragmentIsFilter() {
    // let currentFragment = this.currentFragment;
    // let filterCheck = this.filterRoutes.filter(
    //   route => currentFragment.startsWith("/"+route)
    // );
    // return filterCheck.length == 0;
    return false;
  }

  searchButtonClass() {
    return this.currentFragmentIsFilter ? "fa fa-filter" : "fa fa-search";
  }

  search() {
    if (this.currentFragmentIsFilter) {
      // let currentRouteName = "TODO";
      // let currentRoute = this.router.routes.find(x => x.name === currentRouteName);
      // currentRoute.name = username;
      // this.router.navigateToRoute('userprofile');
    } else {
      this.router.navigateToRoute('search/new',{term:this.searchTerm});
    }
  }

  reload() {
    this.eventAggregator.publish('reload');
  }

  constructor(router,eventAggregator) {
    this.router = router;
    this.eventAggregator = eventAggregator;
    this.history = new History();
  }
}
