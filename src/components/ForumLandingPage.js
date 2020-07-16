import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, CardTitle, CardBody, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faBusinessTime, faBrain, faHome, faSyringe, faHeartBroken, faVenusMars, faTransgender, faAngry, faFlushed, faGlassCheers, faTheaterMasks, faSadTear, faGlobe, faUsers, faCode } from '@fortawesome/free-solid-svg-icons';
// import { faGithub } from '@fortawesome/free-brands-svg-icons'
// import { initializeForumAnswered } from '../reducers/forumReducer'
import { setTagFilter } from '../reducers/forumReducer'
import { toast } from 'react-toastify'
// import SingleTagDisplay from './SingleTagDisplay'


const tagOptions = [
  { tag: 'รวมทุกหัวข้อ', backgroundColor: '#8e2bff', icon: faGlobe },
  { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d', icon: faVenusMars },
  { tag: 'การออกเดท', backgroundColor: '#288046', icon: faGlassCheers },
  { tag: 'relationships', backgroundColor: '#ffa64d', icon: faHeartBroken },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: faTransgender },
  { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: faUsers },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: faSadTear },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: faFlushed },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: faTheaterMasks },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: faBusinessTime },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: faBrain },
  { tag: 'bullying', backgroundColor: '#5e320f', icon: faAngry },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: faHome },
  { tag: 'อื่นๆ', backgroundColor: '#707571', icon: faQuestionCircle },
  { tag: 'การเสพติด', backgroundColor: '#40073d', icon: faSyringe },

]
const chooseTagColor = (passed) => {
  let color = tagOptions.find(t => t.tag === passed)
  if (color) {
    return {
      backgroundColor: color.backgroundColor,
      width: '80px',
      height: '60px',
      verticalAlign: 'middle',
      postition: 'relative',
      color: 'white',
      fontSize: '40px',
      padding: '10px',
      // borderColor: '#e0e0eb',
      borderStyle: 'double',
      borderWidth: '4px'
    }
  } else {
    return {
      backgroundColor: 'magenta',
      width: '100px'
    }
  }
}
const chooseTagIcon = (passed) => {
  let chosen = tagOptions.find(t => t.tag === passed)
  if (chosen) {
    return chosen.icon
  } else {
    return null
  }
}
const textStyle = {
  color: 'black',
  fontFamily: 'Kanit',
  fontSize: '16px',
  textAlign: 'center'
}
const divStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '40px'
}
const postButtonDivStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '50px',
  marginBottom: '50px',
  fontFamily: 'Kanit',
  fontSize: '30px'
}
const postButtonStyle = {
  borderColor: '#343a40',
  borderWidth: '3px',
  width: '150px',
  borderStyle: 'solid',
  fontFamily: 'Kanit',
  backgroundColor: '#288046'
}

const ForumLandingPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const activeUser = useSelector(state => state.activeUser)

  const clickTag = (t) => {
    dispatch(setTagFilter(t.tag))
    if (t.tag === 'รวมทุกหัวข้อ') {
      history.push(`/allquestions`)
    } else {
      history.push(`/forum/${t.tag}`)
    }
  }
  return (
    <div>
      <Container style={divStyle}>
        {tagOptions.map(t =>
          <div key={t.tag} style={{ flexDirection: 'row' }} >
            <Card body>
              <CardTitle style={textStyle}>{t.tag}
                <CardBody>
                  <span onClick={() => clickTag(t)}>
                    <FontAwesomeIcon
                      style={chooseTagColor(t.tag)}
                      icon={chooseTagIcon(t.tag)}
                    >{t.tag}
                    </FontAwesomeIcon>
                  </span>
                </CardBody>
              </CardTitle>
            </Card>
          </div>
        )}
      </Container >
      <hr />
      <div style={postButtonDivStyle}>
        ตั้งกระทู้ถาม<br />
        <Link to={activeUser === null ? '/login' : '/addpost'} onClick={() => activeUser === null ? toast.warn('You must be logged in to post') : null}><Button style={postButtonStyle}>ส่งคำถาม</Button></Link>
      </div>
      <br />
      <div style={{ display: 'block', textAlign: 'center', fontFamily: 'Kanit' }}>
        <span><FontAwesomeIcon icon={faCode} /></span>
        <small ><a style={{ color: '#343a40' }} href="https://www.mangolatte.dev">engineered w/love by Richard</a></small>
      </div>
    </div>
  )
}
export default ForumLandingPage