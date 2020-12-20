import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, Label, Input, FormGroup, Form } from 'reactstrap'
import { addArticle } from '../reducers/forumReducer'
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
  backgroundColor: 'white',
  marginTop: '15px',
  marginBottom: '15px',
  width: '100px',
  float: 'left',
  color: 'green'
}
// const clearButtonStyle = {
//   fontFamily: 'Montserrat',
//   backgroundColor: 'white',
//   marginTop: '15px',
//   marginBottom: '15px',
//   width: '100px',
//   float: 'right',
//   color: '#343a40'
// }


const AdminPostArticle = () => {
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
      toast.warn('You must have a title')
    } else if(!content){
      toast.warn('Your article must have content')
    }else{
      try {
        const article = new FormData()
        article.append("title", title)
        article.append("content", content)
        article.append("file", file)

        // Axios.post("https://httpbin.org/anything", article).then(res => console.log(res))
        // let article = {
        //   title: title,
        //   content: content,
        //   image: file
        // }
        dispatch(addArticle(article))
        // setTitle('')
        // setContent('')
        // setFile([])
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div id='forum-response-div'>
      <Container>
        <Form>
          <FormGroup>
        <Label style={labelStyle}>Title:</Label>
        <Input
          style={{ fontFamily: 'Montserrat', marginTop: '15px' }}
          type='text'
          onChange={handleTitleChange}
          value={title}
        />
        </FormGroup>

        <FormGroup>
        <Label style={labelStyle}>Content:</Label>
        <Input
          style={{ fontFamily: 'Montserrat', marginTop: '15px' }}
          type='textarea'
          onChange={handleContentChange}
          value={content}
        />
        </FormGroup>

        <FormGroup>
        <Label style={labelStyle}>File:</Label>
          <Input
          style={{ fontFamily: 'Montserrat', marginTop: '15px' }}
          type='file'
          name='myImage'
          onChange={handleFileChange}
        />
        </FormGroup>
        <Button style={buttonStyle} onClick={handleArticleSubmit}>Submit Article</Button>
        </Form>
      </Container>
    </div>
  )
}
export default AdminPostArticle