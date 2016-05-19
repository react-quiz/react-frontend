import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { QuizList } from '../../../components/quiz';

var pathAlias = require('path-alias');

//setup alias:
pathAlias.setAlias('react-toolbox', path.resolve(__dirname, './../../../node_modules/react-toolbox/lib/'));

//require module:

function setup() {
  const props = {

  }

  const renderer = TestUtils.createRenderer()

  renderer.render(
    <QuizList {...props} />
  )

  let output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('QuizList', () => {
    it('initial render', () => {
      const { output } = setup()

      console.log(output);
    })
  })
})
