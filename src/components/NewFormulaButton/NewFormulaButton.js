import React, { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import "./NewFormulaButton.scss";

const NewFormulaButton = ({ handleAddRow }) => {
  return (
    <div className="newFormula">
      <Tooltip title="Добавить формулу">
        <Button
          type="primary"
          shape="round"
          size="large"
          // classNames="menu__button__burger"
          onClick={handleAddRow}
          style={{
            width: 60,
            zIndex: 100,
            borderRadius: 12,
            backgroundColor: "rgba(8, 31, 73, 1)",
          }}
        >
          <PlusCircleOutlined style={{ fontSize: 24 }} />
        </Button>
      </Tooltip>
    </div>
  );
};
export default NewFormulaButton;
