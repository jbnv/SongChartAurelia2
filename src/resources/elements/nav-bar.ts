import {inject,bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {History} from '../history';

@inject(Router)
export class NavBar {

  @bindable router = null;

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
      this.router.navigateToRoute('search',{slug:this.searchTerm});
    }
  }

  constructor(router) {
    this.router = router;
    this.history = new History();
  }
}
