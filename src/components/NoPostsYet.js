import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'


const postButtonDivStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '50px',
  marginBottom: '50px',
  fontFamily: 'Kanit',
  fontSize: '30px'
}
const postButtonStyle = {
  borderColor: '#343a40',
  borderWidth: '3px',
  borderStyle: 'solid',
  fontFamily: 'Kanit',
  backgroundColor: '#288046'
}


const NoPostsYet = () => {

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
          icon={faUserEdit}
          style={{ fontSize: '100px', color: '#343a40' }}
        >
        </FontAwesomeIcon>
        <h3 style={{ marginTop: '20px', fontFamily: 'Kanit' }}>
          อ๊ะ ยังไม่มีใครตั้งกระทู้ถามในหัวข้อนี้เลยค่ะ อยากให้มีคนมาตั้งกระทู้ถามเป็นคนแรกจัง
        </h3>

        <br />
        <div style={postButtonDivStyle}>
          ตั้งกระทู้ถามเป็นคนแรก<br />
          <Link to='/addpost'><Button style={postButtonStyle} >ส่งคำถาม</Button></Link>
        </div>
      </div>
    </Container>
  )
}
export default NoPostsYet