import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';
class HeaderQue extends Component {
  constructor(props) {
    super(props);
  }
  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar title-header">
        <NavbarBrand href="#">
            <img src="../../img/tie-pune-logo.jpg" className="logoImg tie-logo" />
        </NavbarBrand>
        <span className='tilte-session'>{this.props.heading}</span>
        <NavbarBrand href="#">
            <img src="../../img/eternus.png" className="logoImg eternus-logo" />
        </NavbarBrand>
      </header>
    );
  }
}

export default HeaderQue;
