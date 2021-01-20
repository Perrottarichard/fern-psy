import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from '@material-ui/core'
import {MailOutline} from '@material-ui/icons'
import { initializeForumPending, deleteQuestion } from '../reducers/forumReducer'
import AdminForumAnswer from './AdminForumAnswer'

const AdminForumDashboard = () => {
  const dispatch = useDispatch()
  const [answering, setAnswering] = useState('')
  const forum = useSelector(state => state.forum)

  useEffect(() => {
    dispatch(initializeForumPending())
  }, [dispatch])

  const removeQuestion = (_id) => {
    if (window.confirm('Are you sure?')) {
      try {
        dispatch(deleteQuestion(_id))
      } catch (error) {
        // toast.error('Something went wrong')
        console.log(error)
      }
    }
  }
  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell>Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(forum.pending) ?
            forum.pending.map(c => c.isAnswered === false ?
              <TableRow key={c._id}>
                <TableCell ><IconButton href={`mailto:${c.user.email}`} target='_blank'> <MailOutline/></IconButton>{c.user.email}</TableCell>
                <TableCell >{c.date.slice(0, 10)}</TableCell>
                <TableCell >{c.question}</TableCell>
                <TableCell><Button size='small' variant='contained'onClick={() => setAnswering(c)}style={{color: 'purple'}}>Answer</Button></TableCell>
                <TableCell><Button size='small' variant='contained' onClick={() => removeQuestion(c._id)} style={{color: 'red'}}>Delete</Button></TableCell>
              </TableRow>
              : null) : null
          }
        </TableBody>
      </Table>
      <AdminForumAnswer answering={answering} setAnswering={setAnswering} />
    </TableContainer>
  )
}
export default AdminForumDashboard