import React, { useEffect, useState } from "react";
import MainMenu from "../../components/MainMenu/MainMenu";
import TeamTable from "../../components/TeamTable/TeamTable";
import { Form, Input, Modal, Select, Button } from "antd";
import "./team.scss";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const initialTeam = [
  {
    name: "Дэвид Ливси",
    role: "Дроповод",
    email: "d.livesey@espanyola.com",
    key: 1,
  },
  {
    name: "Джим Хокинс",
    role: "Сотрудник",
    email: "j.hawkins@espanyola.com",
    key: 2,
  },
  {
    name: "Джон Трелони",
    role: "Владелец",
    email: "j.treloni@espanyola.com",
    key: 3,
  },
];

const buttonText = (
  <span>
    Добавить
    <br />
    участника
  </span>
);

function Team() {
  const [data, setData] = useState(initialTeam);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingRecord, setCurrentEditingRecord] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMemberData, setNewMemberData] = useState({
    name: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    const uniqueRoles = [...new Set(data.map((item) => item.role))];
    const formattedOptions = uniqueRoles.map((role) => ({ value: role }));
    setSelectOptions(formattedOptions);
  }, [data]);

  const startEditing = (record) => {
    setCurrentEditingRecord(record);
    setIsEditing(true);
    console.log(currentEditingRecord, "currentEditingRecord ------");
    console.log(isEditing, "isEditing ---------");
  };

  const stopEditing = () => {
    setIsEditing(false);
    setCurrentEditingRecord(null);
  };

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

  console.log(data, "data++++++++++++++");

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddNewMember = (newMember) => {
    setData((prevData) => [...prevData, newMember]);
  };

  const handleEdit = (updatedData) => {
    if (updatedData) {
      setData((prevData) => {
        const index = prevData.findIndex(
          (item) => item.key === updatedData.key
        );
        if (index === -1) return prevData;
        const updatedTeam = [
          ...prevData.slice(0, index),
          updatedData,
          ...prevData.slice(index + 1),
        ];
        return updatedTeam;
      });
    }
    stopEditing();
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  return (
    <div className="App">
      {isAdding && (
        <Modal
          title="Добавление нового сотрудника"
          open={isAdding}
          onCancel={() => {
            setIsAdding(false);
            form.resetFields();
          }}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                handleAddNewMember(values);
                setIsAdding(false);
                form.resetFields();
              })
              .catch((info) => {
                console.log("Validation failed:", info);
              });
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Имя"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите имя!",
                },
              ]}
            >
              <Input placeholder="Имя" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Роль"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите роль!",
                },
              ]}
            >
              <Select placeholder="Роль" options={selectOptions} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Пожалуйста, введите корректный email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Form>
        </Modal>
      )}

      {isEditing && (
        <Modal
          title="Редактирование карточки сотрудника"
          open={isEditing}
          onCancel={stopEditing}
          onOk={() => {
            editForm
              .validateFields()
              .then((values) => {
                const updatedData = { ...currentEditingRecord, ...values };
                handleEdit(updatedData);
                editForm.resetFields();
              })
              .catch((info) => {
                console.log("Validation failed:", info);
              });
          }}
        >
          <Form
            form={editForm}
            layout="vertical"
            initialValues={currentEditingRecord}
          >
            <Form.Item name="name" label="Имя">
              <Input placeholder="Имя" />
            </Form.Item>
            <Form.Item name="role" label="Роль">
              <Select options={selectOptions} placeholder="Роль" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Пожалуйста, введите корректный email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Form>
        </Modal>
      )}
      <div className="left">
        <MainMenu selectedKey={["5"]} />
      </div>
      <div className="right">
        <h1 className="right__header">Команда</h1>
        <TeamTable tableData={data} initialColumns={columns} />
        <div className="right__button__container">
          <Button
            type="primary"
            size="middle"
            icon={<PlusCircleOutlined style={{ fontSize: 20 }} />}
            onClick={handleAddClick}
            style={{
              display: "flex",
              alignItems: "center",
              height: 50,
              top: 180,
              padding: 5,
              lineHeight: 1.3,
              borderRadius: 12,
              backgroundColor: "rgba(8, 31, 73, 1)",
            }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Team;
