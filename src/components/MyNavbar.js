import React from 'react';
import { Switch, Route, Link, useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import {Button, Switch as MuiSwitch, Avatar} from '@material-ui/core'
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
import NoPage from './NoPage'
import SinglePostDisplay from './SinglePostDisplay';
import MyQuestions from './MyQuestions';
import ArticleDisplay from './ArticlesDisplay';
import {BigHead} from '@bigheads/core'
import {Brightness2, WbSunny} from '@material-ui/icons'
import Logo from '../assets/askfernlogo2.svg'

import { closeNotify, setDarkMode } from '../reducers/activeUserReducer'
import { clearUser } from '../reducers/activeUserReducer';
import AddComment from './AddComment';
import AddReply from './AddReply';
import AvatarPreview from './AvatarPreview';
import SingleArticleDisplay from './SingleArticleDisplay';
import MyPending from './MyPending';
import AdminHome from './AdminHome';

const CustomSwitchDark = withStyles((theme) => ({
  switchBase: {
    color: '#ebb757',
    '&$track': {
      backgroundColor: 'gray'
    },
    '&$checked': {
      color: '#f5f578'
    },
    '&$checked + $track': {
      backgroundColor: 'gray',
    },
  },
  checked: {},
  track: {backgroundColor: 'gray'},
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
    color: 'white'
  },
  hiddenButtonForAdmin: {
    width: 30,
    alignSelf: 'flex-start'
  }
}));

export default function MyNavbar({forumAnswered}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const user = useSelector(state => state.activeUser.user)
  const notify = useSelector(state => state.activeUser.notify)
  const darkMode = useSelector(state => state.activeUser.darkMode)

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleModeChange = () => {
    dispatch(setDarkMode(!darkMode))
  }
  const logout = () => {
    window.localStorage.removeItem('loggedForumUser')
    dispatch(clearUser())
    history.push('/')
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
          icon={<WbSunny/>}
          checkedIcon={<Brightness2/>}
          checked={darkMode === true}
          />
          <div className={classes.title}>

          </div>
            {user ?
              <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div style={{height: 35, width: 35, margin: 'auto', marginBottom: 10}}>
                    {!user.username
                    ?
                    <BigHead {...user.avatarProps} faceMask={false}/>
                    :
                    <Avatar src={Logo}/>
                    }
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
        <Button className={classes.hiddenButtonForAdmin} onClick={() => {
          handleDrawerClose()
          history.push('adLogin')}
        }>
           </Button>
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
            {user === null || user === undefined ?
              <LoginForm/>
              :
            <Home activeUser={user} />}
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/contact">
            <ContactForm />
          </Route>

          <Route path="/myquestions/:id">
            <MyQuestions activeUser={user} />
          </Route>

          <Route path="/articles">
            <ArticleDisplay activeUser={user} />
          </Route>

          <Route path="/viewarticle/:articleId">
            <SingleArticleDisplay activeUser={user} />
          </Route>

          <Route path="/post/:id">
            <SinglePostDisplay activeUser={user} />
          </Route>

          <Route path="/addcomment/:id">
            <AddComment activeUser={user} />
          </Route>

          <Route path="/editavatar/:userId">
            <AvatarPreview activeUser={user} />
          </Route>

          <Route path="/addreply/:commentId">
            <AddReply activeUser={user} />
          </Route>

          <Route path="/addpost">
            <ForumPostMain activeUser={user} />
          </Route>

          <Route path="/allquestions">
            <ForumDisplayAll activeUser={user} forumAnswered={forumAnswered} />
          </Route>

          <Route path="/myanswered/:userId">
            <ForumDisplayAll activeUser={user} forumAnswered={forumAnswered} />
          </Route>

          <Route path="/mypending/:userId">
            <MyPending activeUser={user}/>
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
            {!user || (user.username !== 'Fern-Admin' && user?.username !== 'Richard-Admin') ?
              <NoPage /> :
              <AdminHome/>
            }
          </Route>
        </Switch>
        </Container>
      </main>
      <Snackbar
        open={notify && notify.open}
        autoHideDuration={3000}

        //need this to avoid wierd blank background during exit transition
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