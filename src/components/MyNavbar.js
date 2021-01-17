import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import {Button, Accordion, Switch as MuiSwitch} from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab'
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './MainListItems';
import About from './About';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForumPostMain from './ForumPostMain';
import Home from './Home';
import ForumDisplayAll from './ForumDisplayAll';
import ContactForm from './ContactForm';
import AdminLoginForm from './AdminLoginForm';
import AdminContactsDashboard from './AdminContactsDashboard';
import AdminUsersDashboard from './AdminUsersDashboard';
import AdminForumDashboard from './AdminForumDashboard';
import NoPage from './NoPage'
import SinglePostDisplay from './SinglePostDisplay';
import MyQuestions from './MyQuestions';
import AdminFlaggedComment from './AdminFlaggedComment';
import AdminAnswers from './AdminAnswers';
import AdminPostArticle from './AdminPostArticle';
import ArticleDisplay from './ArticlesDisplay';
import {BigHead} from '@bigheads/core'
import {Brightness2, WbSunny} from '@material-ui/icons'

import { closeNotify } from '../reducers/activeUserReducer'
import { clearUser } from '../reducers/activeUserReducer';

const CustomSwitchDark = withStyles((theme) => ({
  switchBase: {
    color: '#f5f578',
    '&$checked': {
      color: '#ebb757'
    },
    '&$checked + $track': {
      backgroundColor: 'gray',
    },
  },
  checked: {},
  track: {},
}))(MuiSwitch);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    fontWeight: 500,
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
    backgroundColor: 'black',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    backgroundColor: 'black',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: 'lightpink'
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
    backgroundColor: 'black',
    color: 'white',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    backgroundColor: 'black',
    color: 'white',
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
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0)
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}));

export default function MyNavbar({activeUser, forumAnswered, prefersDarkMode, setPrefersDarkMode}) {
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
  const handleModeChange = () => {
    setPrefersDarkMode(!prefersDarkMode)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedForumUser')
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
          
          <CustomSwitchDark 
          onChange={handleModeChange} 
          icon={<Brightness2/>}
          checkedIcon={<WbSunny/>}
          />
          <div className={classes.title}>
            {/* <img src={logo} alt='logo'></img> */}
          </div>
            {user ?
              <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div style={{height: 35, width: 35, margin: 'auto', marginBottom: 10}}>
                    <BigHead {...user.avatarProps} faceMask={false}/>
                  </div>
                  <Button onClick={logout} style={{color: 'white'}}>ออกจากระบบ</Button>
              </div>
              :
              <Link to='/login' className={classes.link}>Sign in</Link>}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        variant={window.screen.width > 500 ? 'permanent' : 'temporary'}
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
            <ChevronLeftIcon style={{color: 'lightpink'}}/>
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems handleDrawerClose={handleDrawerClose} />
        </List>
      </SwipeableDrawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

        <Switch>
          <Route exact path="/">
            {activeUser === null
              ?
              <Redirect to='/login'/>
              :
            <Home activeUser={activeUser} />
            }
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/contact">
            <ContactForm />
          </Route>

          <Route path="/myquestions/:id">
            <MyQuestions activeUser={activeUser} />
          </Route>

          <Route path="/articles">
            <ArticleDisplay activeUser={activeUser} />
          </Route>

          <Route path="/post/:id">
            <SinglePostDisplay activeUser={activeUser} />
          </Route>

          <Route path="/addpost">
            <ForumPostMain activeUser={activeUser} />
          </Route>

          <Route path="/allquestions">
            <ForumDisplayAll activeUser={activeUser} forumAnswered={forumAnswered} />
          </Route>

          <Route path="/login">
            <LoginForm />
          </Route>

          <Route path="/register">
            <RegisterForm />
          </Route>

          <Route path="/adLogin">
            <AdminLoginForm />
          </Route>
          
          <Route path='/adDash'>
            {!activeUser || (activeUser.username !== 'Fern-Admin' && activeUser.username !== 'Richard-Admin') ?
              <NoPage /> :
              <Container>
                <Button color='secondary' id='pendingToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>Pending Questions
                </Button>
                <Button color='secondary' id='answersToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>My Answers</Button>
                <Button color='secondary' id='contactsToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>Private Messages</Button>
                <Button color='secondary' id='usersToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>Show All Users</Button>
                <Button color='secondary' id='flaggedToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>Flagged Comments</Button>
                <Button color='secondary' id='articlesToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>Post Articles</Button>
                <Accordion toggler="#pendingToggler">
                  <AdminForumDashboard />
                </Accordion>
                <Accordion toggler="#answersToggler">
                  <AdminAnswers />
                </Accordion>
                <Accordion toggler="#contactsToggler">
                  <AdminContactsDashboard />
                </Accordion>
                <Accordion toggler="#usersToggler">
                  <AdminUsersDashboard />
                </Accordion>
                <Accordion toggler="#flaggedToggler">
                  <AdminFlaggedComment />
                </Accordion>
                <Accordion toggler="#articlesToggler">
                 <AdminPostArticle/>
                </Accordion>
              </Container>
            }
          </Route>
        </Switch>
        </Container>
      </main>
      <Snackbar
        open={notify && notify.open}
        autoHideDuration={3000}
        //needed to avoid wierd blank background during exit transition
        transitionDuration={{exit: 0}}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => dispatch(closeNotify())}>
        {notify && notify.open ?
          <Alert severity={notify.severity}>
            {notify.message}
          </Alert>
          : null}
      </Snackbar>
    </div>
  );
}