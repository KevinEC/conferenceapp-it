import app from 'firebase/app';
import "firebase/firestore";
import Firestore from "./firestore";
import Authentication from "./authentication";

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
    app.initializeApp(config);
    this.db = new Firestore(app.firestore());
    this.auth = new Authentication(app.auth());
 }
}

export default Firebase;