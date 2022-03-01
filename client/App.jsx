import React from "react";
import Mainpage from "./components/MainPage"
import Navbar from "./components/Navbar";
import './index.css'

import {BrowserRouter as Router, Switch} from 'react-router-dom';
function App() {
  return (
    <>
      <Navbar/>
      <Mainpage/>
    </>
  )
}

export default App;