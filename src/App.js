import './App.css';
import {Routes, Route} from "react-router-dom";
import React from "react";
import Dashboard from "./components/dashboard";
import NavigationBar from "./components/NavigationBar";
import Records from "./components/records";

// App functional component
function App() {
  return (
    <div className="App">
        <NavigationBar/>
      <Routes>
          {/* URL paths of both analytics dashboard and records */}
          <Route path={"/"} element={<Dashboard/>}/>
          <Route path={"/records"} element={<Records/>}/>
      </Routes>
    </div>
  );
}

export default App;
