import React, { useEffect, useState } from "react";
import CalculatorItem from "../../components/CalculatorItem/CalculatorItem";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./calculator.scss";
import NewFormulaButton from "../../components/NewFormulaButton/NewFormulaButton";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import FormulaItem from "../../components/FormulaItem/FormulaItem";
import { favoriteFormulas } from "../../constants/constants";
import { Button, Modal } from "antd";

function Calculator() {
  const buttonCalculatorText = (
    <span>
      Добавить
      <br />
      калькулятор
    </span>
  );

  const buttonFormulaText = (
    <span>
      Добавить
      <br />
      формулу
    </span>
  );

  const [formulas, setFormulas] = useState(favoriteFormulas);
  const [itemKeys, setItemKeys] = useState([0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFormula, setSelectedFormula] = useState(null);

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

  const [activeTabKey, setActiveTabKey] = useState("tab1");

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectFormula = (formula) => {
    setSelectedFormula(formula);
    setIsModalVisible(false);
  };

  console.log(activeTabKey, "activeTabKey+++++++++++++++++");

  return (
    <div className="App">
      <Modal
        title="Выберите формулу"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // убираем стандартные кнопки в нижней части модального окна
      >
        <ul>
          {formulas.map((formula) => (
            <li key={formula.key} onClick={() => selectFormula(formula)}>
              {formula.name}{" "}
              {/* предположим, что каждая формула имеет свойство name */}
            </li>
          ))}
        </ul>
        <Button
          type="primary"
          onClick={() => (window.location.href = "./formulas")}
        >
          Создать новую формулу
        </Button>
      </Modal>

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
                buttonText={buttonCalculatorText}
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
        {activeTabKey === "tab3" && (
          <>
            <h1 className="right__header">Tab 3</h1>
            <div className="formulas__container">
              {selectedFormula && (
                <FormulaItem
                  formulaData={selectedFormula}
                  deleteFunction={deleteFormula}
                />
              )}
            </div>
          </>
        )}
        {activeTabKey === "tab4" && (
          <>
            <h1 className="right__header">Tab 4</h1>
            <FormulaItem />
          </>
        )}
        {activeTabKey === "tab5" && (
          <>
            <h1 className="right__header">Tab 5</h1>
            <FormulaItem />
          </>
        )}
        {activeTabKey === "tab6" && (
          <>
            <h1 className="right__header">Tab 6</h1>
            <FormulaItem />
          </>
        )}
        {activeTabKey === "tab7" && (
          <>
            <h1 className="right__header">Tab 7</h1>
            <FormulaItem />
          </>
        )}
        {activeTabKey === "tab8" && (
          <>
            <h1 className="right__header">Tab 8</h1>
            <FormulaItem />
          </>
        )}
        {activeTabKey === "tab9" && (
          <>
            <h1 className="right__header">Tab 9</h1>
            <FormulaItem />
          </>
        )}
        {activeTabKey === "tab10" && (
          <>
            <h1 className="right__header">Tab 10</h1>
            <FormulaItem />
          </>
        )}
        <CustomTabs onTabChange={handleTabChange} />
      </div>
      {(activeTabKey === "tab3" ||
        activeTabKey === "tab4" ||
        activeTabKey === "tab5" ||
        activeTabKey === "tab6" ||
        activeTabKey === "tab7" ||
        activeTabKey === "tab8" ||
        activeTabKey === "tab9") && (
        <NewFormulaButton
          addFunction={showModal}
          buttonText={buttonFormulaText}
          formulasPage={true}
        />
      )}
    </div>
  );
}

export default Calculator;
