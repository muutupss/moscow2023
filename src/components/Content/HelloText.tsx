import React from 'react';
import { Typography } from 'antd';

import './HelloText.css';

const { Title, Text } = Typography;

const HelloText = () => {
  return (
    <div className="hello_text_titles">
      <Title style={{ margin: 0 }} level={2}>
        Хотите создать новый бизнес
      </Title>
      <Title style={{ marginTop: '8px' }} level={2}>
        или развить уже существующий в Москве?
      </Title>
      <div className="hello_text_texts">
        <div>
          <Text>Данный высокотехнологический сервис позволит качественно</Text>
        </div>
        <div>
          <Text>
            рассчитать ваши затраты на запуск или улучшение вашего проекта
          </Text>
        </div>
      </div>
    </div>
  );
};

export default HelloText;
