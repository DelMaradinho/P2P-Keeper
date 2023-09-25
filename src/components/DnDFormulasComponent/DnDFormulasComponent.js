import React from "react";
import "./DnDFormulasComponent.scss";
import DraggableItem from "../DraggableItem/DraggableItem";
import DraggableItemsList from "../DraggableItemsList/DraggableItemsList";
import DropArea from "../DropArea/DropArea";
import DropAreasList from "../DropAreasList/DropAreasList";

function DnDFormulasComponent({ variables, operations }) {
  return (
    <>
      <div className="draggable__menu">
        <div className="draggable__container">
          <DraggableItemsList>
            {variables.map((variable) => (
              <DraggableItem item={variable} />
            ))}
          </DraggableItemsList>
        </div>
        <div className="draggable__container">
          {" "}
          <DraggableItemsList>
            {operations.map((operation) => (
              <DraggableItem item={operation} />
            ))}
          </DraggableItemsList>
        </div>
      </div>
      <DropAreasList />
    </>
  );
}

export default DnDFormulasComponent;
