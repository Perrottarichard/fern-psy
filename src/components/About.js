import React from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import Fern from '../fern-logo-350.png'
import '../about.css';


const adminLoginButtonStyle = {
  background: 'transparent',
  color: 'white',
  float: 'left',
  // border: 'none'

}

function About() {
  return (
    <Container id='about' className="themed-container" fluid={true}>
      <div id='heading'>
        <h1 id='name'>Nilubon Sukawanich</h1>
        <h4 id='title'>Counselor</h4>
        <a style={adminLoginButtonStyle} href='/admin'>admin</a>
      </div>
      <div style={{ marginBottom: '80px' }}>
        <img src={Fern} alt="fern" />
      </div>
      <hr />
      <ListGroup flush >
        <div id='about-me'>
          <h5>Education:</h5>
        </div>
        <ListGroupItem id='list'>
          มหาวิทยาลัยเชียงใหม่
          วิทยาศาสตร์มหาบัณฑิต สาขาจิตวิทยาการปรึกษา (2557 - 2559)
          <br />
          Chiangmai University
          Master of Science in Counseling Psychology (2014 - 2016)
        </ListGroupItem>
        <ListGroupItem id='list'>
          มหาวิทยาลัยเชียงใหม่
          วิทยาศาสตร์บัณฑิต สาขาจิตวิทยา (2544 - 2547)
          <br />
          Chiangmai University
          Bachelor of Science in Counseling Psychology (2001 - 2004)
        </ListGroupItem>
      </ListGroup>
    </Container>

  );
}

export default About;