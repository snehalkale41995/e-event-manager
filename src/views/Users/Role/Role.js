import RoleList from './RoleList.js';
import RoleForm from './RoleForm.js';
import React, { Component } from 'react';
import {BrowserRouter as Router,Link, Switch, Route, Redirect} from 'react-router-dom';


class Role extends Component {
    render() {
      return <div>
        <Route exact path={this.props.match.path} component={RoleList} />
        <Route path={`${this.props.match.path}/RoleForm/:name?`} component={RoleForm} />
      </div>
    }
}

export default Role;