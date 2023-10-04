import React, { useEffect, useState } from "react";
import { ConfigProvider, Input, Modal, Table, Select } from "antd";
import "./TeamTable.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ruRU from "antd/lib/locale/ru_RU";

const TeamTable = ({ tableData, initialColumns }) => {
  return (
    <div className="table__container">
      <ConfigProvider locale={ruRU}>
        <Table
          columns={initialColumns}
          dataSource={tableData}
          pagination={false}
        />
      </ConfigProvider>
    </div>
  );
};

export default TeamTable;
