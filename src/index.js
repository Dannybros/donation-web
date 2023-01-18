import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { StateProvider } from './Reducer/StateProvider';
import reducer, { initialState } from './Reducer/reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
