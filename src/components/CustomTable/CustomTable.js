import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const [data, setData] = useState([]);
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


  const handleChangeNested = (
    parentKey,
    childKey,
    fieldName,
    value,
    isNumber = false
  ) => {
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

    if (fieldName === "exchanging_rate") {
      setData((prevData) => {
        const parentRow = prevData.find(row => Number(row.key) === Number(parentKey));
        if (parentRow && parentRow.currency === 'USDT') {
          const spread = countSpredForUsdt(parentRow, newValue);
          const net_profit = countNetProfitForUsdt(parentRow, newValue);
          return prevData.map((item) => {
            if (item.key === parentRow.key) {
              return { ...item, spread, net_profit };
            }
            return item;
          });
        }
        if (parentRow && parentRow.currency && parentRow.currency !== 'USDT') {
          const spread = countSpredForAlt(parentRow, newValue);
          const net_profit = countNetProfitForAlt(parentRow, newValue);
          return prevData.map((item) => {
            if (item.key === parentRow.key) {
              return { ...item, spread, net_profit };
            }
            return item;
          });
        }
        return prevData
      })
    }
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

  const countSpredForUsdt = (record, exchanging_rate = null) => {
    let result
    const sell_price = Number(record?.sell_price)
    const buy_price = Number(record?.buy_price)
    const commission = Number(record?.commission) / 100

    if (record?.sell_price && exchanging_rate && record?.buy_price && record?.commission) {
      let variable1
      variable1 = buy_price * commission
      variable1 = variable1 + buy_price
      variable1 = variable1 * exchanging_rate
      variable1 = sell_price / variable1
      variable1 = variable1 - 1
      result = variable1 * 100
    } else {
      result = ((sell_price / buy_price) - 1) * 100
    }

    result = result.toFixed(2);
    return `${result} %`
  }

  const countNetProfitForUsdt = (record, exchanging_rate = null) => {
    let result
    const sell_price = Number(record?.sell_price)
    const buy_price = Number(record?.buy_price)
    const buy_amount = Number(record?.buy_amount)
    const commission = Number(record?.commission) / 100
    if (sell_price && buy_price && buy_amount && commission && exchanging_rate) {
      let variable1
      let variable2
      let variable3
      variable1 = buy_price * commission
      variable1 = buy_price + variable1
      variable1 = variable1 * buy_amount
      variable2 = buy_price * commission
      variable2 = buy_price + variable2
      variable2 = exchanging_rate * variable2
      variable1 = variable1 / variable2 * sell_price
      variable3 = buy_price * commission
      variable3 = buy_price + variable3
      variable3 = variable3 * buy_amount
      variable1 = variable1 - variable3
      return result = variable1.toFixed(2)
    } else {
      return result = sell_price * buy_amount - buy_price * buy_amount
    }
  }

  const countSpredForAlt = (record, exchanging_rate = null) => {
    let result
    const sell_price = Number(record?.sell_price)
    const buy_price = Number(record?.buy_price)
    const commission = Number(record?.commission)

    if (record?.sell_price && exchanging_rate && record?.buy_price && record?.commission) {
      result = (sell_price / ((buy_price + (buy_price * commission / 100)) / exchanging_rate) - 1) * 100;

    } else {
      result = ((sell_price / buy_price) - 1) * 100

    }

    result = result.toFixed(2)
    return `${result} %`
  }

  const countNetProfitForAlt = (record, exchanging_rate = null) => {
    let result
    const sell_price = Number(record?.sell_price)
    const buy_price = Number(record?.buy_price)
    const buy_amount = Number(record?.buy_amount)
    const commission = Number(record?.commission) / 100
    if (sell_price && buy_price && buy_amount && commission && exchanging_rate) {
      let variable1
      let variable2
      let variable3
      variable1 = buy_price * commission
      variable1 = variable1 + buy_price
      variable1 = variable1 * buy_amount
      variable2 = buy_price * commission
      variable2 = variable2 + buy_price
      variable2 = variable2 / exchanging_rate
      variable1 = variable1 / variable2 * sell_price
      variable3 = buy_price * commission
      variable3 = variable3 + buy_price
      variable3 = variable3 * buy_amount
      variable1 = variable1 - variable3
      return result = variable1.toFixed(2)
      // return result = (((buy_price + (buy_price * commission)) * buy_amount) / ((buy_price + (buy_price * commission)) / exchanging_rate) * sell_price) - ((buy_price + (buy_price * commission)) * buy_amount);
    } else {
      return result = sell_price * buy_amount - buy_price * buy_amount
    }
  }

  const countBuyPriceFiatUsdt = (record) => {
    let result
    const buy_price = Number(record?.buy_price)
    const commission = Number(record?.commission) / 100
    const exchanging_rate = Number(record?.exchanging_rate)
    console.log(record, 'recordrecordrecord')
    if(buy_price && commission && exchanging_rate) {
      return result = exchanging_rate * (buy_price + (buy_price * commission))
    }
    else return result = ''
  }

  const countBuyPriceFiatAlt = (record) => {
    let result
    const buy_price = Number(record?.buy_price)
    const commission = Number(record?.commission) / 100
    const exchanging_rate = Number(record?.exchanging_rate)
    console.log(record, 'recordrecordrecord')
    if(buy_price && commission && exchanging_rate) {
      return result = (buy_price + (buy_price * commission)) / exchanging_rate
    }
    else return result = ''
  }

  const countAmountUsdt = (record) => {
    const buy_price = Number(record?.buy_price)
    const buy_amount = Number(record?.buy_amount)
    const commission = Number(record?.commission) / 100
    const exchanging_rate = Number(record?.exchanging_rate)
    let result
    if (buy_price && buy_amount && commission && exchanging_rate) {
      let variable1
      let variable2
      variable1 = buy_price * commission
      variable1 = variable1 + buy_price
      variable1 = variable1 * buy_amount
      variable2 = buy_price * commission
      variable2 = variable2 + buy_price
      variable2 = variable2 * exchanging_rate
      return result = variable1 / variable2
    } else return result = ''
  }

  const countAmountAlt = (record) => {
    const buy_price = Number(record?.buy_price)
    const buy_amount = Number(record?.buy_amount)
    const commission = Number(record?.commission) / 100
    const exchanging_rate = Number(record?.exchanging_rate)
    let result

    if (buy_price && buy_amount && commission && exchanging_rate) {
      let variable1
      let variable2
      variable1 = buy_price * commission
      variable1 = variable1 + buy_price
      variable1 = variable1 * buy_amount
      variable2 = buy_price * commission
      variable2 = variable2 + buy_price
      variable2 = variable2 / exchanging_rate
      return result = variable1 / variable2
    } else return result = ''
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
      width: 85,
      render: (text, record) => {
        let resultSpread
        if (record.currency === 'USDT') {
          resultSpread = countSpredForUsdt(record)
        }
        if (record.currency && record.currency !== 'USDT') {
          resultSpread = countSpredForAlt(record)
        }
        if (text) {
          resultSpread = text
        } 
        
        return (
          <Input
            type="text"
            value={resultSpread}
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
        let resultNetProfit
        if (record.currency === 'USDT') {
          resultNetProfit = countNetProfitForUsdt(record)
        }
        if (record.currency && record.currency !== 'USDT') {
          resultNetProfit = countNetProfitForAlt(record)
        }
        if (text) {
          resultNetProfit = text
        }

        return (
          <Input
            type="text"
            value={resultNetProfit}
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
                onCancel() { },
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

  console.log('data :>> ', data);

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
      render: (text, record) => {
        let resultExchangingBuyPrice
        if (record.currency === 'USDT') {
          resultExchangingBuyPrice = countBuyPriceFiatUsdt(record)
        }
        if (record.currency && record.currency !== 'USDT') {
          resultExchangingBuyPrice = countBuyPriceFiatAlt(record)
        }
        if (text) {
          resultExchangingBuyPrice = text
        }

        return (
          <Input
            type="text"
            value={resultExchangingBuyPrice}
            readOnly
          />
        );
      },
      // render: (text, record) => (
        
      //   <Input
      //     type="number"
      //     value={text}
      //     onChange={(event) =>
      //       handleChangeNested(
      //         record.key.split("-")[0],
      //         record.key,
      //         "exchanging_buy_price",
      //         event.target.value,
      //         true
      //       )
      //     }
      //   />
      // ),
    },
    {
      title: "Количество",
      dataIndex: "exchanging_buy_amount",
      key: "exchanging_buy_amount",
      sticky: true,
      width: 50,
      render: (text, record) => {
        let resultExchangingAmount
        if (record.currency === 'USDT') {
          resultExchangingAmount = countAmountUsdt(record)
        }
        if (record.currency && record.currency !== 'USDT') {
          resultExchangingAmount = countAmountAlt(record)
        }
        if (text) {
          resultExchangingAmount = text
        }

        return (
          <Input
            type="text"
            value={resultExchangingAmount}
            readOnly
          />
        );
      },
      // render: (text, record) => (
      //   <Input
      //     type="number"
      //     value={text}
      //     onChange={(event) =>
      //       handleChangeNested(
      //         record.key.split("-")[0],
      //         record.key,
      //         "exchanging_buy_amount",
      //         event.target.value,
      //         true
      //       )
      //     }
      //   />
      // ),
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
                <Button disabled onClick={() => onAddConvert(record)}>
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
