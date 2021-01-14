import React from 'react'
import {Dialog, Typography} from '@material-ui/core'
// import LottieView from 'lottie-react-native'


const LevelUpAnimationModal = () => {

  return(  
    <Dialog
      visible={true}
      contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
      <div
        style={{flex: 1, paddingTop: 90}}>
        <Typography
          style={{alignSelf: 'center', fontSize: 30}}>ยินดีด้วยคุณได้เลื่อนขั้น!
        </Typography>
      </div>
      {/* <LottieView
        source={require('../assets/levelUpAnimation.json')}
        autoPlay
        loop={false}
        style={{zIndex: 99}}/> */}
    </Dialog>
  )
}

export default LevelUpAnimationModal;