import React, { useEffect, useState } from "react";
import { Button, Input, Menu } from "antd";
import "./CalculatorItem.scss";

const CalculatorItem = () => {
  const [data, setData] = useState([]);
  const [priceSell, setPriceSell] = useState("");
  const [commissionSell, setCommissionSell] = useState("");
  const [priceWithCommissionSell, setPriceWithCommissionSell] = useState("");
  const [priceBuy, setPriceBuy] = useState("");
  const [commissionBuy, setCommissionBuy] = useState("");
  const [priceWithCommissionBuy, setPriceWithCommissionBuy] = useState("");

  useEffect(() => {
    if (priceSell && commissionSell) {
      const result = priceSell * (1 - commissionSell);
      setPriceWithCommissionSell(result);
    }
  }, [priceSell, commissionSell]);

  useEffect(() => {
    if (priceBuy && commissionBuy) {
      const result = priceBuy * (1 - commissionBuy);
      setPriceWithCommissionBuy(result);
    }
  }, [priceBuy, commissionBuy]);

  // function handleChange(key, fieldName, value, isNumber = false) {
  //   // Если isNumber равен true, проверяем значение на соответствие регулярному выражению
  //   const re = /^(\d+[.,]?\d*|[.,]\d+)$/;
  //   if (isNumber && value !== "" && !re.test(value)) return;

  //   const newValue = isNumber ? value.replace(",", ".") : value;

  //   setdata((prevData) => {
  //     const newData = [...prevData];
  //     const objIndex = newData.findIndex((obj) => obj.key === key);

  //     if (objIndex === -1) return prevData; // если объект не найден, вернем неизмененное состояние

  //     newData[objIndex][fieldName] = newValue;
  //     return newData;
  //   });
  // }

  return (
    <div className="calculator__container">
      <div className="calculator__blank"></div>
      <div className="calculator__buy">Купил</div>
      <div className="calculator__sell">Продал</div>
      <div className="calculator__price">Цена</div>
      <div className="calculator__price__buy">
        <Input value={priceBuy} onChange={(e) => setPriceBuy(e.target.value)} />
      </div>
      <div className="calculator__price__sell">
        <Input
          value={priceSell}
          onChange={(e) => setPriceSell(e.target.value)}
        />
      </div>
      <div className="calculator__commission">Комиссия</div>
      <div className="calculator__commission__buy">
        <Input
          value={commissionBuy}
          onChange={(e) => setCommissionBuy(e.target.value)}
        />
      </div>
      <div className="calculator__commission__sell">
        <Input
          value={commissionSell}
          onChange={(e) => setCommissionSell(e.target.value)}
        />
      </div>
      <div className="calculator__priceWithCommission">Цена с комиссией</div>
      <div className="calculator__priceWithCommission__buy">
        <Input value={priceWithCommissionBuy} readOnly />
      </div>
      <div className="calculator__priceWithCommission__sell">
        <Input value={priceWithCommissionSell} readOnly />
      </div>
      <div className="calculator__spread">Спред</div>
      <div className="calculator__spread__amount">
        <Input />
      </div>
      <div className="calculator__turnover">Оборот</div>
      <div className="calculator__turnover__amount">
        <Input />
      </div>
      <div className="calculator__netProfit">Чистая прибыль</div>
      <div className="calculator__netProfit__amount">
        <Input />
      </div>
    </div>
  );
};
export default CalculatorItem;
