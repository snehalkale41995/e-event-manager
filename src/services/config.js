import * as firebase from 'firebase';
import 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyAmhu_J_9kRqDuQZox7ccZVNgnOA9fc4Gw",
    authDomain: "tie-con-management.firebaseapp.com",
    databaseURL: "https://tie-con-management.firebaseio.com",
    projectId: "tie-con-management",
    storageBucket: "tie-con-management.appspot.com",
    messagingSenderId: "852890830155"
} // from Firebase Console

firebase.initializeApp(firebaseConfig)
export const firestoredb = firebase.firestore();
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth