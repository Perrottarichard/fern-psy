import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, Label, Input } from 'reactstrap'
import { answerQuestion } from '../reducers/forumReducer'
import { answeredQuestion, fail } from '../reducers/notificationReducer'

const labelStyle = {
  fontFamily: 'Poppins',
  fontWeight: 400,
  fontSize: '1.5rem',
  marginBottom: '0px',
  marginTop: '30px'
}
const AdminForumAnswer = (props) => {
  const { setAnswering, answering } = props
  const [answer, setAnswer] = useState('')
  const dispatch = useDispatch()

  const handleContentChange = (event) => {
    setAnswer(event.target.value)
  }
  const handleEditorSubmit = async (event) => {
    event.preventDefault()
    if (!answer) {
      alert('You must have an answer')
    } else {
      try {
        const postToAnswer = {
          ...answering, answer: answer, isAnswered: true
        }
        dispatch(answerQuestion(postToAnswer))
        dispatch(answeredQuestion())
        setAnswer('')
        setAnswering('')
      } catch (error) {
        console.log(error)
        dispatch(fail())
      }
    }
  }
  return (
    <div id='forum-response-div'>
      <Container>
        <Label style={labelStyle}>Question:</Label>
        <p style={{ fontFamily: 'Poppins' }}>Reminder: This forum is anonymous.</p>
        {(!answering.question) ? <h3 style={{ color: 'red' }}>You must first select a post</h3> :
          <div style={{ borderColor: 'red', borderStyle: 'solid', padding: '10px', borderWidth: '1px' }}><p style={{ fontFamily: 'Poppins' }}>You are answering the following question:</p>{answering.question}</div>}
        <Input
          type='textarea'
          onChange={handleContentChange}
          value={answer}
          onSubmit={handleEditorSubmit}
        />
        <Button onClick={handleEditorSubmit}>Submit Answer</Button>
      </Container>
    </div>
  )
}
export default AdminForumAnswer