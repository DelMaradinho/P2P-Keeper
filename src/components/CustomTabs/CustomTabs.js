import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import "./CustomTabs.scss";

const initialItems = [
  {
    label: "Калькулятор",
    // children: "Content of Tab 1",
    key: "1",
    closable: false,
  },
  {
    label: "Мои формулы",
    // children: "Content of Tab 2",
    key: "2",
    closable: false,
  },
  {
    label: "Tab 3",
    // children: "Content of Tab 3",
    key: "3",
    closable: true,
  },
];
const CustomTabs = ({ onTabChange }) => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  //   const onChange = (newActiveKey) => {
  //     setActiveKey(newActiveKey);
  //   };
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
    if (onTabChange) onTabChange(newActiveKey); // добавлено
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: "New Tab",
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <div className="tabs__container">
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </div>
  );
};
export default CustomTabs;
