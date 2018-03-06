import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import User from '../../views/Users/User/';
import Role from '../../views/Users/Role/';
import Reports from '../../views/Reports/Reports';
import Attendance from '../../views/Attendance/Attendance';
import Session from '../../views/Sessions/Sessions';
import Registration from '../../views/Registration/Registration';
import Rooms from '../../views/Rooms/Rooms';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/user" name="User" component={User} />
                <Route path="/role" name="Role" component={Role} />
                <Route path='/reports' name='Reports' component={Reports} />
                <Route path='/registration' name='Registration' component={Registration} />
                <Route path='/attendance' name='Attendance' component={Attendance} />
                <Route path='/session' name='Session' component={Session} />
                <Route path='/rooms' name='Rooms' component={Rooms} />
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
