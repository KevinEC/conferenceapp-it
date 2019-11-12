import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // more than what the tutorial has
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_MEASUREMNT_ID
};

class Firebase {
	constructor() {
   firebase.initializeApp(config);

   this.db = firebase.firestore();
 }

 getAll = (document) => {
  let result;

    /* this.db.collection("events")
    .get()
    .then(querySnapshot => {
      result = querySnapshot.docs.map(doc => doc.data());
    });*/

    this.db.collection(document).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });

    return result;
  }

  addDummyData = () => {
    this.db.collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
}

export default Firebase;