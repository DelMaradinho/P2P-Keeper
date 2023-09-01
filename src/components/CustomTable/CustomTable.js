import React from "react";
import { Table } from "antd";
import styles from "./CustomTable.module.scss";

const columns = [
  {
    title: "Монета",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Цена покупки",
    dataIndex: "buy_price",
    key: "buy_price",
  },
  {
    title: "Количество",
    dataIndex: "buy_amount",
    key: "buy_amount",
  },
  {
    title: "Обмен",
    dataIndex: "exchange",
    key: "exchange",
  },
  {
    title: "Цена продажи",
    dataIndex: "sell_price",
    key: "sell_price",
  },
  {
    title: "Количество",
    dataIndex: "sell_amount",
    key: "sell_amount",
  },
  {
    title: "Спред",
    dataIndex: "spread",
    key: "spread",
  },
  {
    title: "Чистая прибыль",
    dataIndex: "net_profit",
    key: "net_profit",
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
];
const data = [
  {
    key: 1,
    currency: "BTC",
    buy_price: 12345,
    buy_amount: 100,
    exchange: "",
    sell_price: 12350,
    sell_amount: 99,
    spread: "",
    net_profit: "",
    date: "21.03.2022",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    currency: "BTC",
    buy_price: 12345,
    buy_amount: 100,
    exchange: "",
    sell_price: 12350,
    sell_amount: 99,
    spread: "",
    net_profit: "",
    date: "21.03.2022",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
];
const CustomTable = () => (
  <div className={styles.table__container}>
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description}
          </p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
    />
  </div>
);
export default CustomTable;
