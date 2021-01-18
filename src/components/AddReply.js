import React, { useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import {Button, Card, Typography, Container, TextField} from '@material-ui/core'
import {BigHead} from '@bigheads/core'
import { addReply} from '../reducers/forumReducer';
import {notify} from '../reducers/activeUserReducer'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  graphicView: {
    width: 200,
    height: 200,
  },
  leadIn: {
    alignSelf: 'center',
    margin: 10,
  },
  surface: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    padding: 10
  },
  textAreaComment: {
    color: 'gray',
  },
  commentButton: {
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightgray',
    marginBottom: 40,
    marginTop: 20
  },
  commentButtonText: {
    color: 'black'
  },
  rightQuote: {
    alignSelf: 'flex-end'
  },
  spinner: {
    marginTop: 25,
  }
}));

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

const AddReply = () => {
  const classes = useStyles();
  const history = useHistory();
  const { commentId } = useParams();
  const post = useSelector(state => state.forum.activePost)
  const comment = post.comments.find(c => c._id === commentId)
  const user = useSelector(state => state.activeUser.user)
  const dispatch = useDispatch()
  const [reply, setReply] = useState('')

  const handleChangeReply = (event) => {
    setReply(event.target.value)
  }

  const submitReply = async () => {
    if (user === null) {
     dispatch(notify('error', 'คุณต้องลงชื่อเพื่อแสดงความคิดเห็น'));
      history.push('/');
    } else if (reply === '') {
      dispatch(notify('error', 'คุณลืมที่จะเขียนความคิดเห็น'));
    } else {
      try {
        dispatch(addReply(reply, comment, post._id));
        setTimeout(() => {
          history.push(`/post/${post._id}`)
        }, 2000);
      } catch (error) {
        console.log(error);
        dispatch(notify('error', 'กรุณาลองใหม่'));
      }
    }
  };
  
  return(
    <Container
    className={classes.container}>
        <div
          className={classes.graphicView}
      >
          <BigHead
            {...user.avatarProps} faceMask={false}
        />
        </div>
        <div>
          <Typography
            className={classes.leadIn}
        >
            {`${user.avatarName} says...`}
          </Typography>
        </div>

        <Card
          className={classes.surface}
      >
          <CssTextField
            className={classes.textAreaComment}
            multiline
            fullWidth
            autoFocus
            variant='outlined'
            rows={2}
            onChange={handleChangeReply}
            value={reply}
        />
        </Card>
          <Button
            className={classes.commentButton} variant='contained' onClick={submitReply}
        >
            <Typography
              className={classes.commentButtonText}
          >
              Submit
            </Typography>
          </Button>
      </Container>
  )
}


export default AddReply