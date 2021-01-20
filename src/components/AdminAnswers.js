import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core'
import { initializeForumAnswered } from '../reducers/forumReducer';
import AdminForumEditAnswer from './AdminForumEditAnswer'

const AdminAnswers = () => {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState('')
  const answers = useSelector(state => state.forum.answered.map(a => a.answer))

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell ><strong>Answer</strong></TableCell>
            <TableCell ><strong>Date</strong></TableCell>
            <TableCell ><strong>Edit</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            answers ? answers.map(a =>
              <TableRow key={a._id}>
                <TableCell >{a.answer}</TableCell>
                <TableCell >{a.date.slice(0, 10)}</TableCell>
                <TableCell><Button size='small' variant='contained' onClick={() => setEditing(a)}>Edit</Button></TableCell>
              </TableRow>)
              : null}
        </TableBody>
      </Table>
      <AdminForumEditAnswer editing={editing} setEditing={setEditing} />
    </TableContainer>
  )
}
export default AdminAnswers