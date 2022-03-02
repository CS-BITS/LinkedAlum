import React from 'react';
import Mainpage from './components/MainPage';
import NavBar from './components/NavBar.js';
import Feed from './pages/Feed';
// import { Router } from 'react-router';
import { BrowserRouter, Routes, Route, browserHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const customHistory = createBrowserHistory();
export default function App() {
  return (
    <div>
      <BrowserRouter history={customHistory}>
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/feed' element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
