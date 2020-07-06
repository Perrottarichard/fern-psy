import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Container } from 'reactstrap'
import { initializeContacts } from '../reducers/contactReducer'

const buttonStyle = {
  marginTop: '20px'
}
const AdminContactsDashboard = () => {
  const dispatch = useDispatch()
  const contact = useSelector(state => state.contact)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    dispatch(initializeContacts())
  }, [dispatch])

  return (
    <Container>
      <Button style={buttonStyle} outline color='primary' onClick={() => setToggle(!toggle)}>Show messages</Button>
      {
        (!toggle)
          ?
          null
          :
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>LINE</th>
                <th>Email</th>
                <th>Date</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {
                contact.map(c =>
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.LINE}</td>
                    <td>{c.email}</td>
                    <td>{c.date}</td>
                    <td>{c.message}</td>
                  </tr>)
              }
            </tbody>
          </Table>
      }
    </Container>
  )
}
export default AdminContactsDashboard