
import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";

import React from "react";
import Dashboard from "./components/dashboard";
import Menu from "./components/Menu";
import Records from "./components/records";

// App functional component
function App() {
  return (
    <div className="App">
        <Menu/>
      <Routes>
          {/* URL paths of both analytics dashboard and records */}
          <Route path={"/"} element={<Dashboard/>}/>
          <Route path={"/records"} element={<Records/>}/>
      </Routes>
    </div>
  );
}

export default App;
