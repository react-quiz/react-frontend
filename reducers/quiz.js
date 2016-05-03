import {List, Map} from 'immutable';
import * as types from '../constants/ActionTypes'

const initialState = List.of(
  Map({
      title: "My first item",
      id: 0
  })
);

export function quiz(state = initialState, action) {
  switch (action.type) {
    case types.ADD_QUIZ:
      return state;
    break;
    default:
      return state;
  }
}
