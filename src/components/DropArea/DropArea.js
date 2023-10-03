import React, { useEffect, useState } from "react";
import "./DropArea.scss";
import { useDispatch, useSelector } from "react-redux";
import { addValue } from "../../store/slice/formulas";
import { getFormulaCurrentKey } from "../../helpers/formulas";
import { Input } from "antd";

function DropArea({ index }) {
  const formulaStore = useSelector((state) => state.formulas.formula);
  const [key, setKey] = useState(null);
  const [droppedItem, setDroppedItem] = useState(null);
  const [droppedValue, setDroppedValue] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedFormula = JSON.parse(localStorage.getItem("formula")) || {};
    const initialKey = Object.keys(storedFormula).length + 1;
    setKey(initialKey);
  }, []);

  const [content, setContent] = useState(null);

  const dragEnter = (e) => {
    e.preventDefault();
    e.target.className += " hovered";
  };

  const dragLeave = (e) => {
    e.target.className = "droparea__item";
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.target.className = "droparea__item";

    const item = JSON.parse(e.dataTransfer.getData("itemData"));
    setDroppedItem(item);

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
    </div>
  );
}

export default DropArea;
