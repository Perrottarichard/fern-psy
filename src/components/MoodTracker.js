import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Button, RadioGroup, Radio, FormControlLabel, FormControl, Slider, Avatar, Typography, Dialog} from '@material-ui/core'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {Pie} from '@nivo/pie'
import {Line} from '@nivo/line'
import {addMood, addPoints, levelUp} from '../reducers/activeUserReducer'
import { DateTime } from 'luxon'
import DataGraphic from '../assets/undraw_visual_data_b1wx.svg'
import {shouldLevelUp} from '../helperFunctions'
import LevelUpAnimationModal from './LevelUpAnimationModal'
import {notify} from '../reducers/activeUserReducer'

const moodValueColor = (moodValue) => {
  if(moodValue === 1) {
    return '#42393a'
  }else if(moodValue === 2){
    return "#c2a9ab"
  }else if(moodValue === 3){
    return "#FFB6C1"
  }else if (moodValue === 4){
    return "#ff8592"
  }else{
    return "#f5586f"
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphicContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDataYetContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  noDataYetDailyText: {
    alignSelf: 'center',
  },
  noDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: '100%'
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    width: '100%',
    marginTop: 10,
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    marginRight: 0
  },
  radioFormControl: {
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    marginRight: 0
  },
  howDoYouFeel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40
  },
  howDoYouFeelText: {
    fontSize: 18
  },
  moodValueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
    height: 90,
    padding: 5,
  },
  moodValueText: {
    paddingTop: 5,
    fontSize: 20,
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  slider: {
    color: 'gray',
  },
  sliderButton: {
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightgray',
    marginBottom: 10,
  },
sliderButtonText: {
  color: 'black',
  alignSelf: 'center'
}
}))

const moodsDaily = (moods) => {
  let tempMoods = [...moods]
  let moodNumsOnly = tempMoods.map(m => m.mood)
  if(moodNumsOnly.length <= 7){
    return moodNumsOnly
  }else{
    return moodNumsOnly.slice(moodNumsOnly.length - 7);
  }
}

const getPieData = (moods) => {
  let tempMoods = [...moods]
  let veryGoodMoodObjs = tempMoods.filter(m => m.mood === 5).length
  let goodMoodObjs = tempMoods.filter(m => m.mood === 4).length
  let normalMoodObjs = tempMoods.filter(m => m.mood === 3).length
  let notGoodMoodObjs = tempMoods.filter(m => m.mood === 2).length
  let badMoodObjs = tempMoods.filter(m => m.mood === 1).length

  const pieDataArray = [
    {
      label: "ดีมาก",
      id: "ดีมาก",
      value: veryGoodMoodObjs,
      color: "#f5586f",
    },
    {
      label: "ก็ดีนะ",
      id: "ก็ดีนะ",
      value: goodMoodObjs,
      color: "#ff8592",
    },
    {
      label: "ปกติ",
      id: "ปกติ",
      value: normalMoodObjs,
      color: "#FFB6C1",
    },
    {
      label: "ไม่ดี",
      id: "ไม่ดี",
      value: notGoodMoodObjs,
      color: "#c2a9ab",
    },
    {
      label: "แย่สุดๆ",
      id: "แย่สุดๆ",
      value: badMoodObjs,
      color: "#42393a",
    }
  ];
  return pieDataArray;
};

const daysThisWeek = (moods) => {
  let tempMoods = [...moods]
  let tempDates = tempMoods.map(m => `${DateTime.fromISO(m.date).day}/${DateTime.fromISO(m.date).month}`)
  if(tempDates.length <= 7){
    return tempDates
  }else{
    return tempDates.slice(tempDates.length - 7);
  }
}

const lineChartData = (dataValue, days) => {
  let arr = []
  for(let i = 0; i < days.length; i++){
   let obj = {'x': days[i], 'y': dataValue[i]}
   arr.push(obj)
  }
  return arr;
 }

const moodValueToWords = (moodValue) => {
  if(moodValue === 1) {
    return 'แย่สุดๆ'
  }else if(moodValue === 2){
    return "ไม่ดี"
  }else if(moodValue === 3){
    return "ปกติ"
  }else if (moodValue === 4){
    return "ก็ดีนะ"
  }else{
    return "ดีมาก"
  }
}

const marks = [
  {
    value: 1,
    label: 'แย่สุดๆ',
  },
  {
    value: 2,
    label: 'ไม่ดี',
  },
  {
    value: 3,
    label: 'ปกติ',
  },
  {
    value: 4,
    label: 'ก็ดีนะ',
  },
  {
    value: 5,
    label: 'ดีมาก',
  },
];


const MoodTracker = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(state => state.activeUser.user);
  const userPoints = useSelector(state => state.activeUser.userPoints);
  const userLevel = useSelector(state => state.activeUser.userLevel);
  let moodsForChart = user.moods
  const [moodValue, setMoodValue] = useState(3)
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false)

  //for line chart display 'This week'
  const [displayType, setDisplayType] = useState('All')
  const [timesToShow, setTimesToShow] = useState(daysThisWeek(moodsForChart)) 

  const dailyM = React.useCallback(() => {
    return moodsDaily(moodsForChart)
  }, [moodsForChart])

  const [dataToShow, setDataToShow] = useState(dailyM())

  //for pie chart display 'All'
  getPieData(moodsForChart)

  const handleSliderChange = (event, newValue) => {
    setMoodValue(newValue)
  }

  const chosenType = (type) => {
    switch(type){
      case 'This week':
        setDisplayType('This week')
        setDataToShow(dailyM())
        setTimesToShow(daysThisWeek(moodsForChart))
        break;
      default:
        setDisplayType('All')
    }
  }

  const submitMood = () => {
    let today = DateTime.local();
    if(moodsForChart.length === 0){
      dispatch(addMood(moodValue))
      dispatch(addPoints(user._id, 1))
      if(shouldLevelUp(userPoints, userLevel, 1)){
        dispatch(levelUp(user._id))
        setShowLevelUpAnimation(true)
        setTimeout(() => {
          setShowLevelUpAnimation(false)
        }, 2500);
        }

      let moodDataCopy = [...dataToShow, moodValue]
      if(moodDataCopy.length <= 7){
        setDataToShow(moodDataCopy)
      }else{
        setDataToShow(moodDataCopy.slice(moodDataCopy.length - 7))
      }
      let newDayFormatted = `${today.day}/${today.month}`
      let weekDisplayCopy = [...timesToShow, newDayFormatted]
      if(weekDisplayCopy.length <= 7){
        setTimesToShow(weekDisplayCopy)
      }else{
        setTimesToShow(weekDisplayCopy.slice(weekDisplayCopy.length - 7))
      }
    }else{
        let getDayNumber = DateTime.fromISO(moodsForChart[moodsForChart.length - 1].date).day
        if(today.day === getDayNumber){
        dispatch(notify('error', 'วันนี้คุณบันทึกอารมณ์ไปแล้ว ไว้มาใหม่พรุ่งนี้นะ'))
        }else{
        dispatch(addMood(moodValue))
        dispatch(addPoints(user._id, 1))
        
        if(shouldLevelUp(userPoints, userLevel, 1)){
        dispatch(levelUp(user._id))
        setShowLevelUpAnimation(true)
        setTimeout(() => {
          setShowLevelUpAnimation(false)
        }, 2500);
        }

        let moodDataCopy = [...dataToShow, moodValue]
        if(moodDataCopy.length <= 7){
        setDataToShow(moodDataCopy)
        }else{
        setDataToShow(moodDataCopy.slice(moodDataCopy.length - 7))
        }

        let newDayFormatted = `${today.day}/${today.month}`
        let weekDisplayCopy = [...timesToShow, newDayFormatted]
        if(weekDisplayCopy.length <= 7){
        setTimesToShow(weekDisplayCopy)
        }else{
        setTimesToShow(weekDisplayCopy.slice(weekDisplayCopy.length - 7))
      }
    }
  }
  }
  if(user.moods.length === 0) {
    return(
      <Container>
        <div
          className={classes.noDataContainer}>
            <div className={classes.noDataYetContainer}>
            <Typography
            className={classes.noDataYetDailyText}>บันทึกอารมณ์เพิ่มอีกหน่อยนะ</Typography>
              </div>
            <div className={classes.graphicContainer}>
        <Avatar src={DataGraphic} variant='rounded' style={{alignSelf: 'center', width: 140, height: 100}}></Avatar>
        </div>
        </div>
          <RadioGroup
            onChange={e => chosenType(e.target.value)} 
            value={displayType}
            className={classes.radioContainer}
          >
              <FormControl component='fieldset' className={classes.radioFormControl}>
                  <FormControlLabel value='All' control={<Radio/>} label='แสดงทั้งหมด'/>
                  <FormControlLabel value='This week' control={<Radio/>} label='สัปดาห์นี้'/>
              </FormControl>
          </RadioGroup>
        <div
          className={classes.howDoYouFeel}>
          <Typography
            className={classes.howDoYouFeelText}>วันนี้เป็นไงบ้าง? บอกเราหน่อย</Typography>
        </div>
        <div
          className={classes.moodValueContainer}>
          <Typography
            className={classes.moodValueText}
            style={{color: moodValueColor(moodValue)}}>{moodValueToWords(moodValue)}</Typography>
        </div>
        <div
          className={classes.sliderContainer}>
          <Slider
          className={classes.slider}
            style={{width: 300, height: 40, alignSelf: 'center'}}
            value={moodValue}
            min={1}
            max={5}
            step={1}
            marks={marks}
            valueLabelDisplay="off"
            onChange={handleSliderChange}
      />
          <Button
            onClick={submitMood}
            className={classes.sliderButton}>
            <Typography
              className={classes.sliderButtonText}>
              บันทึก
            </Typography>
          </Button>
        </div>
      </Container>
    )
  }

  return(
      <Container
      >
       <Dialog open={showLevelUpAnimation} PaperProps={{
    style: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  }}>
            <LevelUpAnimationModal/>
          </Dialog>
        <div
          className={classes.chartContainer}>
        
          {displayType === 'This week' ?
            <Line
              data={[{id: 'mood', color: 'lightpink', data: lineChartData(dataToShow, timesToShow)}]}
              width={window.screen.width * 0.85}
              height={300}
              margin={{ top: 50, right: 30, bottom: 50, left: 30 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 1, max: 5, stacked: true, reverse: false }}
              yFormat=" >-.2f"
              axisTop={null}
              theme={{
                "background": theme.palette.background.default,
                "textColor": theme.palette.text.primary,
                "fontSize": 14,
                "axis": {
                    "domain": {
                        "line": {
                            "stroke": "#777777",
                            "strokeWidth": 0.25
                        }
                    },
                    "ticks": {
                        "line": {
                            "stroke": "#777777",
                            "strokeWidth": 0.25
                        }
                    }
                },
                "grid": {
                    "line": {
                        "stroke": "#dddddd",
                        "strokeWidth": 0.25
                    }
                }
            }}
              axisRight={null}
              isInteractive={false}
              enablePointLabel={true}
              enableGridX={true}
              enableGridY={true}
              pointLabel={(point) => moodValueToWords(point.y)}
              pointLabelYOffset={-15}
              axisBottom={{
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legendOffset: 36,
                  legendPosition: 'middle'
              }}
              axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legendOffset: -40,
                  legendPosition: 'middle'
              }}
              pointSize={10}
              pointColor={'lightpink'}
              pointBorderWidth={2}
              pointBorderColor={'lightpink'}
              useMesh={false}
              
  />
: <Pie
    data={getPieData(moodsForChart)}
    margin={{ top: 30, right: 60, bottom: 30, left: 60 }}
    width={window.screen.width * 0.75}
    height={300}
    theme={{textColor: theme.palette.text.primary, fontSize: 14}}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    sortByValue={true}
    colors={getPieData(moodsForChart).map(p => p.color)}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
    radialLabelsTextColor={theme.palette.text.primary}
    radialLabelsSkipAngle={10}
    radialLabelsLinkColor={{ from: 'color' }}
    radialLabelsLinkHorizontalLength={5}
    sliceLabelsSkipAngle={10}
    sliceLabelsTextColor='black'
    isInteractive={false}
/>}

        </div>
          <RadioGroup
            onChange={e => chosenType(e.target.value)} 
            value={displayType}
            className={classes.radioContainer}
          >
              <FormControl component='fieldset' className={classes.radioFormControl}>
                  <FormControlLabel value='All' control={<Radio/>} label='แสดงทั้งหมด'/>
                  <FormControlLabel value='This week' control={<Radio/>} label='สัปดาห์นี้'/>
              </FormControl>
          </RadioGroup>
        <div
          className={classes.howDoYouFeel}>
          <Typography
            className={classes.howDoYouFeelText}>วันนี้เป็นไงบ้าง? บอกเราหน่อย</Typography>
        </div>
        <div
          className={classes.moodValueContainer}>
          <Typography
            className={classes.moodValueText} style={{color: moodValueColor(moodValue)}}>{moodValueToWords(moodValue)}</Typography>
        </div>
        <div
          className={classes.sliderContainer}>
          <Slider
          className={classes.slider}
            style={{width: 300, height: 40, alignSelf: 'center'}}
            value={moodValue}
            min={1}
            max={5}
            step={1}
            marks={marks}
            valueLabelDisplay="off"
            onChange={handleSliderChange}
      />
          <Button
            onClick={submitMood}
            className={classes.sliderButton}>
            <Typography
              className={classes.sliderButtonText}>
              บันทึก
            </Typography>
          </Button>
        </div>
      </Container>
  )
}


export default MoodTracker;