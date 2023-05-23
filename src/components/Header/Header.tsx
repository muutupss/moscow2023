import React from 'react';
import logo from './logo.jpg';
import { Button, Space } from 'antd';
import './Header.css';

const Header = () => {
  return (
    <div className="header_content">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div className="header_buttons">
        <Space wrap>
          <Button type="primary" danger>
            Регистрация
          </Button>
          <Button danger>Войти</Button>
        </Space>
      </div>
    </div>
  );
};

export default Header;
