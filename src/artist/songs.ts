import getTitle from '../resources/firebase/title';
import {History} from '../resources/history';

export class ArtistSongs  {

  artistSlug: string;
  artistTitle: string;
  showOnly = [ 'rank','title','role','score', 'debutDate','peakScore','ascent','descent' ];

  activate(parameters,routeConfig) {

    this.artistSlug = parameters.slug;

    getTitle("artists",parameters.slug,title => {
      this.artistTitle = title;
      (new History()).mark(`artist/${parameters.slug}/songs`,{title:`${title} Songs`,type:"song"}).then();
    });

  }

}
