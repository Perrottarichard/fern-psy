import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeForumAnswered } from '../reducers/forumReducer'
import { Container, Button } from 'reactstrap'

const ForumDisplayMain = () => {

  const dispatch = useDispatch()
  const forum = useSelector(state => state.forum)

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  return (
    <Container>
      <div>
        <div>
          {forum.map(f => <div key={f._id} dangerouslySetInnerHTML={{ __html: f.question }} />)}
        </div>
      Have a question?<br />
        <Link to='/forum/post'><Button style={{ fontFamily: 'Montserrat' }}>Submit a Post</Button></Link>
      </div>
    </Container>
  )
}
export default ForumDisplayMain