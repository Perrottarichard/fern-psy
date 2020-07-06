import React from 'react'
import { faAutoprefixer } from '@fortawesome/free-brands-svg-icons'

const NoPage = () => {

  const textStyle = {
    fontFamily: 'Poppins',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '300px'
  }
  return (
    <div style={textStyle}>
      <h1>
        Sorry, but this page doesn't exist...
      </h1>
    </div>
  )
}
export default NoPage