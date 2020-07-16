import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Card, Button, CardHeader, CardBody, Badge, Form, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faComment, faComments, faHeart } from '@fortawesome/free-solid-svg-icons';
import { addComment, heart } from '../reducers/forumReducer'
import { toast } from 'react-toastify';
import { initializeForumAnswered } from '../reducers/forumReducer'
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
const commentDivStyle = {
  display: 'block'
}
const cardHeaderStyle = {
  fontFamily: 'Kanit',
  fontSize: '16px',
  backgroundColor: '#343a40',
  color: 'white',
  marginTop: '10px',
  paddingTop: '6px',
  paddingBottom: '6px',
  textAlign: 'center'
}
const cardBodyStyleQ = {
  fontSize: '16px',
  fontFamily: 'Kanit',
  padding: '10px',
  textAlign: 'left',
  paddingLeft: '10px',
  borderBottom: '1px solid gray',
  backgroundColor: 'white'
}
const cardBodyStyleA = {
  fontSize: '16px',
  fontFamily: 'Kanit',
  padding: '10px',
  borderBottom: '1px solid gray',
  backgroundColor: '#f0e1df' //super light pink
}
const cardBodyStyleC = {
  fontSize: '12px',
  fontFamily: 'Kanit',
  padding: '10px',
  borderBottom: '1px solid gray',
  backgroundColor: '#e6eeff' //super light blue
}
const smallStyle = {
  fontSize: '10px',
  float: 'left',
  color: 'white',
  marginLeft: '0'
}

const commentButtonStyle = {
  backgroundColor: '#343a40',
  fontFamily: 'Kanit',
  marginTop: '5px',
  marginBottom: '5px'
}
// const postButtonDivStyle = {
//   display: 'block',
//   textAlign: 'center',
//   marginTop: '50px',
//   marginBottom: '50px',
//   fontFamily: 'Kanit',
//   fontSize: '30px'
// }
// const postButtonStyle = {
//   borderColor: '#343a40',
//   borderWidth: '3px',
//   width: '150px',
//   borderStyle: 'solid',
//   fontFamily: 'Kanit',
//   backgroundColor: '#288046'
// }
const SinglePostDisplay = (props) => {
  const { activeUser } = props
  // const [loading, setLoading] = useState(false)
  // const dispatch = useDispatch()
  // let tagged = useSelector(state => state.forum.answered.map(post => post.tags.includes(state.forum.tagFilter) ? post : null)).filter(t => t !== null)
  // const chosenFilter = useSelector(state => state.forum.tagFilter)
  let { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const post = useSelector(state => state.forum.answered.find(p => p._id === id))
  const [sentHeart, setSentHeart] = useState(null)
  const [pulseHeart, setPulseHeart] = useState('')
  const history = useHistory()


  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const submitComment = async (event) => {
    event.preventDefault()
    let postToModifyId = post
    if (activeUser === null) {
      toast.warn('คุณต้องลงชื่อเพื่อแสดงความคิดเห็น')
      history.push('/login')
    } else if (comment === '') {
      toast.warn('คุณลืมที่จะเขียนความคิดเห็น')
    } else {
      try {
        setIsLoading(true)
        dispatch(addComment(comment, postToModifyId))
        setComment('')
      } catch (error) {
        console.log('thisistheerrror', error)
        toast.error('Something went wrong...')
      }
    }
  }
  const submitHeart = async () => {
    let postToModify = post
    if (activeUser === null) {
      toast.warn('คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ')
      history.push('/login')
    } else if (sentHeart !== null) {
      toast.warn('คุณได้ส่งหัวใจสำหรับโพสต์นี้แล้ว')
    } else {
      try {
        setPulseHeart('heart-icon')
        setTimeout(() => {
          setSentHeart(post._id)
          dispatch(heart(postToModify))
          setPulseHeart('')
        }, 2000);
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong...')
      }
    }
  }
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <Container>
      <div style={{ display: 'block', textAlign: 'center', fontFamily: 'Kanit' }}>
        <Card>
          <CardBody key={Math.random()}>
            <FontAwesomeIcon className={pulseHeart} icon={faHeart} style={{ fontSize: '50px', color: 'pink' }} />
          </CardBody>
          <Button onClick={() => submitHeart()}>Send a heart to show your support</Button>
        </Card>
      </div>
      <div key={post._id} style={commentDivStyle}>
        <Card >
          <CardHeader style={cardHeaderStyle}>{post.title}
            <span style={{ float: 'right' }}><FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: 'pink', marginLeft: '30px', marginRight: '5px' }} />{post.likes}</span>
            <small className="text-muted" style={smallStyle}>{post.date.slice(0, 10)}</small>
          </CardHeader>
          <CardBody style={cardBodyStyleQ}>
            <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
            {post.question}
          </CardBody>
          <CardBody style={cardBodyStyleA}>
            <FontAwesomeIcon icon={faComment} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
            {post.answer}
          </CardBody>
          {(post.comments.length > 0) ? post.comments.sort((a, b) => new Date(b.date) - new Date(a.date)).map(c =>
            <CardBody key={(c._id) ? c._id : Math.random()} style={cardBodyStyleC}>
              <span>
                {(c.user) ? <em>{c.user.username}{' '}</em> : 'You'}: {" "}
                <FontAwesomeIcon icon={faComments} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
                {c.content}
              </span>
              <small className='text-muted' style={{ float: 'right' }}>{(c.date) ? c.date.slice(0, 10) : 'just now'}</small>
            </CardBody>) : null}
          {/* <Button style={likeButtonStyle}><FontAwesomeIcon icon={faThumbsUp} /></Button> */}
          <div style={{ display: 'block' }}>
            {post.tags.map(t => <Badge key={t} style={chooseTagColor(t)} >{t}</Badge>)}
          </div>
        </Card>
      </div>
      {/* <div style={postButtonDivStyle}>
          <Link to='/forum/:tag'><Button style={postButtonStyle} >Go back</Button></Link>
        </div> */}
      <div style={{ display: 'block', textAlign: 'center' }}>
        <Form onSubmit={submitComment}>
          <Label style={{ fontFamily: 'Kanit', marginTop: '10px' }}>Add a Comment</Label>
          <Input type='textarea' onChange={handleCommentChange} value={comment} />
          <LoaderButton isLoading={isLoading} type='submit' style={commentButtonStyle} >Comment</LoaderButton>
        </Form>
      </div>
    </Container>
  )
}
export default SinglePostDisplay