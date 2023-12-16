import React from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
// import "./analysis.scss";

function Analysis() {
  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["4"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Анализ сделок</h1>
        <h3>
          На этой странице вы увидите аналитику по совершенным сделкам.
        </h3>
      </div>
    </div>
  );
}

export default Analysis;
