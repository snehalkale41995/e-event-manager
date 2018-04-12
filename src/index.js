import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss'
import '../scss/core/_dropdown-menu-right.scss'

import Full from './containers/Full/'
import Login from './views/Pages/Login/'
import Logout from './views/Pages/logOut/'
import Register from './views/Pages/Register/Register'
import '../customStyle.css'
import * as firebase from 'firebase';
import 'firebase/firestore';

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/dashboard" name="Home" component={Full}/>
      <Route exact path="/rooms" name="Home" component={Full} />
      <Route exact path="/session" name="Home" component={Full} />
      <Route exact path="/attendance" name="Home" component={Full} />
      <Route exact path="/attendee" name="Home" component={Full} />
      <Route exact path="/questions" name="Home" component={Full} />
      <Route exact path="/registration" name="Home" component={Full} />
      <Route exact path="/registrationList" name="Home" component={Full} />
      <Route exact path="/sponsor" name="Home" component={Full} />
      <Route exact path="/aboutUs" name="Home" component={Full} />
      <Route path='/attendeeReport' name='Home' component={Full} />
      <Route path='/sessionReport' name='Home' component={Full} />
      <Route path="/user" name="Home" component={Full} />
      <Route path="/role" name="Home" component={Full} />

      <Route exact path="/register" name="Register" component={Register} />
      <Route exact path="/logOut" name="logOut" component={Logout} />
      <Route path="/" name="Login" component={Login} />
    </Switch>
  </HashRouter>
), document.getElementById('root'));
