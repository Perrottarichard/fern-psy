import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, TextField } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { editAnswer } from '../reducers/forumReducer'

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

const AdminForumEditAnswer = (props) => {
  const classes = useStyles();
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
        {(!editing.answer) ? <h3>You must first select an answer to change</h3> :
          <div style={{ borderColor: 'red', borderStyle: 'solid', paddingLeft: 10, paddingBottom: 10, borderWidth: 1, marginBottom: 10, marginTop: 10, borderRadius: 5 }}><p><em>You are editing the following answer:</em></p>{editing.answer}</div>}
        <TextField
          onChange={handleContentChange}
          value={answer}
          variant='outlined'
          multiline
          rows={4}
          fullWidth
          onSubmit={handleEditorSubmit}
          disabled={editing === '' ? true : false}
        />
        <div className={classes.submitContainer}>
        <Button className={classes.button} variant='contained' onClick={handleEditorSubmit}>Submit Answer</Button>
        <Button className={classes.button} variant='contained' onClick={() => setEditing('')}>Clear Selection</Button>
        </div>
      </Container>
    </div>
  )
}
export default AdminForumEditAnswer