import React from 'react'
import Input from 'react-toolbox/input';
import { Button } from 'react-toolbox/button';

class QuizForm extends React.Component {
  state = {
    title: ''
  };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };
  render() {
    return (
      <section>
        <Input type='text' label='Quiz Title' name='title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')} maxLength={64}/>
        <Button icon='add' label='Add this' flat primary />
      </section>
    );
  }
}

export default QuizForm;
