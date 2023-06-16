import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cricketers from "./Components/Cricketer";
import CricketerDetails from "./Components/CricketerDetail";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Cricketers />} />
          <Route path="/cricketer/:playerId" element={<CricketerDetails />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
