import React from 'react'
import { List, ListItem } from 'react-toolbox/list'
import QuizListItem from './QuizListItem'

export default class QuizList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      quizList: this.props.data
    }
  }

  render() {
    console.log(this.state.quizList);
    return (
      <section>
        <List selectable ripple>
          {this.state.quizList.map(quiz => (
            <QuizListItem
            data={quiz}/>
          ))}
        </List>
      </section>
    );
  }
}
