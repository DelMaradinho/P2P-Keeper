import MainMenu from "../../components/MainMenu/MainMenu";
import CustomTable from "../../components/CustomTable/CustomTable";
import "./history.scss";
import NewFormulaButton from "../../components/NewFormulaButton/NewFormulaButton";
import { tableData } from "../../constants/constants";
import { React, useEffect, useState } from "react";

function History() {
  console.log("tableData", tableData);
  const [data, setData] = useState([]);
  useEffect(() => setData([...tableData]), [tableData]);
  console.log("data", data);

  const handleAddRow = () => {
    const newRow = {
      key: data.length + 1,
      currency: "",
      buy_price: "",
      buy_amount: "",
      exchange: "",
      sell_price: "",
      sell_amount: "",
      spread: "",
      net_profit: "",
      date: "",
      description: "",
    };
    setData([newRow, ...data]);
  };
  return (
    <div className="App">
      <div className="left">
        <MainMenu />
      </div>
      <div className="right">
        <h1>История сделок</h1>
        <CustomTable tableData={data} />
        <NewFormulaButton handleAddRow={handleAddRow} />
      </div>
    </div>
  );
}

export default History;
