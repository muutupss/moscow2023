import React from 'react';
import './RegistrationMain.css';
import { Button, Col, Form, Input, Row, Typography } from 'antd';

const { Text, Title } = Typography;

function RegistrationMain() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="registration_main_text__magin">
        <Title level={3}>Регистрация</Title>
      </div>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Text strong>Фамилия</Text>
        <Form.Item
          name="LastName"
          rules={[
            { required: true, message: 'Пожалуйста введите вашу Фамилию' },
          ]}
        >
          <Input />
        </Form.Item>

        <Text strong>Имя</Text>
        <Form.Item
          name="FirstName"
          rules={[{ required: true, message: 'Пожалуйста введите ваше Имя' }]}
        >
          <Input />
        </Form.Item>

        <Text strong>Отчество</Text>
        <Form.Item name="ThirdName">
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Адрес электронной почты</Text>
            <Form.Item
              name="Email"
              rules={[
                { required: true, message: 'Пожалуйста введите вашу Почту' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Text strong>ИНН</Text>
            <Form.Item
              name="INN"
              rules={[
                { required: true, message: 'Пожалуйста введите ваш ИНН' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Text strong>Веб-сайт организации</Text>
        <Form.Item name="Site">
          <Input />
        </Form.Item>

        <Text strong>Отрасль ведения хозяйственной деятельности</Text>
        <Form.Item name="Activity">
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Страна</Text>
            <Form.Item name="Country">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Text strong>Город</Text>
            <Form.Item name="City">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Text strong>Должность</Text>
        <Form.Item name="Post">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default RegistrationMain;
