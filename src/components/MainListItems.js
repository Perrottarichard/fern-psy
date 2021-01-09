import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, Forum, Info, BookTwoTone, PostAdd } from '@material-ui/icons';

const MainListItems = ({ handleDrawerClose }) => {

  const iconStyle = { color: 'white'}
  const itemStyle = {marginTop: 15, marginBottom: 15}

  return (
    <div>
      <ListItem style={itemStyle} button component={Link} to="/" onClick={() => handleDrawerClose()}>
        <ListItemIcon style={iconStyle}>
          <Home style={iconStyle} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem style={itemStyle} button component={Link} to="/allquestions" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <Forum style={iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Forum" />
      </ListItem>

      <ListItem style={itemStyle} button component={Link} to="/addpost" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <PostAdd style={iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Ask Fern" />
      </ListItem>

      <ListItem style={itemStyle} button component={Link} to="/articles" onClick={() => handleDrawerClose()}>
        <ListItemIcon>
          <BookTwoTone style={iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItem>

      <ListItem style={itemStyle} button component={Link} to="/about" onClick={() => handleDrawerClose()}>
      <ListItemIcon>
        <Info style={iconStyle}/>
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>

    </div>
  )
}
export default MainListItems