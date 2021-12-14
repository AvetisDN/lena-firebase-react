import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1lbJNiPpQCyOIc771gav5PynR_9sdQaI",
  authDomain: "f-01-7c39c.firebaseapp.com",
  projectId: "f-01-7c39c",
  storageBucket: "f-01-7c39c.appspot.com",
  messagingSenderId: "10080368117",
  appId: "1:10080368117:web:3f20717aa9fad7b5f9dcbc"
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
