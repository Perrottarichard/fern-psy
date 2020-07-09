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
  const { activeUser, setLoggedIn, loggedIn } = props

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='dark' id="navbar" dark expand='md' >
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
              {
                (!activeUser || (activeUser.username !== "Fern-Admin" && activeUser.username !== "Richard-Admin"))
                  ?
                  <NavLink tag={Link} id="NavLink" to="/contact">Contact Fern</NavLink>
                  :
                  <NavLink tag={Link} id="NavLink" to="/admin/dashboard">Dashboard</NavLink>
              }
            </NavItem>
            {
              (!activeUser || !loggedIn)
                ?
                <NavItem>
                  <NavLink tag={Link} id="NavLink" to="/admin">Admin</NavLink>
                </NavItem>
                :
                null
            }
          </Nav>
          {
            (!activeUser || !loggedIn)
              ?
              <div id='nav-login-button'>
                <Link to="/login"><Button outline color='secondary' size='sm'>Login</Button></Link>
              </div>
              :
              null
          }
          {
            (activeUser && loggedIn)
              ?
              <div>
                <NavbarText id='NavBarText'>
                  <FontAwesomeIcon id='fa-user-icon' icon={faUser} /><br />{activeUser.username}
                </NavbarText>
                <Logout setLoggedIn={setLoggedIn} />
              </div>
              :
              null
          }
        </Collapse>
      </Navbar>
    </div>
  );
}
export default MyNavbar;