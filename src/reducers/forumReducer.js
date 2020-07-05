import forumService from '../services/forumService'

const forumReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return state.concat(action.data)
    case 'INIT_QUESTIONS':
      console.log(action.data)
      return action.data
    case 'LIKE':
      const id = action.data.id
      const questionToChange = state.find(q => q.id === id)
      const changedQuestion = { ...questionToChange, likes: questionToChange.likes + 1 }
      return state.map(q => q.id === id ? changedQuestion : q)
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
export const initializeQuestions = () => {
  return async dispatch => {
    const questions = await forumService.getAll()
    dispatch({
      type: 'INIT_QUESTIONS',
      data: questions
    })
  }
}
export default forumReducer