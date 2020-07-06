import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Container } from 'reactstrap'
import { initializeUsers } from '../reducers/userInfoForAdminReducer'

const buttonStyle = {
  marginTop: '20px'
}

const AdminUsersDashboard = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.userInfoForAdmin)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container>
      <Button style={buttonStyle} outline color='success' onClick={() => setToggle(!toggle)}>Show Users</Button>
      {
        (!toggle)
          ?
          null
          :
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Questions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(c =>
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.username}</td>
                  <td>{c.email}</td>
                  <td>{c.dateOfBirth}</td>
                  <td>{c.questions.map(q => <li key={q.id}>{q}</li>)}</td>
                </tr>)}
            </tbody>
          </Table>
      }
    </Container>
  )
}
export default AdminUsersDashboard