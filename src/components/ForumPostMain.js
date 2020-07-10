/* eslint-disable no-multi-str */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Button, Input, Label } from 'reactstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { addQuestion } from '../reducers/forumReducer'
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
  marginTop: '20px',
  width: '200px',
  backgroundColor: '#288046',
  fontFamily: 'Montserrat',
}

// const tagOptions = [
//   { value: 'sex', label: 'Sex' },
//   { value: 'dating', label: 'Dating' },
//   { value: 'addiction', label: 'Addiction' },
//   { value: 'friendship', label: 'Friendship' },
//   { value: 'lgbt', label: 'LGBT' },
//   { value: 'depression', label: 'Depression' },
//   { value: 'anxiety', label: 'Anxiety' },
//   { value: 'bipolar', label: 'Bipolar' },
//   { value: 'relationships', label: 'Relationships' },
//   { value: 'career', label: 'Career' },
//   { value: 'mental health', label: 'Mental Health' },
//   { value: 'bullying', label: 'Bullying' },
//   { value: 'family', label: 'Family' },
//   { value: 'other', label: 'Other' }
// ]

const tagOptions = [
  { value: 'ปัญหาเรื่องเพศ', label: 'ปัญหาเรื่องเพศ' },
  { value: 'การออกเดท', label: 'การออกเดท' },
  { value: 'การเสพติด', label: 'การเสพติด' },
  { value: 'ความสัมพันธ์กับเพื่อน', label: 'ความสัมพันธ์กับเพื่อน' },
  { value: 'lgbt', label: 'LGBT' },
  { value: 'โรคซึมเศร้า', label: 'โรคซึมเศร้า' },
  { value: 'ความวิตกกังวล', label: 'ความวิตกกังวล' },
  { value: 'ไบโพลาร์', label: 'ไบโพลาร์' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'การทำงาน', label: 'การทำงาน' },
  { value: 'สุขภาพจิต', label: 'สุขภาพจิต' },
  { value: 'bullying', label: 'Bullying' },
  { value: 'ครอบครัว', label: 'ครอบครัว' },
  { value: 'อื่นๆ', label: 'อื่นๆ' }
]
const ForumPostMain = (props) => {
  const { activeUser } = props
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
      toast.warn('กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ', { autoClose: 5000 })
      //'Please make sure you have a title, a question, and two tags'
      // กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ
    } else if (selectedTags.length !== 2) {
      toast.warn('กรุณาเลือกแท็กสองหัวข้อค่ะ', { autoClose: 5000 })
      //กรุณาเลือกแท็กสองหัวข้อค่ะ
      //'Please select 2 tags'
    }
    else if (activeUser.username === 'Fern-Admin' || activeUser.username === 'Richard-Admin') {
      toast.warn('Why are you trying to ask yourself a question?')
    } else if (!activeUser.username) {
      toast.warn('กรุณาล็อคอินก่อนโพสคำถามค่ะ')
      //กรุณาล็อคอินก่อนโพสคำถามค่ะ
      //'You must be logged in to post to the forum'
      history.push('/login')
    } else {
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
        toast.error('กรุณาล็อคอินก่อนโพสคำถามค่ะ')
        //กรุณาล็อคอินก่อนโพสคำถามค่ะ
        console.log(error)

      }

    }
  }
  return (
    <Container>
      <div id='forum-title-div'>
        <Label style={labelStyle}>Title:</Label>
        {/* <p style={{ fontFamily: 'Montserrat' }}>Give your post an interesting title.</p> */}
        <Input
          placeholder='คำถามของฉันคือ'
          onChange={handleTitleChange}
          value={title}
          style={{ marginBottom: '20px', fontFamily: 'Montserrat' }}
        />
      </div>

      <div id='forum-question-div'>
        <Label style={labelStyle}>Question:</Label>
        <p style={{ fontFamily: 'Montserrat' }}>ชื่อที่คุณใช้ล็อคอินจะไม่ปรากฏในคำถามของคุณ คุณสามารถถามได้โดยไม่ต้องกังวลเรื่องของความเป็นส่วนตัว เนื่องจากตัวตนของคุณจะไม่ถูกเปิดเผยต่อสาธารณะ และจะมีการรักษาความลับของคุณตามจรรยาบรรณของนักจิตวิทยา</p>
        {/* */}
        <Input
          type='textarea'
          placeholder='รายละเอียดของคำถาม'
          onChange={handleContentChange}
          value={question}
          onSubmit={handleEditorSubmit}
          style={{ fontFamily: 'Montserrat' }}
        />
        <Label style={labelStyle}>Tags:</Label>
        <p style={{ fontFamily: 'Montserrat' }}>กรุณาเลือกแท็กจำนวนสองแท็ก</p>
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
          <Button style={buttonStyle} onClick={handleEditorSubmit}>ส่ง</Button>
        </div>
      </div>
    </Container>
  )
}
export default ForumPostMain