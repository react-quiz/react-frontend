import React from 'react'
import { List, ListItem } from 'react-toolbox/list'
import QuizListItem from './QuizListItem'

export default class QuizList extends React.Component {
  state = {
    items: [
      {title: 'List 1'},
      {title: 'List 2'}
    ]
  }
  render() {
    return (
      <section>
        <List selectable ripple>
          {this.state.items.map(quiz => (
            <QuizListItem
            data={quiz}/>
          ))}
        </List>
      </section>
    );
  }
}
