import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Container, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { initializeContacts, setContactHidden } from '../reducers/contactReducer'

const buttonStyle = {
  fontFamily: 'Montserrat',
  width: '50px',
  paddingRight: '3px',
  paddingLeft: '3px',
  fontSize: '10px',
  backgroundColor: '#bf3d3d'
}
const mailIconStyle = {
  fontSize: '40px',
  backgroundColor: 'white',
  color: '#343a40'
}

const AdminContactsDashboard = () => {
  const dispatch = useDispatch()
  const contact = useSelector(state => state.contact)
  // const [toggle, setToggle] = useState(false)

  const setHidden = (c) => {
    dispatch(setContactHidden(c))
  }

  useEffect(() => {
    dispatch(initializeContacts())
  }, [dispatch])

  return (
    <Container>
      <Table size='sm' hover>
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
            contact.map(c => c.hidden === false ?
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.LINE}</td>
                <td><a href={`mailto:${c.email}`}> <FontAwesomeIcon id='fa-contact-form-admin' icon={faEnvelopeSquare} style={mailIconStyle} />
                </a></td>
                <td>{c.date.slice(0, 10)}</td>
                <td>{c.message}</td>
                <td><Button style={buttonStyle} onClick={() => setHidden(c)} size='sm'>Remove</Button></td>
              </tr>
              : null)
          }
        </tbody>
      </Table>
    </Container>
  )
}
export default AdminContactsDashboard