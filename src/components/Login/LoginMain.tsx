import React, { useEffect } from 'react';
import './LoginMain.css';
import { Button, Form, Input, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

const LoginMain = observer(() => {
  const { sharedStore } = useStore();
  const { getLogin, doesUserInSystem } = sharedStore;
  const navigate = useNavigate();

  useEffect(() => {
    if (doesUserInSystem) {
      navigate('/cabinet');
    }
  }, [doesUserInSystem]);

  const onFinish = (values: any) => {
    getLogin(values);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="login_main_text__magin">
        <Title level={3}>Вход</Title>
      </div>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Text strong>Email</Text>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Text strong>Password</Text>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});

export default LoginMain;
