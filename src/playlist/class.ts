export class Playlist {
  slug: string;
  title: string;

  isValid() {
    return (!!this.slug) && (!!this.title);
  }
}
