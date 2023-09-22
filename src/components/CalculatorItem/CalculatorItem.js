import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space } from "antd";
import "./CalculatorItem.scss";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";

const CalculatorItem = ({ deleteFunction }) => {
  const [priceSell, setPriceSell] = useState("");
  const [commissionSell, setCommissionSell] = useState("");
  const [priceWithCommissionSell, setPriceWithCommissionSell] = useState("");
  const [priceBuy, setPriceBuy] = useState("");
  const [commissionBuy, setCommissionBuy] = useState("");
  const [priceWithCommissionBuy, setPriceWithCommissionBuy] = useState("");
  const [spread, setSpread] = useState("");
  const [turnover, SetTurnover] = useState("");
  const [netProfit, setNetProfit] = useState("");
  // const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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
    <div>
      <div className="calculator__outer">
        <Input
          bordered={false}
          suffix={<EditOutlined style={{ fontSize: 16 }} />}
          placeholder="USDT"
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: 100,
            borderBottom: "1px solid #e3e9f6",
            borderRadius: 0,
          }}
        />
        <Space>
          <Button
            type="text"
            shape="round"
            size="middle"
            icon={<CloseCircleOutlined style={{ fontSize: 16 }} />}
            onClick={() => {
              Modal.confirm({
                content: "Вы правда хотите удалить этот калькулятор?",
                okText: "Да",
                cancelText: "Нет",
                okButtonProps: {
                  style: {
                    backgroundColor: "rgba(8, 31, 73, 1)",
                    color: "white", // Задаем цвет текста для кнопки подтверждения
                  },
                },
                onCancel() {},
                onOk() {
                  deleteFunction();
                },
              });
            }}
            style={{
              zIndex: 100,
              padding: 5,
              borderRadius: 18,
            }}
          />
        </Space>
      </div>
      <div className={`calculator__container ${isFocused ? "focused" : ""}`}>
        <div className="calculator__blank"></div>
        <div className="calculator__buy">Купил</div>
        <div className="calculator__sell">Продал</div>
        <div className="calculator__price">Цена</div>
        <div className="calculator__price__buy">
          <Input
            value={priceBuy}
            onChange={(e) => handleChange(e.target.value, setPriceBuy)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="calculator__price__sell">
          <Input
            value={priceSell}
            onChange={(e) => handleChange(e.target.value, setPriceSell)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="calculator__commission">Комиссия</div>
        <div className="calculator__commission__buy">
          <Input
            value={commissionBuy}
            onChange={(e) => handleChange(e.target.value, setCommissionBuy)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="calculator__commission__sell">
          <Input
            value={commissionSell}
            onChange={(e) => handleChange(e.target.value, setCommissionSell)}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
          <Input
            value={spread}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value, setSpread)}
          />
        </div>
        <div className="calculator__turnover">Оборот</div>
        <div className="calculator__turnover__amount">
          <Input
            value={turnover}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value, SetTurnover)}
          />
        </div>
        <div className="calculator__netProfit">Чистая прибыль</div>
        <div className="calculator__netProfit__amount">
          <Input
            value={netProfit}
            onChange={(e) => handleChange(e.target.value, setNetProfit)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};
export default CalculatorItem;
