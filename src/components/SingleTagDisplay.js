import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Card, Button, CardHeader, CardBody, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faComment } from '@fortawesome/free-solid-svg-icons';
// import { initializeForumAnswered } from '../reducers/forumReducer'

const tagColorOptions = [
  { tag: 'sex', backgroundColor: '#ff5c4d' },
  { tag: 'dating', backgroundColor: '#288046' },
  { tag: 'relationships', backgroundColor: '#ffa64d' },
  { tag: 'lgbt', backgroundColor: '#ff4da6' },
  { tag: 'friendship', backgroundColor: '#5050ff' },
  { tag: 'depression', backgroundColor: '#343a40' },
  { tag: 'anxiety', backgroundColor: '#5e320f' },
  { tag: 'bipolar', backgroundColor: '#f347ff' },
  { tag: 'career', backgroundColor: '#8e2bff' },
  { tag: 'mental health', backgroundColor: '#1e45a8' },
  { tag: 'bullying', backgroundColor: '#5e320f' },
  { tag: 'family', backgroundColor: '#ffa64d' },
  { tag: 'peer pressure', backgroundColor: '#288046' },
  { tag: 'parenting', backgroundColor: '#6da870' },
  { tag: 'other', backgroundColor: '#707571' },
  { tag: 'illegal drugs', backgroundColor: '#40073d' },

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
  fontFamily: 'Montserrat',
  fontSize: '14px',
  backgroundColor: '#343a40',
  color: 'white',
  marginTop: '10px',
  paddingTop: '6px',
  paddingBottom: '6px'
}
const cardBodyStyleQ = {
  fontSize: '14px',
  fontFamily: 'Montserrat',
  padding: '10px',
  textAlign: 'left',
  paddingLeft: '10px',
  backgroundColor: '#b8ffbe' //super light green
}
const cardBodyStyleA = {
  fontSize: '14px',
  fontFamily: 'Montserrat',
  padding: '10px',
  backgroundColor: '#f0e1df' //super light pink
}

const smallStyle = {
  float: 'right',
  color: 'white'
}
const postButtonDivStyle = {
  marginTop: '50px',
  marginBottom: '50px',
  fontFamily: 'Montserrat',
  fontSize: '30px'
}
const postButtonStyle = {
  borderColor: '#343a40',
  borderWidth: '3px',
  borderStyle: 'solid',
  fontFamily: 'Montserrat',
  backgroundColor: '#288046'
}

const SingleTagDisplay = () => {
  // const { activeUser, forumAnswered } = props
  // const dispatch = useDispatch()

  let tagged = useSelector(state => state.forum.answered.map(post => post.tags.includes(state.forum.tagFilter) ? post : null)).filter(t => t !== null)
  console.log(tagged)

  const chosenFilter = useSelector(state => state.forum.tagFilter)
  console.log(chosenFilter)

  return (
    <Container>
      {tagged.sort((a, b) => new Date(b.date) - new Date(a.date)).map(f =>
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
        Have a question?<br />
        <Link to='/forum/post'><Button style={postButtonStyle} block>Submit a Post</Button></Link>
      </div>
    </Container>
  )
}
export default SingleTagDisplay