import React from 'react'
import { List, ListItem } from 'react-toolbox/list'
import { connect } from "react-redux";
import QuizListItem from './QuizListItem'

export default class QuizList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      quizList: this.props.quizList
    }
  }

  render() {
    return (
      <section>
        <List selectable ripple>
          {this.state.quizList.map(quiz => (
            <QuizListItem key={quiz.get('id')}
              data={quiz}/>
          ))}
        </List>
      </section>
    );
  }
}

function select(state) {
  return {
    quizList: state.allQuiz.data
  }
}
export default connect(select)(QuizList);
