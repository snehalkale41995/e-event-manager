import AttendeeList from './AttendeeList.js';
import Registration  from '../Registration/Registration.js';
import React, { Component } from 'react';
import {BrowserRouter as Router,Link, Switch, Route, Redirect} from 'react-router-dom';

class Attendee extends Component { 
    render() {
      return <div>
        <Route exact path={this.props.match.path} component={AttendeeList} />
        <Route path={`${this.props.match.path}/Registration/:id?`} component={Registration} />
      </div>
    }
}

export default Attendee;