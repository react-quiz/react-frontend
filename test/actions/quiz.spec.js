import expect from 'expect'
import * as types from '../../constants/ActionTypes'
import * as actions from '../../actions/quiz-actions'

describe('quiz actions', () => {
  it('addQuiz should create ADD_QUIZ action', () => {
    expect(actions.addQuiz({
      id: 'xyz',
      title: 'Test Quiz'
    })).toEqual({
      type: types.ADD_QUIZ,
      quiz: {
        id: 'xyz',
        title: 'Test Quiz'
      }
    })
  })
})
