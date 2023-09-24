import React from "react";
import FormulaItem from "../../components/FormulaItem/FormulaItem";

const Tab = ({ activeTabKey, tabKey, formulas, deleteFormula }) => {
  if (activeTabKey !== tabKey) return null;

  return (
    <>
      <h1 className="right__header">Tab {tabKey}</h1>
      <div className="formulas__container">
        {formulas?.map((selectedFormula) => (
          <FormulaItem
            formulaData={selectedFormula}
            deleteFunction={deleteFormula}
          />
        ))}
      </div>
    </>
  );
};

export default Tab;
