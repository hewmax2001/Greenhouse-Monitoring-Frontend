
import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";

import React from "react";
import Dashboard from "./components/dashboard";
import Menu from "./components/Menu";
import Records from "./components/records";


function App() {
  return (
    <div className="App">
        <Menu/>
      <Routes>
        <Route path={"/capstone_react_frontend"} element={<Dashboard/>}/>
        <Route path={"/records"} element={<Records/>}/>
      </Routes>
    </div>
  );
}

export default App;
