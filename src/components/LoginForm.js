import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { setUser } from '../reducers/activeUserReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import Logo from '../assets/askfernlogo2.svg'

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
      // toast.warn('กรุณาใส่ email และ password')
    }
    else {
      try {
        const user = await loginService.userlogin({ email: email.toLowerCase(), password })
        window.localStorage.setItem(
          'loggedForumUser', JSON.stringify(user)
        )
        forumService.setToken(user.token)
        dispatch(setUser(user))
        setEmail('')
        setPassword('')
        history.push('/')
      }
      catch (error) {
        console.log(error.message)
        if (error.message.includes('401')) {
          // toast.error('กรุณาตรวจสอบความถูกต้องของ email และ password')
        } else {
          // toast.error('มีข้อผิดพลาด')
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
        <Typography component="h1" variant="h4" style={{fontFamily: 'Arizonia', color: 'lightgray'}}>
          AskFern
        </Typography>
        <form className={classes.form}
        noValidate
        onSubmit={submitLogin}>
          <TextField
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
          <TextField
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
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}