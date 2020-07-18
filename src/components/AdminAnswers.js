import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Container } from 'reactstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { editAnswer, initializeForumAnswered } from '../reducers/forumReducer';
import { toast } from 'react-toastify';
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
  // const [questionToggle, setQuestionToggle] = useState(false)

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [])

  // const removeQuestion = (_id) => {
  //   try {
  //     dispatch(deleteComment(_id))
  //   } catch (error) {
  //     toast.error('Something went wrong')
  //     console.log(error)
  //   }
  // }
  // const editMyAnswer = (answer) => {
  //   try {
  //     dispatch(editAnswer(answer))
  //   } catch (error) {
  //     toast.error('Something went wrong')
  //     console.log(error)
  //   }
  // }
  return (
    <Container>
      {console.log(answers)}
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
                {/* <td><a href={`mailto:${c.user.email}`}> <FontAwesomeIcon id='fa-contact-form-admin' icon={faEnvelopeSquare} style={mailIconStyle} />
                </a></td> */}
                {/* <td style={contentStyle}>{a.content}</td> */}
                <td style={contentStyle}>{a.date.slice(0, 10)}</td>
                {/* <td><Button style={buttonStyle} size='sm' disabled onClick={() => setQuestionToggle(!questionToggle)}>Questions</Button></td> */}
                {/* {/* <td><Button style={unflagButtonStyle} onClick={() => removeFlag(c._id)}>Unflag</Button></td> */}
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