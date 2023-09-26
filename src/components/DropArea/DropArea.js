import React, { useState } from "react";
import "./DropArea.scss";

function DropArea() {
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
  };
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
