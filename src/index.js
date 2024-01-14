import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { StateProvider } from './utils/StateProvider.jsx';
import reducer,{initialState} from './utils/reducer.js';

ReactDOM.render(
  <>
  <StateProvider initialState={initialState} reducer={reducer}>
  <App/>
  </StateProvider>
  </>,
  document.getElementById('root')
);