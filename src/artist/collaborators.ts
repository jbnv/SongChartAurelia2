import getTitle from '../resources/firebase/title';
import {History} from '../resources/history';

export class ArtistCollaborations  {

  artistSlug: string;
  artistTitle: string;
  showOnly = [ 'title','songCount','score' ];

  activate(parameters,routeConfig) {

    this.artistSlug = parameters.slug;

    getTitle("artists",parameters.slug,title => {
      this.artistTitle = title;
      (new History()).mark(`artist/${parameters.slug}/collaborations`,{title:`${title} Collaborations`,type:"artist"}).then();
    });

  }

}
