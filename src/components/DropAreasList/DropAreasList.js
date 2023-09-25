import React from "react";
import "./DropAreasList.scss";
import DropArea from "../DropArea/DropArea";

function DropAreasList() {
  return (
    <div className="droparea__container">
      <DropArea />
      <DropArea />
      <DropArea />
      <DropArea />
      <DropArea />
      <DropArea />
    </div>
  );
}

export default DropAreasList;
