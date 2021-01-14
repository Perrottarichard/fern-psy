import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { setUser } from '../reducers/activeUserReducer'
import userService from '../services/userService'
import forumService from '../services/forumService';
import RegisterGraphic from '../assets/undraw_mobile_login_ikmv.svg'
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
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: 20,
    backgroundColor: 'lightgray',
    color: 'black'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  graphic: {
    height: 180,
    width: 300
  }
}));

export default function RegisterForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }

  const submitRegister = async event => {
    event.preventDefault()

 if (!password) {
     dispatch(notify('error', 'You must have a password'))
    }
    else if (!email) {
      dispatch(notify('error', 'You must provide an email address'))
    }
    else if (password !== confirmPassword) {
      dispatch(notify('error', 'กรุณายืนยัน password ให้ถูกต้อง'))
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      dispatch(notify('error', 'กรุณากรอก Email ให้ถูกต้อง'))
    }
    else {
      setIsLoading(true)
      try {
        const user = await userService.registerUser({ password, email: email.toLowerCase() });
        window.localStorage.setItem(
          'loggedForumUser', JSON.stringify(user),
        );
        dispatch(setUser(user));
        forumService.setToken(user.token);
        // toast.success('สำเร็จแล้ว คุณสามารถล็อคอินและตั้งกระทู้ถามได้เลยค่ะ')
        setPassword('')
        setConfirmPassword('')
        setEmail('')
        history.push('/')
      }
      catch (error) {
        console.log(error)
        dispatch(notify('error', 'มีข้อผิดพลาด กรุณาลองใหม่ค่ะ'))
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
       <Avatar src={RegisterGraphic} className={classes.graphic} variant='square'/>
        <form className={classes.form}
        noValidate
        onSubmit={submitRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CssTextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                value={email}
                id="email"
                label="Email"
                onChange={handleChangeEmail}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={handleChangePassword}
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" className={classes.link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
