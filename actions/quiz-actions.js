import * as types from '../constants/ActionTypes'

export function addQuiz(title) {
    return {
        type: types.ADD_QUIZ,
        title
    }
}
