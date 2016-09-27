//import 'nprogress';
import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {AuthenticationManager, Configuration as FirebaseConfiguration, isAuthenticated} from './resources/firebase/index';
import config from './config';

export class App {

  router = null;

  configureRouter(config, router) {

    config.title = 'Jogger';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['','welcome'],   name: 'welcome', moduleId: 'welcome', title: 'Welcome' },
      { route: 'search',         name: 'search', moduleId: 'search', title: 'Search' },
      { route: 'artist/:slug',   name: 'artist', moduleId: 'artist', title: 'Artist' },
      { route: 'artists',        name: 'artists', moduleId: 'artists', title: 'Artists' },
      { route: 'artists/:filter', name: 'artists', moduleId: 'artists' },
      { route: 'artist-type/:slug', name: 'artist-type', moduleId: 'artist-type', title: 'Artist Type' },
      { route: 'artist-types',      name: 'artist-types', moduleId: 'artist-types', title: 'Artists Types' },
      { route: 'decade/:slug',   name: 'decade', moduleId: 'decade' },
      { route: 'decades',        name: 'decades', moduleId: 'decades' },
      { route: 'eras',           name: 'eras', moduleId: 'eras' },
      { route: 'genre/:slug',    name: 'genre-artists', moduleId: 'genre', title: 'Genre' },
      { route: 'genre/:slug/artists',    name: 'genre-artists', moduleId: 'genre-artists', title: 'Genre Artists' },
      { route: 'genre/:slug/songs',    name: 'genre-songs', moduleId: 'genre-songs', title: 'Genre Songs' },
      { route: 'genres',         name: 'genres', moduleId: 'genres', title: 'Genres' },
      { route: 'location/:slug', name: 'location', moduleId: 'location', title: 'Location' },
      { route: 'locations',      name: 'locations', moduleId: 'locations', title: 'Locations' },
      { route: 'month/:slug',    name: 'month', moduleId: 'month' },
      { route: 'playlist/:slug', name: 'playlist', moduleId: 'playlist', title: 'Playlist' },
      { route: 'playlists',      name: 'playlists', moduleId: 'playlists', title: 'Playlists' },
      { route: 'song/:slug',     name: 'song', moduleId: 'song', title: 'Song' },
      { route: 'songs',          name: 'songs', moduleId: 'songs', title: 'Songs' },
      { route: 'songs/:filter',  name: 'songs', moduleId: 'songs' },
      { route: 'source/:slug',   name: 'source', moduleId: 'source', title: 'Source' },
      { route: 'sources',        name: 'sources', moduleId: 'sources', title: 'Sources' },
      { route: 'year/:slug',     name: 'year', moduleId: 'year' },
      { route: 'years',          name: 'years', moduleId: 'years' }
    ]);

    this.router = router;
  }
}

@inject(AuthenticationManager)
class AuthorizeStep {

  authManager = null;

  constructor(authManager:AuthenticationManager) {
    this.authManager = authManager;
  }

  run(navigationInstruction, next) {
    // Check if the route has an "auth" key
    // Then check if the current authenticated user is valid
    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      if (!this.authManager || !isAuthenticated()) {
        return next.cancel(new Redirect(config.loginRoute));
      }
    }
    return next();
  }
}
