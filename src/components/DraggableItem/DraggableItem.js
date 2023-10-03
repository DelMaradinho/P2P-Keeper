import React from "react";
import "./DraggableItem.scss";

function DraggableItem({ item }) {
  const dragStart = (e) => {
    const target = e.target;

    // передаем тип и значение элемента при перетаскивании
    e.dataTransfer.setData("itemData", JSON.stringify(item));
    // e.dataTransfer.setData("itemType", item.type);
    // e.dataTransfer.setData("itemValue", item.value);
  };

  return (
    <div
      key={item.id}
      className="draggable__item"
      draggable="true"
      onDragStart={dragStart}
    >
      {item.value}
    </div>
  );
}

export default DraggableItem;
