import {FirebaseEntityModule} from '../resources/firebase/index';
import {Playlist} from './class';

export class CreatePlaylist extends FirebaseEntityModule {

  editTitle = "Create Playlist";
  saveRoute = 'playlists';

  entityClass() { return Playlist; }

}
