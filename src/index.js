import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
//import './services/datastore/Datastore';
// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss'
import '../scss/core/_dropdown-menu-right.scss'

import Full from './containers/Full/'
import Login from './views/Pages/Login/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

import * as firebase from 'firebase';
import 'firebase/firestore';

// import * as firebase from 'firebase';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyAmhu_J_9kRqDuQZox7ccZVNgnOA9fc4Gw",
//   authDomain: "tie-con-management.firebaseapp.com",
//   databaseURL: "https://tie-con-management.firebaseio.com",
//   projectId: "tie-con-management",
//   storageBucket: "tie-con-management.appspot.com",
//   messagingSenderId: "852890830155"
// } // from Firebase Console

// // Initialize firebase instance
// firebase.initializeApp(firebaseConfig)
// // Initialize Cloud Firestore through Firebase
// export const firebasedb = firebase.firestore();

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
