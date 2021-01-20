import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { initializeContacts, setContactHidden } from '../reducers/contactReducer'

const AdminContactsDashboard = () => {
  const dispatch = useDispatch()
  const contact = useSelector(state => state.contact)

  const setHidden = (c) => {
    dispatch(setContactHidden(c))
  }

  useEffect(() => {
    dispatch(initializeContacts())
  }, [dispatch])

  return (
    <TableContainer>
      {contact.length > 0 ?
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>LINE</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            contact.map(c => c.hidden === false ?
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.LINE}</TableCell>
                <TableCell><a href={`mailto:${c.email}`}> <FontAwesomeIcon id='fa-contact-form-admin' icon={faEnvelopeSquare}/>
                </a></TableCell>
                <TableCell>{c.date.slice(0, 10)}</TableCell>
                <TableCell>{c.message}</TableCell>
                <TableCell><Button onClick={() => setHidden(c)} size='small'>Remove</Button></TableCell>
              </TableRow>
              : null)
          }
        </TableBody>
      </Table>
      : 'Nothing to show here yet'}
    </TableContainer>
  )
}
export default AdminContactsDashboard