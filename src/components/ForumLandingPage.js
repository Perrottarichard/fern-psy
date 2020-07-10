import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, CardTitle, CardBody, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faUserFriends, faSadCry, faBolt, faDizzy, faBusinessTime, faBrain, faBabyCarriage, faEye, faHome, faSyringe, faHeartBroken, faVenusMars, faTransgender, faCocktail, faAngry } from '@fortawesome/free-solid-svg-icons';
// import { initializeForumAnswered } from '../reducers/forumReducer'
import { setTagFilter } from '../reducers/forumReducer'
// import SingleTagDisplay from './SingleTagDisplay'


const tagOptions = [
  { tag: 'sex', backgroundColor: '#ff5c4d', icon: faVenusMars },
  { tag: 'dating', backgroundColor: '#288046', icon: faCocktail },
  { tag: 'relationships', backgroundColor: '#ffa64d', icon: faHeartBroken },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: faTransgender },
  { tag: 'friendship', backgroundColor: '#5050ff', icon: faUserFriends },
  { tag: 'depression', backgroundColor: '#343a40', icon: faSadCry },
  { tag: 'anxiety', backgroundColor: '#5e320f', icon: faBolt },
  { tag: 'bipolar', backgroundColor: '#f347ff', icon: faDizzy },
  { tag: 'career', backgroundColor: '#8e2bff', icon: faBusinessTime },
  { tag: 'mental health', backgroundColor: '#1e45a8', icon: faBrain },
  { tag: 'bullying', backgroundColor: '#5e320f', icon: faAngry },
  { tag: 'family', backgroundColor: '#ffa64d', icon: faHome },
  { tag: 'peer pressure', backgroundColor: '#288046', icon: faEye },
  { tag: 'parenting', backgroundColor: '#6da870', icon: faBabyCarriage },
  { tag: 'other', backgroundColor: '#707571', icon: faQuestionCircle },
  { tag: 'illegal drugs', backgroundColor: '#40073d', icon: faSyringe },

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
      padding: '10px'
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
  fontFamily: 'Montserrat',
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

const ForumLandingPage = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const tag = useSelector(state => state.forum)
  console.log(tag)

  const { forumAnswered, activeUser } = props

  const clickTag = (t) => {
    dispatch(setTagFilter(t.tag))
    history.push(`/forum/${t.tag}`)
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
        Have a question?<br />
        <Link to='/addpost'><Button style={postButtonStyle}>Submit a Post</Button></Link>
      </div>
      <br />
    </div>
  )
}
export default ForumLandingPage