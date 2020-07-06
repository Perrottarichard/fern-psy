import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'
import { logoutNotify, reset } from '../reducers/notificationReducer'
import { Button } from 'reactstrap'

const Logout = (props) => {
  const { setLoggedIn } = props
  const history = useHistory()

  const dispatch = useDispatch()
  const logout = () => {
    window.localStorage.clear()
    setLoggedIn(false)
    dispatch(clearUser())
    dispatch(logoutNotify())
    setTimeout(() => {
      dispatch(reset())
    }, 3000);
    history.push('/')

  }
  return (
    <div id='nav-logout-button'>
      <Button onClick={logout} outline color='secondary' size='sm'>Logout</Button>
    </div>
  )
}
export default Logout