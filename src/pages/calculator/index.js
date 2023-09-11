import { useState } from "react";
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
  const [items, setItems] = useState([<CalculatorItem key={0} />]);

  const addItem = () => {
    const newItem = <CalculatorItem key={items.length} />;
    setItems([newItem, ...items]);
  };

  return (
    <div className="App">
      <div className="left">
        <MainMenu />
      </div>
      <div className="right">
        <h1 className="right__header">Калькулятор спреда</h1>
        <div className="calculators__container">{items}</div>
        <div className="right__button__container">
          <NewFormulaButton addFunction={addItem} buttonText={buttonText} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
