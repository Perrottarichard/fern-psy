import React from 'react'
import { useSelector } from 'react-redux'
import { UncontrolledAlert } from 'reactstrap'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Poppins'
}

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  return (
    <div >
      {notification !== '' ?
        <UncontrolledAlert style={textStyle} variant='info'>
          <h4>{notification}</h4>
        </UncontrolledAlert>
        : null}
    </div>
  )
}

export default Notification