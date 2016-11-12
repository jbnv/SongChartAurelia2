import {Columns} from '../resources/columns';
import {Collection} from '../resources/collection';

export class Decades extends Collection {

  fetchRouteFn = (parameters) => 'decades'; // returns array of songs

  decades = {};

  maxFields = ['count','score'];

  columns = new Columns({
    'title': 'Name',
    'count': 'Songs',
    'score': 'Score'
  });

  massage() {

    // Get titles of top songs.
    this.view.forEach(decade => {
      decade.topsongTitle = `[${decade.topsong}]`;
      let query = firebase.database().ref("songs/raw").child(decade.topsong);
      query.once("value", (snapshot) => {
        if (snapshot.val()) decade.topsongTitle = snapshot.val().title;
      })
    })

    this.aggregate();
    this.sort("key");
  }

}
