import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticles } from '../reducers/forumReducer'
import { Container, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography} from '@material-ui/core';
import {Visibility} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import SpinningLoader from './SpinningLoader'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    flexWrap: 'wrap', 
    margin: 20,
    padding: 0
  },
  card: {
    display: 'flex',
    height: 360,
    width: 300,
    marginRight: 20,
    paddingTop: 0,
    marginTop: 0
  },
  cardActionArea: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    margin: 0,
    padding: 0
  },
  cardMedia: {
    display: 'flex',
    width: 300,
    height: 225
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 'auto',
    width: 300,
  },
}));

const ArticleDisplay = () => {

  const classes = useStyles();
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
    
    <Container className={classes.container}>
      {articles.length > 0 ? articles.map(f =>
            <Card key={f._id} className={classes.card}>
            <CardActionArea className={classes.cardActionArea}>
            <CardMedia className={classes.cardMedia} 
            image={f.image} 
            />
            <CardContent className={classes.cardContent}>
              <Typography variant='body2'>{f.title}
              </Typography> 
              </CardContent>
              <CardActions style={{marginTop: 'auto', width: '100%', justifyContent: 'flex-end'}}>
              <Visibility fontSize='small' style={{marginRight: 10}}/>
              {f.views}
              </CardActions>
              </CardActionArea>
              
            </Card>
) : null}
    </Container>
  )
}
export default ArticleDisplay;