import React, { useState } from "react";
import CalculatorItem from "../../components/CalculatorItem/CalculatorItem";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./calculator.scss";
import NewFormulaButton from "../../components/NewFormulaButton/NewFormulaButton";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import FormulaItem from "../../components/FormulaItem/FormulaItem";
import { favoriteFormulas } from "../../constants/constants";

function Calculator() {
  const buttonText = (
    <span>
      Добавить
      <br />
      калькулятор
    </span>
  );

  const deleteItem = (key) => {
    setItemKeys((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    console.log(itemKeys);
  };

  const [itemKeys, setItemKeys] = useState([0]);

  const addItem = () => {
    setItemKeys((prevKeys) => [...prevKeys, prevKeys.length]);
    console.log(itemKeys);
  };

  const [activeTabKey, setActiveTabKey] = useState("1");

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["1"]} />
      </div>
      <div className="right">
        {activeTabKey === "1" && (
          <>
            <h1 className="right__header">Калькулятор спреда</h1>
            <div className="calculators__container">
              {itemKeys.length !== 0 &&
                itemKeys.map((key) => (
                  <CalculatorItem
                    key={key}
                    deleteFunction={() => deleteItem(key)}
                  />
                ))}
              <NewFormulaButton
                addFunction={addItem}
                buttonText={buttonText}
                fixed={false}
              />
            </div>
          </>
        )}
        {activeTabKey === "2" && (
          <>
            <h1 className="right__header">Мои формулы</h1>
            <div className="formulas__container">
              {favoriteFormulas.map((formula) => (
                <FormulaItem formulaData={formula} />
              ))}
            </div>
            <FormulaItem />
          </>
        )}
        <CustomTabs onTabChange={handleTabChange} />
      </div>
    </div>
  );
}

export default Calculator;
