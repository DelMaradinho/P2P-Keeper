import React from "react";
import "./DnDFormulasComponent.scss";
import DraggableItem from "../DraggableItem/DraggableItem";
import DraggableItemsList from "../DraggableItemsList/DraggableItemsList";
import DropAreasList from "../DropAreasList/DropAreasList";

function DnDFormulasComponent({ variables, operations, others }) {
  return (
    <>
      <div className="header__draggable__wrapper">
        <h2>
          Перетаскивайте необходимые переменные и действия в ячейки в области
          формул, чтобы создать необходимую формулу
        </h2>
        <div className="draggable__menu">
          <DraggableItemsList>
            {others.map((other) => (
              <DraggableItem item={{ value: other.value, type: other.type }} />
            ))}
          </DraggableItemsList>
          <DraggableItemsList>
            {variables.map((variable) => (
              <DraggableItem
                item={{ value: variable.value, type: variable.type }}
              />
            ))}
          </DraggableItemsList>
          <DraggableItemsList>
            {operations.map((operation) => (
              <DraggableItem item={operation} />
            ))}
          </DraggableItemsList>
        </div>
      </div>
      <h4 className="drop__header">Область формул</h4>
      <DropAreasList />
    </>
  );
}

export default DnDFormulasComponent;
