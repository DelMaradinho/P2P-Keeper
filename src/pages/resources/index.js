import React from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
// import "./resources.scss";

function Resources() {
  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["6"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Ресурсы</h1>
      </div>
    </div>
  );
}

export default Resources;
