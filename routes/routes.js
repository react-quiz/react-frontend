import Home from '../components/layout/home';

import rest from "../api/rest";
const { actions } = rest;

export default function routes({ dispatch }) {
  return {
    path: "/",
    component: Home,
    onEnter(state, replaceState, callback) {
      dispatch(actions.allQuiz.sync({}, null, callback));
    },
    onLeave() {
      dispatch(actions.allQuiz.reset());
    }
  };
}
