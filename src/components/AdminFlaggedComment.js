import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
// import { initializeUsers } from '../reducers/userInfoForAdminReducer'
import { getFlaggedComments, deleteComment } from '../reducers/forumReducer';
import { toast } from 'react-toastify';

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
const contentStyle = {
  fontFamily: 'Montserrat'
}
const deleteButtonStyle = {
  fontFamily: 'Montserrat',
  backgroundColor: 'red',
  width: '50px',
  paddingRight: '5px',
  paddingLeft: '5px',
  fontSize: '10px'
}

const AdminFlaggedComment = () => {
  const dispatch = useDispatch()
  const flagged = useSelector(state => state.forum.flagged)
  // const [questionToggle, setQuestionToggle] = useState(false)

  useEffect(() => {
    dispatch(getFlaggedComments())
  }, [])

  const removeQuestion = (_id) => {
    try {
      dispatch(deleteComment(_id))
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    }
  }
  console.log(flagged)
  return (
    <Container>
      <Table size='sm' hover responsive>
        <thead>
          <tr>
            <th style={headingStyle}>Username</th>
            <th style={headingStyle}>Email</th>
            <th style={headingStyle}>Content</th>
          </tr>
        </thead>
        <tbody>
          {
            flagged ? flagged.map(c =>
              <tr key={c.id}>
                <td style={contentStyle}>{c.user.username}</td>
                <td><a href={`mailto:${c.user.email}`}> <FontAwesomeIcon id='fa-contact-form-admin' icon={faEnvelopeSquare} style={mailIconStyle} />
                </a></td>
                <td style={contentStyle}>{c.content}</td>
                {/* <td style={contentStyle}>{c.dateOfBirth.slice(0, 10)}</td> */}
                {/* <td><Button style={buttonStyle} size='sm' disabled onClick={() => setQuestionToggle(!questionToggle)}>Questions</Button></td> */}
                <td><Button style={deleteButtonStyle} onClick={() => removeQuestion(c._id)}>Delete</Button></td>
              </tr>)
              : null}
        </tbody>
      </Table>
    </Container>
  )
}
export default AdminFlaggedComment