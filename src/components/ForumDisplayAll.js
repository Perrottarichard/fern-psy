import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BigHead} from '@bigheads/core'
import { Container, List, Chip, Typography, Card , Menu, MenuItem,Provider, Button, useTheme, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import { initializeForumAnswered, activePost } from '../reducers/forumReducer';
// import NoPostsYet from './NoPostsYet'

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterContainer: {
    flex: 0.05,
    flexDirection: 'row',
    marginBottom: 0,
    paddingBottom: 10,
    paddingTop: 0,
    width: '100%',
    justifyContent: 'flex-start'
  },
  picker: {
    flex: 1,
    width: 200,
    justifyContent: 'center'
  },
  scroll: {
    flex: 1,
  },
  cardStyle: {
    flex: 1,
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
const Item = ({ item, onClick, styles}) => (
  <Card
    style={styles.cardStyle} key={item._id}
  >
    <List.Item
      title={item.title}
      description={`โพสต์ของ ${item.user?.avatarName} ${timeSince(item.date)} ที่ผ่านมา`}
      left={() => <BigHead
        {...item.user?.avatarProps} size={50}
                  />}
      titleStyle={styles.headTitle}
      descriptionStyle={styles.descriptionStyle}
      titleNumberOfLines={3}
      descriptionNumberOfLines={2}
      underlayColor='white'
      rippleColor='#f2f2f2'
      titleEllipsizeMode='tail'
      onClick={onClick}
      style={styles.listItemStyle}
    />
    <div
      style={styles.bottomTags}
    >
      <Chip
        key={item._id} mode='outlined' backgroundColor='white' icon={chooseIcon(item.tags[0])} style={styles.chip} textStyle={{ color: chooseTagColor(item.tags[0]), ...styles.chipText}}
      >{item.tags[0]}
      </Chip>
      <Button
        name='comment'
        size={24}
        style={styles.commentMiconButton}
        color='lightgray'
        underlayColor='transparent'
        backgroundColor='transparent'
      >
        <Typography
          style={styles.miconText}
        >{item.comments.length}
        </Typography>
      </Button>
      <Button
        name="heart"
        color="pink"
        size={26}
        style={styles.commentMiconButton}
        underlayColor='transparent'
        backgroundColor='transparent'
        iconStyle={styles.fixHeartPosition}
      >
        <Typography
          style={styles.miconText}
        >
          {item.likes}
        </Typography>
      </Button>
    </div>
  </Card>
);

const ForumDisplayAll = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true);
  let forumAnswered = useSelector((state) => state.forum.answered);
  const [selectedFilterTag, setSelectedFilterTag] = useState('แสดงทั้งหมด')
  const [filterMenuVisible, setFilterMenuVisible] = useState(false)

  forumAnswered = applyFilterByTag(forumAnswered, selectedFilterTag)
  const DATA = forumAnswered.sort((a, b) => new Date(b.date) - new Date(a.date))
 
  const openMenu = () => setFilterMenuVisible(true);

  const closeMenu = () => setFilterMenuVisible(false);

  const handleSetFilter = (value) => {
    setSelectedFilterTag(value)
    closeMenu(  )
  }

  useEffect(() => {
    if(!forumAnswered){
      dispatch(initializeForumAnswered());
    }else{
      setIsLoading(false)
    }
  }, [dispatch, forumAnswered]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        styles={styles}
        onClick={() => {
          dispatch(activePost(item));
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <Container
        style={styles.loadingContainer}
      >
        <CircularProgress
        color="secondary"
        />
      </Container>
    );
  }
  return (
    <Container>
      <div
        style={{...styles.container, backgroundColor: theme.colors.background}}
      >
        <div
          style={styles.filterContainer}
        >
          <Menu
            style={styles.picker}
            visible={filterMenuVisible}
            onDismiss={closeMenu}
            anchor={<Button
              mode='text'
              onClick={openMenu}
                    ><Typography
                      style={{color: theme.colors.accent}}>ตัวกรอง: </Typography><Typography
                        > {selectedFilterTag}</Typography></Button>}
          >
            <MenuItem
              title='แสดงทั้งหมด' onClick={() => handleSetFilter('แสดงทั้งหมด')}
            />
            <MenuItem
              title='ปัญหาเรื่องเพศ' value='ปัญหาเรื่องเพศ' onClick={() => handleSetFilter('ปัญหาเรื่องเพศ')}
            />
            <MenuItem
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
            />
          </Menu>
        </div>
        <div>
          {DATA.map(item => renderItem(item))}
        </div>
      </div>
    </Container>
  );
};


export default ForumDisplayAll;
