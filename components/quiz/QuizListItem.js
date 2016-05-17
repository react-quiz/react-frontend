import React from 'react'
import { ListItem } from 'react-toolbox/list'
import FontIcon from 'react-toolbox/font_icon';
import { IconButton } from 'react-toolbox/button';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import rest from '../../api/rest';
import * as QuizActions from '../../actions/quiz-actions'

class QuizListItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = this.props.data;
  }

  handleDelete() {
    let id = this.state.get('_id');
    this.props.delete({id: id}, null, (err, data) => {
      if (!err) {
        this.props.actions.deleteQuiz(this.state.get('_id'));
      } else {
        console.log(err);
        // TODO: Do something if post fail
      }
    });

  }
  render() {
    let rightActions = [
      <IconButton icon='clear' onClick={this.handleDelete.bind(this)} accent  key="Button"/>
    ];
    return (
      <ListItem
      caption={this.state.get('title')}
      rightActions={rightActions}>
      </ListItem>
    );
  }
}

function select(state) {
  return {
    quiz: state.quiz
  }
}


function bindDispatchToProps(dispatch) {
  return {
    delete: bindActionCreators(rest.actions.apiQuiz.delete, dispatch),
    actions: bindActionCreators(QuizActions, dispatch)
  }
}

export default connect(select, bindDispatchToProps)(QuizListItem);
