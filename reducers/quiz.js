import {List, Map} from 'immutable';
import * as types from '../constants/ActionTypes'

const initialState = List.of(
  Map({
      title: "My first item 123",
      id: 0
  })
);

export function quiz(state = initialState, action) {
  switch (action.type) {
    case types.ADD_QUIZ:
      return state;
    case types.LOAD_QUIZ:
      action.quizList.toArray().map(item => {
        state = state.push(item);
      });
      return state;
    default:
      return state;
  }
}
