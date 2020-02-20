import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import { Dispatch } from "redux";

import useSafeContext from "utils/safeContext";
import { userChanged } from "authSlice";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class FirebaseApp {
  auth: firebase.auth.Auth;
  listUsers: firebase.functions.HttpsCallable;

  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.listUsers = firebase.functions().httpsCallable("listUsers");
  }

  config = () => firebase.app().options;

  createUser = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  trackAuthStateChanged = (dispatch: Dispatch) =>
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        dispatch(userChanged(user.toJSON()));
      } else {
        dispatch(userChanged(null));
      }
    });
};

export const [FirebaseContextProvider, useFirebaseContext] =
  useSafeContext<FirebaseApp>();

export default FirebaseApp;
