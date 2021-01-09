import React from 'react';
import { Switch, Route } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from '../components/MainListItems';
import { useSelector, useDispatch } from 'react-redux'
// import logo from '../assets/pizzapizza50trans.png'
import { clearUser } from '../reducers/activeUserReducer'
// import MainDashboard from '../components/MainDashboard';
// import MainPlaceDetails from '../components/MainPlaceDetails';
// import MainCart from '../components/MainCart';
// import MainOrderHistory from '../components/MainOrderHistory';
// import MainAccount from '../components/MainAccount';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab'
import { closeNotify } from '../reducers/activeUserReducer'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    backgroundColor: 'black',
    fontWeight: 500
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    backgroundColor: 'white',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  }
}));

export default function MyNavbar() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const user = useSelector(state => state.activeUser.user)
  const notify = useSelector(state => state.activeUser.notify)

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch(clearUser())
  }
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>
            {/* <img src={logo} alt='logo'></img> */}
          </div>
          <IconButton color="inherit" edge='end' style={{ width: 150 }}>
            {user ?
              <div>
                <span>
                  <Avatar style={{ float: 'left' }} src={user.image} alt='user'></Avatar>
                  <MenuItem style={{ color: 'black', float: 'right' }} onClick={logout}>Logout</MenuItem>
                </span>
              </div>
              :
              null}
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        variant='temporary'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <div className={classes.toolbarIcon}>
          {/* <img alt='logo' src={logo} style={{ marginRight: 50 }}></img> */}
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems handleDrawerClose={handleDrawerClose} />
        </List>
      </SwipeableDrawer>
      {/* <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path='/dashboard' component={MainDashboard} />
            <Route path='/dashboard/restaurant/:id' component={MainPlaceDetails} />
            <Route path='/dashboard/orders' component={MainOrderHistory} />
            <Route path='/dashboard/cart' component={MainCart} />
            <Route path='/dashboard/account' component={MainAccount} />
          </Switch>
        </Container>
      </main> */}
      <Snackbar
        open={notify && notify.open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => dispatch(closeNotify())}>
        {notify && notify.open ?
          <Alert severity={notify.severity} style={notify.severity === 'success' ? { backgroundColor: '#b7e89e', border: 'solid', borderColor: 'green', width: 260 } : { backgroundColor: 'lightgrey', border: 'solid', borderColor: 'red', width: 260 }} >
            {notify.message}
          </Alert>
          : null}
      </Snackbar>
    </div>
  );
}