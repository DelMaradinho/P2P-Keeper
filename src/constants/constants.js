export const filterData = [
  {
    value: "currency",
    title: "Валюта",
    children: [
      {
        value: "btc",
        title: "BTC",
      },
      {
        value: "usdt",
        title: "USDT",
      },
    ],
  },
  {
    value: "platform",
    title: "Платформа",
    children: [
      {
        value: "binance",
        title: "Binance",
      },
      {
        value: "bybit",
        title: "Bybit",
      },
    ],
  },
];

export const tableData = [
  {
    key: 1,
    currency: "BTC",
    buy_price: 12345,
    buy_amount: 100,
    exchange: "",
    sell_price: 12350,
    spread: "",
    net_profit: "",
    date: "2023-08-29",
  },
  {
    key: 2,
    currency: "USDT",
    buy_price: 3456,
    buy_amount: 50,
    exchange: "",
    sell_price: 12350,
    spread: "",
    net_profit: "",
    date: "2022-02-01",
  },
  {
    key: 3,
    currency: "ETH",
    buy_price: 152,
    buy_amount: 10,
    exchange: "",
    sell_price: 178,
    spread: "",
    net_profit: "",
    date: "2021-01-25",
  },
];

export const dateFormat = "YYYY-MM-DD";

export const cryptoCurrencies = [
  { value: "BTC", label: "BTC" },
  { value: "USDT", label: "USDT" },
  { value: "DOGE", label: "DOGE" },
  { value: "ETH", label: "ETH" },
];

export const favoriteFormulas = [
  {
    key: "formula_1",
    name: "Формула 1",
    variable1: "Цена покупки",
    variable2: "Умножить",
    variable3: "Кол-во",
    variable4: "Разделить",
    variable5: "Цена продажи",
  },
  {
    key: "formula_2",
    name: "Формула 2",
    variable1: "Цена покупки",
    variable2: "Умножить",
    variable3: "Количество",
  },
  {
    key: "formula_3",
    name: "Формула 3",
    variable1: "Спред",
    variable2: "Плюс",
    variable3: "Цена продажи",
    variable4: "Минус",
    variable5: "Количество",
    variable6: "Разделить",
    variable7: "Цена покупки",
    variable8: "Плюс",
    variable9: "Прибыль",
  },
];
