import { Input, Select, Typography, Col, Row, Checkbox } from 'antd';
import React, { useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import './StepFirst.css';

const listOfTypeOrganization = [
  { value: 'ИП', label: 'ИП' },
  { value: 'АО', label: 'АО' },
  { value: 'ОАО', label: 'ОАО' },
  { value: 'Самозанятый', label: 'Самозанятый' },
];

const { Text } = Typography;

const StepFirst = ({ industries }: any) => {
  const [value, setValue] = useState('');
  console.log('industries', JSON.stringify(industries));

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setValue(inputValue);
    }
  };

  const handleChangeTypeOrganization = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeCheckbox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div>
      <Row>
        <Col span={18}>
          <div className="step_first_text_plus_select">
            <Text strong>Выберите основную отрасль</Text>
            <Select
              showSearch
              placeholder="Начните печатать"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  // @ts-ignore
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={industries.length !== 0 ? industries : []}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <div className="step_first_text_plus_select">
            <Text strong>Количество сотрудников</Text>
            <Input
              onChange={handleChangeNumber}
              placeholder="Введите число"
              maxLength={16}
              value={value}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="step_first_text_plus_select">
            <Text strong>Тип организации</Text>
            <Select
              defaultValue="ИП"
              onChange={handleChangeTypeOrganization}
              options={listOfTypeOrganization}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="step_first_checkbox">
            <Checkbox onChange={handleChangeCheckbox}>
              Будем оформлять патент?
            </Checkbox>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StepFirst;
