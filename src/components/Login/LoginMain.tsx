import React, { useEffect } from 'react';
import './LoginMain.css';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  isUserInSystemLocalStorage,
  isAdminInSystemLocalStorage,
} from '../../helper/auth-header';

const { Text, Title } = Typography;

const LoginMain = observer(() => {
  const { sharedStore } = useStore();
  const { getLogin, doesUserInSystem } = sharedStore;
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (isUserInSystemLocalStorage()) {
      if (isAdminInSystemLocalStorage()) {
        navigate('/admin');
      } else {
        navigate('/cabinet');
      }
    }
  }, [doesUserInSystem]);

  const onFinish = (values: any) => {
    if (location.pathname === '/adminlogin') {
      getLogin(values, true);
    } else {
      getLogin(values, false);
    }
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleIsThisAdmin = () => {
    if (location.pathname === '/adminlogin') {
      return (
        <Title
          style={{
            marginTop: '20px',
            marginBottom: '35px',
            textAlign: 'center',
          }}
          level={4}
        >
          Секретный вход для администратора
        </Title>
      );
    }
    return (
      <Title
        style={{ marginTop: '20px', marginBottom: '35px', textAlign: 'center' }}
        level={4}
      >
        Вход
      </Title>
    );
  };

  return (
    <div>
      {handleIsThisAdmin()}
      <Divider />
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Text strong>Адрес электронной почты </Text>
        <Text strong style={{ color: 'red' }}>
          *
        </Text>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите вашу Почту' },
          ]}
        >
          <Input />
        </Form.Item>

        <Text strong>Пароль </Text>
        <Text strong style={{ color: 'red' }}>
          *
        </Text>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш Пароль' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default LoginMain;
