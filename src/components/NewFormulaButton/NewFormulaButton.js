import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./NewFormulaButton.scss";

const NewFormulaButton = ({ handleAddRow }) => {
  return (
    <div className="newFormula">
      <Button
        type="primary"
        shape="round"
        size="large"
        icon={<PlusCircleOutlined style={{ fontSize: 20 }} />}
        onClick={handleAddRow}
        style={{
          zIndex: 100,
          borderRadius: 12,
          paddingTop: 5,
          paddingBottom: 5,
          // transform: "rotate(90deg)",
          backgroundColor: "rgba(8, 31, 73, 1)",
        }}
      >
        Добавить сделку
      </Button>
    </div>
  );
};
export default NewFormulaButton;
