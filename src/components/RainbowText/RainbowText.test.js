import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';
import RainbowText from './RainbowText';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RainbowText />, div);
  ReactDOM.unmountComponentAtNode(div);
});