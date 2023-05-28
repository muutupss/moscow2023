import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';

import './CabinetCards.css';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

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
                <Title level={4}>{options.UpdatedAt}</Title>
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
                  {options.ResultFrom} — {options.ResultTo} рублей
                </Title>
              </div>
            </div>
          </div>
          <div>
            <EditOutlined
              style={{
                fontSize: '20px',
                marginRight: '20px',
                cursor: 'pointer',
              }}
            />
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
