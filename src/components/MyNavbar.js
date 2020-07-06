import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Logout from './Logout'
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button
} from 'reactstrap';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setLoggedIn, loggedIn } = props

  const toggle = () => setIsOpen(!isOpen);

  return (
    //<Router>
    <div>
      <Navbar id="navbar" color="dark" dark expand="md">
        <NavbarBrand id='navbrand' href="/">Fern's Counseling</NavbarBrand>
        <NavbarToggler id="dropdownmenu" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} id="NavLink" to="/forum">Forum</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} id="NavLink" to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} id="NavLink" to="/contact">Contact Fern</NavLink>
            </NavItem>
          </Nav>
          {(!user || !loggedIn) ?
            <div id='nav-login-button'>
              <Link to="/login"><Button outline color='secondary'>Login</Button></Link>
            </div>
            :
            null}

          {(user && loggedIn) ?
            <div>
              <NavbarText id='NavBarText'>
                <FontAwesomeIcon id='fa' icon={faUser} /><br />{user.username}
              </NavbarText>
              <Logout setLoggedIn={setLoggedIn} />
            </div>
            : null}
        </Collapse>
      </Navbar>
    </div>
    //</Router>
  );
}
export default MyNavbar;