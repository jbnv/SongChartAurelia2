import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import * as Firebase from 'firebase';
import 'bootstrap';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
(<any>Promise).config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');
    //.plugin('aurelia-animator-css');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => {
    var config = {
      apiKey: "AIzaSyCNApUl12tcTgebkINcUa3MiNHCYFkhjyQ",
      authDomain: "project-1638673378742311717.firebaseapp.com",
      databaseURL: "https://project-1638673378742311717.firebaseio.com",
      storageBucket: "project-1638673378742311717.appspot.com",
      messagingSenderId: "149388472792"
    };
    Firebase.initializeApp(config);
    aurelia.setRoot();
  });
}
