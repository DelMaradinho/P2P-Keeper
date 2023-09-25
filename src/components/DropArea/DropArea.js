import React from "react";
import "./DropArea.scss";

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
  e.target.className = "droparea__item"; // устанавливаем изначальный класс
  const operation = e.dataTransfer.getData("operation");
  e.target.textContent = operation;
};

function DropArea() {
  return (
    <div
      className="droparea__item"
      onDrop={drop}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    ></div>
  );
}

export default DropArea;
