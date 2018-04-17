import * as firebase from 'firebase';
import 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyDqHj6cAno1pzb2_MqJPo3Fc5Djvzqjtak",
     authDomain: "tiecon-portal.firebaseapp.com",
     databaseURL: "https://tiecon-portal.firebaseio.com",
     projectId: "tiecon-portal",
     storageBucket: "",
    messagingSenderId: "835953773150"
} // from Firebase Console

firebase.initializeApp(firebaseConfig)
export const firestoredb = firebase.firestore();
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth