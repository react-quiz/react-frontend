import React from 'react'
import Input from 'react-toolbox/input';
import { Button } from 'react-toolbox/button';
import { connect, PromiseState } from 'react-refetch'
import { bindActionCreators } from 'redux'
import * as QuizActions from '../../actions/quiz-actions'

import * as CONFIG from '../../constants/config'

import reduxApi, {transformers} from "redux-api";
import rest from '../../api/rest'

class QuizForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  state = {
    title: ''
  };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  handleSubmit = (e) => {
    // this.props.post(null, {
    //   body: JSON.stringify({
    //     title: this.state.title
    //   }),
    //   headers: {
    //     "Content-type": "application/json"
    //   }
    // }, (err, data)=> {
    //   console.log(err, data);
    // });
    this.props.postQuiz(this.state.title);
  }

  render() {
    return (
      <section>
        <Input type='text' label='Quiz Title' name='title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')} maxLength={64}/>
        <Button icon='add' label='Add this' flat primary onClick={this.handleSubmit.bind(this)}/>
      </section>
    );
  }
}


function select(state) {
  return {
    postQuiz: title => ({
      postQuizResponse: {
        url: `${CONFIG.API_URL}/quiz`,
        method: 'POST',
        body: JSON.stringify({
          title: title
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        then: function(quiz) {
          console.log(quiz);
        }
      }
    })
  }
}

function bindDispatchToProps(dispatch) {
  return {
    post: bindActionCreators(rest.actions.apiQuiz.post, dispatch)
  }
}

const quizConnector = connect.defaults({
  handleResponse: function (response) {
    console.log(response);
  },
  buildRequest: function(mapping) {
    const options = {
      method: mapping.method,
      headers: mapping.headers,
      credentials: true,
      body: mapping.body
    }

    return new Request(mapping.url, options)
  }
})

export default quizConnector(select, bindDispatchToProps)(QuizForm);
