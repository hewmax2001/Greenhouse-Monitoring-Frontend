import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Router object used to navigate between URL paths
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      {/* Opens App component */}
      <App/>
  </BrowserRouter>
);