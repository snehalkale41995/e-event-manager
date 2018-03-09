import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
//import './services/datastore/Datastore';
// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'

import Login from './views/Pages/Login/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

<<<<<<< Updated upstream
=======
import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAmhu_J_9kRqDuQZox7ccZVNgnOA9fc4Gw",
  authDomain: "tie-con-management.firebaseapp.com",
  databaseURL: "https://tie-con-management.firebaseio.com",
  projectId: "tie-con-management",
  storageBucket: "tie-con-management.appspot.com",
  messagingSenderId: "852890830155"
} // from Firebase Console                                         ///mahesh firestore

// const firebaseConfig = {
//   apiKey: 'AIzaSyDM4bfZawYFEvNsYlNyNZLEfTPSPsbtUkQ',
//   authDomain: 'tiecon-b3493.firebaseapp.com',
//   databaseURL: 'https://tiecon-b3493.firebaseio.com',
//   projectId: 'tiecon-b3493',
//   storageBucket: 'tiecon-b3493.appspot.com',
//   messagingSenderId: '489302991624'
// };                                                                      //sagar firestore


// Initialize firebase instance
firebase.initializeApp(firebaseConfig)
// Initialize Cloud Firestore through Firebase
export const firebasedb = firebase.firestore();

>>>>>>> Stashed changes
ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login}/>
      <Route exact path="/404" name="Page 404" component={Page404}/>
      <Route exact path="/500" name="Page 500" component={Page500}/>
      <Route path="/" name="Home" component={Full}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));
