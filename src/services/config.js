import * as firebase from 'firebase';
import 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCR4V9izNXnxqg-fqb5XIaS7VcHKCwWQso",
    authDomain: "tie-eventmanager.firebaseapp.com",
    databaseURL: "https://tie-eventmanager.firebaseio.com",
    projectId: "tie-eventmanager",
    storageBucket: "tie-eventmanager.appspot.com",
    messagingSenderId: "1054501443257"
} // from Firebase Console

firebase.initializeApp(firebaseConfig)
export const firestoredb = firebase.firestore();
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth