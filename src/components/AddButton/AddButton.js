import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./AddButton.scss";

const AddButton = ({ addFunction, buttonText }) => {
  return (
    <div className="button__container">
      <Button
        type="primary"
        shape="round"
        size="middle"
        icon={<PlusCircleOutlined style={{ fontSize: 20 }} />}
        onClick={addFunction}
        style={{
          backgroundColor: "rgba(8, 31, 73, 1)",
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};
export default AddButton;
