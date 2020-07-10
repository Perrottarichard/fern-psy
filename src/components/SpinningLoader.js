import React from 'react'
import { Spinner } from 'reactstrap'

const SpinningLoader = () => {
  return (
    <div style={{ display: 'block', textAlign: 'center' }}>
      Loading...
      <Spinner type="grow" color="primary" style={{ width: '5rem', height: '5rem' }} />
    </div>
  )
}
export default SpinningLoader