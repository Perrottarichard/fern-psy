import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import {MailOutline} from '@material-ui/icons'
import { initializeUsers } from '../reducers/userInfoForAdminReducer'

const AdminUsersDashboard = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.userInfoForAdmin)
  const [questionToggle, setQuestionToggle] = useState(false)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell >Email</TableCell>
            <TableCell >Questions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            users.map(c =>
              <TableRow key={c.id}>
                <TableCell><IconButton href={`mailto:${c.email}`} target='_blank'> <MailOutline/>
            </IconButton><span>{c.email}</span></TableCell>
                <TableCell><Button size='small' disabled onClick={() => setQuestionToggle(!questionToggle)}>Questions</Button></TableCell>
              </TableRow>)
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default AdminUsersDashboard