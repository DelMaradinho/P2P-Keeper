import React, { useEffect, useRef, useState } from "react";
import CalculatorItem from "../../components/CalculatorItem/CalculatorItem";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./calculator.scss";
import NewFormulaButton from "../../components/NewFormulaButton/NewFormulaButton";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import FormulaItem from "../../components/FormulaItem/FormulaItem";
import { Button, Input, Modal } from "antd";
import { getFromStorage } from "../../helpers/formulas";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { initializeFromLocalStorage } from "../../store/slice/formulas";

const initialItems = [
  {
    label: "2 действия",
    // children: "Content of Tab 1",
    key: "tab1",
    closable: false,
  },
  {
    label: "3 действия",
    // children: "Content of Tab 2",
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

  const buttonFormulaText = (
    <span>
      Добавить
      <br />
      формулу
    </span>
  );

  const [itemKeys, setItemKeys] = useState([0]);
  const [itemKeysUsdt, setItemKeysUsdt] = useState([0]);
  const [itemKeysAlt, setItemKeysAlt] = useState([0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFormulasArray, setSelectedFormulasArray] = useState([]);
  const [selectedInModal, setSelectedInModal] = useState([]);

  console.log(selectedFormulasArray, "изначальное состояние");

  // const changePageName = (pageName, index) => {
  //   // Copy the current items array
  //   const newItems = [...items];

  //   // Update the label of the item at the given index
  //   if (newItems[index]) {
  //     newItems[index].label = pageName;
  //   }

  //   // Update the state with the modified items array
  //   setItems(newItems);
  // };

  const deleteCalculator = (key, type) => {
    if(type === 'usdt') {
      setItemKeysUsdt((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    } else if(type === 'alt') {
      setItemKeysAlt((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    } else {
      setItemKeys((prevKeys) => prevKeys.filter((itemKey) => itemKey !== key));
    }
  };

  const deleteFormula = (keyToDelete) => {
    // setFormulas((prevFormulas) =>
    //   prevFormulas.filter((formula) => formula.key !== keyToDelete)
    // );
  };

  const deleteFormulaFromTab = (keyToDelete) => {
    setSelectedFormulasArray((prevFormulas) =>
      prevFormulas.filter((formula) => formula.key !== keyToDelete)
    );
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

  const showModal = () => {
    setIsModalVisible(true);
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
  const [tabsNumber, setTabsNumber] = useState(items.length);
  const newTabIndex = useRef(3);

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
    if (handleTabChange) handleTabChange(newActiveKey);
  };

  // const add = () => {
  //   const newActiveKey = `tab${++newTabIndex.current}`;
  //   const newPanes = [...items];
  //   newPanes.push({
  //     label: `Tab ${newTabIndex.current}`,
  //     key: newActiveKey,
  //     content: <Button type="primary">Click me</Button>,
  //   });
  //   setItems(newPanes);
  //   // setActiveKey(newActiveKey);
  //   setTabsNumber(tabsNumber + 1);
  // };

  // const remove = (targetKey) => {
  //   let newActiveKey = activeKey;
  //   let lastIndex = -1;
  //   items.forEach((item, i) => {
  //     if (item.key === targetKey) {
  //       lastIndex = i - 1;
  //     }
  //   });
  //   const newPanes = items.filter((item) => item.key !== targetKey);
  //   if (newPanes.length && newActiveKey === targetKey) {
  //     if (lastIndex >= 0) {
  //       newActiveKey = newPanes[lastIndex].key;
  //     } else {
  //       newActiveKey = newPanes[0].key;
  //     }
  //   }
  //   setItems(newPanes);
  //   setActiveKey(newActiveKey);
  // };

  // const onEdit = (targetKey, action) => {
  //   if (action === "add") {
  //     // add();
  //   } else {
  //     remove(targetKey);
  //   }
  // };

  useEffect(() => {
    dispatch(initializeFromLocalStorage());
  }, []);

  console.log("formulas :>> ", formulas);

  return (
    <div className="App">
      <Modal
        title="Выберите формулы для добавления на страницу или создайте новую"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel} // убираем стандартные кнопки в нижней части модального окна
        footer={false}
      >
        {/* <ul className="module__list">
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
        </ul> */}
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
            {/* <div className="formulas__container">
              {Object.keys(formulas).length > 0 &&
                Object.values(formulas).map((formula) => {
                  return (
                    <FormulaItem
                      formulaData={formula}
                      deleteFunction={deleteFormula}
                    />
                  );
                })}
              {Object.keys(formulas).length === 0 && (
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
            </div> */}
            <div className="calculators__container">
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
            <div className="calculators__container">
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
        )}
        {activeTabKey === "tab4" && (
          <>
            <h1 className="right__header">
              <Input
                bordered={false}
                suffix={<EditOutlined style={{ fontSize: 30 }} />}
                value={items[3].label}
                onChange={(e) => changePageName(e.target.value, 3)}
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
        )}
        {activeTabKey === "tab5" && (
          <>
            <h1 className="right__header">
              <Input
                bordered={false}
                suffix={<EditOutlined style={{ fontSize: 30 }} />}
                value={items[4].label}
                onChange={(e) => changePageName(e.target.value, 4)}
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
        )}
        {activeTabKey === "tab6" && (
          <>
            <h1 className="right__header">
              {" "}
              <Input
                bordered={false}
                suffix={<EditOutlined style={{ fontSize: 30 }} />}
                value={items[5].label}
                onChange={(e) => changePageName(e.target.value, 5)}
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
        )}
        {activeTabKey === "tab7" && (
          <>
            <h1 className="right__header">
              <Input
                bordered={false}
                suffix={<EditOutlined style={{ fontSize: 30 }} />}
                value={items[6].label}
                onChange={(e) => changePageName(e.target.value, 6)}
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
        )}
        {activeTabKey === "tab8" && (
          <>
            <h1 className="right__header">
              <Input
                bordered={false}
                suffix={<EditOutlined style={{ fontSize: 30 }} />}
                value={items[7].label}
                onChange={(e) => changePageName(e.target.value, 7)}
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
        )}
        {activeTabKey === "tab9" && (
          <>
            <h1 className="right__header">
              <Input
                bordered={false}
                suffix={<EditOutlined style={{ fontSize: 30 }} />}
                value={items[8].label}
                onChange={(e) => changePageName(e.target.value, 8)}
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
        )}
        {activeTabKey === "tab10" && (
          <>
            <h1 className="right__header">
              <Input
                bordered={false}
                suffix={<EditOutlined style={{ fontSize: 30 }} />}
                value={items[9].label}
                onChange={(e) => changePageName(e.target.value, 9)}
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
        )} */}
        <CustomTabs
          onTabChange={handleTabChange}
          items={items}
          // addTabFunc={add}
          onChange={onChange}
          // onEdit={onEdit}
          activeKey={activeKey}
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
      {activeTabKey === "tab1" && (
        <div className="right__button__wrapper">
          <Button shape="round" size="large" onClick={handleFormulasTab}>
            Мои формулы
          </Button>
        </div>
      )}
    </div>
  );
}

export default Calculator;
