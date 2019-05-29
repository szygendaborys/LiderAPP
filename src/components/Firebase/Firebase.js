import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    
  };

  class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
      // initialize Firebase Authenticator
      this.auth = app.auth();
      // initialize Firebase Realtime Database
      this.db = app.firestore();

    }

    // Initialize two functions that connect to Firebase : Log In and Log Out

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    // Initialize functions for posts

    post = pid => this.db.doc('posts'+pid);
    posts = () => this.db.collection('posts');
  }


export default Firebase;