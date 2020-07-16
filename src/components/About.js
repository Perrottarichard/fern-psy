import React from 'react';
import { Container } from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import Fern1 from '../fernanimal.jpg'
import Fern2 from '../fernhippie500.jpg'
import Fern3 from '../fernjapan.jpg'
import '../about.css';


function About() {


  const items = [
    {
      src: `${Fern2}`,
      altText: 'Slide 1',
      key: '1',
      caption: ''
    },
    {
      src: `${Fern1}`,
      altText: 'Slide 2',
      key: '2',
      caption: ''
    },
    {
      src: `${Fern3}`,
      altText: 'Slide 3',
      key: '3',
      caption: ''
    }
  ];

  return (
    <Container id='about' className="themed-container" fluid={true}>
      <div id='heading'>
        <h1 id='name'>Nilubon Sukawanich</h1>
        <h4 id='title'>Counselor</h4>
        {/* <img src={Fern} alt="fern" /> */}
        <div className='about-image-div'>
          <UncontrolledCarousel items={items} autoPlay={false} style={{ height: '500px', width: '500px', textAlign: 'center' }} />
        </div>
        {/* <img src={Fern2} alt="fern" style={{ maxWidth: '70%' }} /> */}
      </div>
      <hr />
      <Container style={{ textAlign: 'left' }}>
        <p>
          สวัสดีค่ะ
          ก่อนอื่นต้องขอขอบคุณทุกคนที่เข้าใช้งานและแวะเข้ามาเยี่ยมชมนะคะ
        </p>

        <p>
          ดิฉัน นางสาวนิลุบล สุขวณิช มีชื่อเล่นว่า เฟิร์น
          ปัจจุบันทำงานเป็น 'นักจิตวิทยาการปรึกษา' อยู่ที่มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
        </p>

        <p>
          เหตุผลที่ทำเว็บนี้ขึ้นมา เพราะอยากให้มีพื้นที่ปลอดภัยในการพูดคุยกับนักจิตวิทยาการปรึกษาเพิ่มมากขึ้น โดยที่ผู้ใช้งานยังคงสามารถรักษาความเป็นส่วนตัวได้ ลดความเสี่ยงต่อการถูกคุกคามทางไซเบอร์จากคอมเม้นท์ที่มีความรุนแรงหยาบคาย หรือถูกสืบประวัติส่วนตัวจากผู้ใช้งานคนอื่น ๆ รวมถึงได้รับข้อมูลเกี่ยวกับสุขภาพจิตที่ถูกต้องเชื่อถือได้จากนักจิตวิทยาการปรึกษา
        </p>

        <p>
          ดิฉัน มีความมุ่งมั่นตั้งใจที่จะร่วมเป็นส่วนหนึ่งในการทำให้สังคมไทยเป็นสังคมน่ารักน่าอยู่มากขึ้น ด้วยการนำความรู้ความสามารถของตัวเองมาใช้ให้เกิดประโยชน์มากที่สุดเท่าที่จะทำได้ นั่นก็คือการขอเป็นใครสักคนที่รับฟังปัญหาเรื่องราวความทุกข์ใจของท่านอย่างไม่ตัดสิน โดยเฉพาะให้กับคนที่ไม่รู้จะว่าคุยกับใครดี ไม่กล้าที่จะถามบุคคลใกล้ชิด ไม่อยากเปิดเผยเรื่องราวให้กับคนที่รู้จัก
        </p>
        <p>
          โดยท่านสามารถตั้งกระทู้และส่งคำถามส่วนตัวบนเว็บนี้ได้ฟรีไม่มีค่าใช้จ่าย
        </p>

        <p>
          และหากใครที่สนใจอยากกดไลค์ กดติดตาม  เพื่ออ่านบทความข่าวสาร หรืออยากสนับสนุนให้กำลังใจดิฉัน ก็สามารถเข้าไปกดไลค์กดแชร์กันได้ที่ Facebook: คุยกับพี่นิลุ นักจิตวิทยา : Nilu A Counselor นะคะ
        </p>
        <p>
          ทั้งนี้ หากใครที่ต้องการนัดหมายปรึกษาแบบพบตัว จะมีค่าใช้จ่ายนะคะ
        </p>
        <p>
          หวังว่าทุกคนจะ 'Feel free to talk' เพื่อจะได้มีสุขภาพจิตที่ดี มีความสุขกับการใช้พื้นที่ตรงนี้ไปด้วยกัน
        </p>
        <p>
          และ..มีเมตตาต่อกันและกันนะคะ
        </p>
        <h5>Education:
        </h5>
        <p>มหาวิทยาลัยเชียงใหม่
        วิทยาศาสตร์มหาบัณฑิต สาขาจิตวิทยาการปรึกษา (2557 - 2559)<br />
        Chiangmai University
          Master of Science in Counseling Psychology (2014 - 2016)</p>
        <p>
          มหาวิทยาลัยเชียงใหม่
          วิทยาศาสตร์บัณฑิต สาขาจิตวิทยา (2544 - 2547) <br />
          Chiangmai University
          Bachelor of Science in Counseling Psychology (2001 - 2004)
          </p>
      </Container>


    </Container>

  );
}

export default About;