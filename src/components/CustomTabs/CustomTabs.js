import React, { useRef, useState } from "react";
import { Button, Tabs } from "antd";
import "./CustomTabs.scss";

// const initialItems = [
//   {
//     label: "Калькулятор",
//     // children: "Content of Tab 1",
//     key: "tab1",
//     closable: false,
//   },
//   {
//     label: "Мои формулы",
//     // children: "Content of Tab 2",
//     key: "tab2",
//     closable: false,
//   },
//   {
//     label: "Tab 3",
//     // children: "Content of Tab 3",
//     key: "tab3",
//     closable: true,
//   },
// ];
const CustomTabs = ({
  onTabChange,
  items,
  // addTabFunc,
  onChange,
  onEdit,
  activeKey,
}) => {
  // const [activeKey, setActiveKey] = useState(items[0].key);
  // const [tabsNumber, setTabsNumber] = useState(items.length);
  // const newTabIndex = useRef(3);

  // const onChange = (newActiveKey) => {
  //   setActiveKey(newActiveKey);
  //   if (onTabChange) onTabChange(newActiveKey);
  // };

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
  //     addTabFunc();
  //   } else {
  //     remove(targetKey);
  //   }
  // };
  return (
    <div className="tabs__container">
      <Tabs
        type="card"
        // type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        // onEdit={onEdit}
        items={items}
      />
    </div>
  );
};
export default CustomTabs;
