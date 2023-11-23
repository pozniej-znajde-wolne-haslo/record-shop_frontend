import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Container from './context/Container';

ReactDOM.createRoot(document.getElementById('root')).render(
  /*  <React.StrictMode>  removed to render greet after LOGIN only ONCE*/
  <Container>
    <App />
  </Container>
  /* </React.StrictMode> */
);
