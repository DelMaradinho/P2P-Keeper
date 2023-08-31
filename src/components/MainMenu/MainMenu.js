import React, { useState } from "react";
import {
  CarryOutOutlined,
  DesktopOutlined,
  TeamOutlined,
  MenuOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import styles from "./MainMenu.module.scss";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    "Калькулятор спреда",
    "1",
    <CalculatorOutlined style={{ fontSize: 20 }} />
  ),
  getItem("Создание формул", "2", <DesktopOutlined style={{ fontSize: 20 }} />),
  getItem("История сделок", "3", <CarryOutOutlined style={{ fontSize: 20 }} />),
  getItem("Команда", "4", <TeamOutlined style={{ fontSize: 20 }} />),
];
const MainMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      className={styles.menu__container}
      style={{
        width: 244,
      }}
    >
      <Button
        type="primary"
        shape="round"
        size="large"
        classNames="menu__button__burger"
        onClick={toggleCollapsed}
        style={{
          marginLeft: -168,
          marginBottom: 200,
          backgroundColor: "rgba(8, 31, 73, 1)",
        }}
      >
        <MenuOutlined />
      </Button>
      <Menu
        defaultSelectedKeys={["3"]}
        mode="inline"
        theme="light"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          backgroundColor: "rgba(240, 243, 249, 1)",
          borderRadius: 12,
          border: "none",
          fontSize: 16,
          color: "rgba(8, 31, 73, 1)",
        }}
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default MainMenu;
