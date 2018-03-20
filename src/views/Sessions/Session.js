import  SessionList    from './SessionList'
import  SessionForm    from './SessionForm'

import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import * as firebase from 'firebase';
import 'firebase/firestore';
//import {firebasedb} from '../../index';

class Session extends Component {
    
    render() {
      
      //   // firebasedb.collection("Users").get().then((querySnapshot) => {
      //   //   querySnapshot.forEach((doc) => {
      //   //     let obj = doc.data(); 
           
      //   //     let objString = JSON.stringify(obj);
      //   //     console.log(objString);
            
      //   //   });
      // });
      return <div>
        <Route exact path={this.props.match.path} component={SessionForm} />
        <Route path={`${this.props.match.path}/sessionForm`} component={SessionForm} />
        <Route path={`${this.props.match.path}/sessionForm/:id`} component={SessionForm} />
      </div>
    }
  }

  export default Session;