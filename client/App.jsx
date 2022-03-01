import React from 'react';
import Mainpage from './components/MainPage';
import NavBar from './components/NavBar.js';
import Feed from './pages/Feed';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Mainpage />
    </div>
  );
}
