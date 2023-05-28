import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';

import './CabinetCards.css';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CabinetCards = ({ options, industries, deleteCard }: any) => {
  const [industry, setIndustry] = useState('');

  useEffect(() => {
    if (industries.length !== 0) {
      let currentInd = industries.find(
        (value: any) => options.IndustryID === value.id,
      );
      if (currentInd?.value) {
        currentInd = currentInd?.value;
      }
      if (currentInd?.name) {
        currentInd = currentInd?.name;
      }
      setIndustry(currentInd);
    }
  }, [industries.length]);

  const handleDataUpdate = (data: any) => {
    const value = new Date(data);
    return `${value.toLocaleTimeString('en-GB')} ${value.toLocaleDateString(
      'en-GB',
    )}`;
  };

  return (
    <div>
      <div className="cabinet_card">
        <div className="cabinet_text_and_icons">
          <div>
            <div className="cabinet_title_plus_text">
              <div>
                <Title level={4}>Дата создания отчета: </Title>
              </div>
              <div className="cabinet_text__margin">
                <Title level={4}>{handleDataUpdate(options.UpdatedAt)}</Title>
              </div>
            </div>
            <div className="cabinet_title_plus_text">
              <div>
                <Title level={4}>Отрасль: </Title>
              </div>
              <div className="cabinet_text__margin">
                <Title level={4}>{industry}</Title>
              </div>
            </div>
            <div className="cabinet_title_plus_text">
              <div>
                <Title level={4}>Сумма ваших вложений: </Title>
              </div>
              <div className="cabinet_text__margin">
                <Title level={4}>
                  {Math.trunc(parseInt(options.ResultFrom) / 10000) / 100}-
                  {Math.trunc(parseInt(options.ResultTo) / 10000) / 100} млн
                  рублей
                </Title>
              </div>
            </div>
          </div>
          <div>
            <DeleteOutlined
              onClick={() => deleteCard(options.ID)}
              style={{ fontSize: '20px', cursor: 'pointer' }}
            />
          </div>
        </div>
        <div className="cabinet_button">
          <Button danger>
            <a href={options.ReportLink} target="_blank">
              Скачать отчет
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CabinetCards;
