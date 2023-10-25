
import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";

import React from "react";
import Page from "./components/dashboard";
import Menu from "./components/Menu";
import Records from "./components/records";


function App() {
  return (
    <div className="App">
        <Menu/>
      <Routes>
        <Route path={"/"} element={<Page/>}/>
        <Route path={"/records"} element={<Records/>}/>
      </Routes>
    </div>
  );
}

export default App;
