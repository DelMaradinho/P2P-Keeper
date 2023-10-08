import React, { useEffect, useState } from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./formulas.scss";
import DnDFormulasComponent from "../../components/DnDFormulasComponent/DnDFormulasComponent";
import { Modal, Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveInStorage } from "../../helpers/formulas";

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
    id: "1_buy_price",
    value: "Цена покупки",
    type: "variable",
  },
  {
    id: "2_sell_price",
    value: "Цена продажи",
    type: "variable",
  },
  {
    id: "3_spread",
    value: "Спред",
    type: "variable",
  },
  {
    id: "4_net_profit",
    value: "Чистая прибыль",
    type: "variable",
  },
];

const othersList = [
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
    id: "4_currency_sold",
    value: "Дата",
    type: "date",
  },
];

function Formulas() {
  const formulaStore = useSelector((state) => state.formulas.formula);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    saveInStorage(formulaStore);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Link to="/calculator" key="toCalculator">
            <Button>В калькулятор</Button>
          </Link>,
          <Button key="ok" onClick={closeModal}>
            ОК
          </Button>,
        ]}
      >
        Формула сохранена во вкладке "Мои формулы" на странице Калькулятор
        спреда.
      </Modal>
      <div className="left">
        <MainMenu selectedKey={["2"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Создание формул</h1>
        <DnDFormulasComponent
          operations={operationsList}
          variables={variablesList}
          others={othersList}
        />
        <div className="right__formula__button__wrapper">
          <Button shape="round" size="middle" onClick={showModal}>
            Сохранить формулу
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Formulas;
