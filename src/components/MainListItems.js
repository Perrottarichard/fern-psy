import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, Forum, Info, LocalLibraryRounded, PostAdd } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGooglePlay} from '@fortawesome/free-brands-svg-icons'
import {ListItemAvatar, Avatar} from '@material-ui/core'
import GPlay from '../assets/google-play-badge.png'


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
          <LocalLibraryRounded style={iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItem>

      <ListItem style={itemStyle} button component={Link} to="/about" onClick={() => handleDrawerClose()}>
      <ListItemIcon>
        <Info style={iconStyle}/>
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>

    <ListItem style={itemStyle} button component='a' href='https://play.google.com/store/apps/details?id=com.fernpsymobile' target='_blank' onClick={() => handleDrawerClose()}>
      <ListItemIcon>
        <FontAwesomeIcon icon={faGooglePlay} color='white' size='lg' style={{marginLeft: 2}}/>
      </ListItemIcon>
      <ListItemAvatar>
        <Avatar src={GPlay} style={{width: 100}} variant='square'/>
      </ListItemAvatar>
    </ListItem>

    </div>
  )
}
export default MainListItems