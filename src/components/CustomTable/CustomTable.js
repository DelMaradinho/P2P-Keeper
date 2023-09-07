import React, { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, Input, Table } from "antd";
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
import FilterPanel from "../FilterPanel/FilterPanel";
import {
  cryptoCurrencies,
  dateFormat,
  tableData,
} from "../../constants/constants";
import { filterDataByCriteria } from "../../helpers/helpers";
import { SyncOutlined } from "@ant-design/icons";
import ruRU from "antd/lib/locale/ru_RU";

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
      handle={<div className="custom-resizable-handle" />}
      onResize={onResize}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const CustomTable = ({ tableData }) => {
  const [data, setData] = useState(tableData);
  const [nestedData, setNestedData] = useState({});
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    setData(tableData);

    return () => {
      setData([]);
    };
  }, [tableData]);

  function handleChangeNested(
    parentKey,
    childKey,
    fieldName,
    value,
    isNumber = false
  ) {
    // Если isNumber равен true, проверяем значение на соответствие регулярному выражению
    const re = /^(\d+[.,]?\d*|[.,]\d+)$/;
    if (isNumber && value !== "" && !re.test(value)) return;

    const newValue = isNumber ? value.replace(",", ".") : value;

    setNestedData((prevNestedData) => {
      const nestedArray = prevNestedData[parentKey] || [];
      const nestedObjIndex = nestedArray.findIndex(
        (obj) => obj.key === childKey
      );

      if (nestedObjIndex === -1) return prevNestedData; // если объект не найден, вернем неизмененное состояние

      const newNestedArray = [...nestedArray];
      newNestedArray[nestedObjIndex][fieldName] = newValue;

      return { ...prevNestedData, [parentKey]: newNestedArray };
    });
  }

  function handleChange(key, fieldName, value, isNumber = false) {
    // Если isNumber равен true, проверяем значение на соответствие регулярному выражению
    const re = /^(\d+[.,]?\d*|[.,]\d+)$/;
    if (isNumber && value !== "" && !re.test(value)) return;

    const newValue = isNumber ? value.replace(",", ".") : value;

    setData((prevData) => {
      const newData = [...prevData];
      const objIndex = newData.findIndex((obj) => obj.key === key);

      if (objIndex === -1) return prevData; // если объект не найден, вернем неизмененное состояние

      newData[objIndex][fieldName] = newValue;
      return newData;
    });
  }

  const handleRowExpand = (record) => {
    setNestedData((prevNestedData) => {
      if (prevNestedData[record.key]) return prevNestedData;

      return {
        ...prevNestedData,
        [record.key]: [{ ...record, key: `${record.key}-1` }],
      };
    });
    setExpandedRowKeys((prevKeys) => {
      if (prevKeys.includes(record.key)) {
        return prevKeys.filter((key) => key !== record.key);
      }
      return [...prevKeys, record.key];
    });
  };

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
            handleChange(record.key, "buy_price", event.target.value, true)
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
            handleChange(record.key, "buy_amount", event.target.value, true)
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
        <p className="button__exchange">
          <Button
            type="default"
            shape="round"
            size="large"
            onClick={() => handleRowExpand(record)}
            // classNames="menu__button__burger"
            // onClick={toggleCollapsed}
            style={{
              borderRadius: 12,
            }}
          >
            <SyncOutlined style={{ fontSize: 24 }} />
          </Button>
        </p>
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
            handleChange(record.key, "sell_price", event.target.value, true)
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
            handleChange(record.key, "spread", event.target.value, true)
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
            handleChange(record.key, "net_profit", event.target.value, true)
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
      width: 50,
      render: (text, record) => (
        <p style={{ margin: 0 }}>
          <a onClick={() => handleDuplicate(record)} title="Повторить формулу">
            <RollbackOutlined style={{ fontSize: 14 }} />
          </a>{" "}
          <a onClick={() => handleDelete(record.key)} title="Удалить формулу">
            <DeleteOutlined style={{ fontSize: 14 }} />
          </a>
        </p>
      ),
    },
  ]);

  const [columnsExtra, setColumnsExtra] = useState([
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
          handleSelect={(value) =>
            handleChangeNested(
              record.key.split("-")[0],
              record.key,
              "currency",
              value
            )
          }
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
            handleChangeNested(
              record.key.split("-")[0],
              record.key,
              "buy_price",
              event.target.value,
              true
            )
          }
        />
      ),
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
            handleChangeNested(
              record.key.split("-")[0],
              record.key,
              "buy_amount",
              event.target.value,
              true
            )
          }
        />
      ),
    },
  ]);

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleDuplicate = (record) => {
    const itemToDuplicate = record;
    setData((prevData) => {
      const newItem = { ...itemToDuplicate, key: prevData.length + 1 };
      return [newItem, ...prevData];
    });
  };

  const handleResize =
    (index) =>
    (e, { size }) => {
      setColumns((prev) => {
        const nextColumns = [...prev];

        // Проверка ключа столбца
        if (nextColumns[index].key === "action") {
          return prev; // Если это столбец "action", просто верните предыдущие столбцы без изменений
        }

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

  const resizableColumns = columns.map((col, index) => {
    if (col.key === "action") {
      return col; // Для столбца "action" возвращаем столбец без изменений
    }
    return {
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    };
  });

  const onFilterChange = (incomingFilter) => {
    setFilter((prevFilter) => {
      const updatedFilter = { ...prevFilter, ...incomingFilter };

      // Удаление ключей с пустыми массивами
      Object.keys(updatedFilter).forEach((key) => {
        if (
          Array.isArray(updatedFilter[key]) &&
          updatedFilter[key].length === 0
        ) {
          delete updatedFilter[key];
        }
      });

      setData(filterDataByCriteria(updatedFilter, tableData));

      return updatedFilter;
    });
  };

  return (
    <div className="table__container">
      <ConfigProvider locale={ruRU}>
        <FilterPanel onFilterChange={onFilterChange} />
        <Table
          components={components}
          columns={resizableColumns}
          dataSource={data}
          rowClassName="table__row__custom"
          sticky
          showSorterTooltip={true}
          expandable={{
            showExpandColumn: false,
            expandedRowRender: (record) => (
              <Table
                columns={columnsExtra}
                dataSource={nestedData[record.key]}
                rowClassName="table__row__custom"
                pagination={false}
              />
            ),
            expandedRowKeys: expandedRowKeys,
            expandIcon: () => <></>,
            onExpand: (expanded, record) => {
              if (expanded) {
                handleRowExpand(record);
              }
            },
          }}
          pagination={{
            position: ["bottomCenter"],
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "30", "50"], // опции для количества записей на странице
            defaultPageSize: 5, // количество записей на странице по умолчанию
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default CustomTable;
