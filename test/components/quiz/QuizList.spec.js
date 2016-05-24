import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect';
import React from 'react';
import nock from 'nock'
import TestUtils from 'react-addons-test-utils';
import { QuizList } from '../../../components/quiz';
import {List, Map} from 'immutable';
import reduxApi from "../../../api/rest";
import { Provider } from 'react-redux'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

//require module:
function setup() {
  const props = {
    store: store,
    quiz: List.of(Map({_id: '1', 'title': 'test'})),
    actions: {
      loadQuiz: function() {
        // console.log('do nothing');
      }
    }
  }

  const renderer = TestUtils.createRenderer()
  const store = mockStore({
    quiz: List.of(Map({_id: '1', 'title': 'test'})),
    ...reduxApi.reducers
  });

  const renderedComponent = TestUtils.renderIntoDocument(
    <Provider store={store}>
      <QuizList  {...props} onLoad={props.actions.loadQuiz}/>
    </Provider>
  );

  return {
    props: props,
    output: renderedComponent,
    renderer: renderer
  }
}

describe('components', () => {
  describe('QuizList', () => {
    before('render and locate element', function() {
      const { output } = setup();

      this.quizList = TestUtils.findRenderedDOMComponentWithClass(
        output,
        'quiz-list'
      );

    });

    it('QuizList should exist', function() {
      expect(this.quizList).toExist();
    });

  })
})
