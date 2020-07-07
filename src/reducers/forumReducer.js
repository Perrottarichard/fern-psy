import forumService from '../services/forumService'

const forumReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return state
    case 'INIT_FORUM_PENDING':
      return action.data
    case 'INIT_FORUM_ANSWERED':
      return action.data
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
  }
}
export const answerQuestion = (answer) => {
  return async dispatch => {
    await forumService.update(answer)
    dispatch({
      type: 'POST_ANSWER',
      data: answer
    })
  }
}
export const addQuestion = data => {
  return async dispatch => {
    const newQuestion = await forumService.create(data)
    dispatch({
      type: 'NEW_QUESTION',
      data: newQuestion
    })
  }
}
export const deleteQuestion = data => {
  return async dispatch => {
    await forumService.remove(data)
    dispatch({
      type: 'DELETE_QUESTION',
      data
    })
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
export default forumReducer