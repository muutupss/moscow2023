import React from 'react';
import logoFirst from '../../assets/img/Logo.svg';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import './Header.css';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { isUserInSystemLocalStorage } from '../../helper/auth-header';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Мои отчеты',
  },
  {
    key: '2',
    label: 'Мои данные',
  },
  {
    key: '3',
    label: 'Выйти',
  },
];

const Header = observer(() => {
  let location = useLocation();
  const navigate = useNavigate();
  const { sharedStore } = useStore();
  const { logout, isUserAdmin } = sharedStore;

  const handleClickRegistationButton = () => {
    navigate('/registration');
  };

  const handleClickLoginButton = () => {
    navigate('/login');
  };

  const handleClickAppFormButton = () => {
    navigate('/');
  };

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        if (isUserAdmin) {
          navigate('/admin');
        } else {
          navigate('/cabinet');
        }
        break;
      case '2':
        break;
      case '3':
        logout();
        navigate('/');
        break;
      default:
        break;
    }
  };

  const handleLoginButton = () => {
    return location.pathname !== '/login' &&
      location.pathname !== '/adminlogin' &&
      !isUserInSystemLocalStorage() ? (
      <Button danger onClick={handleClickLoginButton}>
        Войти
      </Button>
    ) : (
      <></>
    );
  };

  const handleRegistationButton = () => {
    return location.pathname !== '/registration' &&
      location.pathname !== '/adminlogin' &&
      !isUserInSystemLocalStorage() ? (
      <Button type="primary" danger onClick={handleClickRegistationButton}>
        Регистрация
      </Button>
    ) : (
      <></>
    );
  };

  const handleAppFormButton = () => {
    return isUserInSystemLocalStorage() ? (
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
    return isUserInSystemLocalStorage() ? (
      <Dropdown menu={{ items, onClick }} placement="bottomLeft">
        <UserOutlined style={{ fontSize: '32px', color: 'red' }} />
      </Dropdown>
    ) : (
      <></>
    );
  };

  return (
    <div className="header_content">
      <div>
        <NavLink to="/">
          <img src={logoFirst} alt="Logo" />
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
