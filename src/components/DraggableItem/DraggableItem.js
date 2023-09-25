import React from "react";
import "./DraggableItem.scss";

function DraggableItem({ item }) {
  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("operation", target.textContent);
  };

  const dragEnd = (e) => {
    e.target.className = "draggable__item"; // устанавливаем изначальный класс
  };

  return (
    <div
      key={item.id}
      type={item.type}
      className="draggable__item"
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
    >
      {item.value}
    </div>
  );
}

export default DraggableItem;
