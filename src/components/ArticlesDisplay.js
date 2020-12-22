import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticles } from '../reducers/forumReducer'
import { Container, Card,CardHeader, CardImg } from 'reactstrap';
import SpinningLoader from './SpinningLoader'


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
    <Container style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', margin: 20}}>
      {articles.length > 0 ? articles.map(f =>
        <div key={f._id} style={{width: 420, height: 360}}>
            <Card style={{width: 400, height: 340, padding: 0}}>
            <CardImg top style={{width: 400, height: 300}} 
            // src={`data:image/png;base64,${arrayBufferToBase64(f.image.data.data)}`}
            src={f.image} 
            />
              <CardHeader  tag="h5">{f.title}
              </CardHeader>
            </Card>
            </div>) : null}
    </Container>
  )
}
export default ArticleDisplay;