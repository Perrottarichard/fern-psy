import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from '@material-ui/core'
import {MailOutline} from '@material-ui/icons'
import { getFlaggedComments, deleteComment, removeCommentFlag } from '../reducers/forumReducer';

const AdminFlaggedComment = () => {
  const dispatch = useDispatch()
  const flagged = useSelector(state => state.forum.flagged)

  useEffect(() => {
    dispatch(getFlaggedComments())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeQuestion = (_id) => {
    try {
      dispatch(deleteComment(_id))
    } catch (error) {
      // toast.error('Something went wrong')
      console.log(error)
    }
  }
  const removeFlag = (_id) => {
    try {
      dispatch(removeCommentFlag(_id))
    } catch (error) {
      // toast.error('Something went wrong')
      console.log(error)
    }
  }
  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell >Email</TableCell>
            <TableCell >Content</TableCell>
            <TableCell >Unflag</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            flagged ? flagged.map(c =>
              <TableRow key={c._id}>
                <TableCell><IconButton href={`mailto:${c.user.email}`} target='_blank'> <MailOutline/>
                </IconButton>{c.user.email}</TableCell>
                <TableCell >{c.content}</TableCell>
                <TableCell><Button size='small' variant='contained' onClick={() => removeFlag(c._id)}>Unflag</Button></TableCell>
                <TableCell><Button size='small' variant='contained'onClick={() => removeQuestion(c._id)}>Delete</Button></TableCell>

              </TableRow>)
              : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default AdminFlaggedComment