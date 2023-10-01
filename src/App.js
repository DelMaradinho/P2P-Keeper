import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Calculator from "./pages/calculator";
import Formulas from "./pages/formulas";
import History from "./pages/history";
import Analysis from "./pages/analysis";
import Team from "./pages/team";
import MainMenu from "./components/MainMenu/MainMenu";
import Resources from "./pages/resources";
import Settings from "./pages/settings";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<MainMenu />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/formulas" element={<Formulas />} />
        <Route path="/history" element={<History />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/team" element={<Team />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
