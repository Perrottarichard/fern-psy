import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticles } from '../reducers/forumReducer'
import { Container, Col, Row, Card,CardHeader, CardBody, CardImg } from 'reactstrap';
import SpinningLoader from './SpinningLoader'

const cardHeaderStyle = {
  fontFamily: 'Kanit',
  fontSize: '14px',
  backgroundColor: '#343a40',
  color: 'white',
  marginTop: '10px',
  paddingTop: '6px',
  paddingBottom: '6px'
}
const cardBodyStyleQ = {
  fontSize: '14px',
  fontFamily: 'Kanit',
  padding: '10px',
  textAlign: 'left',
  paddingLeft: '10px',
  borderBottom: '1px solid gray',
  backgroundColor: 'white' //super light green
}


// const arrayBufferToBase64 = (buffer) => {
//   var binary = '';
//   var bytes = [].slice.call(new Uint8Array(buffer));
//   bytes.forEach((b) => binary += String.fromCharCode(b));
//   return window.btoa(binary);
// };

const ArticleDisplay = () => {

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const articles = useSelector(state => state.forum.articles)

  console.log(articles)

  useEffect(() => {
      dispatch(getAllArticles())
      setTimeout(() => {
        setIsLoading(false)
      }, 1500);
      setIsLoading(false)
  }, [dispatch])


  if (isLoading) {
    return (
      <SpinningLoader />
    )
  }
  return (
    <Container >
      <Row>
      {articles && articles.map(f =>
        <Col key={f._id}>
            <Card style={{width: 500, height: 400}}>
            <CardImg top style={{width: '100%', height: 300}} 
            // src={`data:image/png;base64,${arrayBufferToBase64(f.image.data.data)}`}
            src={f.image} 
            />
              <CardHeader style={cardHeaderStyle} tag="h5">{f.title}
              </CardHeader>
              <CardBody style={cardBodyStyleQ}>
                {f.content}
              </CardBody>
            </Card>
        </Col>)}
        </Row>
    </Container>
  )
}
export default ArticleDisplay;