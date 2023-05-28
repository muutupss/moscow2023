import React from 'react';
import { Button, Typography } from 'antd';

import './CabinetCards.css';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CabinetCards = ({ options }: any) => {
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
                <Title level={4}>30.06.2029</Title>
              </div>
            </div>
            <div className="cabinet_title_plus_text">
              <div>
                <Title level={4}>Отрасль: </Title>
              </div>
              <div className="cabinet_text__margin">
                <Title level={4}>Сельское хозяйство</Title>
              </div>
            </div>
            <div className="cabinet_title_plus_text">
              <div>
                <Title level={4}>Сумма ваших вложений: </Title>
              </div>
              <div className="cabinet_text__margin">
                <Title level={4}>100 000 — 200 000 рублей</Title>
              </div>
            </div>
          </div>
          <div>
            <EditOutlined style={{ fontSize: '20px', marginRight: '20px' }} />
            <DeleteOutlined style={{ fontSize: '20px' }} />
          </div>
        </div>
        <div className="cabinet_button">
          <Button danger>Скачать отчет</Button>
        </div>
      </div>
    </div>
  );
};

export default CabinetCards;
