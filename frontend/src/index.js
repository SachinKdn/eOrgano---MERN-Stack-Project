import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 2nd step redux completed - add provider to provide the store to application and replace React.StrictMode with Provider
import {Provider} from "react-redux";
import store from "./store"

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  timeout: 5000,
  offset: '40px',
  position : positions.BOTTOM_CENTER,
  transition : transitions.SCALE,
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>
);
