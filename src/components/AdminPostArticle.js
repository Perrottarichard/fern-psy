import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import { Container, Button, TextField, Input} from '@material-ui/core'
import { addArticle } from '../reducers/forumReducer'
import {notify} from '../reducers/activeUserReducer'

const useStyles = makeStyles((theme) => ({
container: {
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  marginTop: 30,
  paddingTop: 30
},
  inputContainer: {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
},
textAreaContainerTitle: {
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: 10,
  paddingRight: 10,
  borderWidth: 0.25,
  borderRadius: 10,
  marginBottom: 10
},
textAreaContainerContent: {
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: 10,
  paddingRight: 10,
  borderWidth: 0.25,
  borderRadius: 10,
  marginBottom: 10
},
textAreaTitle: {
  marginTop: 10,
  marginBottom: 10,
  justifyContent: 'flex-start',
  fontSize: 16,
},
textAreaContent: {
  marginTop: 10,
  marginBottom: 10,
  justifyContent: 'flex-start',
  fontSize: 16
},
submitButton: {
  marginTop: 30,
  width: 200,
  alignSelf: 'center'
}
}))

const AdminPostArticle = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState([])
  
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleContentChange = (event) => {
    setContent(event.target.value)
  }
  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }
  const handleArticleSubmit = async (event) => {
    event.preventDefault()
    if (!title) {
      dispatch(notify('error', 'You must have a title'))
    } else if(!content){
      dispatch(notify('error', 'You must have content'))
    }else{
      try {
        const article = new FormData()
        article.append("title", title)
        article.append("content", content)
        article.append("file", file)

        dispatch(addArticle(article))
        dispatch(notify('success', 'Article posted'))
        setTitle('')
        setContent('')
        setFile([])
      } catch (error) {
        dispatch(notify('error', 'Something went wrong'))
        console.log(error)
      }
    }
  }
  return (
      <Container className={classes.container}>
        <form className={classes.inputContainer}>
        <div className={classes.textAreaContainerTitle}>
        <TextField
          className={classes.textAreaTitle}
          fullWidth
          variant='outlined'
          onChange={handleTitleChange}
          value={title}
          label='Title'
        />
        </div>
        <div className={classes.textAreaContainerContent}>
        <TextField
          className={classes.textAreaContent}
          variant='outlined'
          fullWidth
          multiline
          rows={5}
          onChange={handleContentChange}
          value={content}
          label='Content'
        />
        </div>
          <Input
          variant='filled'
          type='file'
          name='myImage'
          onChange={handleFileChange}
        />
        <Button 
        className={classes.submitButton}
        onClick={handleArticleSubmit} 
        variant='contained'>
          Submit Article
          </Button>
        </form>
      </Container>
  )
}
export default AdminPostArticle