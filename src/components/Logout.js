import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { clearUser } from '../reducers/activeUserReducer'

const Logout = (props) => {
  const { setLoggedIn } = props
  const history = useHistory()

  const dispatch = useDispatch()
  const logout = () => {
    window.localStorage.clear()
    setLoggedIn(false)
    // toast.info('ออกจากระบบสำเร็จแล้ว')
    dispatch(clearUser())
    history.push('/')
  }
  return (
    <div id='nav-logout-button'>
      <Button onClick={logout} outline color='secondary' size='sm'>ออกจากระบบ</Button>
    </div>
  )
}
export default Logout