import forumService from '../services/forumService'
import { toast } from 'react-toastify'

const initialState = {
  answered: [],
  pending: [],
  tagFilter: ''
}
const forumReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return state
    case 'INIT_FORUM_PENDING':
      return { ...state, pending: action.data }
    case 'INIT_FORUM_ANSWERED':
      return { ...state, answered: action.data }
    case 'LIKE':
      const id = action.data.id
      const questionToChange = state.find(q => q.id === id)
      const changedQuestion = { ...questionToChange, likes: questionToChange.likes + 1 }
      return state.map(q => q.id === id ? changedQuestion : q)
    case 'POST_ANSWER':
      const answerId = action.data._id
      const objectToModify = state.find(s => s._id === answerId)
      const changedToAnswered = { ...objectToModify, isAnswered: true, answer: action.data.answer }
      return state.map(s => s._id === answerId ? changedToAnswered : s)
    case 'DELETE_QUESTION':
      return state.filter(q => q.id !== action.data.id)
    case 'SET_TAG_FILTER':
      return { ...state, tagFilter: action.data }
    default: return state
  }
}
export const upLike = (question) => {
  return async dispatch => {
    const updatedObject = { ...question, likes: question.likes + 1 }
    await forumService.like(updatedObject)
    dispatch({
      type: 'LIKE',
      data: updatedObject
    })
    toast.success('You like a post!')
  }
}
export const answerQuestion = (answer) => {
  return async dispatch => {
    await forumService.update(answer)
    dispatch({
      type: 'POST_ANSWER',
      data: answer
    })
    toast.success('You answered a question!')
  }
}
export const addQuestion = data => {
  return async dispatch => {
    const newQuestion = await forumService.create(data)
    dispatch({
      type: 'NEW_QUESTION',
      data: newQuestion
    })
    toast.success('You submitted a question! In order to keep the forum a great place for everyone, your post will not appear publicly until Fern answers it. Check back soon!', { autoClose: false })
  }
}
export const deleteQuestion = data => {
  return async dispatch => {
    await forumService.remove(data)
    dispatch({
      type: 'DELETE_QUESTION',
      data
    })
    toast.success('Question deleted')
  }
}
export const initializeForumPending = () => {
  return async dispatch => {
    const questions = await forumService.getPending()
    dispatch({
      type: 'INIT_FORUM_PENDING',
      data: questions
    })
  }
}
export const initializeForumAnswered = () => {
  return async dispatch => {
    const answered = await forumService.getAnswered()
    dispatch({
      type: 'INIT_FORUM_ANSWERED',
      data: answered
    })
  }
}
export const setTagFilter = (tag) => {
  console.log(tag)
  return {
    type: 'SET_TAG_FILTER',
    data: tag
  }
}
export default forumReducer