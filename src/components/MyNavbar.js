import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
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

const adminLoginButtonStyle = {
  background: 'transparent',
  color: 'transparent',
  float: 'center',
  border: 'none'

}

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
              <NavLink tag={Link} id="NavLink" to="/">หน้าหลัก</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} id="NavLink" to="/about">เกี่ยวกับ Fern</NavLink>
            </NavItem>
            <NavItem>
              {
                (!activeUser || (activeUser.username !== "Fern-Admin" && activeUser.username !== "Richard-Admin"))
                  ?
                  <NavLink tag={Link} id="NavLink" to="/contact">ติดต่อ Fern</NavLink>
                  :
                  <NavLink tag={Link} id="NavLink" to="/admin/dashboard">Dashboard</NavLink>
              }
            </NavItem>
            {
              (!activeUser || !loggedIn)
                ?
                <NavItem>
                  <a style={adminLoginButtonStyle} href='/admin'>admin</a>
                </NavItem>
                :
                null
            }
            {(activeUser !== null && loggedIn && (activeUser.username !== "Fern-Admin" && activeUser.username !== "Richard-Admin"))
              ?
              <NavItem>
                <NavLink tag={Link} id="NavLink" to={`/myquestions/${activeUser._id}`}>คำถามของฉัน</NavLink>
              </NavItem>
              :
              null
            }
          </Nav>
          {
            (activeUser === null || !loggedIn)
              ?
              <div id='nav-login-button'>
                <Link to="/login"><Button outline color='secondary' size='sm'>เข้าสู่ระบบ</Button></Link>
              </div>
              :
              null
          }
          {
            (activeUser && loggedIn)
              ?
              <div>
                <NavbarText id='NavBarText'>
                  <FontAwesomeIcon id='fa-user-icon' icon={faUserCircle} /><br />{activeUser.username}
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