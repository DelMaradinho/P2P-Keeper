import React, { useEffect, useState } from "react";
import CalculatorItem from "../../components/CalculatorItem/CalculatorItem";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./calculator.scss";
import NewFormulaButton from "../../components/NewFormulaButton/NewFormulaButton";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import FormulaItem from "../../components/FormulaItem/FormulaItem";
import { favoriteFormulas } from "../../constants/constants";
import { Button } from "antd";

function Calculator() {
  const buttonText = (
    <span>
      Добавить
      <br />
      калькулятор
    </span>
  );

  const [formulas, setFormulas] = useState(favoriteFormulas);
  const [itemKeys, setItemKeys] = useState([0]);

  const deleteCalculator = (key) => {
    setItemKeys((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    console.log(itemKeys);
  };

  const deleteFormula = (keyToDelete) => {
    setFormulas((prevFormulas) =>
      prevFormulas.filter((formula) => formula.key !== keyToDelete)
    );
  };

  const addItem = () => {
    setItemKeys((prevKeys) => [...prevKeys, prevKeys.length]);
    console.log(itemKeys);
  };

  const [activeTabKey, setActiveTabKey] = useState("1");

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  console.log(activeTabKey, "activeTabKey+++++++++++++++++");

  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["1"]} />
      </div>
      <div className="right">
        {activeTabKey === "tab1" && (
          <>
            <h1 className="right__header">Калькулятор спреда</h1>
            <div className="calculators__container">
              {itemKeys.length !== 0 &&
                itemKeys.map((key) => (
                  <CalculatorItem
                    key={key}
                    deleteFunction={() => deleteCalculator(key)}
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
        {activeTabKey === "tab2" && (
          <>
            <h1 className="right__header">Мои формулы</h1>
            <div className="formulas__container">
              {formulas.length > 0 &&
                formulas.map((formula) => (
                  <FormulaItem
                    formulaData={formula}
                    deleteFunction={deleteFormula}
                  />
                ))}
              {formulas.length === 0 && (
                <div>
                  <h2>У вас нет избранных формул</h2>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    href="./formulas"
                    style={{
                      height: 40,
                      zIndex: 100,
                      borderRadius: 12,
                      paddingTop: 5,
                      paddingBottom: 5,
                      backgroundColor: "rgba(8, 31, 73, 1)",
                    }}
                  >
                    Создать формулу
                  </Button>
                </div>
              )}
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
