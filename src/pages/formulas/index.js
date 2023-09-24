import React, { useState } from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./formulas.scss";
import DraggableList from "../../components/DraggableList/DraggableList";

const initialItems = [
  { id: "1_dnd", content: "Item 1 hhhhhhhhhhhhhhhhhhhh" },
  { id: "2_dnd", content: "Item 2 nnnnnnnnnnnnnnnnnnnnnn" },
  { id: "3_dnd", content: "Item 3 ccccccccccccccccccccc" },
];

function Formulas() {
  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["2"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Создание формул</h1>
        <DraggableList draggableItems={initialItems} />
      </div>
    </div>
  );
}

export default Formulas;
