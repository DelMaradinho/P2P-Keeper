import React from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
// import "./settings.scss";

function Settings() {
  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["7"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Настройки</h1>
      </div>
    </div>
  );
}

export default Settings;
