import React from 'react'
import { CircularProgress } from '@material-ui/core'

const SpinningLoader = () => {
  return (
    <div style={{ display: 'block', textAlign: 'center', marginTop: '200px' }}>
      <CircularProgress color="primary" style={{ width: '3rem', height: '3rem' }} />
    </div>
  )
}
export default SpinningLoader