import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Typography, Container, CardMedia} from '@material-ui/core';
import {DateTime} from 'luxon'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginBottom: 20,
  },
  pic: {
    display: 'flex',
    width: 300, 
    height: 225, 
    justifyContent: 'center', 
    margin: 'auto', 
    borderRadius: 5,
    marginBottom: 20
  },
  titleContainer: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  titleText: {
    textAlign: 'center',
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  dateText: {
    float: 'right',
  },
  contentContainer: {
    display: 'flex',
    marginLeft: 20,
    marginRight: 20
  },
  contentText: {
    whiteSpace: 'pre-wrap'
  }

}))

const SingleArticleDisplay = () => {

  const classes = useStyles();
  const {articleId} = useParams();
  const article = useSelector(state => state.forum.articles.find(a => a._id === articleId))

  return (
    <Container
      className={classes.container}
    >
      {article && (
        <div>
            <CardMedia
            className={classes.pic}
              alt='article'
              image={article.image}/>
          <div className={classes.titleContainer}>
          <Typography variant='h6' className={classes.titleContainer}>{article.title}</Typography>
          </div>
          <div className={classes.dateContainer}>
          <Typography variant='caption' className={classes.dateText}>{DateTime.fromISO(article.date).toLocaleString()}</Typography>
          </div>
          <div className={classes.contentContainer}>
          <Typography variant='body1' className={classes.contentText}>
            {article.content}
          </Typography>
          </div>
        </div>
      )}
    </Container>
  );
};



export default SingleArticleDisplay;