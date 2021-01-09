import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, Input } from '@material-ui/core'
import { answerQuestion } from '../reducers/forumReducer'

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
  backgroundColor: 'white',
  marginTop: '15px',
  marginBottom: '15px',
  width: '100px',
  float: 'left',
  color: 'green'
}
const clearButtonStyle = {
  fontFamily: 'Montserrat',
  backgroundColor: 'white',
  marginTop: '15px',
  marginBottom: '15px',
  width: '100px',
  float: 'right',
  color: '#343a40'
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
      // toast.warn('You must have an answer')
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
        <p style={labelStyle}>Question:</p>
        <p style={{ fontFamily: 'Montserrat' }}>Reminder: This forum is anonymous.</p>
        {(!answering) ? <h3 style={{ color: 'red', fontFamily: 'Montserrat' }}>You must first select a post</h3> :
          <div style={{ borderColor: 'red', borderStyle: 'solid', padding: '10px', borderWidth: '1px' }}><p style={{ fontFamily: 'Montserrat' }}><em>You are answering the following question:</em></p>{answering.question}</div>}
        <Input
          style={{ fontFamily: 'Montserrat', marginTop: '15px' }}
          type='textarea'
          onChange={handleContentChange}
          value={answer}
          onSubmit={handleEditorSubmit}
          disabled={answering === '' ? true : false}
        />
        <Button style={buttonStyle} onClick={handleEditorSubmit}>Submit Answer</Button>
        <Button style={clearButtonStyle} onClick={() => setAnswering('')}>Clear Selection</Button>
      </Container>
    </div>
  )
}
export default AdminForumAnswer