import { Input, Select, Typography, Col, Row, Popover } from 'antd';
import React, { useEffect, useState } from 'react';

import './StepFirst.css';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const IP = 'ИП';
const OOO = 'OOO';
const PATENT = 'Патент';
const IPCOUNT = 100;
const PATENTCOUNT = 15;

const CONTENT_ORG_TYPE = (
  <div>
    <div>
      <span>
        Эта{' '}
        <a
          target="_blank"
          href="https://kontur.ru/articles/399"
          rel="noreferrer"
        >
          статья
        </a>{' '}
        поможет вам определиться: открыть ИП или ООО
      </span>
    </div>
    <div>
      <span>Ограничение в ИП - 100 человек</span>
    </div>
  </div>
);

const CONTENT_TAX_TYPE = (
  <div>
    <div>
      <span>
        Если вы выбрали ООО, то эта{' '}
        <a
          target="_blank"
          href="https://www.tinkoff.ru/business/help/registration/registration/register-llc/tax-system/"
          rel="noreferrer"
        >
          статья
        </a>{' '}
        поможет вам определиться, какую систему налогообложения выбрать
      </span>
    </div>
    <div>
      <span>
        Если вы выбрали ИП, то эта{' '}
        <a
          target="_blank"
          href="http://www.sberbank.ru/ru/s_m_business/pro_business/patent-dlya-ip/"
          rel="noreferrer"
        >
          статья
        </a>{' '}
        поможет вам узнать больше о патенте
      </span>
    </div>
    <div>
      <span>
        Патент можно выбирать только для ИП и только если количество сотрудников
        не больше 15
      </span>
    </div>
  </div>
);

const ERROR = 'error';

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
  changeDisableButton,
}: any) => {
  const [checked, setChecked] = useState(false);
  const [statusOrgType, setStatusOrgType] = useState('' as any);
  const [statusTaxType, setStatusTaxType] = useState('' as any);

  useEffect(() => {
    if (patentId) {
      setChecked(true);
    }
    if (parseInt(workerCount) > IPCOUNT && registrationId === IP) {
      setStatusOrgType(ERROR);
    }
    if (
      (parseInt(workerCount) > PATENTCOUNT || registrationId !== IP) &&
      taxId === PATENT
    ) {
      setStatusTaxType(ERROR);
    } else {
      setStatusTaxType('');
    }
  }, []);

  useEffect(() => {
    if (statusOrgType === ERROR || statusTaxType === ERROR) {
      changeDisableButton(true);
    } else {
      changeDisableButton(false);
    }
  }, [statusOrgType, statusTaxType]);

  const handleChangeTypeIndustry = (value: string) => {
    changeCurrentStepValues('industry_id', value);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      if (parseInt(inputValue) > IPCOUNT && registrationId === IP) {
        setStatusOrgType(ERROR);
      } else {
        setStatusOrgType('');
      }
      if (
        (parseInt(inputValue) > PATENTCOUNT || registrationId !== IP) &&
        taxId === PATENT
      ) {
        setStatusTaxType(ERROR);
      } else {
        setStatusTaxType('');
      }
      changeCurrentStepValues(
        'worker_count',
        inputValue ? parseInt(inputValue) : 0,
      );
    }
  };

  const handleChangeTypeOrganization = (value: string) => {
    if (parseInt(workerCount) > IPCOUNT && value === IP) {
      setStatusOrgType(ERROR);
    } else {
      setStatusOrgType('');
    }
    if (
      (parseInt(workerCount) > PATENTCOUNT || value !== IP) &&
      taxId === PATENT
    ) {
      setStatusTaxType(ERROR);
    } else {
      setStatusTaxType('');
    }
    changeCurrentStepValues('registration_id', value);
  };

  const handleChangeTypeTax = (value: string) => {
    if (value === PATENT) {
      setChecked(true);
    } else {
      setChecked(false);
      changeCurrentStepValues('patent_id', null);
    }
    if (
      (parseInt(workerCount) > PATENTCOUNT || registrationId !== IP) &&
      value === PATENT
    ) {
      setStatusTaxType(ERROR);
    } else {
      setStatusTaxType('');
    }
    changeCurrentStepValues('tax_id', value);
  };

  const handleChangeTypePatient = (value: string) => {
    changeCurrentStepValues('patent_id', value);
  };

  return (
    <div>
      <Row>
        <Col span={24}>
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
        <Col span={8}>
          <div className="step_first_text_plus_select">
            <Text strong>Количество сотрудников</Text>
            <Input
              onChange={handleChangeNumber}
              placeholder="Введите число"
              maxLength={16}
              value={workerCount ? workerCount : 0}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className="step_first_text_plus_select">
            <div className="step_first_text_plus_popover">
              <Text strong>Тип организации</Text>
              <Popover
                placement="top"
                trigger="click"
                content={CONTENT_ORG_TYPE}
              >
                <QuestionCircleOutlined className="step_first_text_plus_popover_icon" />
              </Popover>
            </div>
            <Select
              onChange={handleChangeTypeOrganization}
              value={registrationId}
              options={registrationForms}
              status={statusOrgType}
            />
            {statusOrgType === ERROR ? (
              <Text style={{ color: 'red', margin: 0 }}>
                Количество сотрудников больше 100
              </Text>
            ) : (
              <></>
            )}
          </div>
        </Col>
        <Col span={8}>
          <div className="step_first_text_plus_select">
            <div className="step_first_text_plus_popover">
              <Text strong>Тип налогообложения</Text>
              <Popover
                placement="top"
                trigger="click"
                content={CONTENT_TAX_TYPE}
              >
                <QuestionCircleOutlined className="step_first_text_plus_popover_icon" />
              </Popover>
            </div>
            <Select
              onChange={handleChangeTypeTax}
              value={taxId}
              options={taxForms}
              status={statusTaxType}
            />
            {statusTaxType === ERROR ? (
              <Text style={{ color: 'red', margin: 0 }}>
                Для патента количество сотрудников должно быть меньше 15, а тип
                организации ИП
              </Text>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <div className="step_first_text_plus_select">
            <Text strong>Патент</Text>
            <Select
              showSearch
              disabled={!checked || statusTaxType === ERROR}
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
      </Row>
    </div>
  );
};

export default StepFirst;
