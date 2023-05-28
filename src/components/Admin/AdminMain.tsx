import React, { useEffect } from 'react';

import './AdminMain.css';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { isUserInSystemLocalStorage } from '../../helper/auth-header';
import { useNavigate } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
  cost: string;
  sector: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Дата',
    dataIndex: 'UpdatedAt',
    key: 'UpdatedAt',
  },
  {
    title: 'Юзер ID',
    dataIndex: 'UserID',
    key: 'UserID',
  },
  {
    title: 'Индустрия',
    dataIndex: 'IndustryID',
    key: 'IndustryID',
  },
  {
    title: 'Потенциальные траты',
    dataIndex: 'ResultTo',
    key: 'ResultTo',
  },
  {
    title: 'Action',
    dataIndex: 'ReportLink',
    key: 'ReportLink',
    render: (text) => {
      return (
        <Button danger>
          <a href={text} target="_blank">
            Скачать отчет
          </a>
        </Button>
      );
    },
  },
];

const AdminMain = observer(() => {
  const navigate = useNavigate();
  const { sharedStore } = useStore();
  const { getListCalculator, doesUserInSystem, listCurrentCalculators } =
    sharedStore;

  useEffect(() => {
    if (!isUserInSystemLocalStorage()) {
      navigate('/');
    } else {
      getListCalculator();
    }
  }, [doesUserInSystem]);

  return <Table columns={columns} dataSource={listCurrentCalculators} />;
});

export default AdminMain;
