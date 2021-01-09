import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BigHead} from '@bigheads/core'
import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemText, Chip, Typography, Card , CardContent, CardHeader, CardActions, IconButton, Menu, MenuItem, Button, CircularProgress} from '@material-ui/core';
import {Favorite} from '@material-ui/icons'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import { initializeForumAnswered, activePost } from '../reducers/forumReducer';
// import NoPostsYet from './NoPostsYet'

const useStyles = makeStyles({
  container: {
    padding: 5,
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
  scroll: {
  },
  cardStyle: {
    borderRadius: 10,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 4,
    paddingRight: 0,
    marginBottom: 14
  },
  listItemStyle: {
    paddingLeft: 5, 
    margin: 0,
    borderRadius: 10,
  },
  bottomTags: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    height: 40,
  },
  headTitle: {
    fontWeight: 'bold',
    padding: 0,
  },
  descriptionStyle: {
    color: 'gray',
    fontSize: 10
  },
  chip: {
    marginTop: 10,
    marginRight: 5,
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
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 3,
    height: 40,
  },
  miconText: {
    color: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 11,
    backgroundColor: 'transparent'
  },
  fixHeartPosition: {
    paddingBottom: 2
  },
});

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
        // className={classes.loadingContainer}
      >
        <CircularProgress
        />
      </Container>
    );
  }
  return (
    <Container>
      <div
        // className={classes.container}
      >
        <div
          // className={classes.filterContainer}
        >
          <Button
              variant='text'
              onClick={handleClick}
                    ><Typography
                      style={{color: theme.palette.secondary}}>ตัวกรอง: </Typography><Typography
                        > {selectedFilterTag}</Typography></Button>
          <Menu
            // className={classes.picker}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorEl={anchorEl}
          >
            <MenuItem onClick={() => handleSetFilter('แสดงทั้งหมด')}>แสดงทั้งหมด</MenuItem>

            
            <MenuItem onClick={() => handleSetFilter('ปัญหาเรื่องเพศ')}>ปัญหาเรื่องเพศ</MenuItem>

            {/* <MenuItem
              title='การเสพติด' value='การเสพติด' onClick={() => handleSetFilter('การเสพติด')}
            />
            <MenuItem
              title='เพื่อน' value='เพื่อน' onClick={() => handleSetFilter('เพื่อน')}
            />
            <MenuItem
              title='lgbt' value='lgbt' onClick={() => handleSetFilter('lgbt')}
            />
            <MenuItem
              title='โรคซึมเศร้า' value='โรคซึมเศร้า' onClick={() => handleSetFilter('โรคซึมเศร้า')}
            />
            <MenuItem
              title='ความวิตกกังวล' value='ความวิตกกังวล' onClick={() => handleSetFilter('ความวิตกกังวล')}
            />
            <MenuItem
              title='ไบโพลาร์' value='ไบโพลาร์' onClick={() => handleSetFilter('ไบโพลาร์')}
            />
            <MenuItem
              title='relationships' value='relationships' onClick={() => handleSetFilter('relationships')}
            />
            <MenuItem
              title='การทำงาน' value='การทำงาน' onClick={() => handleSetFilter('การทำงาน')}
            />
            <MenuItem
              title='สุขภาพจิต' value='สุขภาพจิต' onClick={() => handleSetFilter('สุขภาพจิต')}
            />
            <MenuItem
              title='การรังแก' value='การรังแก' onClick={() => handleSetFilter('การรังแก')}
            />
            <MenuItem
              title='ครอบครัว' value='ครอบครัว' onClick={() => handleSetFilter('ครอบครัว')}
            />
            <MenuItem
              title='อื่นๆ' value='อื่นๆ' onClick={() => handleSetFilter('อื่นๆ')}
            />
            <MenuItem
              title='ความรัก' value='ความรัก' onClick={() => handleSetFilter('ความรัก')}
            /> */}
          </Menu>
        </div>
        <div>
          {DATA.map(item => 
              <Card
              className={classes.cardStyle} key={item._id}
            >
              <div style={{width: 50, height: 50}}>
              <BigHead
                {...item.user?.avatarProps}/>
                </div>
              <CardHeader
              title={item.title}
              subheader={`โพสต์ของ ${item.user?.avatarName} ${timeSince(item.date)} ที่ผ่านมา`}>
              </CardHeader>
              <CardActions>
              <IconButton>
                <Favorite/>
              </IconButton>
              </CardActions>
             <Typography>{item.title}</Typography>
            </Card>
            )}
        </div>
      </div>
    </Container>
  );
};

export default ForumDisplayAll;

