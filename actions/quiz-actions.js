import * as types from '../constants/ActionTypes'

export function addQuiz(quiz) {
    return {
      type: types.ADD_QUIZ,
      quiz
    }
}

export function loadQuiz(quizList) {
    return {
        type: types.LOAD_QUIZ,
        quizList
    }
}

export function deleteQuiz(id) {
    return {
        type: types.DELETE_QUIZ,
        id
    }
}
