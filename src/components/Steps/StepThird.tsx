import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, List, Row, Typography } from 'antd';
import React, { useState } from 'react';

const { Text } = Typography;

const data = [
  {
    title: 'Большой огромный станок номер 1',
    cost: '10',
  },
  {
    title: 'Станок стокарный малютка',
    cost: '15',
  },
  {
    title: 'Какой-то еще супер станок прям бомба',
    cost: '20',
  },
  {
    title: 'Фрезировщик',
    cost: '49',
  },
];

const StepThird = () => {
  const [valueSpecificObjects, setvalueSpecificObjects] = useState('');
  const [valueSpecificObjectsCost, setvalueSpecificObjectsCost] = useState('');

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
      <Row gutter={16}>
        <Col span={14}>
          <div className="step_second_text_plus_select">
            <Text strong>Оборудование/Иные затраты</Text>
            <Input
              onChange={handleChangeSpecificObjects}
              placeholder="Название оборубования/объекта"
              value={valueSpecificObjects}
            />
          </div>
        </Col>
        <Col span={10}>
          <div className="step_second_text_input_plus_button">
            <div className="step_second_text_plus_select">
              <Text strong>Цена в тыщ руб</Text>
              <Input
                onChange={handleChangeSpecificObjectsCost}
                maxLength={16}
                placeholder="300 тыщ"
                value={valueSpecificObjectsCost}
              />
            </div>
            <div className="step_second_button_add__margin">
              <Button type="primary" shape="circle" icon={<PlusOutlined />} />
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
                <List.Item.Meta title={item.title} description={item.cost} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default StepThird;
