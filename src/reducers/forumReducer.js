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
    case 'HEART':
      const id = action.data._id
      const questionToChange = state.answered.find(q => q._id === id)
      const changedQuestion = { ...questionToChange, likes: questionToChange.likes + 1 }
      return { ...state, answered: state.answered.map(q => q._id === id ? changedQuestion : q) }
    case 'POST_ANSWER':
      const answerId = action.data._id
      const objectToModify = state.pending.find(s => s._id === answerId)
      const changedToAnswered = { ...objectToModify, isAnswered: true, answer: action.data.answer }
      return { ...state, pending: state.pending.map(s => s._id === answerId ? changedToAnswered : s) }
    case 'ADD_COMMENT':
      const commentedOnId = action.data._id
      console.log(action.data)
      let postToChange = state.answered.find(p => p._id === commentedOnId)
      const newPost = { ...postToChange, comments: postToChange.comments.concat(action.data.comments[action.data.comments.length - 1]) }
      console.log(newPost)
      return { ...state, answered: state.answered.map(s => s._id === commentedOnId ? newPost : s) }
    case 'DELETE_QUESTION':
      return state.filter(q => q.id !== action.data.id)
    case 'SET_TAG_FILTER':
      return { ...state, tagFilter: action.data }
    default: return state
  }
}
export const heart = (question) => {
  return async dispatch => {
    const updatedObject = { ...question, likes: question.likes + 1 }
    await forumService.heartUp(updatedObject)
    dispatch({
      type: 'HEART',
      data: updatedObject
    })
  }
}
export const answerQuestion = (answer) => {
  return async dispatch => {
    try {
      await forumService.update(answer)
      dispatch({
        type: 'POST_ANSWER',
        data: answer
      })
      toast.success('You answered a question!')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
}
export const addComment = (comment, postToModify) => {
  return async dispatch => {
    try {
      await forumService.addComment(comment, postToModify).then(res => {
        dispatch({
          type: 'ADD_COMMENT',
          data: res
        })
      })

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
}
export const addQuestion = data => {
  return async dispatch => {
    try {
      const newQuestion = await forumService.create(data)
      dispatch({
        type: 'NEW_QUESTION',
        data: newQuestion
      })
      toast.success('คำถามของคุณถูกส่งเรียบร้อยแล้ว อดใจรอสักนิด โพสของคุณจะปรากฏหลังได้รับการยืนยันจากแอดมินค่ะ', { autoClose: false })
    } catch (error) {
      toast.error('Something went wrong...')
    }
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
  return {
    type: 'SET_TAG_FILTER',
    data: tag
  }
}

export default forumReducer