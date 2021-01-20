import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import { Container, Button, TextField } from '@material-ui/core'
import { answerQuestion } from '../reducers/forumReducer'

const useStyles = makeStyles((theme) => ({

  submitContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  button: {
    marginTop: 20,
    width: 200
  }
}))

const AdminForumAnswer = (props) => {

  const classes = useStyles();
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
        <p >Question:</p>
        <p >Reminder: This forum is anonymous.</p>
        {(!answering) ? <h3 style={{ color: 'pink'}}>You must first select a post</h3> :
          <div style={{ borderColor: 'red', borderStyle: 'solid', padding: '10px', borderWidth: '1px' }}><p style={{ fontFamily: 'Montserrat' }}><em>You are answering the following question:</em></p>{answering.question}</div>}
        <div style={{width: '100%', marginTop: 20}}>
        <TextField
          onChange={handleContentChange}
          variant='outlined'
          multiline
          rows={4}
          fullWidth
          value={answer}
          onSubmit={handleEditorSubmit}
          disabled={answering === '' ? true : false}
        />
        </div>
        <div className={classes.submitContainer}>
        <Button className={classes.button}onClick={handleEditorSubmit} variant='contained'>Submit Answer</Button>
        <Button className={classes.button}onClick={() => setAnswering('')} variant='contained'>Clear Selection</Button>
        </div>
      </Container>
    </div>
  )
}
export default AdminForumAnswer