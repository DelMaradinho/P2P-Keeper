import React, { useEffect, useState } from "react";
import "./DropArea.scss";
import { useDispatch, useSelector } from "react-redux";
import { addValue } from "../../store/slice/formulas";
import { getFormulaCurrentKey } from "../../helpers/formulas";

function DropArea({ index }) {
  const formulaStore = useSelector((state) => state.formulas.formula);
  const [key, setKey] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedFormula = JSON.parse(localStorage.getItem("formula")) || {};
    const initialKey = Object.keys(storedFormula).length + 1;
    setKey(initialKey);
  }, []);

  const [droppedValue, setDroppedValue] = useState(null);

  const dragEnter = (e) => {
    e.preventDefault();
    e.target.className += " hovered"; // добавляем класс 'hovered'
  };

  const dragLeave = (e) => {
    e.target.className = "droparea__item"; // устанавливаем изначальный класс
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.target.className = "droparea__item";
    const operation = e.dataTransfer.getData("operation");
    setDroppedValue(operation);
    dispatch(
      addValue({
        index,
        value: operation,
        key,
      })
    );
  };

  console.log("formulaStore :>> ", formulaStore);

  return (
    <div
      className="droparea__item"
      onDrop={drop}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      {droppedValue}
    </div>
  );
}

export default DropArea;
