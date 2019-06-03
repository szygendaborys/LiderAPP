import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCtpDvSHueNJgPBk-RCgCQ36JUR9ZGTQ7k",
    authDomain: "lider-swarzedz.firebaseapp.com",
    databaseURL: "https://lider-swarzedz.firebaseio.com",
    projectId: "lider-swarzedz",
    storageBucket: "lider-swarzedz.appspot.com",
    messagingSenderId: "361061213670",
    appId: "1:361061213670:web:c6868201c1065887"
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