import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Container, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { initializeForumPending } from '../reducers/forumReducer'
import AdminForumAnswer from './AdminForumAnswer'


const buttonStyle = {
  fontFamily: 'Montserrat',
  backgroundColor: '#343a40',
  width: '50px',
  paddingRight: '5px',
  paddingLeft: '5px',
  fontSize: '10px'
}
const mailIconStyle = {
  fontSize: '32px',
  backgroundColor: 'white',
  color: '#343a40'
}
const AdminForumDashboard = () => {
  const dispatch = useDispatch()
  const [answering, setAnswering] = useState({})
  const forum = useSelector(state => state.forum)

  useEffect(() => {
    dispatch(initializeForumPending())
  }, [dispatch])

  return (
    <Container>
      <Table size='sm' hover responsive>
        <thead>
          <tr>
            <th>Email</th>
            <th>Date</th>
            <th>Question</th>
          </tr>
        </thead>
        <tbody>
          {(forum.pending) ?
            forum.pending.map(c => c.isAnswered === false ?
              <tr key={c._id}>
                <td style={{ fontFamily: 'Montserrat' }}><a href={`mailto:${c.user.email}`}> <FontAwesomeIcon id='fa-contact-form-admin' icon={faEnvelopeSquare} style={mailIconStyle} /></a></td>
                <td style={{ fontFamily: 'Montserrat' }}>{c.date.slice(0, 10)}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{c.question}</td>
                <td><Button style={buttonStyle} onClick={() => setAnswering(c)}>Answer</Button></td>
              </tr>
              : null) : null
          }
        </tbody>
      </Table>
      <AdminForumAnswer answering={answering} setAnswering={setAnswering} />
    </Container>
  )
}
export default AdminForumDashboard