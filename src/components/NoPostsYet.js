import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'


const postButtonDivStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '50px',
  marginBottom: '50px',
  fontFamily: 'Kanit',
  fontSize: '20px'
}
const postButtonStyle = {
  width: '150px',
  fontFamily: 'Kanit',
}


const NoPostsYet = () => {

  const activeUser = useSelector(state => state.activeUser)
  const textStyle = {
    fontFamily: 'Kanit',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: '100px'
  }
  return (
    <Container>
      <div style={textStyle}>
        <FontAwesomeIcon
          icon={faExclamationCircle}
          style={{ fontSize: '60px', color: '#d3dceb', float: 'center' }}
        >
        </FontAwesomeIcon>
        <h5 style={{ marginTop: '20px', fontFamily: 'Kanit' }}>
          ยังไม่มีคำถามในหัวข้อนี้
        </h5>

        <br />
        <div style={postButtonDivStyle}>
          ตั้งกระทู้ คลิก<br />
          <Link to={activeUser === null ? '/login' : '/addpost'} onClick={() => activeUser === null ? toast.warn('คุณต้องเข้าสู่ระบบเพื่อโพสต์คำถาม') : null}><Button color='primary' style={postButtonStyle}>ส่งคำถาม</Button></Link>
        </div>
      </div>
    </Container>
  )
}
export default NoPostsYet