import React, { useState, useRef } from "react";
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

const MainMenu = ({ selectedKey }) => {
  const [collapsed, setCollapsed] = useState(true);
  const hoverTimeoutRef = useRef(null); // Хранит ссылку на таймер
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMouseEnter = () => {
    // Устанавливаем таймер, который раскроет меню после 0.3 секунды
    hoverTimeoutRef.current = setTimeout(() => {
      setCollapsed(false);
    }, 500); // 300ms = 0.3 секунды
  };

  const handleMouseLeave = () => {
    // Если таймер активен, мы его отменяем
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Сворачиваем меню
    setCollapsed(true);
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
          width: 80,
          marginBottom: 50,
          borderRadius: 12,
          backgroundColor: "rgba(8, 31, 73, 1)",
        }}
      >
        <MenuOutlined />
      </Button>
      <Menu
        defaultSelectedKeys={selectedKey}
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
        onMouseEnter={handleMouseEnter} // Обработчик события при наведении мыши
        onMouseLeave={handleMouseLeave} // Обработчик события при уходе курсора мыши
      >
        <Menu.Item key="1">
          <Link to="/calculator">
            <CalculatorOutlined style={{ fontSize: 20 }} />{" "}
            <span>Калькулятор спреда</span>
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="2">
          <Link to="/formulas">
            <DesktopOutlined style={{ fontSize: 20 }} />{" "}
            <span>Создание формул</span>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="3">
          <Link to="/history">
            <CarryOutOutlined style={{ fontSize: 20 }} />{" "}
            <span>История сделок</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/analysis">
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
          <Link to="/resources">
            <ApartmentOutlined style={{ fontSize: 20 }} /> <span>Ресурсы</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="/settings">
            <SettingOutlined style={{ fontSize: 20 }} /> <span>Настройки</span>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default MainMenu;
