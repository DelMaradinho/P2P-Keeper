import React, { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, Input, Modal, Table } from "antd";
import { Resizable } from "react-resizable";
import "./CustomTable.scss";
import "react-resizable/css/styles.css";
import AutoComplete from "../AutoComplete/AutoComplete";
import { DatePicker } from "antd";
import {
  DeleteOutlined,
  RedoOutlined,
} from "@ant-design/icons";
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
} from "../../constants/constants";
import { filterDataByCriteria } from "../../helpers/helpers";
import { SyncOutlined } from "@ant-design/icons";
import ruRU from "antd/lib/locale/ru_RU";
import NewFormulaButton from "../NewFormulaButton/NewFormulaButton";

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

  const tableRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const dropdownRefs = useRef([]);

  useEffect(() => {
    setData(tableData);

    return () => {
      setData([]);
    };
  }, [tableData]);

  const buttonText = <span>Добавить сделку</span>;

  const handleAddRow = () => {
    const newRow = {
      key: data.length + 1,
      currency: "",
      buy_price: "",
      commission: "",
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

  const handleDocumentClick = (e) => {
    const isClickInsideDropdown = Object.values(dropdownRefs.current).some(
      (ref) => ref && ref.contains(e.target)
    );
    if (
      tableRef.current &&
      !tableRef.current.contains(e.target) &&
      !isClickInsideDropdown
    ) {
      setExpandedRowKeys([]);
    }
  };

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
        // Если строка уже развернута, сворачиваем её
        return prevKeys.filter((key) => key !== record.key);
      }
      // Если строка не развернута, делаем её единственной развернутой строкой
      return [record.key];
    });
  };

  const countSpredForUsdt = (record) => {
    const sell_price = Number(record?.sell_price) || 0
    const exchanging_rate = Number(record?.exchanging_rate) || 0
    const buy_price = Number(record?.buy_price) || 0
    const commission = Number(record?.commission) || 0

    const spred = sell_price / (exchanging_rate * (buy_price + (buy_price * commission))) - 1

    return `${spred} %`
  }

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
      title: "Комиссия",
      dataIndex: "commission",
      key: "commission",
      sticky: true,
      width: 97,
      render: (text, record) => (
        <Input
          type="text"
          value={text}
          onChange={(event) =>
            handleChange(record.key, "commission", event.target.value, true)
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
      render: (text, record) => {
        const calculatedSpread = record.currency === 'USDT' ? countSpredForUsdt(record) : 'хЭр';
        return (
          <Input
            type="text"
            value={calculatedSpread}
            style={{
              height: 35,
              backgroundColor: "#5DE0DD",
              border: "1px solid blue",
              fontWeight: "bolder",
            }}
            readOnly
          />
        );
      },
    },
    {
      title: "Чистая прибыль",
      dataIndex: "net_profit",
      key: "net_profit",
      sticky: true,
      width: 110,
      render: (text, record) => {
        const calculatedProfit =
          record.sell_price * record.buy_amount -
          record.buy_price * record.buy_amount;
        return (
          <Input
            type="text"
            value={calculatedProfit}
            style={{
              height: 35,
              backgroundColor: "#00800047",
              border: "1px solid #3FE0B3",
              fontWeight: "bolder",
            }}
            readOnly
          />
        );
      },
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
          <a onClick={() => handleDuplicate(record)} title="Повторить сделку">
            <RedoOutlined
              style={{ fontSize: 14, transform: "rotate(-90deg)" }}
            />
          </a>{" "}
          <a
            onClick={() => {
              Modal.confirm({
                content: "Вы правда хотите удалить эту сделку?",
                okText: "Да",
                cancelText: "Нет",
                okButtonProps: {
                  style: {
                    backgroundColor: "rgba(8, 31, 73, 1)",
                    color: "white",
                  },
                },
                onCancel() {},
                onOk() {
                  handleDelete(record.key);
                },
              });
            }}
            title="Удалить сделку"
          >
            <DeleteOutlined style={{ fontSize: 14 }} />
          </a>
        </p>
      ),
    },
  ]);

  const [columnsExtra, setColumnsExtra] = useState([
    {
      title: "Меняемая валюта",
      dataIndex: "exchanging_currency",
      key: "exchanging_currency",
      sticky: true,
      width: 50,
      render: (text, record) => (
        <AutoComplete
          ref={autoCompleteRef}
          dropdownRef={(el) => {
            dropdownRefs.current[record.key] = el;
          }}
          defaultOptions={cryptoCurrencies}
          defaultValue={text}
          handleSelect={(value) =>
            handleChangeNested(
              record.key.split("-")[0],
              record.key,
              "exchanging_currency",
              value
            )
          }
        />
      ),
    },
    {
      title: "Курс конвертации",
      dataIndex: "exchanging_rate",
      key: "exchanging_rate",
      sticky: true,
      width: 50,
      render: (text, record) => (
        <Input
          type="number"
          value={text}
          onChange={(event) =>
            handleChangeNested(
              record.key.split("-")[0],
              record.key,
              "exchanging_rate",
              event.target.value,
              true
            )
          }
        />
      ),
    },
    {
      title: "Цена покупки",
      dataIndex: "exchanging_buy_price",
      key: "exchanging_buy_price",
      sticky: true,
      width: 50,
      render: (text, record) => (
        <Input
          type="number"
          value={text}
          onChange={(event) =>
            handleChangeNested(
              record.key.split("-")[0],
              record.key,
              "exchanging_buy_price",
              event.target.value,
              true
            )
          }
        />
      ),
    },
    {
      title: "Количество",
      dataIndex: "exchanging_buy_amount",
      key: "exchanging_buy_amount",
      sticky: true,
      width: 50,
      render: (text, record) => (
        <Input
          type="number"
          value={text}
          onChange={(event) =>
            handleChangeNested(
              record.key.split("-")[0],
              record.key,
              "exchanging_buy_amount",
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
      return col;
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

  const onAddConvert = (record) => {
    setNestedData((prevNestedData) => {
      return {
        ...prevNestedData,
        [record.key]: [
          ...prevNestedData[record.key],
          {
            currency: "",
            buy_price: "",
            buy_amount: "",
            key: `${record.key}-${prevNestedData[record.key].length + 1}`,
          },
        ],
      };
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div className="table__container">
      <ConfigProvider locale={ruRU}>
        <div className="table__button__filter">
          <NewFormulaButton
            addFunction={handleAddRow}
            buttonText={buttonText}
            fixed={false}
            size="middle"
            narrow={true}
          />
          <FilterPanel onFilterChange={onFilterChange} />
        </div>

        <Table
          ref={tableRef}
          components={components}
          columns={resizableColumns}
          dataSource={data}
          rowClassName={(record) =>
            expandedRowKeys.includes(record.key)
              ? "table__row__parent__expanded table__row__custom"
              : "table__row__custom"
          }
          // sticky
          showSorterTooltip={true}
          expandable={{
            showExpandColumn: false,
            expandedRowRender: (record) => (
              <div className="expanded_wrapper">
                <Table
                  columns={columnsExtra}
                  dataSource={nestedData[record.key]}
                  rowClassName="table__row__custom"
                  pagination={false}
                  tableLayout="fixed"
                />
                <Button disabled  onClick={() => onAddConvert(record)}>
                  Добавить конвертацию
                </Button>
              </div>
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
