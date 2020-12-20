import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Container } from 'reactstrap'
import { initializeForumAnswered } from '../reducers/forumReducer';
import AdminForumEditAnswer from './AdminForumEditAnswer'

const headingStyle = {
  fontFamily: 'Montserrat'
}
const contentStyle = {
  fontFamily: 'Montserrat'
}
const editButtonStyle = {
  fontFamily: 'Montserrat',
  backgroundColor: 'white',
  color: 'red',
  width: '50px',
  paddingRight: '5px',
  paddingLeft: '5px',
  fontSize: '10px'
}

const AdminAnswers = () => {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState('')
  const answers = useSelector(state => state.forum.answered.map(a => a.answer))

  useEffect(() => {
    dispatch(initializeForumAnswered())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Table size='sm' hover responsive>
        <thead>
          <tr>
            <th style={headingStyle}>Answer</th>
            <th style={headingStyle}>Date</th>
            <th style={headingStyle}>Content</th>
          </tr>
        </thead>
        <tbody>
          {
            answers ? answers.map(a =>
              <tr key={a._id}>
                <td style={contentStyle}>{a.answer}</td>
                <td style={contentStyle}>{a.date.slice(0, 10)}</td>
                <td><Button style={editButtonStyle} onClick={() => setEditing(a)}>Edit</Button></td>
              </tr>)
              : null}
        </tbody>
      </Table>
      <AdminForumEditAnswer editing={editing} setEditing={setEditing} />
    </Container>
  )
}
export default AdminAnswers