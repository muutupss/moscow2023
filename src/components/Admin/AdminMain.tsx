import React from 'react';

import './AdminMain.css';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  cost: string;
  sector: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Потенциальные траты',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Сектор производства',
    dataIndex: 'sector',
    key: 'sector',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Скачать отчет</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Василий Петрович',
    cost: '32 млн',
    sector: 'Промышленность',
  },
  {
    key: '2',
    name: 'Александро Панинно',
    cost: '12 млн',
    sector: 'Собаководство',
  },
  {
    key: '3',
    name: 'Иван Фарович',
    cost: '277 млн',
    sector: 'Молочная продукция',
  },
];

const AdminMain = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default AdminMain;
