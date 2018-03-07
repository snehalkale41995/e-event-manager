import  UserList    from './UserList'
import  UserForm    from './UserForm'

import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';

class Session extends Component {
    
    render() {
        console.log(this.props.match)
      return <div>
        <Route exact path={this.props.match.path} component={UserList} />
        <Route path={`${this.props.match.path}/userForm`} component={UserForm} />
        <Route path={`${this.props.match.path}/userForm/:id`} component={UserForm} />
      </div>
    }
  }

  export default Session;