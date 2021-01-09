import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, Input } from '@material-ui/core'
import { editAnswer } from '../reducers/forumReducer'

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


const AdminForumEditAnswer = (props) => {
  const { setEditing, editing } = props
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
        const answerToEdit = {
          ...editing, answer: answer
        }
        dispatch(editAnswer(answerToEdit))
        setAnswer('')
        setEditing('')
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div id='forum-response-div'>
      <Container>
        {(!editing.answer) ? <h3 style={{ color: 'red', fontFamily: 'Montserrat' }}>You must first select an answer to change</h3> :
          <div style={{ borderColor: 'red', borderStyle: 'solid', padding: '10px', borderWidth: '1px' }}><p style={{ fontFamily: 'Montserrat' }}><em>You are editing the following answer:</em></p>{editing.answer}</div>}
        <Input
          style={{ fontFamily: 'Montserrat', marginTop: '15px' }}
          type='textarea'
          onChange={handleContentChange}
          value={answer}
          onSubmit={handleEditorSubmit}
          disabled={editing === '' ? true : false}
        />
        <Button style={buttonStyle} onClick={handleEditorSubmit}>Submit Answer</Button>
        <Button style={clearButtonStyle} onClick={() => setEditing('')}>Clear Selection</Button>
      </Container>
    </div>
  )
}
export default AdminForumEditAnswer