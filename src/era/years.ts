import 'firebase';
import {Columns} from '../resources/columns';
import {Collection} from '../resources/collection';

export class Years extends Collection {

  fetchRouteFn = (parameters) => 'years'; // returns array of songs

  maxFields = ['count','score'];

  columns = new Columns({
    'title': 'Name',
    'count': 'Songs',
    'score': 'Score',
    'topsong': 'Top Song'
  });

  massage() {

    // Get titles of top songs.
    this.view.forEach(year => {
      year.topsongTitle = `[${year.topsong}]`;
      let query = firebase.database().ref("songs/raw").child(year.topsong);
      query.once("value", (snapshot) => {
        if (snapshot.val()) year.topsongTitle = snapshot.val().title;
      })
    })

    this.aggregate();
    this.viewSortFn = (a,b) => parseInt(a.key) - parseInt(b.key);
  }

}
