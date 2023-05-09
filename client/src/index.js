import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from './redux/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="689025333147-lsi1p9fufm2m0hu6cn8ee5jpd07empe7.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
