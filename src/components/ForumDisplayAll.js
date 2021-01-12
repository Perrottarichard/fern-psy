import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import {BigHead} from '@bigheads/core'
import { Container, Chip, Typography, Card , CardContent, CardHeader, CardActions, CardActionArea,  Icon, Menu, MenuItem, Button, CircularProgress} from '@material-ui/core';
import {Favorite, CommentOutlined} from '@material-ui/icons'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faBusinessTime, faBrain, faHome, faSyringe, faHeartBroken, faVenusMars, faTransgender, faAngry, faFlushed, faGlassCheers, faTheaterMasks, faSadTear, faUsers} from '@fortawesome/free-solid-svg-icons'
import { initializeForumAnswered, activePost } from '../reducers/forumReducer';
// import NoPostsYet from './NoPostsYet'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 5,
    backgroundColor: theme.palette.background
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    paddingBottom: 10,
    paddingTop: 0,
    width: '100%',
    justifyContent: 'flex-start'
  },
  picker: {
    width: 200,
    justifyContent: 'center'
  },
  avatarAndHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  bigHeadContainer: {
    width: 90, 
    height: 90
  },
  cardStyle: {
    width: '80%',
    borderRadius: 10,
    marginBottom: 14
  },
  cardActionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  bottomIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
  bottomIconCount: {
    marginLeft: 10,
    marginTop: 5
  }
}));

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

export const timeSince = (date) => {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  const seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'ปี';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'เดือน';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'วัน';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "ชั่วโมง";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "นาที";
          } else {
            interval = seconds;
            intervalType = "วินาที";
          }
        }
      }
    }
  }
  return `${interval  }${  intervalType}`;
};

const applyFilterByTag = (allAnsweredPosts, filter) => {
  if(filter === 'แสดงทั้งหมด'){
    return allAnsweredPosts;
  }
  return allAnsweredPosts.filter(f => f.tags.includes(filter))
}

const ForumDisplayAll = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let forumAnswered = useSelector((state) => state.forum.answered);
  const [selectedFilterTag, setSelectedFilterTag] = useState('แสดงทั้งหมด')

  forumAnswered = applyFilterByTag(forumAnswered, selectedFilterTag)
  const DATA = forumAnswered.sort((a, b) => new Date(b.date) - new Date(a.date))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetFilter = (value) => {
    setSelectedFilterTag(value)
    handleClose()
  }

  useEffect(() => {
    if(!forumAnswered){
      dispatch(initializeForumAnswered());
    }else{
      setIsLoading(false)
    }
  }, [dispatch, forumAnswered]);

  if (isLoading) {
    return (
      <Container
        className={classes.loadingContainer}
      >
        <CircularProgress
        />
      </Container>
    );
  }
  return (
    <Container>
      <div
        className={classes.container}
      >
        <div
          className={classes.filterContainer}
        >
          <Button
              variant='text'
              onClick={handleClick}
                    ><Typography
                      style={{color: theme.palette.secondary}}>ตัวกรอง: </Typography><Typography
                        > {selectedFilterTag}</Typography></Button>
          <Menu
            className={classes.picker}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorEl={anchorEl}
          >
            <MenuItem onClick={() => handleSetFilter('แสดงทั้งหมด')}>แสดงทั้งหมด</MenuItem>

            
            <MenuItem onClick={() => handleSetFilter('ปัญหาเรื่องเพศ')}>ปัญหาเรื่องเพศ</MenuItem>

            <MenuItem
              onClick={() => handleSetFilter('การเสพติด')}
            >การเสพติด</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('เพื่อน')}
            >เพื่อน</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('lgbt')}
            >lgbt</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('โรคซึมเศร้า')}
            >โรคซึมเศร้า</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('ความวิตกกังวล')}
            >ความวิตกกังวล</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('ไบโพลาร์')}
            >ไบโพลาร์</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('relationships')}
            >relationships</MenuItem>
            <MenuItem
             onClick={() => handleSetFilter('การทำงาน')}
            >การทำงาน</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('สุขภาพจิต')}
            >สุขภาพจิต</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('การรังแก')}
            >การรังแก</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('ครอบครัว')}
            >ครอบครัว</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('อื่นๆ')}
            >อื่นๆ</MenuItem>
            <MenuItem
              onClick={() => handleSetFilter('ความรัก')}
            >ความรัก</MenuItem>
          </Menu>
        </div>
        <div>
          {DATA.map(item => 
              <Card
              className={classes.cardStyle} key={item._id}
            >
              <CardActionArea onClick={() => {
                dispatch(activePost(item))
                history.push(`/post/${item._id}`) 
              }}>
              <div className={classes.avatarAndHeaderContainer}>
              <div className={classes.bigHeadContainer}>
              <BigHead
                {...item.user?.avatarProps}
                faceMask={false}/>
                </div>
              <CardHeader
              title={item.title}
              titleTypographyProps={{variant: 'body1'}}
              subheader={`โพสต์ของ ${item.user?.avatarName} ${timeSince(item.date)} ที่ผ่านมา`}>
              </CardHeader>
              </div>
              <CardActions className={classes.cardActionsContainer}>
                <div className={classes.bottomIcons}>
                <Favorite style={{color: 'lightpink'}} fontSize={'large'}/>
                <Typography className={classes.bottomIconCount} color='textPrimary'>{item.likes}</Typography>
                </div>
                <div className={classes.bottomIcons}>
                <CommentOutlined style={{color: 'gray'}} fontSize={'large'}/>
                <Typography className={classes.bottomIconCount} color='textPrimary'>{item.comments.length}</Typography>
                </div>
              <Chip variant='outlined' size='medium' icon={<FontAwesomeIcon size={'2x'} icon={chooseIcon(item.tags[0])}/>}
              label={item.tags[0]}/>
              </CardActions>
              </CardActionArea>
            </Card>
            )}
        </div>
      </div>
    </Container>
  );
};

export default ForumDisplayAll;

