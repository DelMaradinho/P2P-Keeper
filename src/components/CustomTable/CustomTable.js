import React, { useRef, useState } from "react";
import { Input, Table } from "antd";
import { Resizable } from "react-resizable";
import "./CustomTable.scss";
import "react-resizable/css/styles.css";
import AutoComplete from "../AutoComplete/AutoComplete";
import { DatePicker } from "antd";
import { RollbackOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={<span className="react-resizable-handle" />}
      onResize={onResize}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const dateFormat = "YYYY-MM-DD";

const CustomTable = () => {
  const [data, setData] = useState([
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
      date: "2022-03-21",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      currency: "USDT",
      buy_price: 12345,
      buy_amount: 100,
      exchange: "",
      sell_price: 12350,
      sell_amount: 99,
      spread: "",
      net_profit: "",
      date: "2022-02-01",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
  ]);

  const lastKeyRef = useRef(data.length);

  const cryptoCurrencies = [
    { value: "BTC", label: "BTC" },
    { value: "USDT", label: "USDT" },
    { value: "DOGE", label: "DOGE" },
    { value: "ETH", label: "ETH" },
  ];

  function handleChange(key, fieldName, value) {
    // Найдем объект по ключу
    const objIndex = data.findIndex((obj) => obj.key === key);

    // Если объект не найден, выходим из функции
    if (objIndex === -1) return;

    // Создаем копию данных для иммутабельности
    const newData = [...data];

    // Обновляем значение для конкретного поля
    newData[objIndex][fieldName] = value;

    // Обновляем состояние
    setData(newData);
    console.log(value);
  }

  function handleChangeNumber(key, fieldName, value) {
    const re = /^(?!.*,,)\d*(,\d*)?$/;

    // if value is not blank, then test the regex

    if (value === "" || re.test(value)) {
      // Найдем объект по ключу
      const objIndex = data.findIndex((obj) => obj.key === key);

      // Если объект не найден, выходим из функции
      if (objIndex === -1) return;

      // Создаем копию данных для иммутабельности
      const newData = [...data];

      // Обновляем значение для конкретного поля
      newData[objIndex][fieldName] = value;

      // Обновляем состояние
      setData(newData);
      console.log(value);
    }
  }
  console.log(data);

  const [columns, setColumns] = useState([
    {
      title: "Монета",
      dataIndex: "currency",
      key: "currency",
      sticky: true,
      width: 85,
      render: (text, record) => (
        <AutoComplete
          defaultOptions={cryptoCurrencies}
          defaultValue={text}
          handleSelect={(value) => handleChange(record.key, "currency", value)}
        />
      ),
    },
    {
      title: "Цена покупки",
      dataIndex: "buy_price",
      key: "buy_price",
      sticky: true,
      width: 110,
      render: (text, record) => (
        <Input
          type="text"
          value={text}
          onChange={(event) =>
            handleChangeNumber(record.key, "buy_price", event.target.value)
          }
        />
      ),
      sorter: (a, b) => a.buy_price - b.buy_price,
    },
    {
      title: "Количество",
      dataIndex: "buy_amount",
      key: "buy_amount",
      sticky: true,
      width: 97,
      render: (text, record) => (
        <Input
          type="text"
          value={text}
          onChange={(event) =>
            handleChangeNumber(record.key, "buy_amount", event.target.value)
          }
        />
      ),
    },
    {
      title: "Обмен",
      dataIndex: "exchange",
      key: "exchange",
      sticky: true,
      width: 72,
      render: (text, record) => (
        <Input
          type="text"
          value={text}
          onChange={(event) =>
            handleChangeNumber(record.key, "exchange", event.target.value)
          }
        />
      ),
    },
    {
      title: "Цена продажи",
      dataIndex: "sell_price",
      key: "sell_price",
      sticky: true,
      width: 115,
      render: (text, record) => (
        <Input
          type="text"
          value={text}
          onChange={(event) =>
            handleChangeNumber(record.key, "sell_price", event.target.value)
          }
        />
      ),
    },
    {
      title: "Количество",
      dataIndex: "sell_amount",
      key: "sell_amount",
      sticky: true,
      width: 97,
      render: (text, record) => (
        <Input
          type="text"
          value={text}
          onChange={(event) =>
            handleChangeNumber(record.key, "sell_amount", event.target.value)
          }
        />
      ),
    },
    {
      title: "Спред",
      dataIndex: "spread",
      key: "spread",
      sticky: true,
      width: 70,
      render: (text, record) => (
        <Input
          type="text"
          value={text}
          onChange={(event) =>
            handleChangeNumber(record.key, "spread", event.target.value)
          }
        />
      ),
    },
    {
      title: "Чистая прибыль",
      dataIndex: "net_profit",
      key: "net_profit",
      sticky: true,
      width: 110,
      render: (text, record) => (
        <Input
          type="text"
          value={text}
          controls={false}
          onChange={(event) =>
            handleChangeNumber(record.key, "net_profit", event.target.value)
          }
        />
      ),
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      sticky: true,
      width: 130,
      render: (text, record) => (
        <DatePicker
          defaultValue={dayjs(text, dateFormat)}
          format={dateFormat}
          onChange={(dayjsDate, stringDate) =>
            handleChange(record.key, "date", stringDate)
          }
        />
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      sticky: true,
      width: 40,
      render: (text, record) => (
        <p>
          <a onClick={() => handleDuplicate(record)}>
            <RollbackOutlined />
          </a>{" "}
          <a onClick={() => handleDelete(record.key)}>
            <DeleteOutlined />
          </a>
        </p>
      ),
    },
  ]);

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleDuplicate = (record) => {
    const itemToDuplicate = record;
    lastKeyRef.current += 1; // Увеличиваем значение ключа
    const newItem = { ...itemToDuplicate, key: lastKeyRef.current };
    setData((prevData) => [...prevData, newItem]);
  };

  const handleResize =
    (index) =>
    (e, { size }) => {
      setColumns((prev) => {
        const nextColumns = [...prev];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return nextColumns;
      });
    };

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const resizableColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <div className="table__container">
      <Table
        components={components}
        columns={resizableColumns}
        dataSource={data}
        rowClassName="table__row__custom"
        sticky
        showSorterTooltip={true}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default CustomTable;
