import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { initializeUsers } from '../reducers/userInfoForAdminReducer'

const buttonStyle = {
  fontFamily: 'Montserrat'
}
const mailIconStyle = {
  fontSize: '32px',
  backgroundColor: 'white',
  color: '#343a40'
}
const headingStyle = {
  fontFamily: 'Montserrat'
}

const AdminUsersDashboard = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.userInfoForAdmin)
  const [questionToggle, setQuestionToggle] = useState(false)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Container>
      <Table size='sm' hover responsive>
        <thead>
          <tr>
            <th style={headingStyle}>Email</th>
            <th style={headingStyle}>Questions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(c =>
              <tr key={c.id}>
                <td><a href={`mailto:${c.email}`}> <FontAwesomeIcon id='fa-contact-form-admin' icon={faEnvelopeSquare} style={mailIconStyle} />
                </a></td>
                <td><Button style={buttonStyle} size='sm' disabled onClick={() => setQuestionToggle(!questionToggle)}>Questions</Button></td>
              </tr>)
          }
        </tbody>
      </Table>
    </Container>
  )
}
export default AdminUsersDashboard