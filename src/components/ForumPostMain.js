import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import {Button, Typography, Container, Dialog, TextField, Avatar} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import { addQuestion } from '../reducers/forumReducer';
import PostGraphic from '../assets/undraw_add_post_64nu.svg';
import {addPoints, levelUp, notify} from '../reducers/activeUserReducer'
import {shouldLevelUp} from '../helperFunctions'
import LevelUpAnimationModal from './LevelUpAnimationModal';
 
const useStyles = makeStyles((theme) => ({
  postContainer: {
    display: 'flex'
  },
  graphicContainer: {
    display: 'flex',
    height: 200,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  graphic: {
    height: 196,
    width: 295
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
  },
  textAreaContainerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.25,
    borderRadius: 10,
    marginBottom: 10
  },
  textAreaContainerQuestion: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.25,
    borderRadius: 10,
    marginBottom: 10
  },
  textAreaTitle: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    fontSize: 16,
  },
  textAreaQuestion: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    fontSize: 16
  },
  picker: {
    color: theme.palette.text.primary,
    borderWidth: 0.25,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  styleTextDropdown: {
  },
  submitPostButton: {
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightpink',
  },
  submitPostText: {
    color: 'black',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  afterFormTextContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  afterFormText: {
    marginTop: 30,
    margin: 'auto',
    justifyContent: 'center',
    fontSize: 10,
  },
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

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    padding: 20,
  }),
  singleValue: (provided, state) => {
    return { ...provided, color: 'black' };
  },
  menu: (provided, state)  => {
    return {...provided, color: 'black'}
  }
}

const options = [
{
  label:'ปัญหาเรื่องเพศ', value:'ปัญหาเรื่องเพศ'
},
{
  label:'การเสพติด', value:'การเสพติด'
},
{
  label:'เพื่อน', value:'เพื่อน'
},
{
  label:'lgbt', value:'lgbt'
},
{
  label:'โรคซึมเศร้า', value:'โรคซึมเศร้า'
},
{
  label:'ความวิตกกังวล', value:'ความวิตกกังวล'
},
{
  label:'ไบโพลาร์', value:'ไบโพลาร์'
},
{
  label:'relationships', value:'relationships'
},
{
  label:'การทำงาน', value:'การทำงาน'
},
{
  label:'สุขภาพจิต', value:'สุขภาพจิต'
},
{
  label:'การรังแก', value:'การรังแก'
},
{
  label:'ครอบครัว', value:'ครอบครัว'
},
{
  label:'อื่นๆ', value:'อื่นๆ'
},
{
  label:'ความรัก', value:'ความรัก'
}
]

const ForumPostMain = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.activeUser.user);
  const userPoints = useSelector(state => state.activeUser.userPoints)
  const userLevel = useSelector(state => state.activeUser.userLevel)
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading]);


  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeQuestion = (event) => {
    setQuestion(event.target.value);
  };
  const handleSelectChange = (selected) => {
    setSelectedTags(selected.value)
  }

  const handleEditorSubmit = async (event) => {
    event.preventDefault();
    if (!title || !question) {
      dispatch(notify('error', 'ใส่หัวข้อและคำถามของคุณด้วยนะคะ'));
      // 'Please make sure you have a title, a question'
      // ใส่หัวข้อและคำถามของคุณด้วยนะคะ
    } else if (selectedTags.length === 0 || selectedTags.includes('เลือก tag')) {
      dispatch(notify('error', 'คุณต้องเลือก 1 tag'));
      // กรุณาเลือกแท็กสองหัวข้อค่ะ
      // 'Please select 2 tags'
    } else if (!user) {
      dispatch(notify('error', 'กรุณาล็อคอินก่อนโพสคำถามค่ะ'));
      // กรุณาล็อคอินก่อนโพสคำถามค่ะ
      // 'You must be logged in to post to the forum'
      history.push('/login');
    } else if (user.username === 'Fern-Admin' || user.username === 'Richard-Admin') {
      dispatch(notify('error', 'Why are you trying to ask yourself a question?'));
    } else {
      const postToAdd = {
        title,
        question,
        answer: '',
        isAnswered: false,
        tags: selectedTags,
        likes: 0,
      };
      try {
        setIsLoading(true);
        dispatch(addQuestion(postToAdd));
        if(shouldLevelUp(userPoints, userLevel, 3)){
          setShowLevelUpAnimation(true)
          setTimeout(() => {
          setShowLevelUpAnimation(false)
          dispatch(levelUp(user._id))
          dispatch(addPoints(user._id, 3))
          setTitle('');
          setQuestion('');
          setSelectedTags([]);
          }, 2500);
          setTimeout(() => {
            history.push('/');
            }, 2500);
        }else{
          dispatch(addPoints(user._id, 3))
          setTitle('');
          setQuestion('');
          setSelectedTags([]);
          history.push('/');
        }
        
      } catch (error) {
        dispatch(notify('error','กรุณาล็อคอินก่อนโพสคำถามค่ะ'));
        // กรุณาล็อคอินก่อนโพสคำถามค่ะ
        console.log(error);
      }
    }
  };
  return (
      <Container
    >
          <Dialog open={showLevelUpAnimation} PaperProps={{
    style: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  }}>
            <LevelUpAnimationModal/>
          </Dialog>
        <div className={classes.graphicContainer}>
          <Avatar className={classes.graphic} variant='rounded' src={PostGraphic} alt='graphic'>
          </Avatar>
          </div>
        <div
          className={classes.inputContainer}
      >
          <div
            className={classes.textAreaContainerTitle}
        >
            <CssTextField
              className={classes.textAreaTitle}
              multiline={false}
              variant='outlined'
              placeholder="พิมพ์หัวข้อที่นี่"
              onChange={handleChangeTitle}
              value={title}
              fullWidth
          />
          </div>

          <div
            className={classes.textAreaContainerQuestion}
        >
            <CssTextField
              className={classes.textAreaQuestion}
              multiline
              variant='outlined'
              rows={4}
              placeholder="พิมพ์รายละเอียดคำถามของคุณ"
              onChange={handleChangeQuestion}
              value={question}
              fullWidth
          />
          </div>
          <div
            className={classes.picker}
        >
            <Select
              onChange={selected => handleSelectChange(selected)}
              className={classes.styleTextDropdown}
              options={options}
              styles={customStyles}
              placeholder='เลือก tag'
          >
            </Select>
          </div>
        </div>
        <div className={classes.afterFormTextContainer}>
        <Typography
            className={classes.afterFormText}
        >ชื่อที่คุณใช้ล็อคอินจะไม่ปรากฏในคำถามของคุณ
          </Typography>
        </div>
        <div
          className={classes.buttonContainer}
      >
          <Button
            variant='contained' onClick={handleEditorSubmit} type='submit' className={classes.submitPostButton}
        >
            <Typography
              className={classes.submitPostText}
          >
              ส่งคำถาม
            </Typography>
          </Button>
        </div>
      </Container>
  );
};

export default ForumPostMain;