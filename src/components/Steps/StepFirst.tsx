import { Input, Select, Typography, Col, Row, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import './StepFirst.css';

const listOfTypeOrganization = [
  { value: 'ИП', label: 'ИП' },
  { value: 'АО', label: 'АО' },
  { value: 'ОАО', label: 'ОАО' },
  { value: 'Самозанятый', label: 'Самозанятый' },
];

const listOfTypeTaxes = [
  { value: 'Налоги 1', label: 'Налоги 1' },
  { value: 'Налоги 2', label: 'Налоги 2' },
  { value: 'Налоги 3', label: 'Налоги 3' },
];

const { Text } = Typography;

const StepFirst = ({
  industries,
  patents,
  registrationForms,
  taxForms,
  workerCount,
  industryId,
  registrationId,
  taxId,
  patentId,
  changeCurrentStepValues,
}: any) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (patentId) {
      setChecked(true);
    }
  }, []);

  const handleChangeTypeIndustry = (value: string) => {
    changeCurrentStepValues('industry_id', value);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      changeCurrentStepValues('worker_count', inputValue);
    }
  };

  const handleChangeTypeOrganization = (value: string) => {
    changeCurrentStepValues('registration_id', value);
  };

  const handleChangeTypeTax = (value: string) => {
    changeCurrentStepValues('tax_id', value);
  };

  const handleChangeCheckbox = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    console.log(`checked = ${e.target.checked}`);
  };

  const handleChangeTypePatient = (value: string) => {
    changeCurrentStepValues('patent_id', value);
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
              onChange={handleChangeTypeIndustry}
              value={industryId}
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
              value={workerCount}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="step_first_text_plus_select">
            <Text strong>Тип организации</Text>
            <Select
              onChange={handleChangeTypeOrganization}
              value={registrationId}
              options={registrationForms}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="step_first_text_plus_select">
            <Text strong>Тип налогооблажения</Text>
            <Select
              onChange={handleChangeTypeTax}
              value={taxId}
              options={taxForms}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <div className="step_first_text_plus_select">
            <Text strong>Патент</Text>
            <Select
              showSearch
              disabled={!checked}
              placeholder="Начните печатать"
              optionFilterProp="children"
              onChange={handleChangeTypePatient}
              value={patentId}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  // @ts-ignore
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={patents.length !== 0 ? patents : []}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="step_first_checkbox">
            <Checkbox checked={checked} onChange={handleChangeCheckbox}>
              Будем оформлять патент?
            </Checkbox>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StepFirst;
