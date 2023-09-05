import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Calculator from "./pages/calculator";
import Formulas from "./pages/formulas";
import History from "./pages/history";
import Team from "./pages/team";
import MainMenu from "./components/MainMenu/MainMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainMenu />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/formulas" element={<Formulas />} />
        <Route path="/history" element={<History />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;
