import React, {useState} from 'react';
import {BigHead} from '@bigheads/core'
import { List, Chip, Card, Avatar, Container, Typography, IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles, useTheme} from '@material-ui/core/styles'
import { heart } from '../reducers/forumReducer';
import {timeSince} from './ForumDisplayAll'


const useclasses = makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: 5,
    marginBottom: 20,
  },
  containerDark: {
    flex: 1,
    padding: 5,
    marginBottom: 20,
  },
  cardStylePost: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 4,
    paddingRight: 0,
    marginBottom: 5,
  },
  questionListItem: {
    paddingBottom: 0
  },
  fernAvatar: {
    marginLeft: 6,
    marginTop: 8
  },
  questionContainer: {
    padding: 10,
  },
  questionText: {
    fontSize: 16,
    marginLeft: 62,
    marginRight: 5,
  },
  answerHeadTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 5,
    marginRight: 10
  },
  bottomTags: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    height: 50,
  },
  heartIconStyle: {
    alignSelf: 'flex-end',
    height: 40,
  },
  likeTextStyle: {
    alignSelf: 'flex-end',
    color: 'gray',
  },
  headTitle: {
    fontWeight: 'bold',
    padding: 0,
  },
  descriptionStyle: {
    fontSize: 10
  },
  chip: {
    marginTop: 14,
    height: 20,
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  chipText: {
    fontSize: 10,
    marginLeft: 0,
    marginRight: 2,
    opacity: 0.7
  },
  commentMiconButton: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderColor: 'transparent',
    alignSelf: 'center',
    marginTop: 3,
    height: 40
  },
  miconText: {
    color: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 11
  },
}))

const tagOptions = [
  { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d', icon: 'gender-male-female' },
  { tag: 'relationships', backgroundColor: '#63ba90', icon: 'account-heart-outline' },
  { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: 'heart-broken' },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: 'gender-transgender' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: 'account-group' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: 'emoticon-sad-outline' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: 'lightning-bolt' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: 'arrow-up-down' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: 'cash' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: 'brain' },
  { tag: 'การรังแก', backgroundColor: '#5e320f', icon: 'emoticon-angry-outline' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: 'home-heart' },
  { tag: 'อื่นๆ', backgroundColor: '#707571', icon: 'head-question' },
  { tag: 'การเสพติด', backgroundColor: '#eb4034', icon: 'pill' },
];
const chooseTagColor = (passed) => {
  const color = tagOptions.find((t) => t.tag === passed);
  if (color) {
    return color.backgroundColor;
  }
  return 'magenta';
};

const chooseIcon = (passed) => {
  const icon = tagOptions.find(t => t.tag === passed);
  if(icon) {
    return icon.icon;
  }
  return 'star'
}

const SinglePostDisplay = ({isLoading}) => {

  const classes = useclasses();
  const user = useSelector(state => state.activeUser.user)
  const heartedByUser = useSelector(state => state.forum.heartedByUser)
  const post = useSelector(state => state.forum.activePost)
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)
  const dispatch = useDispatch()

  const submitHeart = async () => {
    if (user === null) {
      // ToastAndroid.show('คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ', ToastAndroid.SHORT);
      // navigation.navigate('LoginForm');
    } else {
      try {
        dispatch(heart(post._id));
        setShowHeartAnimation(true)
        setTimeout(() => {
          setShowHeartAnimation(false)
        }, 2500);
      } catch (error) {
        console.log(error);
        // ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <Container
     
    >
      {/* {showHeartAnimation ?
        <Lottiediv
          source={require('../assets/heartUpAnimation.json')}
          autoPlay
          loop={false}
          style={{zIndex: 99}}/>
      : null} */}
      {post && (
        <Card
          className={{...classes.cardStylePost, opacity: showHeartAnimation ? 0.2 : 1}} key={post._id}
        >

          <div
            className={classes.questionContainer}
          >
            <Typography
              className={classes.questionText}
            >
              {post.question}
            </Typography>
          </div>

          <div
            className={classes.bottomTags}
          >
            <Chip
              key={post._id} variant='outlined' icon={chooseIcon(post.tags[0])}/>
            <IconButton
              name='comment-plus'
              size={28}
              className={classes.commentMiconButton}
              color='lightgray'
              disabled={post.answer === null} 
              // onPress={() => {
              //   if(!user){
              //     // ToastAndroid.show('คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ', ToastAndroid.SHORT);
              //     navigation.navigate('LoginForm')
              //   }else{
              //     navigation.navigate('AddComment', {
              //       postId: post._id,
              //       postTitle: post.title,
              //     });
              //   }
              // }}
            >
              {/* <Typography
              >ความคิดเห็น
              </Typography> */}
            </IconButton>

              <IconButton
                name="heart-plus-outline"
                color="pink"
                size={28}
                disabled={post.answer === null}
                className={classes.heartIconStyle}
                onClick={submitHeart}
              >
                <Typography
                  className={classes.likeTextStyle}
                >
                  {post.likes}
                </Typography>
              </IconButton>

          <IconButton
            name="heart"
            color="pink"
            size={28}
            className={classes.heartIconStyle}
            disabled
          >
            <Typography
              className={classes.likeTextStyle}
            >
              {post.likes}
            </Typography>
          </IconButton>

          </div>
        </Card>
      )}
    </Container>
  );
};



export default SinglePostDisplay;
