import React, { useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Table,
  AutoComplete,
  Select,
} from "antd";
import "./TeamTable.scss";
import {
  RollbackOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ruRU from "antd/lib/locale/ru_RU";

const TeamTable = ({ tableData }) => {
  const [data, setData] = useState(tableData);

  useEffect(() => {
    setData(tableData);

    return () => {
      setData([]);
    };
  }, [tableData]);

  const [columns, setColumns] = useState([
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      sticky: true,
      width: 85,
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      sticky: true,
      width: 110,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sticky: true,
      width: 97,
    },
    {
      title: "Действия",
      dataIndex: "action",
      key: "action",
      sticky: true,
      width: 50,
      render: (text, record) => (
        <p style={{ margin: 0 }}>
          <a onClick={() => startEditing(record)} title="Редактировать">
            <EditOutlined style={{ fontSize: 14, marginRight: 5 }} />
          </a>{" "}
          <a
            onClick={() => {
              Modal.confirm({
                content: "Вы правда хотите удалить этого участника?",
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
            title="Удалить"
          >
            <DeleteOutlined style={{ fontSize: 14 }} />
          </a>
        </p>
      ),
    },
  ]);

  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  useEffect(() => {
    const uniqueRoles = [...new Set(data.map((item) => item.role))];
    const formattedOptions = uniqueRoles.map((role) => ({ value: role }));
    setAutocompleteOptions(formattedOptions);
  }, [data]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingRecord, setCurrentEditingRecord] = useState(null);

  const startEditing = (record) => {
    setCurrentEditingRecord(record);
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
    setCurrentEditingRecord(null);
  };

  const handleEditConfirm = () => {
    // Если у нас есть currentEditingRecord, обновляем data
    if (currentEditingRecord) {
      setData((prevData) => {
        // Находим индекс редактируемого элемента
        const index = prevData.findIndex(
          (item) => item.key === currentEditingRecord.key
        );

        if (index === -1) return prevData; // Если элемент не найден, просто возвращаем предыдущий массив

        // Если элемент найден, создаем новый массив данных, заменяя старый элемент на обновленный
        const updatedData = [
          ...prevData.slice(0, index),
          currentEditingRecord,
          ...prevData.slice(index + 1),
        ];

        return updatedData;
      });
    }

    stopEditing();
  };

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

  // const handleResize =
  //   (index) =>
  //   (e, { size }) => {
  //     setColumns((prev) => {
  //       const nextColumns = [...prev];

  //       // Проверка ключа столбца
  //       if (nextColumns[index].key === "action") {
  //         return prev; // Если это столбец "action", просто верните предыдущие столбцы без изменений
  //       }

  //       nextColumns[index] = {
  //         ...nextColumns[index],
  //         width: size.width,
  //       };
  //       return nextColumns;
  //     });
  //   };

  // const components = {
  //   header: {
  //     cell: ResizableTitle,
  //   },
  // };

  // const resizableColumns = columns.map((col, index) => {
  //   if (col.key === "action") {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onHeaderCell: (column) => ({
  //       width: column.width,
  //       onResize: handleResize(index),
  //     }),
  //   };
  // });

  // const onFilterChange = (incomingFilter) => {
  //   setFilter((prevFilter) => {
  //     const updatedFilter = { ...prevFilter, ...incomingFilter };

  //     // Удаление ключей с пустыми массивами
  //     Object.keys(updatedFilter).forEach((key) => {
  //       if (
  //         Array.isArray(updatedFilter[key]) &&
  //         updatedFilter[key].length === 0
  //       ) {
  //         delete updatedFilter[key];
  //       }
  //     });

  //     setData(filterDataByCriteria(updatedFilter, tableData));

  //     return updatedFilter;
  //   });
  // };

  return (
    <div className="table__container">
      <ConfigProvider locale={ruRU}>
        <Table columns={columns} dataSource={data} pagination={false} />
        {isEditing && (
          <Modal
            title="Редактирование карточки сотрудника"
            visible={isEditing}
            onCancel={stopEditing}
            onOk={handleEditConfirm}
          >
            <Input
              defaultValue={currentEditingRecord.name}
              onChange={(e) =>
                setCurrentEditingRecord({
                  ...currentEditingRecord,
                  name: e.target.value,
                })
              }
              placeholder="Имя"
            />
            <Select
              options={autocompleteOptions}
              defaultValue={currentEditingRecord.role}
              onSelect={(value) =>
                setCurrentEditingRecord({
                  ...currentEditingRecord,
                  role: value,
                })
              }
              placeholder="Роль"
            />
            <Input
              defaultValue={currentEditingRecord.email}
              onChange={(e) =>
                setCurrentEditingRecord({
                  ...currentEditingRecord,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />
          </Modal>
        )}
      </ConfigProvider>
    </div>
  );
};

export default TeamTable;
