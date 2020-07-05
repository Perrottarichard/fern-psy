import React from 'react'
import { Spinner } from 'reactstrap'

const SpinningLoader = () => {
  return (
    <div>
      <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
    </div>
  )
}
export default SpinningLoader