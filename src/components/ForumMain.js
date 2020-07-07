/* eslint-disable no-multi-str */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, Input, Label } from 'reactstrap'
import { Editor } from '@tinymce/tinymce-react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { addQuestion } from '../reducers/forumReducer'

const labelStyle = {
  fontFamily: 'Poppins',
  fontWeight: 400,
  fontSize: '1.5rem',
  marginBottom: '0px',
  marginTop: '30px'
}
const buttonStyle = {
  marginTop: '20px',
  width: '200px',
  float: 'center'
}

const tagOptions = [
  { value: 'sex', label: 'Sex' },
  { value: 'dating', label: 'Dating' },
  { value: 'illegal drugs', label: 'Illegal Drugs' },
  { value: 'friendship', label: 'Friendship' },
  { value: 'lgbt', label: 'LGBT' },
  { value: 'depression', label: 'Depression' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'bipolar', label: 'Bipolar' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'career', label: 'Career' },
  { value: 'mentalHealth', label: 'Mental Health' },
  { value: 'bullying', label: 'Bullying' },
  { value: 'family', label: 'Family' },
  { value: 'peerPressure', label: 'Peer Pressure' },
  { value: 'parenting', label: 'Parenting' },
  { value: 'other', label: 'Other' }
]
const ForumMain = (props) => {
  // const { activeUser } = props
  const [question, setQuestion] = useState('')
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const animatedTags = makeAnimated()
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleContentChange = (content, editor) => {
    setQuestion(content)
  }
  const handleTagChange = (selectedTags) => {
    setSelectedTags(selectedTags)
  }

  const handleEditorSubmit = async (event) => {
    event.preventDefault()
    console.log(!title)
    console.log(!question)
    console.log(selectedTags.map(t => t.value))
    if (!title || !question || !selectedTags.length >= 2) {
      alert('Please make sure you have a title, a question, and at least 2 tags')
    }
    const postToAdd = {
      title: title,
      question: question,
      answer: '',
      isAnswered: false,
      tags: selectedTags.map(t => t.value),
      likes: 0
    }
    dispatch(addQuestion(postToAdd))
  }
  return (
    <Container>
      <div id='forum-title-div'>
        <Label style={labelStyle}>Title:</Label>
        <p style={{ fontFamily: 'Poppins' }}>Give your post an interesting title.</p>
        <Input
          placeholder='My Awesome Title!'
          onChange={handleTitleChange}
          value={title}
          style={{ marginBottom: '20px' }}
        />
      </div>

      <div id='forum-question-div'>
        <Label style={labelStyle}>Question:</Label>
        <p style={{ fontFamily: 'Poppins' }}>Reminder: This forum is anonymous. Although you must have an account to post, your name and username will NOT show on the forum, so feel free to ask anything.</p>
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
          value={question}
          onSubmit={handleEditorSubmit}
        />
        <Label style={labelStyle}>Tags:</Label>
        <p style={{ fontFamily: 'Poppins' }}>Select some tags to help other people know what your question is about!</p>
        <Select
          options={tagOptions}
          onChange={handleTagChange}
          closeMenuOnSelect={false}
          components={animatedTags}
          defaultValue={[]}
          isMulti>
        </Select>
        <Button style={buttonStyle} color='primary' onClick={handleEditorSubmit}>Ask Fern!</Button>
      </div>

    </Container>
  )
}
export default ForumMain