import React from 'react'
import {Typography} from '@material-ui/core'
import Lottie from 'react-lottie'
import * as animationData from '../assets/levelUpAnimation.json'


const LevelUpAnimationModal = () => {

  const options = {
    loop: false,
    autoplay: true,
    animationData: animationData.default
  }

  return(  
    <div
      >
      <div
        style={{display: 'flex', justifyContent: 'center', paddingTop: 90}}>
        <Typography
          style={{alignSelf: 'center', fontSize: 20}}>ยินดีด้วยคุณได้เลื่อนขั้น!
        </Typography>
      </div>
      <Lottie
        options={options}
        height={300}
        width={300}
        />
    </div>
  )
}

export default LevelUpAnimationModal;