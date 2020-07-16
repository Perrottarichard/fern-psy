import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, Label, Input } from 'reactstrap'
import { answerQuestion } from '../reducers/forumReducer'
import { toast } from 'react-toastify'

const labelStyle = {
  fontFamily: 'Montserrat',
  fontVariant: 'small-caps',
  fontWeight: 400,
  fontSize: '1.5rem',
  marginBottom: '0px',
  marginTop: '30px'
}
const buttonStyle = {
  fontFamily: 'Montserrat',
  backgroundColor: '#288046',
  marginTop: '15px',
  marginBottom: '15px',
  width: '100px',
  float: 'left'
}
const clearButtonStyle = {
  fontFamily: 'Montserrat',
  backgroundColor: 'gray',
  marginTop: '15px',
  marginBottom: '15px',
  width: '100px',
  float: 'right'
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
      toast.warn('You must have an answer')
    } else {
      try {
        const postToAnswer = {
          ...answering, answer: answer, isAnswered: true
        }
        dispatch(answerQuestion(postToAnswer))
        setAnswer('')
        setAnswering('')
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div id='forum-response-div'>
      <Container>
        <Label style={labelStyle}>Question:</Label>
        <p style={{ fontFamily: 'Montserrat' }}>Reminder: This forum is anonymous.</p>
        {(!answering.question) ? <h3 style={{ color: 'red', fontFamily: 'Montserrat' }}>You must first select a post</h3> :
          <div style={{ borderColor: 'red', borderStyle: 'solid', padding: '10px', borderWidth: '1px' }}><p style={{ fontFamily: 'Montserrat' }}><em>You are answering the following question:</em></p>{answering.question}</div>}
        <Input
          style={{ fontFamily: 'Montserrat', marginTop: '15px' }}
          type='textarea'
          onChange={handleContentChange}
          value={answer}
          onSubmit={handleEditorSubmit}
        />
        <Button style={buttonStyle} onClick={handleEditorSubmit}>Submit Answer</Button>
        <Button style={clearButtonStyle} onClick={() => setAnswering('')}>Clear Selection</Button>
      </Container>
    </div>
  )
}
export default AdminForumAnswer