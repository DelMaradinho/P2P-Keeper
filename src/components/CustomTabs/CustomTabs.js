import React, { useRef, useState } from "react";
import { Button, Tabs } from "antd";
import "./CustomTabs.scss";
import { initialTabs } from "../../pages/calculator";

const CustomTabs = ({ onTabChange, items, setItems }) => {
  const [activeKey, setActiveKey] = useState(initialTabs[0].key);
  const [tabsNumber, setTabsNumber] = useState(initialTabs.length);
  const newTabIndex = useRef(3);

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
    if (onTabChange) onTabChange(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `tab${++newTabIndex.current}`;
    const newPanes = [...items];
    newPanes.push({
      label: `Tab ${newTabIndex.current}`,
      key: newActiveKey,
      content: <Button type="primary">Click me</Button>,
    });
    setItems(newPanes);
    // setActiveKey(newActiveKey);
    setTabsNumber(tabsNumber + 1);
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
