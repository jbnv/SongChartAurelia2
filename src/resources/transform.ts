import {Era} from "./era";

// Methods for sorting, filtering and transforming data for display.
// This file should be the same between the data and the app.

export function sortByRank(a,b) {
    return (a.rank || 0) - (b.rank || 0);
}

function _transformTitle(t) {
  t = ("" + t).replace(/[^\w\s]/g,"").replace(/^((The )|(A )|(An ))/,"");
  return t;
}

export function sortByTitle(a,b) {
  var titleA = _transformTitle((a || {}).title);
  var titleB = _transformTitle((b || {}).title);
  return titleA < titleB ? -1 : 1;
}

export function sortByScore(a,b) {
  return (b.score || 0) - (a.score || 0);
}

export function sortBySongCount(a,b) {
  let aCount = (a.songs || []).length || a.songCount || 0;
  let bCount = (b.songs || []).length || b.songCount || 0;
  return bCount - aCount;
}

export function sortByArtistCount(a,b) {
  let aCount = (a.artists || []).length || a.artistCount || 0;
  let bCount = (b.artists || []).length || b.artistCount || 0;
  return bCount - aCount;
}

export function sortBySAA(a,b) {
  return (b.songAdjustedAverage || 0) - (a.songAdjustedAverage || 0);
}

export function sortByAAA(a,b) {
  return (b.artistAdjustedAverage || 0) - (a.artistAdjustedAverage || 0);
}

function _compareDateSlugs(slugA,slugB) {
  let a = new Era(slugA), b = new Era(slugB);
  if (a.decade != b.decade) return a.decade - b.decade;
  if (a.year != b.year) return a.year - b.year;
  return a.month - b.month;
}

export function sortByDebutDate(a,b) {
  return _compareDateSlugs(a.debut,b.debut);
}
