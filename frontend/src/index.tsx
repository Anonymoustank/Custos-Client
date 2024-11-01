import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Callback from './Callback';
import FrontendView from './FrontendView';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/frontendView" element={<FrontendView />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);