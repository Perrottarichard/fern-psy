import React, {useState} from 'react'
import { Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import AdminTabPanel from './AdminTabPanel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AdminForumDashboard from './AdminForumDashboard'
import AdminContactsDashboard from './AdminContactsDashboard';
import AdminUsersDashboard from './AdminUsersDashboard';
import AdminFlaggedComment from './AdminFlaggedComment';
import AdminAnswers from './AdminAnswers';
import AdminPostArticle from './AdminPostArticle';

const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 200,
  },
  menu: {
    height: 'auto',
  },
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    marginBottom: 26
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

const AdminHome = () => {

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
      <Container>

        <div position="static" className={classes.appBar}>
          <Tabs value={value} onChange={handleChange} centered classes={{ indicator: classes.indicator }}>
          <Tab label="Pending" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
          <Tab label="Edit Answers" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
          <Tab label="Contacts" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
          <Tab label="Users" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
          <Tab label="Flagged Comments" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
          <Tab label="Post Article" style={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }} />
          </Tabs>
        </div>
        <AdminTabPanel value={value} index={0}>
          <AdminForumDashboard/>
        </AdminTabPanel>
        <AdminTabPanel value={value} index={1}>
          <AdminAnswers/>
        </AdminTabPanel>
        <AdminTabPanel value={value} index={2}>
          <AdminContactsDashboard/>
        </AdminTabPanel>
        <AdminTabPanel value={value} index={3}>
          <AdminUsersDashboard/>
        </AdminTabPanel>
        <AdminTabPanel value={value} index={4}>
          <AdminFlaggedComment/>
        </AdminTabPanel>
        <AdminTabPanel value={value} index={5}>
          <AdminPostArticle/>
        </AdminTabPanel>
      </Container >
  )
}
export default AdminHome;