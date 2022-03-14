import React from 'react';
import ReactDOM from 'react-dom';
import ConnectWallet from './ConnectWallet';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConnectWallet />, div);
  ReactDOM.unmountComponentAtNode(div);
});