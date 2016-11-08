//import 'nprogress';
import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {AuthenticationManager, Configuration as FirebaseConfiguration, isAuthenticated} from './resources/firebase/index';
import config from './config';

export class App {

  router = null;

  configureRouter(config, router) {

    config.title = 'SongCharts';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['account/signin'], name: 'accountSignin', moduleId: 'account/signin', title: 'Sign In' },
      { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', title: 'Welcome', auth: true },
      { route: 'search', name: 'search', moduleId: 'search', title: 'Search', auth: true },
      { route: 'artist/:slug', name: 'artist', moduleId: 'artist/show', title: 'Artist', auth: true },
      { route: 'artist/:slug/collaborators', name: 'collaborators', moduleId: 'artist/collaborators', title: 'Artist Collaborators', auth: true },
      { route: 'artist/:slug/songs', name: 'artist-songs', moduleId: 'artist/songs', title: 'Artist Songs', auth: true },
      { route: 'artists', name: 'artists', moduleId: 'artist/list', title: 'Artists', auth: true },
      { route: 'artists/:filter', name: 'artists', moduleId: 'artists', auth: true },
      { route: 'artist-type/:slug', name: 'artist-type', moduleId: 'artist-type', title: 'Artist Type', auth: true },
      { route: 'artist-types', name: 'artist-types', moduleId: 'artist-types', title: 'Artists Types', auth: true },
      { route: 'decade/:slug', name: 'decade', moduleId: 'decade', auth: true },
      { route: 'decades', name: 'decades', moduleId: 'decades', auth: true },
      { route: 'eras', name: 'eras', moduleId: 'eras', auth: true },
      { route: 'genre/:slug', name: 'genre-artists', moduleId: 'genre/show', title: 'Genre', auth: true },
      { route: 'genre/:slug/artists', name: 'genre-artists', moduleId: 'genre-artists', title: 'Genre Artists', auth: true },
      { route: 'genre/:slug/songs', name: 'genre-songs', moduleId: 'genre-songs', title: 'Genre Songs', auth: true },
      { route: 'genres', name: 'genres', moduleId: 'genre/list', title: 'Genres', auth: true },
      { route: 'location/:slug', name: 'location', moduleId: 'location/show', title: 'Location', auth: true },
      { route: 'locations', name: 'locations', moduleId: 'location/list', title: 'Locations', auth: true },
      { route: 'month/:slug', name: 'month', moduleId: 'month', auth: true },
      { route: 'playlist/:slug', name: 'playlist', moduleId: 'playlist/show', title: 'Playlist', auth: true },
      { route: 'playlists', name: 'playlists', moduleId: 'playlist/list', title: 'Playlists', auth: true },
      { route: 'playlists/create', name: 'playlist-create', moduleId: 'playlist/create', title: 'Create Playlist', auth: true },
      { route: 'song/:slug', name: 'song', moduleId: 'song/show', title: 'Song', auth: true },
      { route: 'songs', name: 'songs', moduleId: 'song/list', title: 'Songs', auth: true },
      { route: 'songs/:filter', name: 'songs', moduleId: 'song/list', auth: true },
      { route: 'source/:slug', name: 'source', moduleId: 'source/show', title: 'Source', auth: true },
      { route: 'sources', name: 'sources', moduleId: 'source/list', title: 'Sources', auth: true },
      { route: 'year/:slug', name: 'year', moduleId: 'year', auth: true },
      { route: 'years', name: 'years', moduleId: 'years', auth: true }
    ]);

    this.router = router;
  }
}

@inject(AuthenticationManager)
class AuthorizeStep {

  authManager = null;

  constructor(authManager: AuthenticationManager) {
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
    console.log("run",navigationInstruction);
    return next();
  }
}
