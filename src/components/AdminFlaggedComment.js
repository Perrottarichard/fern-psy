import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Container } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { getFlaggedComments, deleteComment, removeCommentFlag } from '../reducers/forumReducer';

const AdminFlaggedComment = () => {
  const dispatch = useDispatch()
  const flagged = useSelector(state => state.forum.flagged)

  useEffect(() => {
    dispatch(getFlaggedComments())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeQuestion = (_id) => {
    try {
      dispatch(deleteComment(_id))
    } catch (error) {
      // toast.error('Something went wrong')
      console.log(error)
    }
  }
  const removeFlag = (_id) => {
    try {
      dispatch(removeCommentFlag(_id))
    } catch (error) {
      // toast.error('Something went wrong')
      console.log(error)
    }
  }
  return (
    <Container>
      <Table size='small'>
        <thead>
          <tr>
            <th >Username</th>
            <th >Email</th>
            <th >Content</th>
          </tr>
        </thead>
        <tbody>
          {
            flagged ? flagged.map(c =>
              <tr key={c._id}>
                <td >{c.user.username}</td>
                <td><a href={`mailto:${c.user.email}`}> <FontAwesomeIcon id='fa-contact-form-admin' icon={faEnvelopeSquare}/>
                </a></td>
                <td >{c.content}</td>
                <td><Button onClick={() => removeFlag(c._id)}>Unflag</Button></td>
                <td><Button onClick={() => removeQuestion(c._id)}>Delete</Button></td>

              </tr>)
              : null}
        </tbody>
      </Table>
    </Container>
  )
}
export default AdminFlaggedComment