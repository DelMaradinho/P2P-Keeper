import React, { useEffect, useState } from "react";
import "./DropAreasList.scss";
import DropArea from "../DropArea/DropArea";
import AddButton from "../AddButton/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { addEmpty } from "../../store/slice/formulas";
import { getFormulaCurrentKey } from "../../helpers/formulas";
import { Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

function DropAreasList() {
  const addAreaButtonText = (
    <span>
      Добавить
      <br />
      область
    </span>
  );
  const formulaStore = useSelector((state) => state.formulas.formula);
  const dispatch = useDispatch();
  const [areasCount, setAreasCount] = useState(3); // начальное состояние списка DropArea
  const [key, setKey] = useState(null);

  useEffect(() => {
    const storedFormula = JSON.parse(localStorage.getItem("formula")) || {};
    const initialKey = Object.keys(storedFormula).length + 1;
    setKey(initialKey);
  }, []);

  const addArea = () => {
    setAreasCount(areasCount + 1); // добавляем новый DropArea в список
    dispatch(addEmpty({ key }));
  };

  return (
    <>
      <div className="input__container">
        <Input
          bordered={false}
          suffix={<EditOutlined style={{ fontSize: 16 }} />}
          // value={formulaName}
          // onChange={handleInputChange}
          placeholder="Введите название формулы"
          style={{
            width: 225,
            borderBottom: "1px solid #e3e9f6",
            borderRadius: 0,
          }}
        />
      </div>
      <div className="droparea__container">
        {/* Рендерим список DropArea на основе состояния */}
        {Array.from({ length: areasCount }).map((_, index) => (
          <DropArea key={index} index={index} />
        ))}
        <AddButton addFunction={addArea} buttonText={addAreaButtonText} />
      </div>
    </>
  );
}

export default DropAreasList;
