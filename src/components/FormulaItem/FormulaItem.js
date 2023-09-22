import React, { useEffect, useState } from "react";
import "./FormulaItem.scss";
import { Button, Input, Modal, Space } from "antd";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";

const FormulaItem = ({ formulaData, deleteFunction }) => {
  const [formulaName, setFormulaName] = useState("");

  useEffect(() => {
    console.log(
      "deleteFunction is",
      deleteFunction ? "available" : "not available"
    );
  }, []);

  useEffect(() => {
    if (formulaData) {
      setFormulaName(formulaData.name);
    }
  }, [formulaData]);

  const handleInputChange = (event) => {
    setFormulaName(event.target.value);
  };

  if (!formulaData) {
    return null; // или возвращайте какое-то другое дефолтное представление
  }

  return (
    <div className="formula__container" key={formulaData.key}>
      <div className="formula__outer">
        <Input
          bordered={false}
          suffix={<EditOutlined style={{ fontSize: 16 }} />}
          value={formulaName}
          onChange={handleInputChange}
          style={{
            width: "auto",
            borderBottom: "1px solid #e3e9f6",
            borderRadius: 0,
          }}
        />
        <Space>
          <Button
            type="text"
            shape="round"
            size="middle"
            icon={<CloseCircleOutlined style={{ fontSize: 16 }} />}
            onClick={() => {
              Modal.confirm({
                content: "Вы правда хотите удалить эту функцию?",
                okText: "Да",
                cancelText: "Нет",
                okButtonProps: {
                  style: {
                    backgroundColor: "rgba(8, 31, 73, 1)",
                    color: "white",
                  },
                },
                onCancel() {},
                onOk() {
                  console.log("deleteFunction is about to be called");
                  if (deleteFunction) {
                    deleteFunction(formulaData.key);
                  }
                },
              });
            }}
            style={{
              zIndex: 100,
              padding: 5,
              borderRadius: 18,
            }}
          />
        </Space>
      </div>
      <div className="formula">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => {
          const variableKey = `variable${num}`;
          if (formulaData[variableKey]) {
            return (
              <div key={variableKey} className="formula__variable">
                {formulaData[variableKey]}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FormulaItem;
