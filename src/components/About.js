import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles'
import { Container, Card, Typography, Avatar, Switch, Button, FormControlLabel } from '@material-ui/core';
import CatFernGraphic from '../assets/undraw_friends_r511.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLine } from '@fortawesome/free-brands-svg-icons'

const useStyles = makeStyles((theme) => ({
  switchContainer: { 
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    alignItems: 'flex-end',
    width: '100%'
  },
  cardView: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20

  },
  cardCard: {
    borderRadius: 20,
    marginBottom: 30
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 40,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 10,
  },
  bodyText: {
    fontSize: 16,
    margin: 10,
    marginLeft: 20,
  },
  contactText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  bodySpacer: {
    height: 20
  },
  iconButtonSpacer: {
    height: 5
  },
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lineButton: {
    backgroundColor: '#00B900', 
    alignSelf: 'center', 
    width: 200
  },
  lineButtonText: {
    color: 'white', 
    fontSize: 12 
  },
  fbButton: {
    backgroundColor: '#3b5998', 
    alignSelf: 'center', 
    width: 200
  },
  fbButtonText: {
    color: 'white', 
    fontSize: 12, 
    paddingLeft: 8
  }
}));


const About = () => {

  const classes = useStyles();
  const [isEng, setIsEng] = useState(false);
  const toggleLanguage = () => setIsEng((prev) => !prev);

  //   เกี่ยวกับ Fern

  // ชื่อจริง นิลุบล สุขวณิช ชื่อเล่น เฟิร์น ปัจจุบันทำงานเป็นนักจิตวิทยาการปรึกษาของมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ประสบการณ์ทำงานในฐานะนักจิตวิทยาการปรึกษาเริ่มต้น พ.ศ. 2555
  // การศึกษา จบจากมหาวิทยาลัยเชียงใหม่ สาขาจิตวิทยาการปรึกษา ระดับปริญญาโท พ.ศ. 2559 และ สาขาจิตวิทยา(คลินิก) ระดับปริญญาตรี พ.ศ. 2548

  // เกี่ยวกับ App

  // Fern-counseling เป็นแอปพลิเคชัน ที่ให้บริการปรึกษาผ่านการตั้งกระทู้ถามตอบ โดยผู้ใช้งานสามารถเข้ามาอ่านกระทู้ทั้งหมดได้ แต่ในการจะตั้งกระทู้ถามผู้ใช้งานจะต้องทำการ log in ก่อนตั้งกระทู้ เพื่อป้องกันผู้ก่อกวนหรือสร้างความไม่สงบให้แก่ผู้ใช้งานคนอื่นๆ โดยที่ username ในการ log in จะไม่ถูกเปิดเผยต่อสาธารณะ ซึ่งเป็นวัตถุประสงค์ของการสร้างแอปพลิเคชันนี้ขึ้นมาก็คือการทำให้ผู้ใช้งานรู้สึกสบายใจที่จะถาม เพราะไม่มีการเปิดเผยตัวตนให้ผู้ใช้งานคนอื่นๆ ทราบ

  // ติดต่อ Fern

  // Facebook: "คุยกับพี่นิลุ นักจิตวิทยา : Nilu A Counselor"
  // Line: listenbyheart
  // หรือทาง:

  return (
    <Container>
      <div
        className={classes.switchContainer}
      >
        <FormControlLabel
        value={isEng}
        control={<Switch
          onChange={toggleLanguage}
          checked={isEng}
        />}
        label={'Th-En'}
        labelPlacement='top'
        />
        
      </div>
      <div
        className={classes.imageContainer}
      >
        <Avatar src={CatFernGraphic} variant='rounded' style={{height: 220, width: 230}}/>
      </div>
      {!isEng
        ? (
          <div
            className={classes.cardView}
          >
            <Card
              className={classes.cardCard}
            >
              <Typography
                className={classes.titleText}
              >
                เกี่ยวกับ Fern
              </Typography>
              <Typography
                className={classes.bodyText}
              >
                ชื่อจริง นิลุบล สุขวณิช ชื่อเล่น เฟิร์น ปัจจุบันทำงานเป็นนักจิตวิทยาการปรึกษาของมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ประสบการณ์ทำงานในฐานะนักจิตวิทยาการปรึกษาเริ่มต้น พ.ศ. 2555
                การศึกษา จบจากมหาวิทยาลัยเชียงใหม่ สาขาจิตวิทยาการปรึกษา ระดับปริญญาโท พ.ศ. 2559 และ สาขาจิตวิทยา(คลินิก) ระดับปริญญาตรี พ.ศ. 2548
              </Typography>
            </Card>
            <Card
              className={classes.cardCard}
            >
              <Typography
                className={classes.titleText}
              >
                เกี่ยวกับ App
              </Typography>
              <Typography
                className={classes.bodyText}
              >
                แอปพลิเคชันที่ให้ผู้รับบริการสอบถามสิ่งที่ต้องการทราบเกี่ยวกับสุขภาพจิต โดยผู้ใช้งานทุกคนสามารถเข้ามาอ่านกระทู้ได้โดยไม่ต้องเข้าสู่ระบบ แต่ในการจะตั้งกระทู้ถามผู้ใช้งานจะต้องทำการเข้าสู่ระบบก่อนตั้งกระทู้ เพื่อป้องกันผู้ก่อกวนหรือสร้างความไม่สงบให้แก่ผู้ใช้งานคนอื่นๆ โดยที่ email ในการเข้าสู่ระบบจะไม่ถูกเปิดเผยต่อสาธารณะ ซึ่งเป็นวัตถุประสงค์ของการสร้างแอปพลิเคชันนี้ขึ้นมาก็คือการทำให้ผู้ใช้งานรู้สึกสบายใจที่จะถาม เพราะไม่มีการเปิดเผยตัวตนให้ผู้ใช้งานคนอื่นๆ ทราบ
              </Typography>
            </Card>
          </div>
        )
        : (
          <div
            className={classes.cardView}
          >
            <Card
              className={classes.cardCard}
            >
              <Typography
                className={classes.titleText}
              >
                About Fern
              </Typography>
              <Typography
                className={classes.bodyText}
              >
                I'm Nilubon Sukawanich, but you can call me Fern. I work as a counselor at Rajamangala University of Technology Lanna.  I graduated from Chiang Mai University with a Bachelor's degree in Clinical Psychology in 2005, then I completed my Master's degree in Counseling Psychology from the same institution in 2016.  I have been working as a counselor since 2012.
              </Typography>
            </Card>
            <Card
              className={classes.cardCard}
            >
              <Typography
                className={classes.titleText}
              >
                About the App
              </Typography>
              <Typography
                className={classes.bodyText}
              >
                AskFern provides a platform where people can ask questions and receive answers from an experienced counselor.  All users can access and read the forum, but in order to prevent spam and harassment, users must register before posting their own questions, as well as commenting on the posts of others.  The forum is anonymous; no user details will be displayed, and users should avoid including identifying information in their posts and comments.  My intention is to create a safe space for people to talk freely about their issues.
              </Typography>
            </Card>
          </div>
        )}
      <div
        className={classes.contactContainer}
      >
        <div
          className={classes.bodySpacer}
        />
        <Avatar
          src={'https://storage.googleapis.com/askfern.appspot.com/1608721517709fernhippie.jpg'} 
          style={{height: 100, width: 100}}
        />

        {isEng
          ? (
            <Typography
              className={classes.contactText}
            >
              Contact Fern
            </Typography>
          )
          : (
            <Typography
              className={classes.contactText}
            >
              ติดต่อ Fern
            </Typography>
          )}

        <Button
          href='https://line.me/R/ti/p/@791pxbkv'
          target='_blank'
          name="line"
          className={classes.lineButton}
          startIcon={<FontAwesomeIcon icon={faLine} color='white'/>}
        >
          
          <Typography
            className={classes.lineButtonText}
          >Add Official Line
          </Typography>
        </Button>
        <div
          className={classes.iconButtonSpacer}
        />
        <Button
          href='https://www.facebook.com/NiluAcounselor/'
          target='_blank'
          name="facebook"
          className={classes.fbButton}
          startIcon={<FontAwesomeIcon icon={faFacebook} color='white'/>}
        >
          <Typography
            className={classes.fbButtonText}
          >Add Facebook
          </Typography>
        </Button>
      </div>
    </Container>

  );
};



export default About;
