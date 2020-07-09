import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { initializeForumAnswered } from '../reducers/forumReducer'
import {
  Container, Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Badge
} from 'reactstrap';

const tagColorOptions = [
  { tag: 'sex', backgroundColor: '#343a40' },
  { tag: 'dating', backgroundColor: '#288046' },
  { tag: 'relationships', backgroundColor: '#ffa64d' },
  { tag: 'lgbt', backgroundColor: '#ff4da6' },
  { tag: 'friendship', backgroundColor: '#5050ff' },
  { tag: 'depression', backgroundColor: '#ff5c4d' },
  { tag: 'anxiety', backgroundColor: '#a6ff4d' },
  { tag: 'bipolar', backgroundColor: '#f347ff' },
  { tag: 'career', backgroundColor: '#8e2bff' },
  { tag: 'mentalHealth', backgroundColor: '#1e45a8' },
  { tag: 'bullying', backgroundColor: '#5e320f' },
  { tag: 'family', backgroundColor: '#ffa64d' },
  { tag: 'peerPressure', backgroundColor: '#288046' },
  { tag: 'parenting', backgroundColor: '#6da870' },
  { tag: 'other', backgroundColor: '#707571' },
  { tag: 'illegal drugs', backgroundColor: '#40073d' },

]
const chooseTagColor = (passed) => {
  let color = tagColorOptions.find(t => t.tag === passed)
  if (color) {
    return {
      backgroundColor: color.backgroundColor,
      width: '80px',
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
const cardBodyStyle = {
  fontSize: '14px',
  fontFamily: 'Montserrat',
  padding: '10px'
}
const cardTitleStyle = {
  fontFamily: 'Montserrat'
}
const cardTextStyle = {
  fontFamily: 'Montserrat'
}
const cardFooterStyle = {
  fontFamily: 'Montserrat'
}
const smallStyle = {
  float: 'right'
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
const likeButtonStyle = {
  backgroundColor: '#4da6ff',
  height: '28px',
  width: '35px',
  lineHeight: '5px',
  paddingRight: '25px',
  borderRadius: '20px',
}
// const tagBadgeStyle = {
//   backgroundColor: '',
//   width: '100px'
// }
const ForumDisplayMain = () => {

  const dispatch = useDispatch()
  const forum = useSelector(state => state.forum)

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  return (
    <Container>
      {forum.map(f =>
        <div key={f._id}>
          <Card >
            <CardHeader style={cardHeaderStyle} tag="h5">{f.title}
              <small className="text-muted" style={smallStyle}>{f.date.slice(0, 10)}</small>
            </CardHeader>
            <CardBody style={cardBodyStyle}>
              <CardTitle style={cardTitleStyle}>{f.question}</CardTitle>
              <CardText style={cardTextStyle}>{f.answer}
              </CardText>
              <Button style={likeButtonStyle}><FontAwesomeIcon icon={faThumbsUp} /></Button>
            </CardBody>
            <div style={{ display: 'block' }}>
              {f.tags.map(t => <Badge style={chooseTagColor(t)} pill>{t}</Badge>)}
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
export default ForumDisplayMain