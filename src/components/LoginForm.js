import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { setUser } from '../reducers/activeUserReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import Logo from '../assets/askfernlogo2.svg'
import {notify} from '../reducers/activeUserReducer'

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'lightpink',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'lightgray',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightgray',
      },
      '&:hover fieldset': {
        borderColor: 'lightpink',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'lightpink',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 100
  },
  af: {
    fontFamily: 'Arizonia', 
    color: theme.palette.text.primary
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: 20,
    backgroundColor: 'lightpink'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePass = (event) => {
    setPassword(event.target.value)
  }

  const submitLogin = async event => {
    event.preventDefault()
    if (!email || !password) {
      dispatch(notify('error', 'กรุณาใส่ email และ password'))
    }
    else {
      try {
        const user = await loginService.userlogin({ email: email.toLowerCase(), password })
        setEmail('')
        setPassword('')
        window.localStorage.setItem(
          'loggedForumUser', JSON.stringify(user)
        )
        forumService.setToken(user.token)
        dispatch(setUser(user))
        history.push('/')
      }
      catch (error) {
        console.log(error.message)
        if (error.message.includes('401')) {
          dispatch(notify('error', 'กรุณาตรวจสอบความถูกต้องของ email และ password'))
        } else {
          dispatch(notify('error', 'มีข้อผิดพลาด'))
        }
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={Logo}>
        </Avatar>
        <Typography component="h1" variant="h4" className={classes.af}>
          AskFern
        </Typography>
        <form className={classes.form}
        noValidate
        onSubmit={submitLogin}>
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChangeEmail}
            value={email}
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChangePass}
            value={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            ลงชื่อเข้าใช้งาน
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" className={classes.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}