import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {BigHead} from '@bigheads/core'
import { Avatar, Chip, Card, CardHeader, Divider, Container, Typography, IconButton, Dialog} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles} from '@material-ui/core/styles'
import {Favorite, FavoriteBorder,  AddComment as AddCommentIcon} from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faBusinessTime, faBrain, faHome, faSyringe, faHeartBroken, faVenusMars, faTransgender, faAngry, faFlushed, faGlassCheers, faTheaterMasks, faSadTear, faUsers} from '@fortawesome/free-solid-svg-icons'
import { heart } from '../reducers/forumReducer';
import {notify} from '../reducers/activeUserReducer'
import {timeSince} from './ForumDisplayAll'
import DisplayComments from './DisplayComments';
import Logo from '../assets/askfernlogo2.svg'
import Lottie from 'react-lottie'
import * as animationData from '../assets/heartUpAnimation.json'


const useStyles = makeStyles((theme) => ({
  container: {
    padding: 5,
  },
  cardStylePost: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 15,
  },
  avatarAndHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10
  },
  bigHeadContainer: {
    minWidth: 90, 
    minHeight: 90,
    maxHeight: 100,
    maxWidth: 100,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  fernAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginLeft: 16,
    marginRight: 16,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  questionContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 30,
    marginBottom: 10,
    whiteSpace: 'pre-wrap'
  },
  answerContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 30,
    marginBottom: 10,
    whiteSpace: 'pre-wrap'
  },
  bottomTags: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingRight: 10,
    },
  bottomIconCount: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 12,
    marginBottom: 5,
    
  },
  chip: {
    alignSelf: 'center', 
    marginBottom: 2,
  }
}))

const tagOptions = [	  
  { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d', icon: faVenusMars },
  { tag: 'relationships', backgroundColor: '#288046', icon: faGlassCheers },
  { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: faHeartBroken },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: faTransgender },	 
  { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: faUsers },	
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: faSadTear },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: faFlushed },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: faTheaterMasks },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: faBusinessTime },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: faBrain },
  { tag: 'การรังแก', backgroundColor: '#5e320f', icon: faAngry },	
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: faHome },
  { tag: 'อื่นๆ', backgroundColor: '#707571', icon: faQuestionCircle },	
  { tag: 'การเสพติด', backgroundColor: '#40073d', icon: faSyringe },
]

// const tagOptions = [
//   { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d', icon: 'gender-male-female' },
//   { tag: 'relationships', backgroundColor: '#63ba90', icon: 'account-heart-outline' },
//   { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: 'heart-broken' },
//   { tag: 'lgbt', backgroundColor: '#ff4da6', icon: 'gender-transgender' },
//   { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: 'account-group' },
//   { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: 'emoticon-sad-outline' },
//   { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: 'lightning-bolt' },
//   { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: 'arrow-up-down' },
//   { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: 'cash' },
//   { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: 'brain' },
//   { tag: 'การรังแก', backgroundColor: '#5e320f', icon: 'emoticon-angry-outline' },
//   { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: 'home-heart' },
//   { tag: 'อื่นๆ', backgroundColor: '#707571', icon: 'head-question' },
//   { tag: 'การเสพติด', backgroundColor: '#eb4034', icon: 'pill' },
// ];
// const chooseTagColor = (passed) => {
//   const color = tagOptions.find((t) => t.tag === passed);
//   if (color) {
//     return color.backgroundColor;
//   }
//   return 'magenta';
// };

const chooseIcon = (passed) => {
  const icon = tagOptions.find(t => t.tag === passed);
  if(icon) {
    return icon.icon;
  }
  return faQuestionCircle
}

const lottieOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData.default
}

const SinglePostDisplay = ({isLoading}) => {

  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(state => state.activeUser.user)
  const heartedByUser = useSelector(state => state.forum.heartedByUser)
  const post = useSelector(state => state.forum.activePost)
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)
  const dispatch = useDispatch()

  const submitHeart = async () => {
    if (user === null || user === undefined) {
      dispatch(notify('error', 'คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ'));
      history.push('/')
    } else {
      try {
        dispatch(heart(post._id));
        setShowHeartAnimation(true)
        setTimeout(() => {
          setShowHeartAnimation(false)
        }, 2500);
      } catch (error) {
        console.log(error);
        dispatch(notify('error', 'กรุณาลองใหม่'));
      }
    }
  };


  return (
    <Container
     
    >
      <Dialog open={showHeartAnimation} PaperProps={{
    style: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  }}>
      <Lottie
          options={lottieOptions}
          height={240}
          width={240}/>

      </Dialog>
        
      {post && (
        <Card
          className={classes.cardStylePost} 
          key={post._id}
          variant='elevation'
          raised
        >
          <div className={classes.avatarAndHeaderContainer}>
              <div className={classes.bigHeadContainer}>
              <BigHead
                {...post.user?.avatarProps}
                faceMask={false}/>
                </div>
              <CardHeader
              title={post.title}
              titleTypographyProps={{variant: 'body1'}}
              subheader={`โพสต์ของ ${post.user?.avatarName} ${timeSince(post.date)} ที่ผ่านมา`}
              style={{padding: 0}}>
              </CardHeader>
              </div>
          <div className={classes.questionContainer}
          >
            <Typography
            >
              {post.question}
            </Typography>
          </div>
          <Divider/>
          <div className={classes.avatarAndHeaderContainer}>
              <Avatar src={Logo} className={classes.fernAvatar}/>
              <CardHeader
              title={`Fern`}
              titleTypographyProps={{variant: 'body1'}}
              subheader={`Answered ${timeSince(post.answer.date)} ที่ผ่านมา`}
              style={{padding: 0}}>
              </CardHeader>
              </div>
          <div className={classes.answerContainer}
          >
            <Typography
            >
              {post.answer.answer}
            </Typography>
          </div>
          <Divider/>
          <div
            className={classes.bottomTags}
          >
            {!heartedByUser || !heartedByUser.includes(post._id) ? (
              <IconButton
                disabled={post.answer === null || (user?.username === 'Fern-Admin' || user?.username === 'Richard-Admin') || user === undefined || user === null}
                onClick={submitHeart}
              >
                <FavoriteBorder style={{color: 'lightpink'}} fontSize={'default'}/>
                <Typography
                  className={classes.bottomIconCount}
                >
                  {post.likes}
                </Typography>
              </IconButton>
            )
        : (
          <IconButton
            disabled
          >
           <Favorite style={{color: 'lightpink'}} fontSize={'default'}/>
                <Typography className={classes.bottomIconCount} color='textPrimary'>{post.likes}</Typography>
          </IconButton>
              )}
              <IconButton
              disabled={post.answer === null || (user?.username === 'Fern-Admin' || user?.username === 'Richard-Admin') || user === null || user === undefined} 
              onClick={() => {
                if(!user){
                  dispatch(notify('error', 'คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ'));
                  history.push('/')
                }else{
                  history.push(`/addcomment/${post._id}`)
                }
              }}
            >
              <AddCommentIcon style={{color: 'gray'}} fontSize={'default'}/>
              {window.screen.width > 400 ?
              <Typography className={classes.bottomIconCount}
              >ความคิดเห็น
              </Typography>
              : null}
            </IconButton>

              <Chip className={classes.chip} variant='outlined' size='small' icon={<FontAwesomeIcon size={'lg'} icon={chooseIcon(post.tags[0])}/>}
              label={post.tags[0]}/>  
          </div>
        </Card>
      )}
      <DisplayComments/>
    </Container>
  );
};



export default SinglePostDisplay;
