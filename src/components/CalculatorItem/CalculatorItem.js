import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space } from "antd";
import "./CalculatorItem.scss";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";

const CalculatorItem = ({ deleteFunction, type = '' }) => {
  const [priceBuy, setPriceBuy] = useState();
  const [commissionBuy, setCommissionBuy] = useState();
  const [priceWithCommissionBuy, setPriceWithCommissionBuy] = useState();
  const [priceSell, setPriceSell] = useState();
  const [commissionSell, setCommissionSell] = useState();
  const [priceWithCommissionSell, setPriceWithCommissionSell] = useState();
  const [spread, setSpread] = useState();
  const [turnover, setTurnover] = useState();
  const [netProfit, setNetProfit] = useState();
  const [usdtPriceBuy, setUsdtPriceBuy] = useState();
  const [usdtCommissionBuy, setUsdtCommissionBuy] = useState();
  const [altPriceInUsdt, setAltPriceInUsdt] = useState();
  const [altSellPrice, setAltSellPrice] = useState();
  const [altCommissionSell, setAltCommissionSell] = useState(0);
  const [usdtSpread, setUsdtSpread] = useState();
  const [altPriceBuy, setAltPriceBuy] = useState();
  const [altCommissionBuy, setAltCommissionBuy] = useState();
  const [altPriceInUsdt2, setAltPriceInUsdt2] = useState();
  const [usdtSellPrice, setUsdtSellPrice] = useState();
  const [usdtCommissionSell, setUsdtCommissionSell] = useState(0);
  const [altSpread, setAltSpread] = useState();
      
  // const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Рассчёт цены с комиссией при покупке
  useEffect(() => {
    if (priceBuy && commissionBuy) {
      const result = Number(priceBuy) * (1 + Number(commissionBuy) / 100);
      setPriceWithCommissionBuy(Number(result));
    }
    if(!priceBuy || !commissionBuy) {
      setPriceWithCommissionBuy(undefined);
    }
  }, [priceBuy, commissionBuy]);

    // Рассчёт цены с комиссией при продаже
  useEffect(() => {
    if (priceSell && commissionSell) {
      const result = Number(priceSell) * (1 - Number(commissionSell) / 100);
      setPriceWithCommissionSell(Number(result));
    }
    if(!priceSell || !commissionSell) {
      setPriceWithCommissionSell(undefined);
    }
  }, [priceSell, commissionSell]);

  // Рассчёт спреда
  useEffect(() => {
    if (priceWithCommissionSell && priceWithCommissionBuy) {
      const result = (Number(priceWithCommissionSell) / Number(priceWithCommissionBuy) - 1) * 100;
      setSpread(Number(result));
    }
    if(!priceWithCommissionSell || !priceWithCommissionBuy) {
      setSpread(undefined);
    }
  }, [priceWithCommissionSell, priceWithCommissionBuy]);

  // Рассчёт чистой прибыли
  useEffect(() => {
    if (spread && turnover) {
      const result = Number(turnover) * Number(spread) / 100;
      setNetProfit(result);
    }
    if(!spread || !turnover) {
      setNetProfit(undefined);
    }
  }, [turnover, spread]);

  // Рассчёт USDT спреда в 3х калькуляторе
  useEffect(() => {
    if(usdtPriceBuy && usdtCommissionBuy && altPriceInUsdt && altSellPrice) {
      const result = (((Number(altSellPrice) - (Number(altSellPrice) * Number(altCommissionSell) / 100)) / (Number(altPriceInUsdt) * ((Number(usdtPriceBuy) * Number(usdtCommissionBuy) / 100) + Number(usdtPriceBuy)))) - 1) * 100;
      setUsdtSpread(Number(result).toFixed(4))
    }
    if(!usdtPriceBuy || !usdtCommissionBuy || !altPriceInUsdt || !altSellPrice) {
      setUsdtSpread(undefined);
    }
  }, [usdtPriceBuy, usdtCommissionBuy, altPriceInUsdt, altSellPrice, altCommissionSell])

  // Рассчёт ALT спреда в 3х калькуляторе
  useEffect(() => {
    if(altPriceBuy && altCommissionBuy && altPriceInUsdt2 && usdtSellPrice) {
      const result = ((Number(usdtSellPrice) - (Number(usdtSellPrice) * Number(usdtCommissionSell / 100))) / (((Number(altPriceBuy) * Number(altCommissionBuy) / 100) + Number(altPriceBuy)) / Number(altPriceInUsdt2)) - 1) *100;
      setAltSpread(Number(result).toFixed(4))
    }
    if(!altPriceBuy || !altCommissionBuy || !altPriceInUsdt2 || !usdtSellPrice) {
      setAltSpread(undefined);
    }
  }, [altPriceBuy, altCommissionBuy, altPriceInUsdt2, usdtSellPrice, usdtCommissionSell])

  function handleChange(value, setFunc) {
    // Если isNumber равен true, проверяем значение на соответствие регулярному выражению
    const re = /^(\d+[.,]?\d*|[.,]\d+)$/;
    if (value !== "" && !re.test(value)) return;

    const newValue = value.replace(",", ".");

    setFunc(newValue);
  }

  return (
    <div>
      {
        !type && <>
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
            suffix="%"
          />
        </div>
        <div className="calculator__commission__sell">
          <Input
            value={commissionSell}
            onChange={(e) => handleChange(e.target.value, setCommissionSell)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            suffix="%"
          />
        </div>
        <div className="calculator__priceWithCommission">Цена с комиссией</div>
        <div className="calculator__priceWithCommission__buy">
          <Input value={priceWithCommissionBuy ? priceWithCommissionBuy.toFixed(4) : priceWithCommissionBuy} readOnly />
        </div>
        <div className="calculator__priceWithCommission__sell">
          <Input value={priceWithCommissionSell ? priceWithCommissionSell.toFixed(4) : priceWithCommissionSell} readOnly />
        </div>
        <div className="calculator__spread">Спред</div>
        <div className="calculator__spread__amount">
          <Input
            value={spread ? `${spread.toFixed(4)} %` : spread}
            readOnly
          />
        </div>
        <div className="calculator__turnover">Оборот</div>
        <div className="calculator__turnover__amount">
          <Input
            value={turnover}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value, setTurnover)}
          />
        </div>
        <div className="calculator__netProfit">Чистая прибыль</div>
        <div className="calculator__netProfit__amount">
          <Input
            value={netProfit ? netProfit.toFixed(4) : netProfit}
            readOnly
          />
        </div>
      </div>
        </>
      }
      {
        type === 'usdt' && <>
          <div className="calculator__outer">
            <Input
              bordered={false}
              suffix={<EditOutlined style={{ fontSize: 16 }} />}
              placeholder="Фиат -> USDT -> ALT -> Фиат"
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                width: 250,
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
          <div className={`calculator__Usdt__container ${isFocused ? "focused" : ""}`}>
            <div className="calculator__Usdt__price">Цена покупки USDT</div>
            <div className="calculator__Usdt__price__input">
              <Input
                value={usdtPriceBuy}
                onChange={(e) => handleChange(e.target.value, setUsdtPriceBuy)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="calculator__Usdt__commission">Комиссия</div>
            <div className="calculator__Usdt__commission__input">
              <Input
                value={usdtCommissionBuy}
                suffix="%"
                onChange={(e) => handleChange(e.target.value, setUsdtCommissionBuy)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="calculator__Usdt__Alt__price">Цена ALT в USDT</div>
            <div className="calculator__Usdt__Alt__price__input">
              <Input value={altPriceInUsdt}
                onChange={(e) => handleChange(e.target.value, setAltPriceInUsdt)}
                onFocus={handleFocus}
                onBlur={handleBlur} />
            </div>
            <div className="calculator__Usdt__Alt__price__sell">Цена продажи ALT в руб.</div>
            <div className="calculator__Usdt__Alt__price__sell__input">
              <Input
                value={altSellPrice}
                onChange={(e) => handleChange(e.target.value, setAltSellPrice)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="calculator__Usdt__Alt__commission__sell">Комиссия</div>
            <div className="calculator__Usdt__Alt__commission__sell__input">
              <Input
                value={altCommissionSell !== 0 ? altCommissionSell : 0}
                suffix="%"
                onChange={(e) => handleChange(e.target.value, setAltCommissionSell)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="calculator__Usdt__spread">Спред</div>
            <div className="calculator__Usdt__spread__result">
              <Input
                value={usdtSpread ? `${usdtSpread} %` : "Заполните все ячейки"}
                readOnly
              />
            </div>
          </div>
        </>
      }
      {
        type === 'alt' && <>
          <div className="calculator__outer">
          <Input
            bordered={false}
            suffix={<EditOutlined style={{ fontSize: 16 }} />}
            placeholder="Фиат -> ALT -> USDT -> Фиат"
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              width: 250,
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
          <div className={`calculator__Alt__container ${isFocused ? "focused" : ""}`}>
            <div className="calculator__Alt__price">Цена покупки ALT</div>
            <div className="calculator__Alt__price__input">
              <Input
                value={altPriceBuy}
                onChange={(e) => handleChange(e.target.value, setAltPriceBuy)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="calculator__Alt__commission">Комиссия</div>
            <div className="calculator__Alt__commission__input">
              <Input
                value={altCommissionBuy}
                suffix="%"
                onChange={(e) => handleChange(e.target.value, setAltCommissionBuy)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="calculator__Alt__Usdt__price">Цена ALT в USDT</div>
            <div className="calculator__Alt__Usdt__price__input">
              <Input
                value={altPriceInUsdt2}
                onChange={(e) => handleChange(e.target.value, setAltPriceInUsdt2)}
                onFocus={handleFocus}
                onBlur={handleBlur} />
            </div>
            <div className="calculator__Alt__Usdt__price__sell">Цена продажи USDT в руб.</div>
            <div className="calculator__Alt__Usdt__price__sell__input">
              <Input
                value={usdtSellPrice}
                onChange={(e) => handleChange(e.target.value, setUsdtSellPrice)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="calculator__Alt__Usdt__commission__sell">Комиссия</div>
            <div className="calculator__Alt__Usdt__commission__sell__input">
              <Input
                value={usdtCommissionSell !== 0 ? usdtCommissionSell : '0'}
                suffix="%"
                onChange={(e) => handleChange(e.target.value, setUsdtCommissionSell)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="calculator__Alt__spread">Спред</div>
            <div className="calculator__Alt__spread__result">
              <Input
                value={altSpread ? `${altSpread}%` : "Заполните все ячейки"}
                readOnly
              />
            </div>
          </div>
        </>
      }
    </div>
  );
};
export default CalculatorItem;
