import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Container, Card, Button, CardHeader, CardBody, Badge, Form, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faComment, faComments, faHeart } from '@fortawesome/free-solid-svg-icons';
import { initializeForumPending, initializeForumAnswered } from '../reducers/forumReducer'
import { toast } from 'react-toastify';

import LoaderButton from './LoaderButton'

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
  width: '150px',
  borderStyle: 'solid',
  fontFamily: 'Kanit',
  backgroundColor: '#288046'
}


const MyQuestions = (props) => {

  const { activeUser } = props
  let { id } = useParams()
  // const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const myAnsweredPosts = useSelector(state => state.forum.answered.filter(p => p.user === id))
  const myPendingPosts = useSelector(state => state.forum.pending.filter(p => p.user.id === id))

  console.log('answered', myAnsweredPosts)
  console.log('pending', myPendingPosts)


  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeForumPending())
  }, [dispatch])

  // React.useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1500);
  //   }
  // }, [isLoading])
  if (!myAnsweredPosts) {
    return (
      <div>
        You have no answered questions
      </div>
    )
  } else
    return (
      <div>
        <Container>
          <h3 style={{ marginTop: '20px', fontFamily: 'Kanit' }}>Answered</h3>
          {myAnsweredPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(f =>
            <div key={f._id}>
              <a href={`/post/${f._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card >
                  <CardHeader style={cardHeaderStyle} tag="h5">{f.title}
                    <FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: '#ff99ff', marginLeft: '30px', marginRight: '10px' }} />
                    <small>{f.likes}</small>
                    <small className="text-muted" style={smallStyle}>{f.date ? f.date.slice(0, 10) : 'unknown'}</small>
                  </CardHeader>
                  <CardBody style={cardBodyStyleQ}>

                    <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
                    {f.question}
                  </CardBody>
                  <CardBody style={cardBodyStyleA}>
                    <FontAwesomeIcon icon={faComment} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
                    {f.answer}

                  </CardBody>

                  {/* <Button style={likeButtonStyle}><FontAwesomeIcon icon={faThumbsUp} /></Button> */}
                  <div style={{ display: 'block' }}>
                    {f.tags.map(t => <Badge key={t} style={chooseTagColor(t)} >{t}</Badge>)}
                  </div>
                </Card>
              </a>
            </div>)}
        </Container>
        <Container>
          <h3 style={{ marginTop: '20px', fontFamily: 'Kanit' }}>Pending</h3>
          {myPendingPosts ? myPendingPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(f =>
            <div key={f._id}>
              <Card >
                <CardHeader style={cardHeaderStyle} tag="h5">{f.title}
                  <FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: '#ff99ff', marginLeft: '30px', marginRight: '10px' }} />
                  <small>{f.likes}</small>
                  <small className="text-muted" style={smallStyle}>{f.date ? f.date.slice(0, 10) : 'unknown'}</small>
                </CardHeader>
                <CardBody style={cardBodyStyleQ}>

                  <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
                  {f.question}
                </CardBody>
                <CardBody style={cardBodyStyleA}>
                  <FontAwesomeIcon icon={faComment} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
                  <small className="text-muted">Fern has not answered your question yet. Check again later.</small>

                </CardBody>

                {/* <Button style={likeButtonStyle}><FontAwesomeIcon icon={faThumbsUp} /></Button> */}
                <div style={{ display: 'block' }}>
                  {f.tags.map(t => <Badge key={t} style={chooseTagColor(t)} >{t}</Badge>)}
                </div>
              </Card>
            </div>) : 'You have no pending questions'}
          <div style={postButtonDivStyle}>
            ตั้งกระทู้ถาม<br />
            <Link to='/addpost'><Button style={postButtonStyle} >ส่งคำถาม</Button></Link>
          </div>
        </Container>
      </div >
    )
}
export default MyQuestions