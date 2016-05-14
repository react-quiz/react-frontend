import React from 'react'
import { ListItem } from 'react-toolbox/list'
import FontIcon from 'react-toolbox/font_icon';
import { IconButton } from 'react-toolbox/button';

export default class QuizListItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = this.props.data;
  }

  test() {
    alert('test');
  }
  render() {
    let rightActions = [
      <IconButton icon='clear' onClick={this.test} accent  key="Button"/>
    ];
    return (
      <ListItem
      caption={this.state.get('title')}
      rightActions={rightActions}>
      </ListItem>
    );
  }
}
