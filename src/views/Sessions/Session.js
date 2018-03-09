import  SessionList    from './SessionList'
import  SessionForm    from './SessionForm'

import React, { Component } from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';

class Session extends Component {
    
    render() {
      return <div>
        <Route exact path={this.props.match.path} component={SessionList} />
        <Route path={`${this.props.match.path}/sessionForm`} component={SessionForm} />
        <Route path={`${this.props.match.path}/sessionForm/:id`} component={SessionForm} />
      </div>
    }
  }

  export default Session;