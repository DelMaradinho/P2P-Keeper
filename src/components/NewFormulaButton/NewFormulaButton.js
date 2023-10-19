import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./NewFormulaButton.scss";

const NewFormulaButton = ({
  addFunction,
  buttonText,
  fixed = true,
  formulasPage = false,
  size = "large",
  narrow = false,
}) => {
  return (
    <div
      className={`newFormula ${
        fixed ? "newFormula__fixed" : "newFormula__notFixed"
      } ${formulasPage ? "newFormula__fixed-outside" : ""} ${
        narrow && "newFormula__narrow"
      }`}
    >
      <Button
        type="primary"
        shape="round"
        size={size}
        icon={<PlusCircleOutlined style={{ fontSize: 20 }} />}
        onClick={addFunction}
        style={{
          zIndex: 100,
          borderRadius: 12,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: "rgba(8, 31, 73, 1)",
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};
export default NewFormulaButton;
