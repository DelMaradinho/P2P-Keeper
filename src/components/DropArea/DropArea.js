import React, { useEffect, useState, useRef } from "react";
import "./DropArea.scss";
import { useDispatch, useSelector } from "react-redux";
import { addValue } from "../../store/slice/formulas";
import { getFormulaCurrentKey } from "../../helpers/formulas";
import { Input } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

function DropArea({ index }) {
  const formulaStore = useSelector((state) => state.formulas.formula);
  const [key, setKey] = useState(null);
  const [droppedItem, setDroppedItem] = useState(null);
  const [droppedValue, setDroppedValue] = useState(null);
  const hasDropped = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedFormula = JSON.parse(localStorage.getItem("formula")) || {};
    const initialKey = Object.keys(storedFormula).length + 1;
    setKey(initialKey);
  }, []);

  const [content, setContent] = useState(null);

  const dragEnter = (e) => {
    if (hasDropped.current) {
      return;
    }
    e.preventDefault();
    e.target.className += " hovered";
  };

  const dragLeave = (e) => {
    if (hasDropped.current) {
      return;
    }
    e.target.className = "droparea__item";
  };

  const dragOver = (e) => {
    if (hasDropped.current) {
      return;
    }
    e.preventDefault();
  };

  const drop = (e) => {
    if (hasDropped.current) {
      return;
    }

    e.target.className = "droparea__item";

    const item = JSON.parse(e.dataTransfer.getData("itemData"));
    setDroppedItem(item);
    hasDropped.current = true;

    if (item.type === "operation") {
      let symbol;
      switch (item.value) {
        case "Прибавить":
          symbol = "+";
          break;
        case "Отнять":
          symbol = "-";
          break;
        case "Умножить":
          symbol = "×";
          break;
        case "Разделить":
          symbol = "/";
          break;
        default:
          symbol = "?";
      }
      setDroppedValue(symbol);
      setContent(symbol);
    } else if (item.type === "variable") {
      setDroppedValue(item.value);
      setContent(item.value);
    }

    dispatch(
      addValue({
        index,
        value: item.value,
        key,
      })
    );
  };

  const clearDropArea = () => {
    setDroppedItem(null);
    setContent(null);
    hasDropped.current = false;
  };

  return (
    <div
      className="droparea__item"
      onDrop={drop}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      {droppedItem && droppedItem.type === "variable" ? (
        <Input
          type="text"
          addonBefore={content}
          placeholder="Введите значение"
        />
      ) : (
        content
      )}

      {droppedItem && (
        <div className="droparea__clear" onClick={clearDropArea}>
          <CloseCircleOutlined />
        </div>
      )}
    </div>
  );
}

export default DropArea;
