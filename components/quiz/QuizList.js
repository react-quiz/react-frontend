import React from 'react'
import { List, ListItem } from 'react-toolbox/list'
import { connect } from "react-redux";
import QuizListItem from './QuizListItem'
import Immutable from 'immutable'

import reduxApi, {transformers} from "redux-api";
import rest from '../../api/rest'
import { bindActionCreators } from 'redux'
import * as QuizActions from '../../actions/quiz-actions'

export default class QuizList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      quizList: this.props.quizList,
      quiz: this.props.quiz
    }

    this.props.onLoad(this.props.quizList)
  }

  render() {
    return (
      <section>
        <List selectable ripple>
          {this.props.quiz.toArray().map(quiz => (
            <QuizListItem key={quiz.get('_id')}
              data={quiz}/>
          ))}
        </List>
      </section>
    );
  }
}

function select(state) {
  if (state.allQuiz.sync) {
    let quizList = Immutable.List.of();
    state.allQuiz.data.data.map(quiz => {
      quizList = quizList.push(Immutable.Map(quiz))
    });

    return {
      quizList: quizList,
      quiz: state.quiz
    }
  }
}
export default connect(select)(QuizList);
