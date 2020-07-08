/* eslint-disable no-multi-str */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Button, Input, Label } from 'reactstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { addQuestion } from '../reducers/forumReducer'

const labelStyle = {
  fontFamily: 'Montserrat',
  fontVariant: 'small-caps',
  fontWeight: 400,
  fontSize: '1.5rem',
  marginBottom: '0px',
  marginTop: '30px'
}
const buttonStyle = {
  marginTop: '20px',
  width: '200px',
  backgroundColor: '#288046',
  fontFamily: 'Montserrat',
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
const ForumPostMain = (props) => {
  // const { activeUser } = props
  const [question, setQuestion] = useState('')
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const animatedTags = makeAnimated()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleContentChange = (event) => {
    setQuestion(event.target.value)
  }
  const handleTagChange = (selectedTags) => {
    setSelectedTags(selectedTags)
  }

  const handleEditorSubmit = async (event) => {
    event.preventDefault()
    if (!title || !question || !selectedTags) {
      alert('Please make sure you have a title, a question, and some tags')
    }
    const postToAdd = {
      title: title,
      question: question,
      answer: '',
      isAnswered: false,
      tags: selectedTags.map(t => t.value),
      likes: 0
    }
    try {
      dispatch(addQuestion(postToAdd))
      setTitle('')
      setQuestion('')
      setSelectedTags([])
      history.push('/forum')
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <Container>
      <div id='forum-title-div'>
        <Label style={labelStyle}>Title:</Label>
        <p style={{ fontFamily: 'Montserrat' }}>Give your post an interesting title.</p>
        <Input
          placeholder='My Awesome Title!'
          onChange={handleTitleChange}
          value={title}
          style={{ marginBottom: '20px', fontFamily: 'Montserrat' }}
        />
      </div>

      <div id='forum-question-div'>
        <Label style={labelStyle}>Question:</Label>
        <p style={{ fontFamily: 'Montserrat' }}>Reminder: This forum is anonymous. Although you must have an account to post, your name and username will NOT show on the forum, so feel free to ask anything.</p>
        <Input
          type='textarea'
          placeholder='I have a question about...'
          onChange={handleContentChange}
          value={question}
          onSubmit={handleEditorSubmit}
          style={{ fontFamily: 'Montserrat' }}
        />
        <Label style={labelStyle}>Tags:</Label>
        <p style={{ fontFamily: 'Montserrat' }}>Select some tags to help other people know what your question is about!</p>
        <Select
          options={tagOptions}
          onChange={handleTagChange}
          closeMenuOnSelect={false}
          components={animatedTags}
          style={{ fontFamily: 'Montserrat' }}
          defaultValue={[]}
          isMulti>
        </Select>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <Button style={buttonStyle} onClick={handleEditorSubmit}>Ask Fern!</Button>
        </div>
      </div>

    </Container>
  )
}
export default ForumPostMain