import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'reactstrap'
import { initializeForumAnswered } from '../reducers/forumReducer'

const SingleTagDisplay = (props) => {
  const tag = useSelector(state => state.forum.tagFilter)
  const { forumAnswered } = props
  const filteredForum = forumAnswered.filter(f => f.tags.includes(tag))
  console.log(tag)
  console.log('filtered', filteredForum)
  return (
    <Container>
      <h2>{filteredForum.map(p => p.title)}</h2>
    </Container>
  )
}
export default SingleTagDisplay