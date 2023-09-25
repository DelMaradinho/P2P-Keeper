import React, { useState } from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./formulas.scss";
import DnDFormulasComponent from "../../components/DnDFormulasComponent/DnDFormulasComponent";

const operationsList = [
  {
    id: "1_plus",
    value: "Прибавить",
    type: "operation",
  },
  {
    id: "2_minus",
    value: "Отнять",
    type: "operation",
  },
  {
    id: "3_multiply",
    value: "Умножить",
    type: "operation",
  },
  {
    id: "4_divide",
    value: "Разделить",
    type: "operation",
  },
];

const variablesList = [
  {
    id: "1_platform",
    value: "Платформа",
    type: "variable",
  },
  {
    id: "2_currency_bought",
    value: "Что купил",
    type: "variable",
  },
  {
    id: "3_currency_sold",
    value: "Что продал",
    type: "variable",
  },
  {
    id: "4_buy_price",
    value: "За сколько купил",
    type: "variable",
  },
  {
    id: "5_sell_price",
    value: "За сколько продал",
    type: "variable",
  },
  {
    id: "6_expences",
    value: "Расходы",
    type: "variable",
  },
  {
    id: "7_spread",
    value: "Спред",
    type: "variable",
  },
  {
    id: "8_net_profit",
    value: "Чистая прибыль",
    type: "variable",
  },
];

function Formulas() {
  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["2"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Создание формул</h1>
        <DnDFormulasComponent
          operations={operationsList}
          variables={variablesList}
        />
      </div>
    </div>
  );
}

export default Formulas;
