import React from 'react'
import { ListItem } from 'react-toolbox/list'
export default class QuizListItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = this.props.data;
  }

  render() {
    return (
      <ListItem
      caption={this.state.title}
      leftIcon='clear'/>
    );
  }
}
