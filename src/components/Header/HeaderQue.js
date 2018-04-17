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
      <header className="app-header navbar">
        <NavbarBrand href="#">
            <img src="../../img/eternus.png" className="logoImg" />
            
        </NavbarBrand>
        <span style ={{ margin: 'auto',fontSize: '15pt', fontWeight: 'bold',color: '#E7060E'}}>{this.props.heading}</span>
      </header>
    );
  }
}

export default HeaderQue;
