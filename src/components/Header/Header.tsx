import React from 'react';
import logo from '../../assets/img/logo.jpg';
import { Button, Space } from 'antd';
import './Header.css';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';

const Header = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const handleClickRegistationButton = () => {
    navigate('/registration');
  };

  const handleClickLoginButton = () => {
    navigate('/login');
  };

  const handleLoginButton = () => {
    return location.pathname !== '/login' ? (
      <Button danger onClick={handleClickLoginButton}>
        Войти
      </Button>
    ) : (
      <></>
    );
  };

  const handleRegistationButton = () => {
    return location.pathname !== '/registration' ? (
      <Button type="primary" danger onClick={handleClickRegistationButton}>
        Регистрация
      </Button>
    ) : (
      <></>
    );
  };

  return (
    <div className="header_content">
      <div>
        <NavLink to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>
      <div className="header_buttons">
        <Space wrap>
          {handleRegistationButton()}
          {handleLoginButton()}
        </Space>
      </div>
    </div>
  );
};

export default Header;
