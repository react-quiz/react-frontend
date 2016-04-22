'use strict';
import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions'

class App extends React.Component {

  render() {
    return (
      <div>
        <Header {...this.props.actions}/>
         <section className="main">
            <input className="toggle-all" type="checkbox"/>
            <ul className="todo-list">
              {this.props.todos.map(todo =>
                <TodoItem data={todo} key={todo.id} onDelete={this.props.actions.deleteTodo}/>
              )}
            </ul>
            <Footer/>
         </section>
      </div>

    );
  }

}

function bindStateToProps(state) {
  return {
    todos: state.todos
  }
}

function bindDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  bindStateToProps,
  bindDispatchToProps
)(App);
