import React, {useState} from 'react'
import { useHistory, Redirect} from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import TabPanel from './TabPanel'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MyQuestions from './MyQuestions'
import MoodTracker from './MoodTracker';
import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faQuestionCircle, faBusinessTime, faBrain, faHome, faSyringe, faHeartBroken, faVenusMars, faTransgender, faAngry, faFlushed, faGlassCheers, faTheaterMasks, faSadTear, faGlobe, faUsers, faCode, faHeart } from '@fortawesome/free-solid-svg-icons'
// import { setTagFilter } from '../reducers/forumReducer'

const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 200,
  },
  menu: {
    height: 'auto',
  },
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent'
  },
  indicator: {
    backgroundColor: 'lightpink'
  }
}))

// const tagOptions = [
//   { tag: 'ทั้งหมด', backgroundColor: '#8e2bff', icon: faGlobe },
//   { tag: 'เรื่องเพศ', backgroundColor: '#ff5c4d', icon: faVenusMars },
//   { tag: 'การออกเดท', backgroundColor: '#288046', icon: faGlassCheers },
//   { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: faHeartBroken },
//   { tag: 'lgbt', backgroundColor: '#ff4da6', icon: faTransgender },
//   { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: faUsers },
//   { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: faSadTear },
//   { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: faFlushed },
//   { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: faTheaterMasks },
//   { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: faBusinessTime },
//   { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: faBrain },
//   { tag: 'การรังแก', backgroundColor: '#5e320f', icon: faAngry },
//   { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: faHome },
//   { tag: 'อื่นๆ', backgroundColor: '#707571', icon: faQuestionCircle },
//   { tag: 'การเสพติด', backgroundColor: '#40073d', icon: faSyringe },

// ]

const Home = () => {

  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const user = useSelector(state => state.activeUser.user)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(user?.username === 'Fern-Admin' || user?.username === 'Richard-Admin'){
  return (
  <Redirect to="/adDash"/>
  )

  }else{
  return (
      <Container>
        <div position="static" className={classes.appBar}>
          <Tabs value={value} onChange={handleChange} centered classes={{ indicator: classes.indicator }}>
          <Tab label="หน้าของฉัน" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
          <Tab label="วันนี้ของฉัน" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <MyQuestions/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MoodTracker/>
        </TabPanel>
      </Container >
  )
}
}
export default Home