import React from 'react';
import ReactDOM from 'react-dom';
import Hero from './Hero';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Hero />, div);
  ReactDOM.unmountComponentAtNode(div);
});