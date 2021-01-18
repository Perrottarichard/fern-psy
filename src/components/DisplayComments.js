import React, {useState, useEffect, useMemo} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {BigHead} from '@bigheads/core'
import { Card, CardHeader, Menu, MenuItem, Typography, Container, IconButton, Divider} from '@material-ui/core';
import {FlagRounded, ReplyRounded} from '@material-ui/icons'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import { setFlaggedComment } from '../reducers/forumReducer';
import {timeSince} from './ForumDisplayAll'
import SinglePostDisplay from './SinglePostDisplay'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 5,
  },
  scroll: {

  },
  cardStyleComment: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10
  },
  avatarAndHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  bigHeadContainer: {
    minWidth: 60, 
    minHeight: 60,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  replyBigHeadContainer: {
    minWidth: 40, 
    minHeight: 40,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  commentContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20,
  },
  commentReplyOrFlagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  flagMenuContent: {
    fontSize: 12,
    color: '#cf4f46',
  },
  replyIconText: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 12,
    marginBottom: 5
  },
  flagIcon: {
    color: '#cf4f46'
  },
  replyContainer: {
    marginLeft: 30,
    marginRight: 'auto',
    paddingBottom: 10,
    marginBottom: 10
  },
  replyHeader: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0, 
    margin: 0
  },
  replyContent: {
    marginLeft: 20,
  },
}));

const DisplayComments = () => {

  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();
  const user = useSelector(state => state.activeUser.user)
  const post = useSelector(state => state.forum.activePost);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null)

  const memoizedComments = useMemo(() => {
    return post?.comments?.sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [post])
  
  const DATA = memoizedComments;

  useEffect(() => {
    if(post && isLoading === true){
      setIsLoading(false)
    }
  }, [post, isLoading ])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const flag = (comment) => {
    if (comment.isFlagged) {
      handleClose()
      // return ToastAndroid.show('ความคิดเห็นนี้มีผู้รายงานให้แอดมินทราบปัญหาเรียบร้อยแล้ว', ToastAndroid.SHORT);
    }
    handleClose()
    dispatch(setFlaggedComment(comment));
  };
  
  return(
    <React.Fragment>
    {DATA.map(item =>
    <div key={item._id}>
    <Card
      className={classes.cardStyleComment}
      variant='outlined'
    >
      <div className={classes.avatarAndHeaderContainer}>
        <div className={classes.bigHeadContainer}>
          <BigHead
            {...item.user?.avatarProps}
            faceMask={false}/>
        </div>
        <CardHeader
          title={item.user?.avatarName}
          titleTypographyProps={{variant: 'body2'}}
          subheader={`แสดงความคิดเห็น ${timeSince(item.date)} ที่ผ่านมา`}
          subheaderTypographyProps={{variant: 'caption'}}
          style={{padding: 0}}>
        </CardHeader>
      </div>
      <div className={classes.commentContentContainer}>
            <Typography>
              {item.content}
            </Typography>
      </div>
      <div className={classes.commentReplyOrFlagContainer}>
      <IconButton
              className={classes.replyButton}
              disabled={!user}
              onClick={() => history.push(`/addreply/${item._id}`)} 
            >
              <ReplyRounded fontSize={'small'}/>
              <Typography
                className={classes.replyIconText}
              >ตอบ
              </Typography>
            </IconButton>
            <IconButton
            variant='text'
            onClick={handleClick}
            disabled={!user}
            className={classes.flagIcon}
            >
                <FlagRounded fontSize='small'/>
                </IconButton>
            <Menu
              open={Boolean(anchorEl)} 
              onClose={handleClose} 
              anchorEl={anchorEl}
            >
              <MenuItem 
                className={classes.flagMenuContent} 
                onClick={() => flag(item)} 
              >รายงานความไม่เหมาะสม</MenuItem>
            </Menu>
      </div>
    </Card>
    {item.replies.map(r => 
      <div
        key={r._id}
        className={classes.replyContainer}
        variant='outlined'
      >
        <div className={classes.replyHeader}>
        <div className={classes.replyBigHeadContainer}>
          <BigHead
            {...r.user?.avatarProps}
            faceMask={false}/>
        </div>
        <CardHeader
          title={r.user?.avatarName}
          titleTypographyProps={{variant: 'body2'}}
          subheader={`ตอบ ${timeSince(r.date)} ที่ผ่านมา`}
          subheaderTypographyProps={{variant: 'caption'}}
          style={{padding: 0, margin: 0}}>
        </CardHeader>
      </div>
          <Typography
            className={classes.replyContent}
            variant='body2'
          >
            {r.reply}
          </Typography>
        </div>
    )}
    </div>
    )
  }
  </React.Fragment>
  )
}

export default DisplayComments;