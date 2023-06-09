import { PlusOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Col,
  Input,
  List,
  Row,
  Typography,
  message,
} from 'antd';
import React, { useState } from 'react';

const { Text } = Typography;

const StepThird = ({
  changeCurrentStepValues,
  equipments,
  equipmentsList,
}: any) => {
  const [valueSpecificObjects, setvalueSpecificObjects] = useState('');
  const [valueSpecificObjectsCost, setvalueSpecificObjectsCost] = useState(0);
  const [valueSpecificObjectsSum, setvalueSpecificObjectsSum] = useState(0);

  const handleChangeSpecificObjects = (inputValue: string) => {
    setvalueSpecificObjects(inputValue);
    const findItem = equipmentsList.find(
      (value: any) => value.name === inputValue,
    );
    if (findItem && findItem?.price_rub) {
      setvalueSpecificObjectsCost(
        Math.trunc(parseInt(findItem?.price_rub) / 100),
      );
      setvalueSpecificObjectsSum(1);
    }
  };

  const handleChangeSpecificObjectsCost = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setvalueSpecificObjectsCost(inputValue ? parseInt(inputValue) : 0);
    }
  };

  const handleChangeSpecificObjectsSum = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      setvalueSpecificObjectsSum(inputValue ? parseInt(inputValue) : 0);
    }
  };

  const handleClickAdd = () => {
    if (
      valueSpecificObjects &&
      valueSpecificObjectsCost &&
      valueSpecificObjectsSum
    ) {
      changeCurrentStepValues('equipments', {
        name: valueSpecificObjects,
        price_rub: valueSpecificObjectsCost,
        count: valueSpecificObjectsSum,
      });
      setvalueSpecificObjects('');
      setvalueSpecificObjectsCost(0);
      setvalueSpecificObjectsSum(0);
    } else {
      message.info('Одно из полей не заполнено');
    }
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={14}>
          <div className="step_second_text_plus_select">
            <Text strong>Оборудование/иные затраты</Text>
            <AutoComplete
              options={equipmentsList.map((value: any) => {
                return {
                  value: value.name,
                };
              })}
              onChange={handleChangeSpecificObjects}
              placeholder="Название оборубования/объекта"
              value={valueSpecificObjects as any}
              filterOption={(inputValue, option: any) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </div>
        </Col>
        <Col span={10}>
          <div className="step_second_text_input_plus_button">
            <div className="step_second_text_plus_select">
              <Text strong>Цена в рублях</Text>
              <Input
                onChange={handleChangeSpecificObjectsCost}
                maxLength={16}
                placeholder="300 000"
                value={valueSpecificObjectsCost ? valueSpecificObjectsCost : 0}
              />
            </div>
            <div className="step_second_text_plus_select">
              <Text strong>Количество</Text>
              <Input
                onChange={handleChangeSpecificObjectsSum}
                maxLength={16}
                placeholder="10 штук"
                value={valueSpecificObjectsSum ? valueSpecificObjectsSum : 0}
              />
            </div>
            <div className="step_second_button_add__margin">
              <Button
                onClick={handleClickAdd}
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
              />
            </div>
          </div>
        </Col>
      </Row>
      {equipments.length !== 0 && (
        <Row>
          <Col span={24}>
            <List
              itemLayout="horizontal"
              dataSource={equipments}
              renderItem={(item: any, index) => (
                <List.Item>
                  <List.Item.Meta
                    title={item?.name}
                    description={`${item['price_rub']} рублей ${item?.count} шт`}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default StepThird;
