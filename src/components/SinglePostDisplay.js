import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Container, Card, Button, CardHeader, CardBody, Badge, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faComment, faComments } from '@fortawesome/free-solid-svg-icons';
import NoPostsYet from './NoPostsYet';
import { addComment } from '../reducers/forumReducer'
import { toast } from 'react-toastify';
// import { initializeForumAnswered } from '../reducers/forumReducer'

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
const cardBodyStyleC = {
  fontSize: '14px',
  fontFamily: 'Kanit',
  padding: '10px',
  backgroundColor: '#ccdcff' //super light pink
}
const smallStyle = {
  float: 'right',
  color: 'white'
}

const commentButtonStyle = {
  backgroundColor: '#343a40'
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


const SinglePostDisplay = () => {
  // const { activeUser, forumAnswered } = props
  // const dispatch = useDispatch()
  // let tagged = useSelector(state => state.forum.answered.map(post => post.tags.includes(state.forum.tagFilter) ? post : null)).filter(t => t !== null)

  // const chosenFilter = useSelector(state => state.forum.tagFilter)
  let { id } = useParams()
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const post = useSelector(state => state.forum.answered.find(p => p._id === id))

  const submitComment = (comment) => {
    let postToModifyId = post
    dispatch(addComment(comment, postToModifyId))
    setComment('')
    toast.success('Your comment is pending approval')
  }
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  if (!post) {
    return (
      <NoPostsYet />
    )
  } else
    return (
      <Container>
        <div key={post._id}>
          <Card >
            <CardHeader style={cardHeaderStyle} tag="h5">{post.title}
              <small className="text-muted" style={smallStyle}>asked on {post.date.slice(0, 10)}</small>
            </CardHeader>
            <CardBody style={cardBodyStyleQ}>
              <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
              {post.question}
            </CardBody>
            <CardBody style={cardBodyStyleA}>
              <FontAwesomeIcon icon={faComment} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
              {post.answer}
            </CardBody>
            {(post.comments.length > 0) ? post.comments.map(c =>
              <CardBody key={c._id} style={cardBodyStyleC}>
                <FontAwesomeIcon icon={faComments} style={{ color: '#343a40', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} />
                {c.content} {c.date}
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

        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button style={commentButtonStyle} onClick={() => submitComment(comment)}>Comment</Button>
          </InputGroupAddon>
          <Input onChange={handleCommentChange} />
        </InputGroup>
      </Container>
    )
}
export default SinglePostDisplay