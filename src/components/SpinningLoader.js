import React from 'react'
import { Spinner } from 'reactstrap'

const SpinningLoader = () => {
  return (
    <div style={{ display: 'block', textAlign: 'center', marginTop: '200px' }}>
      <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
    </div>
  )
}
export default SpinningLoader