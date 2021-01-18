import React, { useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import {Button, Card, Typography, Container, Dialog, TextField} from '@material-ui/core'
import {BigHead} from '@bigheads/core'
// import Ficon from 'react-native-vector-icons/FontAwesome5'
import { addComment} from '../reducers/forumReducer';
import {addPoints, levelUp, notify} from '../reducers/activeUserReducer'
import {shouldLevelUp} from '../helperFunctions'
import LevelUpAnimationModal from './LevelUpAnimationModal'

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
  surface: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    padding: 10
  },
  leadIn: {
    alignSelf: 'center',
    margin: 10,
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

const AddComment = () => {
  const classes = useStyles();
  const history = useHistory();
  const post = useSelector(state => state.forum.activePost)
  const user = useSelector(state => state.activeUser.user)
  const userPoints = useSelector(state => state.activeUser.userPoints);
  const userLevel = useSelector(state => state.activeUser.userLevel);
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false)

  const handleChangeComment = (event) => {
    setComment(event.target.value)
  }

  const submitComment = async () => {
    const postToModify = post;
    if (user === null) {
      dispatch(notify('error', 'คุณต้องลงชื่อเพื่อแสดงความคิดเห็น'));
      history.push('/');
    } else if (comment === '') {
      dispatch(notify('error', 'คุณลืมที่จะเขียนความคิดเห็น'));
    }else {
      try {
      
      dispatch(addComment(comment, postToModify));

      if(shouldLevelUp(userPoints, userLevel, 1)){
        setShowLevelUpAnimation(true)
        setTimeout(() => {
          setShowLevelUpAnimation(false)
          dispatch(levelUp(user._id))
          dispatch(addPoints(user._id, 1))
        }, 2500);
        setTimeout(() => {
          history.push(`/post/${post._id}`);
        }, 2400);
      }else{
          dispatch(addPoints(user._id, 1))
          setTimeout(() => {
            history.push(`/post/${post._id}`);
          }, 2000);
      }
      } catch (error) {
        console.log(error);
        dispatch(notify('error', 'กรุณาลองใหม่'));
      }
    }
  };

  return(
      <Container
    className={classes.container}>
        <Dialog open={showLevelUpAnimation} fullWidth>
            <LevelUpAnimationModal/>
          </Dialog>
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
            onChange={handleChangeComment}
            value={comment}
        />
        </Card>
          <Button
            className={classes.commentButton} variant='contained' onClick={submitComment}
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


export default AddComment;