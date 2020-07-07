import React from 'react'
import { useSelector } from 'react-redux'
import { UncontrolledAlert } from 'reactstrap'
import SuccessPostAlert from './SuccessPostAlert';

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Poppins'
}

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  if (notification === '') {
    return (
      null
    )
  } else if (notification === 'successful post') {
    return (
      <SuccessPostAlert />
    )
  } else {
    return (
      <div >
        <UncontrolledAlert style={textStyle} variant='primary'>
          <h4>{notification}</h4>
        </UncontrolledAlert>
      </div>
    )
  }
}

export default Notification