import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Container, Button } from 'reactstrap'
import { initializeForumPending } from '../reducers/forumReducer'
import AdminForumAnswer from './AdminForumAnswer'

const AdminForumDashboard = () => {
  const dispatch = useDispatch()
  const [answering, setAnswering] = useState({})
  const forum = useSelector(state => state.forum)

  useEffect(() => {
    dispatch(initializeForumPending())
  }, [dispatch])

  return (
    <Container>
      <Table striped>
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
                <td>{c.user.email}</td>
                <td>{c.date.slice(0, 10)}</td>
                <td><div dangerouslySetInnerHTML={{ __html: c.question }} /></td>
                <td><Button onClick={() => setAnswering(c)}>Answer</Button></td>
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