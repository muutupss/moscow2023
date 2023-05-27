import React, { useState } from 'react';
import DWChart from '../DWChart/DWChart';
import { Button, Col, Input, List, Row, Select, Typography } from 'antd';

import './StepSecond.css';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const optionsMoscowRegion = [
  {
    value: 'Центральный административный округ (ЦАО)',
    label: 'Центральный административный округ (ЦАО)',
  },
  {
    value: 'Северный административный округ (САО)',
    label: 'Северный административный округ (САО)',
  },
  {
    value: 'Северо-Восточный административный округ (СВАО)',
    label: 'Северо-Восточный административный округ (СВАО)',
  },
  {
    value: 'Восточный административный округ (ВАО)',
    label: 'Восточный административный округ (ВАО)',
  },
  {
    value: 'Юго-Восточный административный округ (ЮВАО)',
    label: 'Юго-Восточный административный округ (ЮВАО)',
  },
  {
    value: 'Южный административный округ (ЮАО)',
    label: 'Южный административный округ (ЮАО)',
  },
  {
    value: 'Юго-Западный административный округ (ЮЗАО)',
    label: 'Юго-Западный административный округ (ЮЗАО)',
  },
  {
    value: 'Западный административный округ (ЗАО)',
    label: 'Западный административный округ (ЗАО)',
  },
  {
    value: 'Северо-Западный административный округ (СЗАО)',
    label: 'Северо-Западный административный округ (СЗАО)',
  },
  {
    value: 'Новомосковский административный округ (НАО)',
    label: 'Новомосковский административный округ (НАО)',
  },
];

const data = [
  {
    title: 'Первая часть большого завода',
    cost: '10',
  },
  {
    title: 'Молокоперорабатывающий завод',
    cost: '15',
  },
  {
    title: 'Подсобное помещение 1',
    cost: '20',
  },
  {
    title: 'Подсобное помещение 2',
    cost: '49',
  },
];

const StepSecond = ({ districts }: any) => {
  const [valueAll, setValueAll] = useState('');
  const [valueObjects, setvalueObjects] = useState('');
  const [valueSpecificObjects, setvalueSpecificObjects] = useState('');
  const [valueSpecificObjectsCost, setvalueSpecificObjectsCost] = useState('');

  const handleChangeNumberAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setValueAll(inputValue);
    }
  };

  const handleChangeNumberObjects = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setvalueObjects(inputValue);
    }
  };

  const handleChangeSelectMoscowRegion = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const handleChangeSpecificObjects = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value: inputValue } = e.target;
    setvalueSpecificObjects(inputValue);
  };

  const handleChangeSpecificObjectsCost = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setvalueSpecificObjectsCost(inputValue);
    }
  };

  return (
    <>
      <Row gutter={32}>
        <Col span={12}>
          <Row>
            <Col span={20}>
              <div className="step_second_text_plus_select">
                <Text strong>Где будем строить</Text>
                <Select
                  showSearch
                  placeholder="Начните печатать"
                  optionFilterProp="children"
                  onChange={handleChangeSelectMoscowRegion}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      // @ts-ignore
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={districts.length !== 0 ? districts : []}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <div className="step_second_text_plus_select">
                <Text strong>Площадь земельного участка</Text>
                <Input
                  onChange={handleChangeNumberAll}
                  placeholder="Введите число в м2"
                  maxLength={16}
                  value={valueAll}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <div className="step_second_text_plus_select">
                <Text strong>Площадь объектов капитального строительства</Text>
                <Input
                  onChange={handleChangeNumberObjects}
                  placeholder="Введите число в м2"
                  maxLength={16}
                  value={valueObjects}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={14}>
              <div className="step_second_text_plus_select">
                <Text strong>Объект строительства</Text>
                <Input
                  onChange={handleChangeSpecificObjects}
                  placeholder="Название объекта"
                  value={valueSpecificObjects}
                />
              </div>
            </Col>
            <Col span={10}>
              <div className="step_second_text_input_plus_button">
                <div className="step_second_text_plus_select">
                  <Text strong>Площадь м2</Text>
                  <Input
                    onChange={handleChangeSpecificObjectsCost}
                    maxLength={16}
                    placeholder="3 м2"
                    value={valueSpecificObjectsCost}
                  />
                </div>
                <div className="step_second_button_add__margin">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.cost}
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <DWChart title="Chart" src="//datawrapper.dwcdn.net/Wh8QV/1/" />
        </Col>
      </Row>
    </>
  );
};

export default StepSecond;
