import React, { useState } from "react";
import CalculatorItem from "../../components/CalculatorItem/CalculatorItem";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./calculator.scss";
import NewFormulaButton from "../../components/NewFormulaButton/NewFormulaButton";

function Calculator() {
  const buttonText = (
    <span>
      Добавить
      <br />
      формулу
    </span>
  );

  const deleteItem = (key) => {
    setItemKeys((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    console.log(itemKeys);
  };

  const [itemKeys, setItemKeys] = useState([0]);

  const addItem = () => {
    setItemKeys((prevKeys) => [prevKeys.length, ...prevKeys]);
    console.log(itemKeys);
  };

  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["1"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Калькулятор спреда</h1>
        <div className="calculators__container">
          {itemKeys.length !== 0 &&
            itemKeys.map((key) => (
              <CalculatorItem
                key={key}
                deleteFunction={() => deleteItem(key)}
              />
            ))}
        </div>
        <div className="right__button__container">
          <NewFormulaButton addFunction={addItem} buttonText={buttonText} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
