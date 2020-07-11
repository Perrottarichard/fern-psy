import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faComment } from '@fortawesome/free-solid-svg-icons';
import { initializeForumAnswered } from '../reducers/forumReducer'
import { Container, Card, Button, CardHeader, CardBody, Badge } from 'reactstrap';
// import { tagFilterSelected } from '../reducers/forumReducer'
// import SingleTagDisplay from './SingleTagDisplay';

const tagColorOptions = [

  { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d' },
  { tag: 'การออกเดท', backgroundColor: '#288046' },
  { tag: 'relationships', backgroundColor: '#ffa64d' },
  { tag: 'lgbt', backgroundColor: '#ff4da6' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8' },
  { tag: 'bullying', backgroundColor: '#5e320f' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d' },
  { tag: 'อื่นๆ', backgroundColor: '#707571' },
  { tag: 'การเสพติด', backgroundColor: '#40073d' },

]
const chooseTagColor = (passed) => {
  let color = tagColorOptions.find(t => t.tag === passed)
  if (color) {
    return {
      backgroundColor: color.backgroundColor,
      width: '90px',
      verticalAlign: 'middle',
      postition: 'relative'
    }
  } else {
    return {
      backgroundColor: 'magenta',
      width: '80px'
    }
  }
}
const cardHeaderStyle = {
  fontFamily: 'Kanit',
  fontSize: '14px',
  backgroundColor: '#343a40',
  color: 'white',
  marginTop: '10px',
  paddingTop: '6px',
  paddingBottom: '6px'
}
const cardBodyStyleQ = {
  fontSize: '14px',
  fontFamily: 'Kanit',
  padding: '10px',
  textAlign: 'left',
  paddingLeft: '10px',
  backgroundColor: 'white' //super light green
}
const cardBodyStyleA = {
  fontSize: '14px',
  fontFamily: 'Kanit',
  padding: '10px',
  backgroundColor: '#f0e1df' //super light pink
}
// const cardTitleStyle = {
//   fontFamily: 'Montserrat',

// }
// const cardTextStyle = {
//   fontFamily: 'Montserrat',
//   backgroundColor: '#e6b6b1', //pinkish
// }
// const cardFooterStyle = {
//   fontFamily: 'Montserrat'
// }
const smallStyle = {
  float: 'right',
  color: 'white'
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
  borderStyle: 'solid',
  fontFamily: 'Kanit',
  backgroundColor: '#288046'
}
// const likeButtonStyle = {
//   backgroundColor: '#4da6ff',
//   height: '28px',
//   width: '35px',
//   lineHeight: '5px',
//   paddingRight: '25px',
//   borderRadius: '20px',
// }
// const tagBadgeStyle = {
//   backgroundColor: '',
//   width: '100px'
// }
const ForumDisplayAll = (props) => {

  const dispatch = useDispatch()
  const { forumAnswered } = props

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  return (
    <Container>
      {forumAnswered.map(f =>
        <div key={f._id}>
          <Card >
            <CardHeader style={cardHeaderStyle} tag="h5">{f.title}
              <small className="text-muted" style={smallStyle}>asked on {f.date.slice(0, 10)}</small>
            </CardHeader>
            <CardBody style={cardBodyStyleQ}>
              <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'magenta', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
              {f.question}
            </CardBody>
            <CardBody style={cardBodyStyleA}>
              <FontAwesomeIcon icon={faComment} style={{ color: '#288046', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
              {f.answer}
            </CardBody>
            {/* <Button style={likeButtonStyle}><FontAwesomeIcon icon={faThumbsUp} /></Button> */}
            <div style={{ display: 'block' }}>
              {f.tags.map(t => <Badge key={t} style={chooseTagColor(t)} >{t}</Badge>)}
            </div>
          </Card>
        </div>)}
      <div style={postButtonDivStyle}>
        ตั้งกระทู้ถาม<br />
        <Link to='/addpost'><Button style={postButtonStyle} >ส่งคำถาม</Button></Link>
      </div>
    </Container>
  )
}
export default ForumDisplayAll