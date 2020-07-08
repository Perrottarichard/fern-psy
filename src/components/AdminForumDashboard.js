import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Container, Button } from 'reactstrap'
import { initializeForumPending } from '../reducers/forumReducer'
import AdminForumAnswer from './AdminForumAnswer'


const buttonStyle = {
  fontFamily: 'Montserrat',
  backgroundColor: 'rgb(187, 97, 157)',
  width: '50px',
  paddingRight: '5px',
  paddingLeft: '5px',
  fontSize: '10px'
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
      <Table size='sm' hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Date</th>
            <th>Question</th>
          </tr>
        </thead>
        <tbody>
          {
            forum.map(c => c.isAnswered === false ?
              <tr key={c._id}>
                <td style={{ fontFamily: 'Montserrat' }}>{c.user.email}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{c.date.slice(0, 10)}</td>
                <td style={{ fontFamily: 'Montserrat' }}>{c.question}</td>
                <td><Button style={buttonStyle} onClick={() => setAnswering(c)}>Answer</Button></td>
              </tr>
              : null)
          }
        </tbody>
      </Table>
      <AdminForumAnswer answering={answering} setAnswering={setAnswering} />
    </Container>
  )
}
export default AdminForumDashboard