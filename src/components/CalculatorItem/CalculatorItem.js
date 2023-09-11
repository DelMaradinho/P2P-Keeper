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

  function handleChange(value, setFunc) {
    // Если isNumber равен true, проверяем значение на соответствие регулярному выражению
    const re = /^(\d+[.,]?\d*|[.,]\d+)$/;
    if (value !== "" && !re.test(value)) return;

    const newValue = value.replace(",", ".");

    setFunc(newValue);
  }

  return (
    <div className="calculator__container">
      <div className="calculator__blank"></div>
      <div className="calculator__buy">Купил</div>
      <div className="calculator__sell">Продал</div>
      <div className="calculator__price">Цена</div>
      <div className="calculator__price__buy">
        <Input
          value={priceBuy}
          onChange={(e) => handleChange(e.target.value, setPriceBuy)}
        />
      </div>
      <div className="calculator__price__sell">
        <Input
          value={priceSell}
          onChange={(e) => handleChange(e.target.value, setPriceSell)}
        />
      </div>
      <div className="calculator__commission">Комиссия</div>
      <div className="calculator__commission__buy">
        <Input
          value={commissionBuy}
          onChange={(e) => handleChange(e.target.value, setCommissionBuy)}
        />
      </div>
      <div className="calculator__commission__sell">
        <Input
          value={commissionSell}
          onChange={(e) => handleChange(e.target.value, setCommissionSell)}
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
