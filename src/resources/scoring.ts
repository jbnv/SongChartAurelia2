import 'firebase';
import {Configuration} from './firebase/index';

function _score(...parameters: any[]):number {

  var peak = parameters[0] || 0,
      ascentWeeks = parameters[1] || 0,
      descentWeeks = parameters[2] || 0;

  if (!peak) return null;

  if (typeof parameters[0] == "object") {
    peak = parameters[0].peak || 0;
    ascentWeeks = parameters[0]["ascent-weeks"] || 0;
    descentWeeks = parameters[0]["descent-weeks"] || 0;
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

function _normalize(song:any) {
  if (!song["ascent-weeks"]) song["ascent-weeks"] = 0.0;
  if (!song["descent-weeks"]) song["descent-weeks"] = 0.0;
  let weeks = song["ascent-weeks"] + song["descent-weeks"];
  let coefficient = song.peak * (1-song.peak);
  song["ascent-weeks"] = weeks * coefficient;
  song["descent-weeks"] = weeks * (1-coefficient);
  song.score = _score(song);
  return song;
}

function _adjustDescent(song:any,newScore:number) {
  song["descent-weeks"] = 1.5 * newScore / song.peak - song["ascent-weeks"];
  return song;
}

function _queryRaw(songSlug) {
  return firebase.database().ref("songs/raw").child(songSlug);
}

function _queryCompiled(songSlug) {
  return firebase.database().ref("songs/compiled").child(songSlug);
}

function __write(slug:string,song:any) {

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

function _write(...parameters: any[]) {
  if (typeof parameters[0] === "string") {
    __write(parameters[0],parameters[1]);
    return;
  }
  for (var slug in parameters[0]) {
    __write(slug,parameters[0][slug]);
  }
}

function _transform(fn) {
  return function(songSlug) {
    _queryRaw(songSlug).once("value").then(snapshot => {
      _write(songSlug,fn(snapshot.val()));
    });
  }
}

export function peakFn(coefficient) {
  return _transform(function(song) {
    song.peak = _bend(coefficient)(song.peak || "0.5");
    song.score = _score(song);
    return song;
  });
};

export function ascentFn(coefficient) {
  return _transform(function(song) {
    if (!song["ascent-weeks"]) song["ascent-weeks"] = 1.0;
    song["ascent-weeks"] *= coefficient;
    song.score = _score(song);
    return song;
  });
};

export function descentFn(coefficient) {
  return _transform(function(song) {
    if (!song["descent-weeks"]) song["descent-weeks"] = 1.0;
    song["descent-weeks"] *= coefficient;
    song.score = _score(song);
    return song;
  });
};

export const swapDurations = _transform(function(song) {
  if (!song["ascent-weeks"]) song["ascent-weeks"] = 1.0;
  if (!song["descent-weeks"]) song["descent-weeks"] = 1.0;
  let temp = song["ascent-weeks"];
  song["ascent-weeks"] = song["descent-weeks"];
  song["descent-weeks"] = temp;
  song.score = _score(song);
  return song;
});

export const normalizeDurations = _transform(_normalize);

export function clear(slug) {
  _write(slug,{"peak": null, "ascent-weeks":null, "descent-weeks":null});
};

export function zero(slug) {
  _write(slug, {"peak": 0.001, "ascent-weeks":0.001, "descent-weeks":0.001});
};
