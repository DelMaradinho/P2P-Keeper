import React, { useState } from "react";
import "./DropAreasList.scss";
import DropArea from "../DropArea/DropArea";
import AddButton from "../AddButton/AddButton";

function DropAreasList() {
  const [areasCount, setAreasCount] = useState(3); // начальное состояние списка DropArea

  const addArea = () => {
    setAreasCount(areasCount + 1); // добавляем новый DropArea в список
  };

  return (
    <div className="droparea__container">
      {/* Рендерим список DropArea на основе состояния */}
      {Array.from({ length: areasCount }).map((_, index) => (
        <DropArea key={index} />
      ))}
      <AddButton addFunction={addArea} buttonText={"Добавить область"} />
    </div>
  );
}

export default DropAreasList;
