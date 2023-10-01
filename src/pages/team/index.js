import React from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
// import "./settings.scss";

function Team() {
  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["7"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Команда</h1>
      </div>
    </div>
  );
}

export default Team;
