/* eslint-disable no-multi-str */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Input } from '@material-ui/core'
import LoaderButton from './LoaderButton'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { addQuestion } from '../reducers/forumReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const pStyle = {
  fontFamily: 'Kanit',
  fontVariant: 'small-caps',
  fontWeight: 400,
  fontSize: '1.5rem',
  marginBottom: '0px',
  marginTop: '30px'
}
const buttonStyle = {
  marginTop: '20px',
  width: '150px',
  borderColor: '#343a40',
  borderWidth: '3px',
  borderStyle: 'solid',
  backgroundColor: '#288046',
  fontFamily: 'Kanit',
}

const ForumPostMain = (props) => {
  const { activeUser } = props
  const [isLoading, setIsLoading] = useState(false)
  const [question, setQuestion] = useState('')
  const [title, setTitle] = useState('')
  const animatedTags = makeAnimated()
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  let chosenFilter = useSelector(state => state.forum.tagFilter)
  if (chosenFilter === 'รวมทุกหัวข้อ' || chosenFilter === '') {
    chosenFilter = undefined
  }
  const [selectedTags, setSelectedTags] = useState([])
  const tagOptions = [
    { value: chosenFilter, p: chosenFilter },
    { value: 'ปัญหาเรื่องเพศ', p: 'ปัญหาเรื่องเพศ' },  //sex
    { value: 'การออกเดท', p: 'การออกเดท' }, //dating
    { value: 'การเสพติด', p: 'การเสพติด' }, //addiction
    { value: 'เพื่อน', p: 'เพื่อน' }, //friendship
    { value: 'lgbt', p: 'LGBT' },
    { value: 'โรคซึมเศร้า', p: 'โรคซึมเศร้า' }, //depression
    { value: 'ความวิตกกังวล', p: 'ความวิตกกังวล' }, //anxiety
    { value: 'ไบโพลาร์', p: 'ไบโพลาร์' }, //bipolar
    { value: 'relationships', p: 'Relationships' },
    { value: 'การทำงาน', p: 'การทำงาน' }, //career
    { value: 'สุขภาพจิต', p: 'สุขภาพจิต' }, //mental health
    { value: 'bullying', p: 'Bullying' },
    { value: 'ครอบครัว', p: 'ครอบครัว' }, //family
    { value: 'อื่นๆ', p: 'อื่นๆ' } //other
  ]

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleContentChange = (event) => {
    setQuestion(event.target.value)
  }
  const handleTagChange = (selected) => {
    setSelectedTags(selected)
  }

  const handleEditorSubmit = async (event) => {
    event.preventDefault()
    if (!title || !question) {
      // toast.warn('กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ', { autoClose: 5000 })
      //'Please make sure you have a title, a question, and two tags'
      // กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ
    }
    else if ((selectedTags.length === 0 && !chosenFilter) || selectedTags.length > 3) {
      // toast.warn('You should have 1-3 tags', { autoClose: 5000 })
      //กรุณาเลือกแท็กสองหัวข้อค่ะ
      //'Please select 2 tags'
    }
    else if (!activeUser) {
      // toast.warn('กรุณาล็อคอินก่อนโพสคำถามค่ะ')
      //กรุณาล็อคอินก่อนโพสคำถามค่ะ
      //'You must be logged in to post to the forum'
      history.push('/login')
    }
    else if (activeUser.username === 'Fern-Admin' || activeUser.username === 'Richard-Admin') {
      // toast.warn('Why are you trying to ask yourself a question?')

    } else {
      const postToAdd = {
        title: title,
        question: question,
        answer: '',
        isAnswered: false,
        tags: chosenFilter === undefined ? selectedTags.map(t => t.value) : chosenFilter.concat(selectedTags.map(t => t.value)),
        likes: 0
      }
      try {
        setIsLoading(true)
        dispatch(addQuestion(postToAdd))
        setTitle('')
        setQuestion('')
        setSelectedTags([])
        history.push('/')
      } catch (error) {
        // toast.error('กรุณาล็อคอินก่อนโพสคำถามค่ะ')
        //กรุณาล็อคอินก่อนโพสคำถามค่ะ
        console.log(error)

      }

    }
  }
  return (
    <Container>
      <div style={{ display: 'block', textAlign: 'center', fontSize: '100px', color: '#343a40', marginBottom: '0px' }}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </div>
      <div id='forum-title-div'>
        <p style={pStyle}>หัวข้อ</p>
        <Input
          placeholder='พิมพ์หัวข้อที่นี่'
          onChange={handleTitleChange}
          value={title}
          style={{ marginBottom: '20px', fontFamily: 'Kanit' }}
        />
      </div>

      <div id='forum-question-div'>
        <p style={pStyle}>คำถาม</p>

        <Input
          type='textarea'
          placeholder='พิมพ์รายละเอียดคำถามของคุณ'
          onChange={handleContentChange}
          value={question}
          onSubmit={handleEditorSubmit}
          style={{ fontFamily: 'Kanit' }}
        />
        <p style={pStyle}>เลือกแท็ก</p>

        <Select
          isClearable={false}
          options={tagOptions}
          onChange={handleTagChange}
          closeMenuOnSelect={false}
          components={animatedTags}
          style={{ fontFamily: 'Kanit' }}
          defaultValue={chosenFilter !== undefined ? tagOptions[0] : null}
          isMulti>
        </Select>
        <hr />
        <div style={{ display: 'block', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Kanit' }}>ชื่อที่คุณใช้ล็อคอินจะไม่ปรากฏในคำถามของคุณ</p>
          <LoaderButton style={buttonStyle} onClick={handleEditorSubmit}>ส่งคำถาม</LoaderButton>
        </div>
      </div>
    </Container >
  )
}
export default ForumPostMain