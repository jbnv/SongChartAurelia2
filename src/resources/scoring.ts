import 'firebase';
import {Configuration} from './firebase/index';

function _score():any {

  var peak = arguments[0] || 0,
      ascentWeeks = arguments[1] || 0,
      descentWeeks = arguments[2] || 0;

  if (typeof arguments[0] == "object") {
    peak = arguments[0].peak || 0;
    ascentWeeks = arguments[0]["ascent-weeks"] || 0;
    descentWeeks = arguments[0]["descent-weeks"] || 0;
  }

  return (2/3) * peak * (ascentWeeks+descentWeeks);
}

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

function _queryRaw(songSlug) {
  return firebase.database().ref("songs/raw").child(songSlug);
}

function _queryCompiled(songSlug) {
  return firebase.database().ref("songs/compiled").child(songSlug);
}

function _write(slug,song) {

  let queryRaw = firebase.database().ref("songs/raw").child(slug);
  queryRaw.child("peak").set(song.peak);
  queryRaw.child("ascent-weeks").set(song["ascent-weeks"]);
  queryRaw.child("descent-weeks").set(song["descent-weeks"]);

  let queryCompiled = firebase.database().ref("songs/compiled").child(slug);
  queryCompiled.child("peak").set(song.peak);
  queryCompiled.child("ascent-weeks").set(song["ascent-weeks"]);
  queryCompiled.child("descent-weeks").set(song["descent-weeks"]);
  queryCompiled.child("score").set(_score(song));

}

function bendFn(coefficient) {
  return function(songSlug) {
    let query = _queryRaw(songSlug);
    query.once("value").then(snapshot => {
      let song = snapshot.val();
      song.peak = _bend(coefficient)(song.peak || "0.5");
      _write(songSlug,song);
    });
  }
}

function ascentIncreaseFn(weeks) {
  return function(songSlug) {
    console.log("ascentIncreaseFn",songSlug); //TEMP
    _queryRaw(songSlug).once("value").then(snapshot => {
      let song = snapshot.val();
      song["ascent-weeks"] = song["ascent-weeks"] + weeks;
      _write(songSlug,song);
    });
  }
}

function descentIncreaseFn(weeks) {
  return function(songSlug) {
    console.log("descentIncreaseFn",songSlug); //TEMP
    _queryRaw(songSlug).once("value").then(snapshot => {
      let song = snapshot.val();
      song["descent-weeks"] = song["descent-weeks"] + weeks;
      _write(songSlug,song);
    });
  }
}

export const bendUp = bendFn(1);
export const bendDown = bendFn(-1);
export const ascentUp = ascentIncreaseFn(1);
export const descentUp = descentIncreaseFn(1);
