import React, { useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles} from '@material-ui/core/styles'
import {Button, Container, Typography, Chip} from '@material-ui/core'
import {BigHead} from '@bigheads/core'
import { initializeForumPending, initializeForumAnswered} from '../reducers/forumReducer';
import {getLevelTitle, levelColor} from '../helperFunctions'
import {StarsRounded} from '@material-ui/icons'
import {initStats} from '../reducers/activeUserReducer'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigHeadContainer: {
    width: 200,
    height: 200
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  pointsText: {
    fontSize: 16
  },
  levelText: {
    fontSize: 16
  },
  answerPendingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  showAnsweredButton: {
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightpink',
    marginBottom: 20,
    marginTop: 20
  },
  showPendingButton: {
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightgray'
  },
  avatarIntro: {
    alignSelf: 'center'
  },
  showEditAvatarButton: {
    alignSelf: 'center',
    borderRadius: 20,
    padding: 5,
    width: 300,
  },
  editAvatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  showAnsweredText: {
    color: 'black',
  },
  showPendingText: {
    color: 'black',
  },
}));


const MyQuestions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.activeUser.user);
  const userPoints = useSelector((state) => state.activeUser?.userPoints)
  const userLevel = useSelector((state) => state.activeUser?.userLevel)
  let avatarProps;
  let avatarName;
  let id;
  if(user && !user.username) {
    avatarProps = user.avatarProps
    avatarName = user.avatarName
    id = user._id
  }else{
    avatarProps = undefined
    avatarName = undefined
    id = undefined
  }
  
  const answered = useSelector((state) => state.forum.answered);
  const pending = useSelector((state) => state.forum.pending);
  const myAnsweredPosts = answered.filter((p) => p.user?.id === id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const myPendingPosts = pending.filter((p) => p.user?.id === id).sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    if(answered.length === 0){
      console.log('UF Answered MQ')
      dispatch(initializeForumAnswered());
    }
  }, [answered.length, dispatch]);

  useEffect(() => {
    dispatch(initStats(user._id))
  },[dispatch, user._id])

  useEffect(() => {
    if(pending.length === 0){
      console.log('UF Pending MQ')
      dispatch(initializeForumPending());
    }
  }, [dispatch, pending.length]);

  return(
    <Container className={classes.container}>
      <div
        className={classes.editAvatarContainer}
      >
        <div className={classes.bigHeadContainer}>
        <BigHead
          {...avatarProps} faceMask={false}
        />
        </div>
        <div>
          <Typography
            className={classes.avatarIntro}
          >
            สวัสดี, ฉันคือ 
            {' '}
            {avatarName}
            {' '}
            เราเป็นเพื่อนกันแล้วนะ
          </Typography>
          <Button
            variant='outlined' className={classes.showEditAvatarButton} onClick={() => history.push(`editavatar/${user._id}`)}
          >
            <Typography >
              แก้ไข
            </Typography>
          </Button>
        </div>
      </div>
      <div
        className={classes.statsContainer}>
        <Typography
          className={classes.pointsText}>แต้มของฉัน {userPoints}</Typography>
        <Chip
          style={{backgroundColor: levelColor(userLevel), color: 'black'}}
          label={getLevelTitle(userLevel)}
          icon={<StarsRounded style={{color: 'goldenrod'}}/>}/>
      </div>
      <div
        className={classes.answerPendingContainer}
      >
        <Button
          variant='contained' className={classes.showAnsweredButton} onClick={() => history.push(`myanswered/${user._id}`)}
          disabled={myAnsweredPosts.length === 0}
        >
          <Typography
            className={classes.showAnsweredText}
          >
            มีการตอบแล้ว (
            {myAnsweredPosts.length}
            )
          </Typography>
        </Button>
        <Button
         variant='contained' className={classes.showPendingButton} onClick={() => history.push(`mypending/${user._id}`)}
          disabled={myPendingPosts.length === 0}
        >
          <Typography
            className={classes.showPendingText}
          >
            กำลังรอคำตอบ (
            {myPendingPosts.length}
            )
          </Typography>
        </Button>
      </div>
    
    </Container>
  )
};


export default MyQuestions;