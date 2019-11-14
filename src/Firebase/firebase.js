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

  async getAll(documentName) {
    let result = [];
    let connection = this.db.collection(documentName);
    let data = await connection.get();
    
    for(const doc of data.docs) {
      result.push({
        id: doc.id,
        data: doc.data()
      });
    }
    return result;
  }
}

export default Firebase;