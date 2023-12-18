import React from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
import CryptoBarChart from "../../components/CryptoBarChart/CryptoBarChart";
import CryptoPieChart from "../../components/CryptoPieChart/CryptoPieChart";
import "./analysis.scss";

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
        <div className="right__analytics">
        <CryptoBarChart />
        <CryptoPieChart />
        </div>
      </div>
    </div>
  );
}

export default Analysis;
