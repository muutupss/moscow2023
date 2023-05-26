import React from 'react';
import logo from '../../assets/img/logo.jpg';
import { Button, Space } from 'antd';
import './Header.css';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';

const Header = observer(() => {
  let location = useLocation();
  const navigate = useNavigate();
  const { sharedStore } = useStore();
  const { user, setUser } = sharedStore;

  const handleClickRegistationButton = () => {
    setUser('0000001');
    navigate('/registration');
  };

  const handleClickLoginButton = () => {
    console.log(user);
    navigate('/login');
  };

  const handleClickAppFormButton = () => {
    navigate('/');
  };

  const handleLoginButton = () => {
    return location.pathname !== '/login' &&
      location.pathname !== '/cabinet' ? (
      <Button danger onClick={handleClickLoginButton}>
        Войти
      </Button>
    ) : (
      <></>
    );
  };

  const handleRegistationButton = () => {
    return location.pathname !== '/registration' &&
      location.pathname !== '/cabinet' ? (
      <Button type="primary" danger onClick={handleClickRegistationButton}>
        Регистрация
      </Button>
    ) : (
      <></>
    );
  };

  const handleAppFormButton = () => {
    return location.pathname === '/cabinet' ? (
      <div className="header_calculate__margin">
        <Button type="primary" danger onClick={handleClickAppFormButton}>
          Рассчитать вложения
        </Button>
      </div>
    ) : (
      <></>
    );
  };

  const handleProfileIcon = () => {
    return location.pathname === '/cabinet' ? (
      <UserOutlined style={{ fontSize: '32px', color: 'red' }} />
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
          {handleAppFormButton()}
          {handleProfileIcon()}
        </Space>
      </div>
    </div>
  );
});

export default Header;
