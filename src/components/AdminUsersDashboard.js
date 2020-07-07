import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Container } from 'reactstrap'
import { initializeUsers } from '../reducers/userInfoForAdminReducer'

// const buttonStyle = {
//   marginTop: '20px'
// }

const AdminUsersDashboard = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.userInfoForAdmin)
  const [questionToggle, setQuestionToggle] = useState(false)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>DOB(yyyy-mm-dd)</th>
            <th>Questions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(c =>
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.username}</td>
                <td>{c.email}</td>
                <td>{c.dateOfBirth.slice(0, 10)}</td>
                <td><Button color='secondary' size='sm' onClick={() => setQuestionToggle(!questionToggle)}>Questions</Button></td>
              </tr>)
          }
        </tbody>
      </Table>
    </Container>
  )
}
export default AdminUsersDashboard