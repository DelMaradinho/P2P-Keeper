import MainMenu from "../../components/MainMenu/MainMenu";
import CustomTable from "../../components/CustomTable/CustomTable";
import "./history.scss";
import NewFormulaButton from "../../components/NewFormulaButton/NewFormulaButton";
import { dateFormat, tableData } from "../../constants/constants";
import { React, useEffect, useState } from "react";
import dayjs from "dayjs";

function History() {
  const [data, setData] = useState([]);
  const buttonText = (
    <span>
      Добавить
      <br />
      сделку
    </span>
  );

  useEffect(() => {
    setData(tableData);

    return () => {
      setData([]);
    };
  }, []);

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
      date: dayjs(new Date().toISOString().slice(0, 10), dateFormat),
      description: "",
    };
    setData((prevData) => [newRow, ...prevData]);
  };
  return (
    <div className="App">
      <div className="left">
        <MainMenu selectedKey={["3"]} />
      </div>
      <div className="right">
        <h1 className="right__header">История сделок</h1>
        <CustomTable tableData={data} />
        <div className="right__button__container">
          <NewFormulaButton
            handleAddRow={handleAddRow}
            buttonText={buttonText}
          />
        </div>
      </div>
    </div>
  );
}

export default History;
