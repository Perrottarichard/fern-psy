import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, Label } from 'reactstrap'
import { Editor } from '@tinymce/tinymce-react'
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
  const { post } = props
  const [answer, setAnswer] = useState('')
  const dispatch = useDispatch()

  const handleContentChange = (content, editor) => {
    setAnswer(content)
  }
  const handleEditorSubmit = async (event) => {
    event.preventDefault()
    if (!answer) {
      alert('You must have an answer')
    } else {
      try {
        const postToAnswer = {
          ...post, answer: answer, isAnswered: true
        }
        dispatch(answerQuestion(postToAnswer))
        dispatch(answeredQuestion())
        setAnswer('')
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
        {(!post.question) ? <h3 style={{ color: 'red' }}>You must first select a post</h3> :
          <div style={{ borderColor: 'red', borderStyle: 'solid', padding: '10px', borderWidth: '1px' }}><p style={{ fontFamily: 'Poppins' }}>You are answering the following question:</p><div dangerouslySetInnerHTML={{ __html: post.question }} style={{ marginBottom: '10px' }} />{post._id}</div>}
        <Editor
          apiKey="1jdezn4w8yzylr4m873z9o7tlc1wl9b6xnlenejmp0dws97n"
          initialValue=""
          init={{
            height: 200,
            menubar: false,
            plugins: [],
            toolbar:
              'fontselect fontsizeselect | bold italic underline| cut copy paste'
          }}
          onEditorChange={handleContentChange}
          value={answer}
          onSubmit={handleEditorSubmit}
        />
        <Button onClick={handleEditorSubmit}>Submit Answer</Button>
      </Container>
    </div>
  )
}
export default AdminForumAnswer