import React, { useEffect, useState } from "react";
import CalculatorItem from "../../components/CalculatorItem/CalculatorItem";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./calculator.scss";
import NewFormulaButton from "../../components/NewFormulaButton/NewFormulaButton";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import FormulaItem from "../../components/FormulaItem/FormulaItem";
import { favoriteFormulas } from "../../constants/constants";
import { Button, Modal } from "antd";
import Tab from "./Tab";

export const initialTabs = [
  {
    label: "Калькулятор",
    // children: "Content of Tab 1",
    key: "tab1",
    closable: false,
  },
  {
    label: "Мои формулы",
    // children: "Content of Tab 2",
    key: "tab2",
    closable: false,
  },
  {
    label: "Tab 3",
    // children: "Content of Tab 3",
    key: "tab3",
    closable: true,
  },
];

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
  const [selectedFormulas, setSelectedFormulas] = useState({});
  const [selectedInModal, setSelectedInModal] = useState([]);
  const [tabs, setTabs] = useState(initialTabs);

  const deleteCalculator = (key) => {
    setItemKeys((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    console.log(itemKeys);
  };

  const deleteFormula = (keyToDelete) => {
    setFormulas((prevFormulas) =>
      prevFormulas.filter((formula) => formula.key !== keyToDelete)
    );
  };

  const deleteFormulaFromTab = (keyToDelete) => {
    setSelectedFormulas((prevSelected) => ({
      ...prevSelected,
      [activeTabKey]: (prevSelected[activeTabKey] || []).filter(
        (formula) => formula.key !== keyToDelete
      ),
    }));
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
    setSelectedFormulas((prevSelected) => ({
      ...prevSelected,
      [activeTabKey]: (prevSelected[activeTabKey] || []).concat(
        formulas.filter((formula) => selectedInModal.includes(formula.key))
      ),
    }));
    setSelectedInModal([]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleSelectionInModal = (key) => {
    setSelectedInModal((prevSelected) =>
      prevSelected.includes(key)
        ? prevSelected.filter((k) => k !== key)
        : [...prevSelected, key]
    );
  };

  console.log(activeTabKey, "activeTabKey+++++++++++++++++");

  return (
    <div className="App">
      <Modal
        title="Выберите формулы для добавления на страницу или создайте новую"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel} // убираем стандартные кнопки в нижней части модального окна
        footer={false}
      >
        <ul className="module__list">
          {formulas.map((formula) => (
            <li key={formula.key}>
              <input
                type="checkbox"
                checked={selectedInModal.includes(formula.key)}
                onChange={() => toggleSelectionInModal(formula.key)}
              />
              {formula.name}
            </li>
          ))}
        </ul>
        <Button
          type="primary"
          onClick={handleOk}
          style={{
            borderRadius: 12,
            marginRight: 16,
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: "rgba(8, 31, 73, 1)",
          }}
        >
          Добавить
        </Button>
        <Button
          type="primary"
          onClick={() => (window.location.href = "./formulas")}
          style={{
            borderRadius: 12,
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor: "rgba(8, 31, 73, 1)",
          }}
        >
          Создать
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
          </>
        )}
        {tabs?.map((tab, index) => {
          if (index > 1) {
            return (
              <Tab
                key={tab.key}
                tabKey={tab.key}
                activeTabKey={activeTabKey}
                formulas={selectedFormulas[activeTabKey] || []}
                deleteFormula={deleteFormulaFromTab}
              />
            );
          }
        })}
        <CustomTabs
          onTabChange={handleTabChange}
          items={tabs}
          setItems={setTabs}
        />
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
