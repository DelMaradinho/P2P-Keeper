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
        <h3>
          На этой странице вы увидите:{" "}
          <ul>
            <li>Интеграции с биржами.</li>{" "}
            <li>Возможность изменить валюту, в которой вы зарабатываете</li>
            <li>Настройки вашего профиля</li>
            <li>И многое другое</li>
          </ul>
        </h3>
      </div>
    </div>
  );
}

export default Settings;
