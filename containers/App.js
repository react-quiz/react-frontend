'use strict';
import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as QuizActions from '../actions/quiz-actions'

class App extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>
        Hello world
      </div>

    );
  }

}

function bindStateToProps(state) {
  return {
    quiz: state.quiz
  }
}

function bindDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QuizActions, dispatch)
  }
}

export default connect(
  bindStateToProps,
  bindDispatchToProps
)(App);
