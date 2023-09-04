import React, { useState } from "react";
import {
  CarryOutOutlined,
  DesktopOutlined,
  TeamOutlined,
  MenuOutlined,
  CalculatorOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import styles from "./MainMenu.module.scss";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={styles.menu__container}>
      <Button
        type="primary"
        shape="round"
        size="large"
        classNames="menu__button__burger"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 50,
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
      >
        <Menu.Item key="1">
          <Link to="/calculator">
            <CalculatorOutlined style={{ fontSize: 20 }} />{" "}
            <span>Калькулятор спреда</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/formulas">
            <DesktopOutlined style={{ fontSize: 20 }} />{" "}
            <span>Создание формул</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/history">
            <CarryOutOutlined style={{ fontSize: 20 }} />{" "}
            <span>История сделок</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="#">
            <PieChartOutlined style={{ fontSize: 20 }} />{" "}
            <span>Анализ сделок</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/team">
            <TeamOutlined style={{ fontSize: 20 }} /> <span>Команда</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="#">
            <ApartmentOutlined style={{ fontSize: 20 }} /> <span>Ресурсы</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="#">
            <SettingOutlined style={{ fontSize: 20 }} /> <span>Настройки</span>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default MainMenu;
