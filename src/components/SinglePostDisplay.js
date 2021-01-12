import React, {useState} from 'react';
import {BigHead} from '@bigheads/core'
import { List, Chip, Card, Avatar, Container, Typography, IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {Favorite, FavoriteBorder, CommentOutlined} from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faBusinessTime, faBrain, faHome, faSyringe, faHeartBroken, faVenusMars, faTransgender, faAngry, faFlushed, faGlassCheers, faTheaterMasks, faSadTear, faGlobe, faUsers} from '@fortawesome/free-solid-svg-icons'
import { heart } from '../reducers/forumReducer';
import {timeSince} from './ForumDisplayAll'


const useclasses = makeStyles((theme) => ({
  container: {
    padding: 5,
    backgroundColor: theme.palette.background
  },
  cardStylePost: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 5,
  },
  bottomTags: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  bottomIconCount: {
    marginLeft: 10,
    marginTop: 5
  }
}))

const tagOptions = [
  { tag: 'ทั้งหมด', backgroundColor: '#8e2bff', icon: faGlobe },	  
  { tag: 'เรื่องเพศ', backgroundColor: '#ff5c4d', icon: faVenusMars },
  { tag: 'การออกเดท', backgroundColor: '#288046', icon: faGlassCheers },
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
  return faQuestionCircle
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
          className={classes.cardStylePost} key={post._id}
        >

          <div
          >
            <Typography
            >
              {post.question}
            </Typography>
          </div>

          <div
            className={classes.bottomTags}
          >
            {!user?.heartedPosts?.includes(post._id) && !heartedByUser.includes(post._id) ? (
              <IconButton
                disabled={post.answer === null}
                onClick={submitHeart}
              >
                <FavoriteBorder style={{color: 'lightpink'}} fontSize={'large'}/>
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
           <Favorite style={{color: 'lightpink'}} fontSize={'large'}/>
                <Typography className={classes.bottomIconCount} color='textPrimary'>{post.likes}</Typography>
          </IconButton>
              )}
              <IconButton
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
              <CommentOutlined style={{color: 'gray'}} fontSize={'large'}/>
              <Typography className={classes.bottomIconCount}
              >ความคิดเห็น
              </Typography>
            </IconButton>

              <Chip style={{alignSelf: 'center', marginBottom: 2}}variant='outlined' size='medium' icon={<FontAwesomeIcon size={'2x'} icon={chooseIcon(post.tags[0])}/>}
              label={post.tags[0]}/>  
          </div>
        </Card>
      )}
    </Container>
  );
};



export default SinglePostDisplay;
