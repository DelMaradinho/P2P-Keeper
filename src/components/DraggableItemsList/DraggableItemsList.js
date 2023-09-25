import React from "react";
import "./DraggableItemsList.scss";

function DraggableItemsList({ children }) {
  return <div className="draggable__container">{children}</div>;
}

export default DraggableItemsList;
