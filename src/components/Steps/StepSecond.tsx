import React, { useState } from 'react';
import DWChart from '../DWChart/DWChart';
import {
  Button,
  Col,
  Input,
  List,
  Row,
  Select,
  Typography,
  message,
} from 'antd';

import './StepSecond.css';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const StepSecond = ({
  changeCurrentStepValues,
  districts,
  landArea,
  districtId,
  capBuildingArea,
  capReBuildingArea,
  buildings,
}: any) => {
  const [valueSpecificObjects, setvalueSpecificObjects] = useState('');
  const [valueSpecificObjectsCost, setvalueSpecificObjectsCost] = useState(0);

  const handleChangeSelectMoscowRegion = (value: string[]) => {
    changeCurrentStepValues('district_id', value);
  };

  const handleChangeNumberAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      changeCurrentStepValues('land_area', parseInt(inputValue));
    }
  };

  const handleChangeNumberObjects = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      changeCurrentStepValues('cap_building_area', parseInt(inputValue));
    }
  };

  const handleChangeNumberRebuildObjects = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      changeCurrentStepValues('cap_rebuilding_area', parseInt(inputValue));
    }
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
      setvalueSpecificObjectsCost(parseInt(inputValue));
    }
  };

  const handleClickAddBuild = () => {
    if (valueSpecificObjects && valueSpecificObjectsCost) {
      changeCurrentStepValues('buildings', {
        name: valueSpecificObjects,
        area: valueSpecificObjectsCost,
      });
      setvalueSpecificObjects('');
      setvalueSpecificObjectsCost(0);
    } else {
      message.info('Одно из полей не заполнено');
    }
  };

  return (
    <>
      <Row gutter={32}>
        <Col span={12}>
          <Row>
            <Col span={20}>
              <div className="step_second_text_plus_select">
                <Text strong>Район Москвы</Text>
                <Select
                  showSearch
                  placeholder="Начните печатать"
                  optionFilterProp="children"
                  onChange={handleChangeSelectMoscowRegion}
                  value={districtId}
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
                  value={landArea}
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
                  value={capBuildingArea}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <div className="step_second_text_plus_select">
                <Text strong>Площадь подлежащих ремонту объектов</Text>
                <Input
                  onChange={handleChangeNumberRebuildObjects}
                  placeholder="Введите число в м2"
                  maxLength={16}
                  value={capReBuildingArea}
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
                    value={
                      valueSpecificObjectsCost ? valueSpecificObjectsCost : 0
                    }
                  />
                </div>
                <div className="step_second_button_add__margin">
                  <Button
                    onClick={handleClickAddBuild}
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
                dataSource={buildings}
                renderItem={(item: any, index) => (
                  <List.Item>
                    <List.Item.Meta title={`${item?.name} ${item?.area} м2`} />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <div className="step_second_chart">
            <DWChart title="Chart" src="//datawrapper.dwcdn.net/3uzOm/1/" />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StepSecond;
