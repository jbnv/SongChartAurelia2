import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import * as Firebase from 'firebase';
import 'bootstrap';
import * as fbConfig from './resources/firebase-config';

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
    Firebase.initializeApp(fbConfig.initConfig);
    aurelia.setRoot();
  });
}
