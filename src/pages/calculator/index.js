import React, { useEffect, useState } from "react";
import CalculatorItem from "../../components/CalculatorItem/CalculatorItem";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./calculator.scss";
import NewFormulaButton from "../../components/NewFormulaButton/NewFormulaButton";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { initializeFromLocalStorage } from "../../store/slice/formulas";

const initialItems = [
  {
    label: "2 действия",
    key: "tab1",
    closable: false,
  },
  {
    label: "3 действия",
    key: "tab2",
    closable: false,
  },
  // {
  //   label: "Tab 3",
  //   // children: "Content of Tab 3",
  //   key: "tab3",
  //   closable: true,
  // },
];

function Calculator() {
  const [items, setItems] = useState(initialItems);
  const formulas = useSelector((state) => state.formulas.formula);
  const dispatch = useDispatch();

  const buttonCalculatorText = (
    <span>
      Добавить
      <br />
      калькулятор
    </span>
  );

  const [itemKeys, setItemKeys] = useState([0]);
  const [itemKeysUsdt, setItemKeysUsdt] = useState([0]);
  const [itemKeysAlt, setItemKeysAlt] = useState([0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFormulasArray, setSelectedFormulasArray] = useState([]);
  const [selectedInModal, setSelectedInModal] = useState([]);

  const deleteCalculator = (key, type) => {
    if(type === 'usdt') {
      setItemKeysUsdt((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    } else if(type === 'alt') {
      setItemKeysAlt((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    } else {
      setItemKeys((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    }
  };

  const addItem = (type) => {
    if(type === 'usdt') {
      setItemKeysUsdt((prevKeys) => [...prevKeys, prevKeys.length]);
    } else if(type === 'alt') {
      setItemKeysAlt((prevKeys) => [...prevKeys, prevKeys.length]);
    } else {
      setItemKeys((prevKeys) => [...prevKeys, prevKeys.length]);
    }
  };

  const [activeTabKey, setActiveTabKey] = useState("tab1");

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handleFormulasTab = () => {
    onChange("tab2");
  };

  const handleOk = () => {
    setSelectedFormulasArray((prevSelected) => [
      ...prevSelected,
      ...formulas.filter((formula) => selectedInModal.includes(formula.key)),
    ]);
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

  const [activeKey, setActiveKey] = useState(items[0].key);

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
    if (handleTabChange) handleTabChange(newActiveKey);
  };

  useEffect(() => {
    dispatch(initializeFromLocalStorage());
  }, []);

  return (
    <div className="App">
      <Modal
        title="Выберите формулы для добавления на страницу или создайте новую"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel} // убираем стандартные кнопки в нижней части модального окна
        footer={false}
      >
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
            <div className="calculators__3x__container">
              {itemKeysUsdt.length !== 0 &&
                itemKeysUsdt.map((key) => (
                  <CalculatorItem
                    key={key}
                    type="usdt"
                    deleteFunction={() => deleteCalculator(key, 'usdt')}
                  />
                ))}
              <NewFormulaButton
                addFunction={() => addItem('usdt')}
                buttonText={buttonCalculatorText}
                fixed={false}
              />
            </div>
            <div className="calculators__3x__container">
              {itemKeysAlt.length !== 0 &&
                itemKeysAlt.map((key) => (
                  <CalculatorItem
                    key={key}
                    type="alt"
                    deleteFunction={() => deleteCalculator(key, 'alt')}
                  />
                ))}
              <NewFormulaButton
                addFunction={() => addItem('alt')}
                buttonText={buttonCalculatorText}
                fixed={false}
              />
            </div>
          </>
        )}
        {/* {activeTabKey === "tab3" && (
          <>
            <h1 className="right__header">
              <Input
                bordered={false}
                suffix={<EditOutlined style={{ fontSize: 30 }} />}
                value={items[2].label}
                // onChange={(e) => changePageName(e.target.value, 2)}
                style={{
                  width: "300px",
                  borderBottom: "1px solid #e3e9f6",
                  borderRadius: 0,
                  fontSize: "36px",
                }}
              />
            </h1>
            <div className="formulas__container">
              {selectedFormulasArray.length > 0 &&
                selectedFormulasArray.map((selectedFormula) => (
                  <FormulaItem
                    formulaData={selectedFormula}
                    deleteFunction={deleteFormulaFromTab}
                  />
                ))}
            </div>
          </>
        )}*/}
        <CustomTabs
          onTabChange={handleTabChange}
          items={items}
          onChange={onChange}
          activeKey={activeKey}
        />
      </div>
      {/* {activeTabKey === "tab1" && (
        <div className="right__button__wrapper">
          <Button shape="round" size="large" onClick={handleFormulasTab}>
            Мои формулы
          </Button>
        </div>
      )} */}
    </div>
  );
}

export default Calculator;
