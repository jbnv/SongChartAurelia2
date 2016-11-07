import 'firebase';
import {Configuration} from './firebase/index';

function _bend(c) {
  if (c == 0) return function(x) { return x };
  if (c > 0) return function(x) {
    let v = parseFloat(x);
    return (c+1)*v/(c*v+1);
  };
  return function(x) {
    let v = parseFloat(x);
    return v/(1-c+c*v);
  }
}

function _query(songSlug) {
  return firebase.database().ref("songs/raw").child(songSlug);
}

export function bendUp(songSlug) {
  let query = _query(songSlug).child("peak");
  query.once("value").then(snapshot => {
    let value = _bend(1)(snapshot.val() || "0.5");
    query.set(value);
  });
}

export function bendDown(songSlug) {
  let query = _query(songSlug).child("peak");
  query.once("value").then(snapshot => {
    let value = _bend(-1)(snapshot.val() || "0.5");
    query.set(value);
  });
}
