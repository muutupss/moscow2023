import React, { useEffect } from 'react';

import './AdminMain.css';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { isUserInSystemLocalStorage } from '../../helper/auth-header';
import { useNavigate } from 'react-router-dom';
import AdminChart from './AdminChart';
import Title from 'antd/es/typography/Title';

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
    title: 'User ID',
    dataIndex: 'UserID',
    key: 'UserID',
  },
  {
    title: 'Индустрия',
    dataIndex: 'IndustryID',
    key: 'IndustryID',
  },
  {
    title: 'Потенциальные траты (млн руб)',
    dataIndex: 'ResultTo',
    key: 'ResultTo',
  },
  {
    title: 'Действия',
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
  const {
    getListCalculator,
    getIndustries,
    getStatsCalculator,
    doesUserInSystem,
    listCurrentCalculators,
    industries,
    optionsForAdminChart,
  } = sharedStore;

  useEffect(() => {
    if (!isUserInSystemLocalStorage()) {
      navigate('/');
    } else {
      getIndustries();
      getListCalculator();
      getStatsCalculator();
    }
  }, [doesUserInSystem]);

  const handleMappingList = (list: any) => {
    if (industries.length !== 0 && listCurrentCalculators !== 0) {
      let mapping = [...list];
      mapping = mapping.map((value: any) => {
        let currentValue = { ...value };
        const dataValue = new Date(currentValue.UpdatedAt);
        currentValue.UpdatedAt = `${dataValue.toLocaleTimeString(
          'en-GB',
        )} ${dataValue.toLocaleDateString('en-GB')}`;
        currentValue.ResultTo =
          Math.trunc(parseInt(currentValue.ResultTo) / 10000) / 100;

        let currentInd = industries.find(
          (value: any) => currentValue.IndustryID === value.id,
        );
        if (currentInd?.value) {
          currentInd = currentInd?.value;
        }
        if (currentInd?.name) {
          currentInd = currentInd?.name;
        }
        currentValue.IndustryID = currentInd;
        return currentValue;
      });
      return mapping;
    }
    return [];
  };

  return (
    <>
      <div className="admin_page_content">
        <AdminChart optionsForChart={optionsForAdminChart} />
      </div>
      <div className="admin_page_content">
        <div className="admin_page_title">
          <Title style={{ margin: 0 }} level={4}>
            Все запросы от пользователей
          </Title>
        </div>
        <Table
          columns={columns}
          dataSource={handleMappingList(listCurrentCalculators)}
        />
      </div>
    </>
  );
});

export default AdminMain;
