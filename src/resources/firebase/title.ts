import 'firebase';

export default function(typeSlug,instanceSlug, callback) {

  let query = firebase.database().ref(typeSlug).child("raw").child(instanceSlug).child("title");
  query.once('value', (snapshot) => {
      if (callback) callback(snapshot.val());
  });

}
