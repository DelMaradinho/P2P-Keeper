import React, { useEffect, useState } from "react";
import "./DropAreasList.scss";
import DropArea from "../DropArea/DropArea";
import AddButton from "../AddButton/AddButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmpty,
  initializeFromLocalStorage,
} from "../../store/slice/formulas";
import {
  getFormulaCurrentKey,
  getFormulaNextKey,
} from "../../helpers/formulas";
import { Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { setDndActions } from "../../store/slice/dropArea";

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
  const { isDndActions } = useSelector((state) => state.drop);

  const addArea = () => {
    setAreasCount(areasCount + 1); // добавляем новый DropArea в список
    dispatch(addEmpty({ key }));
  };

  useEffect(() => {
    let keyTmp;
    if (isDndActions) {
      keyTmp = getFormulaCurrentKey(formulaStore);
    } else {
      keyTmp = getFormulaNextKey(formulaStore);
    }
    setKey(keyTmp);
  }, [formulaStore, isDndActions]);

  useEffect(() => {
    dispatch(initializeFromLocalStorage());
  }, []);

  return (
    <>
      <div className="input__container">
        <Input
          bordered={false}
          suffix={<EditOutlined style={{ fontSize: 16 }} />}
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
          <DropArea
            key={index}
            index={index}
            formulaKey={key}
            onDnDAction={() => dispatch(setDndActions({ isSet: true }))}
          />
        ))}
        <AddButton addFunction={addArea} buttonText={addAreaButtonText} />
      </div>
    </>
  );
}

export default DropAreasList;
