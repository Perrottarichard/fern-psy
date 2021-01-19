import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from 'react-redux'
import {RadioGroup, Radio, Typography, Card, CardContent, TextField, Button, Divider, Container, FormControl, FormControlLabel} from '@material-ui/core'
import {BigHead} from '@bigheads/core'
import {updateUserAvatar} from '../reducers/activeUserReducer'
import {notify} from '../reducers/activeUserReducer'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    overflowY: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatListContainer: {
    display: 'flex',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  overflowY: 'hidden',
  justifyContent: 'flex-start',
  textAlign: 'center',
  height: 'auto',
  width: 'auto',
  marginLeft: 10,
  marginRight: 10,
  alignItems: 'center',
  scrollBehavior: 'smooth'
  },
  eachItemContainer: {
    display: 'flex',
  textAlign: 'center',
  height: 200,
  width: 'auto',
  marginLeft: 10,
  marginRight: 10,
  alignItems: 'center',
  },
  surface: {
    minWidth: 300,
    paddingTop: 5,
    elevation: 4,
    marginTop: 0,
    height: 280,
    marginRight: 12,
    borderColor: theme.palette.grey[500],
    borderWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 10
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 10
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    height: 300,
    paddingBottom: 20,
    alignSelf: 'center'
  },
  avatarPreview: {
    alignSelf: 'center',
    marginTop: 0,
    paddingTop: 0,
  },
  textInput: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0
  },
  groupCategoryText: {
    fontSize: 14,
    alignSelf: 'center',
    height: 24,
  },
  radioButtonItems: {
    height: 33,
    paddingBottom: 10
  },
  radio: {
    color: 'lightpink'
  },
  submitButton: {
    backgroundColor: 'pink',
    color: 'black',
    borderRadius: 20,
    width: 300,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  submitButtonText: {
    alignSelf: 'center',
    color: 'black'
  }
}))

const PinkRadio = withStyles({
  root: {
    color: 'lightpink',
    '&$checked': {
      color: 'lightpink',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'lightpink',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'lightgray',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightgray',
      },
      '&:hover fieldset': {
        borderColor: 'lightpink',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'lightpink',
      },
    },
  },
})(TextField);
 
const accessoryButtons = [
  {name: "ไม่มี", value: "none"},
  {name: "แว่นตาทรงกลม", value: "roundGlasses"},
  {name: "แว่นตาจิ๋ว", value: "tinyGlasses"},
  {name: "แว่นตาดำ", value:"shades"},
]

const hatButtons = [
  {name: 'ไม่สวมหมวก', value: 'none'},
  {name: 'ไหมพรม', value: 'beanie'},
  {name: 'ผ้าโพกหัว', value: 'turban'},
]
const bodyButtons = [
  {name: "มีหน้าอก", value: "breasts"},
  {name: "ไม่มีหน้าอก", value: "chest"}
]

const clothingButtons = [
  {name: "เสื้อยืด", value: "shirt"}, 
  {name: "ไม่ใส่เสื้อ", value: "naked"},
  {name: "เสื้อคอวี", value: "vneck"},
  {name: "เสื้อเชิ้ต", value: "dressShirt"},
  {name: "เสื้อแขนกุด", value:"tankTop"},
  {name: "เดรส", value: "dress"}
]

const clothingColorButtons = [
  {name: "ขาว", value: "white"}, 
  {name: "ฟ้า", value: "blue"},
  {name: "เขียว", value: "green"},
  {name: "แดง", value: "red"},
  {name: "ดำ", value:"black"},
]
const hatColorButtons = [
  {name: "ขาว", value: "white"}, 
  {name: "ฟ้า", value: "blue"},
  {name: "เขียว", value: "green"},
  {name: "แดง", value: "red"},
  {name: "ดำ", value:"black"},
]

const lipColorButtons = [
  {name: "ม่วง", value: "purple"}, 
  {name: "ชมพู", value: "pink"},
  {name: "เขียว", value: "green"},
  {name: "แดง", value: "red"},
  {name: "ฟ้า", value:"turqoise"},
]

const eyebrowsButtons = [
  {name: "คิ้วต่ำ", value: "leftLowered"}, 
  {name: "คิ้วโก่ง", value: "raised"},
  {name: "เคร่งเครียด", value: "serious"},
  {name: "โกรธ", value: "angry"},
  {name: "ครุ่นคิด", value:"concerned"},
]

const eyesButtons = [
  {name: "ปกติ", value: "normal"}, 
  {name: "มึนหัว", value: "dizzy"},
  {name: "มีความสุข", value: "happy"},
  {name: "หรี่ตา", value: "squint"},
  {name: "หลับตาข้างเดียว", value:"wink"},
  {name: "จุด", value: "simple"},
]

const facialHairButtons = [
  {name: "ไม่มี", value: "none"}, 
  {name: "หนวดหรอมแหรม", value: "stubble"},
  {name: "หนวดเครา", value: "mediumBeard"},
]

const hairButtons = [
  {name: "ไม่มี", value: "none"}, 
  {name: "ผมยาว", value: "long"},
  {name: "ผมสั้น", value: "short"},
  {name: "มวยผม", value: "bun"},
  {name: "ผมทรงกะลา", value:"pixie"},
  {name: "ผมบ๊อบ", value: "bob"},
]

const hairColorButtons = [
  {name: "น้ำตาล", value: "brown"}, 
  {name: "ดำ", value: "black"},
  {name: "ฟ้า", value: "blue"},
  {name: "ขาว", value: "white"},
  {name: "ชมพู", value: "pink"}, 
  {name: "บลอนด์", value: "blonde"},
]

const skinToneButtons = [
  {name: "น้ำตาล", value: "brown"}, 
  {name: "ดำ", value: "black"},
  {name: "เหลือง", value: "yellow"},
  {name: "แดง", value: "red"},
  {name: "สีอ่อน", value:"light"},
  {name: "สีเข้ม", value: "dark"}, 
]

const mouthButtons = [
  {name: "ทาลิป", value: "lips"}, 
  {name: "เคร่งเครียด", value: "serious"},
  {name: "ยิ้มยิงฟัน", value: "grin"},
  {name: "เศร้า", value: "sad"},
  {name: "ยิ้มกว้าง", value:"open"},
  {name: "แลบลิ้น", value: "tongue"},
]

const DATA = [
  {
    type: 'body',
    buttons: bodyButtons,
    title: 'รูปร่าง',
    level: 1
  },
  {
    type: 'eyebrows',
    buttons: eyebrowsButtons,
    title: 'คิ้ว',
    level: 1
  },
  {
    type: 'lipColor',
    buttons: lipColorButtons,
    title: 'สีริมฝีปาก',
    level: 1
  },
  {
    type: 'skinTone',
    buttons: skinToneButtons,
    title: 'สีผิว',
    level: 1
  },
  {
    type: 'facialHair',
    buttons: facialHairButtons,
    title: 'หนวด',
    level: 1
  },
  {
    type: 'hair',
    buttons: hairButtons,
    title: 'ทรงผม',
    level: 1
  },
  {
    type: 'hairColor',
    buttons: hairColorButtons,
    title: 'สีผม',
    level: 1
  },
  {
    type: 'clothingColor',
    buttons: clothingColorButtons,
    title: 'สีเสื้อผ้า',
    level: 1
  },
  {
    type: 'mouth',
    buttons: mouthButtons,
    title: 'ปาก',
    level: 2
  },
  {
    type: 'eyes',
    buttons: eyesButtons,
    title: 'ตา',
    level: 2
  },
  {
    type: 'clothing',
    buttons: clothingButtons,
    title: 'เสื้อผ้า',
    level: 3
  },
  {
    type: 'accessory',
    buttons: accessoryButtons,
    title: 'เครื่องประดับ',
    level: 4
  },
  {
    type: 'hat',
    buttons: hatButtons,
    title: 'หมวก',
    level: 4
  },
  {
    type: 'hatColor',
    buttons: hatColorButtons,
    title: 'สีของหมวก',
    level: 4
  },

]

const AvatarPreview = () => {

  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(state => state.activeUser.user)
  const userLevel = useSelector(state => state.activeUser.userLevel)
  let avatarProps;
  if(user){
    avatarProps = user.avatarProps
  }
  let avatarName;
  if(user){
    avatarName = user.avatarName
  }
  const [name, setName] = useState(avatarName || 'anonymous')
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const [avatarPropsLocal, setAvatarPropsLocal] = useState({
    accessory: avatarProps.accessory ? avatarProps.accessory : 'none',
      body:avatarProps.body ? avatarProps.body :'breasts',
      clothing:avatarProps.clothing ? avatarProps.clothing :'shirt',
      clothingColor:avatarProps.clothingColor ? avatarProps.clothingColor :'white',
      eyebrows:avatarProps.eyebrows ? avatarProps.eyebrows :'leftLowered',
      eyes:avatarProps.eyes ? avatarProps.eyes :'normal',
      facialHair:avatarProps.facialHair ? avatarProps.facialHair :'none',
      graphic:avatarProps.graphic ? avatarProps.graphic :'none',
      hair:avatarProps.hair ? avatarProps.hair :'none',
      hairColor:avatarProps.hairColor ? avatarProps.hairColor :'brown',
      skinTone:avatarProps.skinTone ? avatarProps.skinTone :'brown',
      mouth:avatarProps.mouth ? avatarProps.mouth : 'lips',
      hat: avatarProps.hat ? avatarProps.hat : 'none',
      hatColor: avatarProps.hatColor ? avatarProps.hatColor : 'green',
      lipColor: avatarProps.lipColor ? avatarProps.lipColor : 'pink',
      showBackground: true,
      bgShape: 'circle',
      bgColor: 'blue',
      lashes: true
  })

  useEffect(() => {
    if(user){
      setIsLoading(false)
    }
  }, [user])
  const submitUpdate = async () => {
    if(!name) {
      dispatch(notify('error', 'ตั้งชื่อให้เราด้วยนะ'))
    }else{
      const id = user._id
      const avatarProps = {
        hat: avatarPropsLocal.hat,
        hatColor: avatarPropsLocal.hatColor,
        lashes: avatarPropsLocal.lashes,
        lipColor: avatarPropsLocal.lipColor,
        accessory: avatarPropsLocal.accessory,
        body: avatarPropsLocal.body,
        clothing: avatarPropsLocal.clothing,
        clothingColor: avatarPropsLocal.clothingColor,
        eyebrows: avatarPropsLocal.eyebrows,
        eyes: avatarPropsLocal.eyes,
        facialHair: avatarPropsLocal.facialHair,
        graphic: avatarPropsLocal.graphic,
        hair: avatarPropsLocal.hair,
        hairColor: avatarPropsLocal.hairColor,
        skinTone: avatarPropsLocal.skinTone,
        mouth: avatarPropsLocal.mouth,
      }
      const avatarName = name
      try {
        dispatch(updateUserAvatar(id, avatarProps, avatarName))
        history.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleValueChange = (type, event) => {

    let newValue = event.target.value

    switch(type) {
      case 'accessory':
        setAvatarPropsLocal({...avatarPropsLocal, accessory: newValue});
        break;
      case 'body':
        setAvatarPropsLocal({...avatarPropsLocal, body: newValue});
        break;
      case 'clothing':
        setAvatarPropsLocal({...avatarPropsLocal, clothing: newValue});
        break;
      case 'clothingColor':
        setAvatarPropsLocal({...avatarPropsLocal, clothingColor: newValue});
        break;
      case 'eyebrows':
        setAvatarPropsLocal({...avatarPropsLocal, eyebrows: newValue});
        break;
      case 'eyes':
        setAvatarPropsLocal({...avatarPropsLocal, eyes: newValue});
        break;
      case 'facialHair':
        setAvatarPropsLocal({...avatarPropsLocal,facialHair: newValue});
        break;
      case 'graphic':
        setAvatarPropsLocal({...avatarPropsLocal, graphic: newValue});
        break;
      case 'hair':
        setAvatarPropsLocal({...avatarPropsLocal, hair: newValue});
        break;
      case 'hairColor':
        setAvatarPropsLocal({...avatarPropsLocal, hairColor: newValue});
        break;
      case 'mouth':
        setAvatarPropsLocal({...avatarPropsLocal, mouth: newValue});
        break;
      case 'skinTone':
        setAvatarPropsLocal({...avatarPropsLocal,skinTone: newValue});
        break;
      case 'hat':
        setAvatarPropsLocal({...avatarPropsLocal, hat: newValue});
        break;
      case 'hatColor':
        setAvatarPropsLocal({...avatarPropsLocal, hatColor: newValue});
        break;
      case 'lipColor':
        setAvatarPropsLocal({...avatarPropsLocal, lipColor: newValue});
        break;
      default:
        return null;
      }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  return(
    <Container
      className={classes.container}
    >
      <div
        className={classes.previewContainer}
      >
        <CssTextField
          className={classes.textInput}
          variant='outlined'
          label="ชื่อ"
          value={name}
          onChange={handleNameChange}
        />
        <BigHead
          accessory={avatarPropsLocal.accessory}
          body={avatarPropsLocal.body}
          clothing={avatarPropsLocal.clothing}
          clothingColor={avatarPropsLocal.clothingColor}
          eyebrows={avatarPropsLocal.eyebrows}
          eyes={avatarPropsLocal.eyes}
          facialHair={avatarPropsLocal.facialHair}
          graphic={avatarPropsLocal.graphic}
          hair={avatarPropsLocal.hair}
          hairColor={avatarPropsLocal.hairColor}
          hat={avatarPropsLocal.hat}
          hatColor={avatarPropsLocal.hatColor}
          lashes
          lipColor={avatarPropsLocal.lipColor}
          mouth={avatarPropsLocal.mouth}
          skinTone={avatarPropsLocal.skinTone}
          faceMask={false}
        />
      </div>
      <div
        className={classes.flatListContainer}
      >
        {DATA.map(item => 
       <Card
    className={classes.surface}
    key={item.type}
  >
    <Typography
      className={classes.groupCategoryText}
    >
      {item.title}
    </Typography>
    <Divider
      style={{margin: 3}}/>
    {userLevel >= item.level ?
    <FormControl component='fieldset' className={classes.formControl}>
      <RadioGroup
        onChange={e => handleValueChange(item.type, e)}
        value={avatarPropsLocal[item.type]}
    >
        {item.buttons.map(b => (
          <FormControlLabel key={b.value} value={b.value} control={<PinkRadio size='small'/>} label={b.name}/>
            ))}
      </RadioGroup>
      </FormControl>
    : 
      <div
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        {/* <Micon
          name='lock' size={90} color='gray'/> */}
        <Typography>
          Level: {item.level}
        </Typography>
      </div>}
  </Card>
        )}


      </div>
        <Button
          variant='contained' className={classes.submitButton} onClick={submitUpdate}
        >
          <Typography
            className={classes.submitButtonText}
          >
            บันทึก
          </Typography>
        </Button>
    </Container>
  )
}


export default AvatarPreview;