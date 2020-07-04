import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

//import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

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
              <NavLink id="NavLink" href="#forum">Forum</NavLink>
            </NavItem>
          </Nav>
          <NavbarText id='NavBarText'>
            <a href="mailto:furbynilu@gmail.com"> <FontAwesomeIcon id='fa' icon={faEnvelopeSquare} />
            </a>
            <a href="https://www.facebook.com/NiluAcounselor"> <FontAwesomeIcon id='fa' icon={faFacebookSquare} /></a>
          </NavbarText>

        </Collapse>
      </Navbar>
    </div>
    //</Router>
  );
}
export default MyNavbar;