import React from 'react';
import { Button, Typography } from 'antd';

import './GoToRegistration.css';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function GoToRegistration() {
  const navigate = useNavigate();

  const handleClickRegistationButton = () => {
    navigate('/registration');
  };
  return (
    <div className="go_to_registration_text">
      <div>
        <Title level={4}>Хотите детальный отчет?</Title>
      </div>
      <div>
        <Title level={4}>
          Зарегистрируйтесь и получите полный расчет затрат для вашего бизнеса
        </Title>
      </div>
      <div className="go_to_registration_button">
        <Button type="primary" danger onClick={handleClickRegistationButton}>
          Регистрация
        </Button>
      </div>
    </div>
  );
}

export default GoToRegistration;
