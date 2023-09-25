import React from "react";
import "./DraggableList.scss";

function DraggableList({ draggableItems }) {
  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("card_id", target.id);
    setTimeout(() => {
      target.className = "draggable__item__fill hold"; // добавляем класс 'hold'
    }, 0);
  };

  const dragEnd = (e) => {
    e.target.className = "draggable__item__fill"; // устанавливаем изначальный класс
  };

  const dragEnter = (e) => {
    e.preventDefault();
    e.target.className += " hovered"; // добавляем класс 'hovered'
  };

  const dragLeave = (e) => {
    e.target.className = "draggable__item"; // устанавливаем изначальный класс
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.target.className = "draggable__item"; // устанавливаем изначальный класс
    const card_id = e.dataTransfer.getData("card_id");
    const card = document.getElementById(card_id);
    card.style.display = "block";
    e.target.appendChild(card);
  };

  return (
    <div className="draggable__container">
      <div
        className="draggable__item"
        id="item1"
        onDrop={drop}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
      >
        <div
          className="draggable__item__fill"
          draggable="true"
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          id="fill1"
        ></div>
      </div>
      <div
        className="draggable__item"
        onDrop={drop}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
      ></div>
      <div
        className="draggable__item"
        onDrop={drop}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
      ></div>
      {/* ... и так далее для других элементов ... */}
    </div>
  );
}

export default DraggableList;
