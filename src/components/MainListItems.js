import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Home, Forum, Info, BookTwoTone, PostAdd } from '@material-ui/icons';

const MainListItems = ({ handleDrawerClose }) => {

  return (
    <div>
      <ListItem button component={Link} to="/dashboard" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/cart" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <Forum />
        </ListItemIcon>
        <ListItemText primary="Forum" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/orders" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <PostAdd />
        </ListItemIcon>
        <ListItemText primary="Ask Fern" />
      </ListItem>
      <ListItem button component={Link} to="/dashboard/account" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <BookTwoTone />
        </ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItem>
      <ListItem button>
      <ListItemIcon>
        <Info />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>
    </div>
  )
}
export default MainListItems