import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'


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


const NoPostsYet = () => {

  const textStyle = {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '100px'
  }
  return (
    <Container>
      <div style={textStyle}>
        <FontAwesomeIcon
          icon={faUserEdit}
          style={{ fontSize: '100px', color: '#343a40' }}
        >
        </FontAwesomeIcon>
        <h1>
          Hmmm...looks like there aren't any questions with that tag yet
      </h1>
        <div style={postButtonDivStyle}>
          You can submit the first one!<br />
          <Link to='/addpost'><Button style={postButtonStyle} >Submit a Post</Button></Link>
        </div>
      </div>
    </Container>
  )
}
export default NoPostsYet